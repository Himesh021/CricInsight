import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import { Zap, AlertTriangle, Flame } from "lucide-react";
import { GlassCard, PageShell } from "@/components/page-shell";
import { ChartHeader, chartTooltip, chartAxis, chartGrid } from "@/components/chart-helpers";
import { ballByBall, momentumData } from "@/lib/mock-data";

export const Route = createFileRoute("/momentum")({
  head: () => ({
    meta: [
      { title: "Momentum Analysis · CricInsight AI" },
      {
        name: "description",
        content: "Ball-by-ball momentum, turning points and impact analysis.",
      },
    ],
  }),
  component: MomentumPage,
});

function MomentumPage() {
  return (
    <PageShell
      title="Momentum Analysis"
      subtitle="Ball-by-ball momentum swings, turning points and impact moments."
    >
      <GlassCard>
        <ChartHeader title="Momentum Graph" sub="Positive = batting team gaining" />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={momentumData}>
            <defs>
              <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.74 0.18 55)" stopOpacity={0.7} />
                <stop offset="100%" stopColor="oklch(0.74 0.18 55)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={chartGrid} />
            <XAxis dataKey="over" stroke={chartAxis} fontSize={11} />
            <YAxis stroke={chartAxis} fontSize={11} />
            <Tooltip contentStyle={chartTooltip} />
            <ReferenceLine y={0} stroke="oklch(1 0 0 / 0.2)" />
            <ReferenceLine
              x={14}
              stroke="oklch(0.65 0.24 25)"
              strokeDasharray="3 3"
              label={{ value: "Turning Point", fill: "oklch(0.65 0.24 25)", fontSize: 11 }}
            />
            <Area
              type="monotone"
              dataKey="momentum"
              stroke="oklch(0.74 0.18 55)"
              fill="url(#mg)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <ChartHeader title="Ball-by-Ball Timeline" />
          <div className="space-y-3">
            {ballByBall.map((b, i) => {
              const isWicket = b.event === "WICKET";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/30 p-3"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                    style={{
                      background: isWicket
                        ? "oklch(0.65 0.24 25 / 0.2)"
                        : "oklch(0.78 0.18 145 / 0.2)",
                      color: isWicket ? "oklch(0.7 0.24 25)" : "oklch(0.78 0.18 145)",
                    }}
                  >
                    {b.event === "SIX" ? "6" : b.event === "FOUR" ? "4" : "W"}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{b.text}</div>
                    <div className="text-xs text-muted-foreground">Over {b.over}</div>
                  </div>
                  <div
                    className={`text-sm font-bold ${b.impact > 0 ? "text-primary" : "text-destructive"}`}
                  >
                    {b.impact > 0 ? "+" : ""}
                    {b.impact}%
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        <div className="space-y-3">
          <GlassCard>
            <div className="mb-2 flex items-center gap-2 text-accent">
              <Flame className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Turning Point</span>
            </div>
            <div className="text-lg font-semibold">
              Wicket of Rashid Khan in Over 17.3 shifted momentum by 22%.
            </div>
          </GlassCard>
          <GlassCard>
            <div className="mb-2 flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Wicket Impact</span>
            </div>
            <div className="text-sm text-muted-foreground">
              2 wickets in last 5 overs reduced projected score by 24 runs.
            </div>
          </GlassCard>
          <GlassCard>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Boundary Surge</span>
            </div>
            <div className="text-sm text-muted-foreground">
              4 boundaries in overs 13–18 added +27% win probability.
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
