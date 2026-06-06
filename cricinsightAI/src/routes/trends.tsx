import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { GlassCard, PageShell } from "@/components/page-shell";
import { ChartHeader, chartAxis, chartGrid, chartTooltip } from "@/components/chart-helpers";
import { formData, venues } from "@/lib/mock-data";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Historical Trends · CricInsight AI" },
      { name: "description", content: "Form, venue and opponent trends." },
    ],
  }),
  component: TrendsPage,
});

function TrendsPage() {
  return (
    <PageShell
      title="Historical Trends"
      subtitle="Form curves, venue records and opponent patterns."
    >
      <GlassCard>
        <ChartHeader title="Player Form — Last 10 Matches" />
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={formData}>
            <CartesianGrid stroke={chartGrid} />
            <XAxis dataKey="match" stroke={chartAxis} fontSize={11} />
            <YAxis stroke={chartAxis} fontSize={11} />
            <Tooltip contentStyle={chartTooltip} />
            <Line type="monotone" dataKey="Kohli" stroke="#EC1C24" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="Gill" stroke="#1B3A6F" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {venues.map((v) => {
          const up = v.winPct >= 60;
          return (
            <GlassCard key={v.name}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {v.name}
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black text-primary">{v.winPct}%</div>
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                </div>
                {up ? (
                  <TrendingUp className="h-5 w-5 text-primary" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-card/40 p-2 text-center">
                  <div className="text-muted-foreground">Matches</div>
                  <div className="font-bold">{v.matches}</div>
                </div>
                <div className="rounded-lg bg-card/40 p-2 text-center">
                  <div className="text-muted-foreground">Avg Score</div>
                  <div className="font-bold">{v.avgScore}</div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageShell>
  );
}
