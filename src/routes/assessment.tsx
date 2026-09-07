import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Target, Timer, XCircle } from "lucide-react";
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
} from "@/components/ui-kit";
import { QuizQuestion } from "@/components/QuizQuestion";
import { useApi } from "@/hooks/useApi";
import { getAssessment } from "@/services/api";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Skill Assessment — AI LearnHub" },
      { name: "description", content: "Take your core competency assessment and see which skill areas were evaluated." },
      { property: "og:title", content: "Skill Assessment — AI LearnHub" },
      { property: "og:description", content: "Multi-skill competency assessment with instant scoring." },
    ],
  }),
  component: () => (
    <Protected role="employee" title="Assessment">
      <AssessmentPage />
    </Protected>
  ),
});

function AssessmentPage() {
  const { data, loading, error, retry } = useApi(getAssessment);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (loading) return <LoadingState rows={2} />;
  if (error || !data) return <ErrorState onRetry={retry} />;

  const questions = data.questions;
  const current = questions[index]!;
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / questions.length) * 100);

  const correct = questions.filter((q) => answers[q.id] === q.answer);
  const incorrect = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.answer);
  const score = Math.round((correct.length / questions.length) * 100);

  const bySkill = Array.from(new Set(questions.map((q) => q.skill))).map((skill) => {
    const qs = questions.filter((q) => q.skill === skill);
    const ok = qs.filter((q) => answers[q.id] === q.answer).length;
    return { skill, score: Math.round((ok / qs.length) * 100), total: qs.length };
  });

  if (submitted) {
    return (
      <>
        <PageHeader title="Assessment Completed 🎉" subtitle="Here is how you performed across each evaluated skill area." />

        <Card className="mb-5">
          <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <div className="grid place-items-center">
              <div
                className="grid h-32 w-32 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(var(--color-primary) ${score * 3.6}deg, var(--color-secondary) 0deg)`,
                }}
              >
                <div className="grid h-24 w-24 place-items-center rounded-full bg-card">
                  <span className="text-2xl font-extrabold text-foreground">{score}%</span>
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-foreground">Core Competency Assessment</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You answered {correct.length} of {questions.length} questions correctly. Your results have been fed into
                your skill profile and roadmap.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/skill-gap">
                  <Button icon={Target}>View Skill Gap</Button>
                </Link>
                <Button
                  variant="outline"
                  icon={RotateCcw}
                  onClick={() => {
                    setAnswers({});
                    setIndex(0);
                    setSubmitted(false);
                  }}
                >
                  Retake assessment
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Score" value={score} suffix="%" icon={Target} />
          <StatCard label="Correct answers" value={correct.length} icon={CheckCircle2} tone="success" />
          <StatCard label="Incorrect answers" value={incorrect.length} icon={XCircle} tone="danger" />
          <StatCard label="Skill areas evaluated" value={bySkill.length} icon={Timer} tone="warning" />
        </div>

        <Card className="mt-5">
          <SectionTitle title="Skill areas evaluated" subtitle="Score per competency area" />
          <div className="grid gap-4 sm:grid-cols-2">
            {bySkill.map((s) => (
              <div key={s.skill} className="rounded-xl border border-border p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">{s.skill}</span>
                  <Badge tone={s.score >= 75 ? "success" : s.score >= 50 ? "warning" : "danger"}>{s.score}%</Badge>
                </div>
                <ProgressBar value={s.score} tone={s.score >= 75 ? "success" : s.score >= 50 ? "warning" : "danger"} />
                <p className="mt-2 text-xs text-muted-foreground">{s.total} question(s) in this area</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-5">
          <SectionTitle title="Answer review" subtitle="Correct answers highlighted in green" />
          <div className="grid gap-3">
            {questions.map((q) => {
              const ok = answers[q.id] === q.answer;
              return (
                <div key={q.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-start gap-3">
                    {ok ? (
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-success" />
                    ) : (
                      <XCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-destructive" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{q.question}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Correct answer: <span className="font-semibold text-foreground">{q.options[q.answer]}</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={data.title}
        subtitle="Answer every question honestly — your roadmap and role readiness are generated from these results."
        actions={<Badge tone="neutral">{questions.length} questions · ~15 min</Badge>}
      />

      <Card>
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>
              Progress · {answered}/{questions.length} answered
            </span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>

        <QuizQuestion
          question={current}
          index={index}
          total={questions.length}
          selected={answers[current.id] ?? null}
          onSelect={(i) => setAnswers({ ...answers, [current.id]: i })}
        />

        <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
          <Button variant="outline" icon={ArrowLeft} disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
            Previous
          </Button>
          <div className="flex justify-end gap-2">
            {index < questions.length - 1 ? (
              <Button onClick={() => setIndex((i) => i + 1)}>
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="success" disabled={answered === 0} onClick={() => setSubmitted(true)}>
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to question ${i + 1}`}
            className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
              i === index
                ? "bg-primary text-primary-foreground"
                : answers[q.id] !== undefined
                  ? "bg-success-soft text-success"
                  : "bg-secondary text-muted-foreground hover:bg-border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
