import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AppShell } from "./AppShell";
import { LoadingState } from "@/components/ui-kit";

export function Protected({
  role,
  title,
  children,
}: {
  role: "employee" | "admin";
  title: string;
  children: ReactNode;
}) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    if (!user) void navigate({ to: "/login" });
    else if (user.role !== role) void navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
  }, [ready, user, role, navigate]);

  if (!ready || !user || user.role !== role) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <LoadingState />
      </div>
    );
  }

  return (
    <AppShell role={role} title={title}>
      {children}
    </AppShell>
  );
}
