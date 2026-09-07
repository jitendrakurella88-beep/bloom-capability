import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AlertTriangle, Bot, Eye, EyeOff, GaugeCircle, Lock, Mail, Sparkles, Target } from "lucide-react";
import { Button, inputClass } from "@/components/ui-kit";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AI LearnHub" },
      { name: "description", content: "Sign in to AI LearnHub with your employee or administrator account." },
      { property: "og:title", content: "Sign in — AI LearnHub" },
      { property: "og:description", content: "Access your learning dashboard, skill gap analysis and AI tutor." },
    ],
  }),
  component: LoginPage,
});

const highlights = [
  { icon: Target, title: "Skill gap analysis", text: "Compare your current level with your target role in seconds." },
  { icon: Sparkles, title: "Explainable recommendations", text: "Every suggestion tells you exactly why it was made." },
  { icon: Bot, title: "AI tutor on demand", text: "Ask questions about any topic in your learning material." },
  { icon: GaugeCircle, title: "Role readiness", text: "Track how close you are to the role you are aiming for." },
];

function LoginPage() {
  const { login, user, ready } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("employee@test.com");
  const [password, setPassword] = useState("123456");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && user) void navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
  }, [ready, user, navigate]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setTimeout(() => {
      const res = login(email, password, remember);
      setBusy(false);
      if (!res.ok) {
        setError(res.error ?? "Login failed");
        return;
      }
      void navigate({ to: res.role === "admin" ? "/admin" : "/dashboard" });
    }, 550);
  };

  const useDemo = (kind: "employee" | "admin") => {
    setEmail(kind === "admin" ? "admin@test.com" : "employee@test.com");
    setPassword("123456");
    setError(null);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-foreground/15">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-base font-extrabold">AI LearnHub</p>
            <p className="text-xs text-primary-foreground/70">AI-enabled Learning &amp; Capability Platform</p>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-3xl font-extrabold">Build the skills your role will need next.</h1>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Assess capability, identify gaps, follow an explainable learning roadmap, and give leadership a live view of
            organisational readiness.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.title} className="rounded-xl bg-primary-foreground/10 p-4">
                <h.icon className="h-4.5 w-4.5" />
                <p className="mt-2 text-sm font-bold">{h.title}</p>
                <p className="mt-1 text-xs text-primary-foreground/75">{h.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-primary-foreground/60">SIH26101 · Prototype with simulated data</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-5 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-extrabold">AI LearnHub</p>
              <p className="text-xs text-muted-foreground">Learning &amp; Capability Platform</p>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-foreground">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue your learning journey.</p>

          <form onSubmit={submit} className="mt-7 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground">Email</span>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="you@organisation.gov.in"
                />
              </div>
            </label>

            <label className="grid gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground">Password</span>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-10 pl-9`}
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-secondary"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-[oklch(0.52_0.19_268)]"
                />
                Remember me
              </label>
              <button type="button" className="text-sm font-semibold text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            {error ? (
              <div className="flex items-start gap-2 rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-destructive">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <Button type="submit" size="lg" loading={busy} className="w-full">
              {busy ? "Signing in…" : "Login"}
            </Button>
          </form>

          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-4">
            <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">Demo accounts</p>
            <div className="mt-3 grid gap-2">
              <button
                onClick={() => useDemo("employee")}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left transition-colors hover:bg-secondary"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">Employee</span>
                  <span className="block text-xs text-muted-foreground">employee@test.com · 123456</span>
                </span>
                <span className="text-xs font-semibold text-primary">Use</span>
              </button>
              <button
                onClick={() => useDemo("admin")}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left transition-colors hover:bg-secondary"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">Administrator</span>
                  <span className="block text-xs text-muted-foreground">admin@test.com · 123456</span>
                </span>
                <span className="text-xs font-semibold text-primary">Use</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
