export const chartTooltip = {
  background: "oklch(0.2 0.03 170)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 12,
  fontSize: 12,
  color: "oklch(0.97 0.01 150)",
};

export const chartGrid = "oklch(1 0 0 / 0.05)";
export const chartAxis = "oklch(0.7 0.02 160)";

export function ChartHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}
