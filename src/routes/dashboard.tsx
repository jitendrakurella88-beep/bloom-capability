import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarClock,
  ClipboardCheck,
  Clock,
  FileUp,
  GraduationCap,
  Target,
  TrendingUp,
} from "lucide-react";
import { Protected } from "@/components/layout/Protected";
import {
  Badge,
  Button,
  Card,
  ChartCard,
  ErrorState,
  LoadingState,
  PageHeader,
  ProgressBar,
  SectionTitle,
  StatCard,
} from "@/components/ui-kit";
import { ExplainButton } from "@/components/Explain";
import { useApi } from "@/hooks/useApi";
import { getDashboard } from "@/services/api";
import { employeeProfile } from "@/data/mock";
import { chartTooltip, gridProps, axisProps } from "@/lib/chart";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Employee Dashboard — AI LearnHub" },
      {
        name: "description",
        content: "Track your skill score, learning progress, recommended courses and upcoming assessments.",
      },
      { property: "og:title", content: "Employee Dashboard — AI LearnHub" },
      { property: "og:description", content: "Your personalised learning overview and skill progress." },
    ],
  }),
  component: () => (
    <Protected role="employee" title="Dashboard">
      <DashboardPage />
    </Protected>
  ),
});

const activityIcon = {
  quiz: ClipboardCheck,
  upload: FileUp,
  course: BookOpen,
  tutor: Bot,
  assessment: Target,
} as const;

function DashboardPage() {
  const { data, loading, error, retry } = useApi(getDashboard);

  if (loading) return <LoadingState />;
  if (error || !data) return <ErrorState onRetry={retry} />;

  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <>
      <PageHeader
        title={`${greeting}, ${employeeProfile.name} 👋`}
        subtitle="Continue your learning journey and build the skills you need for your target role."
        actions={
          <>
            <Link to="/assessment">
              <Button variant="outline" icon={ClipboardCheck}>
                Take assessment
              </Button>
            </Link>
            <Link to="/roadmap">
              <Button icon={ArrowRight}>My roadmap</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Overall Skill Score" value={data.stats.overallSkillScore} suffix="%" icon={Target} trend="+6% this month" />
        <StatCard label="Learning Progress" value={data.stats.learningProgress} suffix="%" icon={TrendingUp} tone="success" trend="3 courses active" />
        <StatCard label="Courses Completed" value={data.stats.coursesCompleted} icon={GraduationCap} tone="warning" trend="of 14 assigned" />
        <StatCard label="Average Quiz Score" value={data.stats.averageQuizScore} suffix="%" icon={ClipboardCheck} tone="primary" trend="18 attempts" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <ChartCard
          title="Skill Progress"
          subtitle="Assessed capability over the last six months"
          className="xl:col-span-2"
          height={300}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trend} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <defs>
                {["Python", "SQL", "ML", "DL"].map((k, i) => (
                  <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={`var(--color-chart-${i + 1})`} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={`var(--color-chart-${i + 1})`} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} domain={[0, 100]} />
              <Tooltip {...chartTooltip} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              {["Python", "SQL", "ML", "DL"].map((k, i) => (
                <Area
                  key={k}
                  type="monotone"
                  dataKey={k}
                  stroke={`var(--color-chart-${i + 1})`}
                  strokeWidth={2}
                  fill={`url(#g-${k})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card>
          <SectionTitle
            title="Current Skills"
            subtitle="Latest assessed levels"
            action={
              <Link to="/skill-gap">
                <Button variant="ghost" size="sm">
                  Skill gap
                </Button>
              </Link>
            }
          />
          <div className="grid gap-4">
            {data.skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">{s.name}</span>
                  <span className="text-sm font-bold text-muted-foreground">{s.current}%</span>
                </div>
                <ProgressBar
                  value={s.current}
                  tone={s.current >= s.required ? "success" : s.current >= s.required - 20 ? "warning" : "danger"}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5">
        <SectionTitle
          title="Recommended Learning"
          subtitle="Generated from your skill gaps and target role"
          action={
            <Link to="/roadmap">
              <Button variant="ghost" size="sm">
                View roadmap
              </Button>
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.recommended.map((c) => (
            <div key={c.id} className="card-surface flex flex-col p-5 transition-shadow duration-200 hover:shadow-pop">
              <div className="flex items-start justify-between gap-2">
                <Badge tone="primary">{c.skill}</Badge>
                <Badge
                  tone={c.difficulty === "Advanced" ? "danger" : c.difficulty === "Intermediate" ? "warning" : "success"}
                >
                  {c.difficulty}
                </Badge>
              </div>
              <h4 className="mt-3 text-sm font-bold text-foreground">{c.title}</h4>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{c.description}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {c.hours} hrs estimated
              </p>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="font-semibold">{c.progress}%</span>
                </div>
                <ProgressBar value={c.progress} size="sm" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link to="/roadmap" className="flex-1">
                  <Button size="sm" className="w-full">
                    Start Learning
                  </Button>
                </Link>
                <ExplainButton
                  data={{
                    title: c.title,
                    summary: c.rationale,
                    points: [
                      { label: "Current skill level", value: `${c.skill}: below target` },
                      { label: "Required for role", value: `${employeeProfile.targetRole} profile` },
                      { label: "Assessment performance", value: "78% overall, weakest in AI/ML topics" },
                      { label: "Learning history", value: "6 courses completed, 24 hours logged" },
                    ],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Recent Activity" subtitle="Your last seven days" />
          <ul className="grid gap-3">
            {data.activity.map((a) => {
              const Icon = activityIcon[a.type as keyof typeof activityIcon] ?? BookOpen;
              return (
                <li key={a.id} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/60">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.meta} · {a.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <SectionTitle
            title="Upcoming Assessments"
            subtitle="Scheduled evaluations"
            action={
              <Link to="/assessment">
                <Button variant="ghost" size="sm">
                  Start now
                </Button>
              </Link>
            }
          />
          <ul className="grid gap-3">
            {data.upcoming.map((u) => (
              <li key={u.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{u.title}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock className="h-3.5 w-3.5" /> {u.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {u.duration}
                    </span>
                    <span>{u.questions} questions</span>
                  </p>
                </div>
                <Link to="/assessment">
                  <Button size="sm" variant="outline">
                    Begin
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
