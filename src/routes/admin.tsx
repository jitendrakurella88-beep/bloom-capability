import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Protected } from "@/components/layout/Protected";
import { Card, ChartCard, ErrorState, LoadingState, PageHeader, SectionTitle, StatCard } from "@/components/ui-kit";
import { useApi } from "@/hooks/useApi";
import { getAdminDashboard } from "@/services/api";
import { axisProps, chartTooltip, gridProps } from "@/lib/chart";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Organization Learning Overview — AI LearnHub" },
      { name: "description", content: "Organisation-wide skill scores, training completion and workforce readiness." },
      { property: "og:title", content: "Organization Learning Overview — AI LearnHub" },
      { property: "og:description", content: "Admin analytics across departments, training and future skill needs." },
    ],
  }),
  component: () => (
    <Protected role="admin" title="Organization Learning Overview">
      <AdminDashboard />
    </Protected>
  ),
});

function AdminDashboard() {
  const { data, loading, error, retry } = useApi(getAdminDashboard);

  if (loading) return <LoadingState rows={2} />;
  if (error || !data) return <ErrorState onRetry={retry} />;

  return (
    <>
      <PageHeader
        title="Organization Learning Overview"
        subtitle="Workforce capability, training uptake and readiness across every department."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Employees" value={data.stats.totalEmployees.toLocaleString()} icon={Users} />
        <StatCard label="Average Skill Score" value={data.stats.averageSkillScore} suffix="%" icon={TrendingUp} tone="primary" />
        <StatCard label="Training Completion" value={data.stats.trainingCompletion} suffix="%" icon={GraduationCap} tone="success" />
        <StatCard label="Employees At Risk" value={data.stats.employeesAtRisk} icon={AlertTriangle} tone="danger" />
      </div>

      <ChartCard title="Department skill performance" subtitle="Average score, completion and readiness" className="mt-5" height={320}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.departments} margin={{ top: 6, right: 6, left: -18, bottom: 0 }} barGap={4}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="department" {...axisProps} />
            <YAxis {...axisProps} domain={[0, 100]} />
            <Tooltip {...chartTooltip} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="score" name="Skill score" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="completion" name="Completion" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="readiness" name="Readiness" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <Card className="mt-5">
        <SectionTitle title="Workforce readiness" subtitle="Employees grouped by readiness band" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.readiness.map((r) => (
            <div key={r.name} className="rounded-xl border border-border p-4">
              <p className="text-sm font-semibold text-muted-foreground">{r.name}</p>
              <p className="mt-1 text-2xl font-extrabold text-foreground">{r.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
