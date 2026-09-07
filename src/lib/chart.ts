/** Shared Recharts styling so every chart matches the design system. */

export const axisProps = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

export const gridProps = {
  strokeDasharray: "4 4",
  stroke: "var(--color-border)",
  vertical: false,
} as const;

export const chartTooltip = {
  cursor: { fill: "var(--color-secondary)", opacity: 0.5 },
  contentStyle: {
    borderRadius: 12,
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    boxShadow: "var(--shadow-pop)",
    fontSize: 12,
  },
  labelStyle: { fontWeight: 700, color: "var(--color-foreground)" },
} as const;

export const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];
