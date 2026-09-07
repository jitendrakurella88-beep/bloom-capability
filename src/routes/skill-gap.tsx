import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, ArrowRight, Flame, Sparkles, ThumbsUp, TrendingDown } from "lucide-react";
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
} from "@/components/ui-kit";
import { ExplainButton } from "@/components/Explain";
import { useApi } from "@/hooks/useApi";
import { getSkillGap } from "@/services/api";
import { axisProps, chartTooltip, gridProps } from "@/lib/chart";

export const Route = createFileRoute("/skill-gap")({
  head: () => ({
    meta: [
      { title: "Skill Gap Analysis — AI LearnHub" },
      {
        name: "description",
        content: "Compare your current skill levels against your target role and see prioritised gaps.",
      },
      { property: "og:title", content: "Skill Gap Analysis — AI LearnHub" },
      { property: "og:description", content: "Strengths, gaps and priority skills with explainable recommendations." },
    ],
  }),
  component: () => (
    <Protected role="employee" title="Skill Gap">
      <SkillGapPage />
    </Protected>
  ),
});

function SkillGapPage() {
  const { data, loading, error, retry } = useApi(getSkillGap);

  if (loading) return <LoadingState rows={2} />;
  if (error || !data) return <ErrorState onRetry={retry} />;

  const rows = data.map((s) => ({ ...s, gap: Math.max(0, s.required - s.current) }));
  const strengths = rows.filter((r) => r.gap === 0);
  const improve = rows.filter((r) => r.gap > 0 && r.gap <= 20);
  const priority = [...rows].filter((r) => r.gap > 20).sort((a, b) => b.gap - a.gap);
  const overallGap = Math.round(rows.reduce((a, r) => a + r.gap, 0) / rows.length);

  return (
    <>
      <PageHeader
        title="Your Skill Gap Analysis"
        subtitle="Current capability compared with the requirements of your target role, Data Scientist."
        actions={
          <>
            <ExplainButton
              label="Explain Recommendation"
              variant="outline"
              size="md"
              data={{
                title: "Priority skill: Machine Learning",
                summary:
                  "The target role requires strong Machine Learning skills. Your current assessment score is below the expected level, so improving Machine Learning will have the highest impact on your role readiness.",
                points: [
                  { label: "Current skill level", value: "Machine Learning — 58%" },
                  { label: "Required skill level", value: "85% for Data Scientist" },
                  { label: "Assessment performance", value: "50% correct on ML questions in your last assessment" },
                  { label: "Target role requirements", value: "ML carries the highest weight (30%) in the role profile" },
                  { label: "Learning history", value: "12% progress on Machine Learning Fundamentals" },
                  { label: "Reason", value: "Closing this 27% gap raises overall readiness by an estimated 11 points." },
                ],
              }}
            />
            <Link to="/roadmap">
              <Button icon={ArrowRight}>See roadmap</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle title="Current vs required level" subtitle="Every tracked skill in your role profile" />
          <div className="grid gap-5">
            {rows.map((r) => (
              <div key={r.name}>
                <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-sm font-bold text-foreground">{r.name}</span>
                    <Badge tone="neutral">{r.category}</Badge>
                  </div>
                  <Badge tone={r.gap === 0 ? "success" : r.gap > 20 ? "danger" : "warning"}>
                    {r.gap === 0 ? "Met" : `Gap ${r.gap}%`}
                  </Badge>
                </div>
                <div className="relative">
                  <ProgressBar value={r.current} tone={r.gap === 0 ? "success" : r.gap > 20 ? "danger" : "warning"} />
                  <span
                    className="absolute -top-1 h-4.5 w-0.5 rounded bg-foreground/70"
                    style={{ left: `calc(${r.required}% - 1px)` }}
                    title={`Required ${r.required}%`}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>Current {r.current}%</span>
                  <span>Required {r.required}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <ChartCard title="Capability radar" subtitle="Coverage against role requirements" height={330}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={rows} outerRadius="72%">
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <Tooltip {...chartTooltip} />
              <Radar name="Required" dataKey="required" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.12} />
              <Radar name="Current" dataKey="current" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.28} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard
        title="Gap by skill"
        subtitle={`Average gap across all tracked skills: ${overallGap}%`}
        className="mt-5"
        height={300}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 6, right: 6, left: -18, bottom: 0 }} barGap={4}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} interval={0} tickFormatter={(v: string) => (v.length > 10 ? `${v.slice(0, 9)}…` : v)} />
            <YAxis {...axisProps} domain={[0, 100]} />
            <Tooltip {...chartTooltip} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="current" name="Current" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="required" name="Required" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card>
          <SectionTitle title="Strengths" subtitle="At or above the required level" />
          <ul className="grid gap-2.5">
            {strengths.map((s) => (
              <li key={s.name} className="flex items-center gap-3 rounded-lg bg-success-soft px-3 py-2.5">
                <ThumbsUp className="h-4 w-4 shrink-0 text-success" />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{s.name}</span>
                <span className="text-sm font-bold text-success">{s.current}%</span>
              </li>
            ))}
            {strengths.length === 0 ? <p className="text-sm text-muted-foreground">No skills currently meet target.</p> : null}
          </ul>
        </Card>

        <Card>
          <SectionTitle title="Needs Improvement" subtitle="Gap of 20% or less" />
          <ul className="grid gap-2.5">
            {improve.map((s) => (
              <li key={s.name} className="flex items-center gap-3 rounded-lg bg-warning-soft px-3 py-2.5">
                <TrendingDown className="h-4 w-4 shrink-0 text-warning-foreground" />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{s.name}</span>
                <span className="text-sm font-bold text-warning-foreground">-{s.gap}%</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle title="Priority Skills" subtitle="Largest impact on readiness" />
          <ul className="grid gap-2.5">
            {priority.map((s) => (
              <li key={s.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-danger-soft px-3 py-2.5">
                <Flame className="h-4 w-4 shrink-0 text-destructive" />
                <span className="min-w-0 truncate text-sm font-semibold text-foreground">{s.name}</span>
                <span className="text-sm font-bold text-destructive">-{s.gap}%</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Priority skills are ranked by gap size weighted by their importance in your target role profile.
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground">How this analysis was produced</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your latest assessment results are mapped to the competency framework for Data Scientist. Each skill is
              scored against the required threshold, weighted by role importance, and ranked by the readiness impact of
              closing the gap. Recommendations then feed directly into your learning roadmap.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="primary">Assessment score 78%</Badge>
              <Badge tone="neutral">Target role: Data Scientist</Badge>
              <Badge tone="neutral">5 skills tracked</Badge>
              <Badge tone="warning">Average gap {overallGap}%</Badge>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
