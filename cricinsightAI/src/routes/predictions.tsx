import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard, PageShell } from "@/components/page-shell";
import { ChartHeader, chartAxis, chartGrid, chartTooltip } from "@/components/chart-helpers";
import { winProbTrend } from "@/lib/mock-data";
import { Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/predictions")({
  head: () => ({
    meta: [
      { title: "Win Probability Center · CricInsight AI" },
      { name: "description", content: "Live match prediction and simulation." },
    ],
  }),
  component: PredictionsPage,
});

function PredictionsPage() {
  return (
    <PageShell title="Win Probability Center" subtitle="Predictive engine for the live match.">
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <ChartHeader title="Current Match Prediction" />
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Royal Challengers Bengaluru
              </div>
              <div className="text-5xl font-black md:text-6xl" style={{ color: "#EC1C24" }}>
                78%
              </div>
            </div>
            <div className="text-sm text-muted-foreground">vs</div>
            <div className="flex-1 text-right">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Gujarat Titans
              </div>
              <div className="text-5xl font-black md:text-6xl" style={{ color: "#4A78B8" }}>
                22%
              </div>
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted/40">
            <div className="h-full" style={{ width: "78%", background: "#EC1C24" }} />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="h-4 w-4" />
            <div className="text-xs font-bold uppercase tracking-wider">Confidence</div>
          </div>
          <div className="mt-3 text-4xl font-black">87%</div>
          <div className="text-xs text-muted-foreground">
            Model confidence based on 12,400 simulations
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs">
            <Shield className="h-4 w-4 text-primary" />
            <span>Calibrated against 8 seasons of historical data.</span>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <ChartHeader title="Probability Trend" sub="Over-by-over evolution" />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={winProbTrend}>
            <defs>
              <linearGradient id="rcbprob" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EC1C24" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#EC1C24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={chartGrid} />
            <XAxis dataKey="over" stroke={chartAxis} fontSize={11} />
            <YAxis stroke={chartAxis} fontSize={11} domain={[0, 100]} />
            <Tooltip contentStyle={chartTooltip} />
            <Area
              type="monotone"
              dataKey="RCB"
              stroke="#EC1C24"
              fill="url(#rcbprob)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="GT"
              stroke="#1B3A6F"
              fill="#1B3A6F"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "If RCB posts 200+", prob: 84, sub: "Chinnaswamy chasing record" },
          { title: "If Siraj takes 3 wickets", prob: 92, sub: "Death overs scenario" },
          { title: "If GT loses opener in PP", prob: 81, sub: "First 6 overs" },
        ].map((s) => (
          <GlassCard key={s.title}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Simulation
            </div>
            <div className="mt-1 text-sm font-semibold">{s.title}</div>
            <div className="mt-3 text-3xl font-black text-primary">{s.prob}%</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}
