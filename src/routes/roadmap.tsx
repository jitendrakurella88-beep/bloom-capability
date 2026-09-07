import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, Clock, PlayCircle, Route as RouteIcon, Sparkles } from "lucide-react";
import { Protected } from "@/components/layout/Protected";
import {
  Badge,
  Button,
  Card,
  ErrorState,
  LoadingState,
  PageHeader,
  ProgressBar,
  SectionTitle,
  StatCard,
  Toast,
} from "@/components/ui-kit";
import { ExplainButton } from "@/components/Explain";
import { useApi } from "@/hooks/useApi";
import { getRoadmap } from "@/services/api";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap — AI LearnHub" },
      { name: "description", content: "Your personalised week-by-week learning roadmap generated from your skill gaps." },
      { property: "og:title", content: "Learning Roadmap — AI LearnHub" },
      { property: "og:description", content: "A sequenced, explainable plan to reach your target role." },
    ],
  }),
  component: () => (
    <Protected role="employee" title="Learning Roadmap">
      <RoadmapPage />
    </Protected>
  ),
});

function RoadmapPage() {
  const { data, loading, error, retry } = useApi(getRoadmap);
  const [toast, setToast] = useState("");

  if (loading) return <LoadingState rows={2} />;
  if (error || !data) return <ErrorState onRetry={retry} />;

  const totalHours = data.reduce((a, s) => a + s.hours, 0);
  const completed = data.filter((s) => s.status === "Completed").length;
  const overall = Math.round(data.reduce((a, s) => a + s.progress, 0) / data.length);

  const start = (course: string) => {
    setToast(`Opening “${course}”…`);
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <>
      <PageHeader
        title="Personalised Learning Roadmap"
        subtitle="A five-week sequence built from your skill gaps, assessment performance and target role."
        actions={
          <Link to="/skill-gap">
            <Button variant="outline">View skill gap</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Roadmap progress" value={overall} suffix="%" icon={RouteIcon} />
        <StatCard label="Modules completed" value={`${completed}/${data.length}`} icon={CheckCircle2} tone="success" />
        <StatCard label="Total effort" value={totalHours} suffix=" hrs" icon={Clock} tone="warning" />
        <StatCard label="Target role" value="Data Scientist" icon={Sparkles} tone="primary" />
      </div>

      <Card className="mt-5">
        <SectionTitle title="Your timeline" subtitle="Complete each week in order for the best outcome" />
        <div className="relative">
          <span className="absolute top-2 bottom-2 left-4 hidden w-px bg-border sm:block" />
          <div className="grid gap-4">
            {data.map((step) => {
              const done = step.status === "Completed";
              const active = step.status === "In Progress";
              return (
                <div key={step.week} className="relative grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
                  <span
                    className={`z-10 hidden h-8 w-8 place-items-center rounded-full border-2 sm:grid ${
                      done
                        ? "border-success bg-success text-success-foreground"
                        : active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : active ? <PlayCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  </span>

                  <div className="rounded-xl border border-border p-4 transition-shadow hover:shadow-card">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone="primary">{step.week}</Badge>
                          <Badge tone="neutral">{step.skill}</Badge>
                          <Badge
                            tone={step.difficulty === "Advanced" ? "danger" : step.difficulty === "Intermediate" ? "warning" : "success"}
                          >
                            {step.difficulty}
                          </Badge>
                        </div>
                        <h4 className="mt-2 truncate text-base font-bold text-foreground">{step.course}</h4>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" /> {step.hours} hours estimated
                        </p>
                      </div>
                      <Badge tone={done ? "success" : active ? "warning" : "neutral"}>{step.status}</Badge>
                    </div>

                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-semibold">{step.progress}%</span>
                      </div>
                      <ProgressBar value={step.progress} tone={done ? "success" : "primary"} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant={done ? "outline" : "primary"} onClick={() => start(step.course)}>
                        {done ? "Review course" : step.progress > 0 ? "Continue Learning" : "Start Learning"}
                      </Button>
                      <ExplainButton
                        data={{
                          title: `${step.week} · ${step.course}`,
                          summary: step.rationale,
                          points: [
                            { label: "Current skill level", value: `${step.skill} below target level` },
                            { label: "Required skill level", value: "Defined by the Data Scientist role profile" },
                            { label: "Assessment performance", value: "Weakest areas: Machine Learning, Deep Learning" },
                            { label: "Sequencing", value: `${step.week} — prerequisites from earlier weeks apply` },
                            { label: "Effort", value: `${step.hours} hours at your preferred pace of 6 hrs/week` },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="mt-5">
        <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground">Why this roadmap?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your roadmap is generated based on your skill gaps, assessment performance, target role, and learning
              progress. Weeks are ordered so prerequisite skills come first, effort is capped at your preferred pace, and
              the largest readiness gains are scheduled earliest.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="neutral">Skill gaps: SQL, ML, Deep Learning</Badge>
              <Badge tone="neutral">Assessment: 78%</Badge>
              <Badge tone="neutral">Pace: 6 hrs/week</Badge>
              <Badge tone="primary">Estimated readiness gain: +19%</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Toast show={!!toast} message={toast} />
    </>
  );
}
