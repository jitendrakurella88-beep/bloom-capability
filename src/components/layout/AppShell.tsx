import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Brain,
  Building2,
  ClipboardCheck,
  FileStack,
  GaugeCircle,
  Grid3x3,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Route as RouteIcon,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, Badge } from "@/components/ui-kit";
import { notifications } from "@/data/mock";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const employeeNav: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Learning Materials", to: "/learning-materials", icon: FileStack },
  { label: "Assessment", to: "/assessment", icon: ClipboardCheck },
  { label: "Skill Gap", to: "/skill-gap", icon: Target },
  { label: "Learning Roadmap", to: "/roadmap", icon: RouteIcon },
  { label: "AI Tutor", to: "/ai-tutor", icon: Bot },
  { label: "Quiz", to: "/quiz", icon: Brain },
  { label: "Performance Analytics", to: "/analytics", icon: LineChart },
  { label: "Role Readiness", to: "/role-readiness", icon: GaugeCircle },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Employees", to: "/admin/employees", icon: Users },
  { label: "Skill Heatmap", to: "/admin/skill-heatmap", icon: Grid3x3 },
  { label: "Department Analytics", to: "/admin/departments", icon: Building2 },
  { label: "Training Analytics", to: "/admin/training", icon: GraduationCap },
  { label: "Future Skill Needs", to: "/admin/future-skills", icon: TrendingUp },
];

function Brand() {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Sparkles className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-foreground">AI LearnHub</p>
        <p className="truncate text-[11px] text-muted-foreground">Capability Platform</p>
      </div>
    </div>
  );
}

function NavLinks({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="grid gap-1">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/admin" }}
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-primary"
          activeProps={{ className: "!bg-primary !text-primary-foreground shadow-sm" }}
        >
          <item.icon className="h-4.5 w-4.5 shrink-0" />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({
  children,
  title,
  role,
}: {
  children: ReactNode;
  title: string;
  role: "employee" | "admin";
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = role === "admin" ? adminNav : employeeNav;

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const onLogout = () => {
    logout();
    void navigate({ to: "/login" });
  };

  const sidebarBody = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col gap-6 p-4">
      <Brand />
      <div className="scrollbar-slim flex-1 overflow-y-auto">
        {role === "admin" ? (
          <p className="mb-2 px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
            Administration
          </p>
        ) : (
          <p className="mb-2 px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
            Learning
          </p>
        )}
        <NavLinks items={items} {...(onNavigate ? { onNavigate } : {})} />
      </div>
      <div className="border-t border-sidebar-border pt-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-danger-soft hover:text-destructive"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        {sidebarBody()}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-3 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebarBody(() => setMobileOpen(false))}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-secondary lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
              <h2 className="truncate text-base font-bold text-foreground sm:text-lg">{title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search skills, courses…"
                  className="h-9 w-52 rounded-lg border border-input bg-background pr-3 pl-9 text-sm placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none lg:w-64"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen((v) => !v);
                    setMenuOpen(false);
                  }}
                  aria-label="Notifications"
                  className="relative grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
                </button>
                {notifOpen ? (
                  <div className="absolute right-0 z-30 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover p-2 shadow-pop">
                    <p className="px-2 py-1.5 text-xs font-bold tracking-wide text-muted-foreground uppercase">
                      Notifications
                    </p>
                    {notifications.map((n) => (
                      <div key={n.id} className="rounded-lg p-2.5 transition-colors hover:bg-secondary">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-foreground">{n.title}</p>
                          {n.unread ? <Badge tone="primary">New</Badge> : null}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setMenuOpen((v) => !v);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-border py-1 pr-2 pl-1 transition-colors hover:bg-secondary"
                >
                  <Avatar initials={user?.initials ?? "?"} size="sm" />
                  <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">{user?.name}</span>
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-border bg-popover p-1.5 shadow-pop">
                    <div className="px-2.5 py-2">
                      <p className="truncate text-sm font-bold text-foreground">{user?.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="my-1 h-px bg-border" />
                    {role === "employee" ? (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                      >
                        <User className="h-4 w-4" /> View profile
                      </Link>
                    ) : null}
                    <button
                      onClick={onLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-destructive hover:bg-danger-soft"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <main className={cn("mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:pb-8")}>{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5">
          {items.slice(0, 5).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/admin" }}
              className="grid place-items-center gap-1 py-2.5 text-[10px] font-semibold text-muted-foreground"
              activeProps={{ className: "!text-primary" }}
            >
              <item.icon className="h-4.5 w-4.5" />
              <span className="max-w-full truncate px-1">{item.label.split(" ")[0]}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
