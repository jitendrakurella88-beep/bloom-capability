import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { demoAccounts, employeeProfile, type Role } from "@/data/mock";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
  initials: string;
}

interface AuthState {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string, remember: boolean) => { ok: boolean; role?: Role; error?: string };
  logout: () => void;
}

const STORAGE_KEY = "learnhub.user";
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string, remember: boolean) => {
    const account = demoAccounts.find(
      (a) => a.email === email.trim().toLowerCase() && a.password === password,
    );
    if (!account) return { ok: false, error: "Invalid email or password. Try the demo accounts below." };

    const next: AuthUser =
      account.role === "admin"
        ? { name: "Anita Desai", email: account.email, role: "admin", initials: "AD" }
        : { name: employeeProfile.name, email: account.email, role: "employee", initials: employeeProfile.avatar };

    setUser(next);
    const store = remember ? window.localStorage : window.sessionStorage;
    store.setItem(STORAGE_KEY, JSON.stringify(next));
    window.localStorage.setItem("learnhub.token", "demo-token");
    return { ok: true, role: account.role };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
    window.sessionStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("learnhub.token");
  }, []);

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
