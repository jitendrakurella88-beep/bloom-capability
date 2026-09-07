import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoadingState } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI LearnHub — Employee Learning & Capability Platform" },
      {
        name: "description",
        content:
          "Sign in to AI LearnHub to assess your skills, see your gap analysis and follow a personalised learning roadmap.",
      },
      { property: "og:title", content: "AI LearnHub — Employee Learning & Capability Platform" },
      {
        property: "og:description",
        content: "Skill assessment, explainable recommendations and role readiness for every employee.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    if (!user) void navigate({ to: "/login" });
    else void navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
  }, [ready, user, navigate]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <LoadingState />
    </div>
  );
}
