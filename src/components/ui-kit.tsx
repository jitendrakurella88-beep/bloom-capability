import { cn } from "@/lib/utils";
import { AlertTriangle, Check, Inbox, Loader2, X, type LucideIcon } from "lucide-react";
import { useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";

/* --------------------------------- Button --------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
  outline: "border border-border bg-card text-foreground hover:bg-secondary",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  success: "bg-success text-success-foreground hover:bg-success/90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
  icon: "h-9 w-9",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: LucideIcon;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon: Icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

/* ---------------------------------- Card ---------------------------------- */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("card-surface p-5", className)}>{children}</div>;
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string | undefined;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
      <div className="min-w-0">
        <h3 className="truncate text-base font-bold text-foreground">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* -------------------------------- PageHeader ------------------------------- */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 grid gap-3 sm:flex sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/* --------------------------------- StatCard -------------------------------- */

export function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  trend,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  trend?: string;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    danger: "bg-danger-soft text-destructive",
  } as const;
  return (
    <div className="card-surface p-5 transition-shadow duration-200 hover:shadow-pop">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", tones[tone])}>
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl">
        {value}
        {suffix ? <span className="ml-0.5 text-lg font-bold text-muted-foreground">{suffix}</span> : null}
      </p>
      {trend ? <p className="mt-1 text-xs text-muted-foreground">{trend}</p> : null}
    </div>
  );
}

/* ------------------------------- ProgressBar ------------------------------- */

export function ProgressBar({
  value,
  tone = "primary",
  size = "md",
  className,
}: {
  value: number;
  tone?: "primary" | "success" | "warning" | "danger" | "muted";
  size?: "sm" | "md";
  className?: string;
}) {
  const tones = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
    muted: "bg-muted-foreground/40",
  } as const;
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-secondary", size === "sm" ? "h-1.5" : "h-2.5", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", tones[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

/* ---------------------------------- Badge ---------------------------------- */

export type BadgeTone = "primary" | "success" | "warning" | "danger" | "neutral";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  const tones: Record<BadgeTone, string> = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    danger: "bg-danger-soft text-destructive",
    neutral: "bg-secondary text-secondary-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
      {skill}
    </span>
  );
}

/* --------------------------------- Avatar ---------------------------------- */

export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-20 w-20 text-2xl",
  } as const;
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground",
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}

/* -------------------------------- ChartCard -------------------------------- */

export function ChartCard({
  title,
  subtitle,
  action,
  height = 280,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  height?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("card-surface p-5", className)}>
      <SectionTitle title={title} subtitle={subtitle} action={action} />
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------- Modal ---------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "scrollbar-slim max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-card shadow-pop sm:rounded-2xl",
          wide ? "sm:max-w-3xl" : "sm:max-w-lg",
        )}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border p-5">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-foreground">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer ? <div className="flex justify-end gap-2 border-t border-border p-4">{footer}</div> : null}
      </div>
    </div>
  );
}

/* ------------------------- Explainable recommendation ---------------------- */

export function ExplainList({ points }: { points: { label: string; value: string }[] }) {
  return (
    <ul className="space-y-3">
      {points.map((p) => (
        <li key={p.label} className="grid gap-0.5">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{p.label}</span>
          <span className="text-sm text-foreground">{p.value}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ State displays ----------------------------- */

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h4 className="mt-3 text-sm font-bold text-foreground">{title}</h4>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-secondary", className)} />;
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-52" />
      ))}
    </div>
  );
}

export function ErrorState({ onRetry, message }: { onRetry?: () => void; message?: string }) {
  return (
    <div className="grid place-items-center rounded-xl border border-destructive/20 bg-danger-soft/50 px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-card text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <h4 className="mt-3 text-sm font-bold text-foreground">Couldn't load this page</h4>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {message ?? "The service did not respond. Check your connection and try again."}
      </p>
      {onRetry ? (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

export function Toast({ message, show }: { message: string; show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-pop">
      <Check className="h-4 w-4" />
      {message}
    </div>
  );
}

/* --------------------------------- Inputs ---------------------------------- */

export const inputClass =
  "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none transition";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
