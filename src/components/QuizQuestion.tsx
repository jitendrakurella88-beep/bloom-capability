import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui-kit";
import type { Question } from "@/data/mock";

export function QuizQuestion({
  question,
  index,
  total,
  selected,
  onSelect,
  reveal,
}: {
  question: Question;
  index: number;
  total: number;
  selected: number | null;
  onSelect: (i: number) => void;
  reveal?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="primary">
          Question {index + 1} of {total}
        </Badge>
        <Badge tone="neutral">{question.skill}</Badge>
        <Badge tone={question.difficulty === "Hard" ? "danger" : question.difficulty === "Medium" ? "warning" : "success"}>
          {question.difficulty}
        </Badge>
      </div>

      <h3 className="mt-4 text-lg font-bold text-foreground sm:text-xl">{question.question}</h3>

      <div className="mt-5 grid gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = reveal && i === question.answer;
          const isWrong = reveal && isSelected && i !== question.answer;
          return (
            <button
              key={opt}
              onClick={() => !reveal && onSelect(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all",
                isCorrect
                  ? "border-success bg-success-soft text-foreground"
                  : isWrong
                    ? "border-destructive bg-danger-soft text-foreground"
                    : isSelected
                      ? "border-primary bg-primary-soft text-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold",
                  isSelected || isCorrect ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="min-w-0">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
