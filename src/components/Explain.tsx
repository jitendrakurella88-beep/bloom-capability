import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { Button, ExplainList, Modal } from "@/components/ui-kit";

export interface ExplainData {
  title: string;
  summary: string;
  points: { label: string; value: string }[];
}

/**
 * Explainable-AI affordance used across recommendations, roadmaps,
 * readiness scores and future-skill forecasts.
 */
export function ExplainButton({
  data,
  label = "Why?",
  size = "sm",
  variant = "outline",
}: {
  data: ExplainData;
  label?: string;
  size?: "sm" | "md";
  variant?: "outline" | "ghost" | "secondary";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant} size={size} icon={HelpCircle} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Why is this recommended?"
        subtitle={data.title}
        footer={
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <p className="mb-5 rounded-xl bg-primary-soft p-4 text-sm leading-relaxed text-accent-foreground">
          {data.summary}
        </p>
        <ExplainList points={data.points} />
      </Modal>
    </>
  );
}
