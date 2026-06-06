import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard, PageShell } from "@/components/page-shell";
import { ChartHeader, chartAxis, chartGrid, chartTooltip } from "@/components/chart-helpers";
import { formData, players } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/players")({
  head: () => ({
    meta: [
      { title: "Player Comparison · CricInsight AI" },
      { name: "description", content: "Compare players head-to-head across batting metrics." },
    ],
  }),
  component: PlayersPage,
});

const teamColor = (t: string) => (t === "RCB" ? "#EC1C24" : "#1B3A6F");

function PlayersPage() {
  const [a, setA] = useState("kohli");
  const [b, setB] = useState("gill");
  const pA = players.find((p) => p.id === a)!;
  const pB = players.find((p) => p.id === b)!;

  const radarData = [
    { stat: "Batting Avg", A: pA.avg, B: pB.avg },
    { stat: "Strike Rate", A: pA.sr, B: pB.sr },
    { stat: "Consistency", A: pA.consistency, B: pB.consistency },
    { stat: "Boundary %", A: pA.boundaryPct, B: pB.boundaryPct },
    { stat: "Powerplay", A: pA.powerplay, B: pB.powerplay },
    { stat: "Chase", A: pA.chase, B: pB.chase },
  ];
  const barData = [
    { label: "Average", A: pA.avg, B: pB.avg },
    { label: "SR", A: pA.sr, B: pB.sr },
    { label: "100s", A: pA.hundreds, B: pB.hundreds },
    { label: "50s", A: pA.fifties ?? 0, B: pB.fifties ?? 0 },
  ];
  const colorA = teamColor(pA.team);
  const colorB = teamColor(pB.team);
  const advantage = pA.consistency >= pB.consistency ? pA.name : pB.name;

  return (
    <PageShell title="Player Comparison" subtitle="Head-to-head IPL analytics · RCB vs GT.">
      <GlassCard>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { p: pA, set: setA, val: a, label: "Player A", isPrimary: true },
            { p: pB, set: setB, val: b, label: "Player B", isPrimary: false },
          ].map((cfg) => (
            <motion.div
              key={cfg.label}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-border/40 bg-background/30 p-4 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(255,255,255,0.12)]"
            >
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {cfg.label}
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg"
                  style={{ backgroundColor: teamColor(cfg.p.team) }}
                >
                  {cfg.p.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <Select value={cfg.val} onValueChange={cfg.set}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {players.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} ({p.team})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="font-semibold" style={{ color: teamColor(cfg.p.team) }}>
                      {cfg.p.team}
                    </span>{" "}
                    · {cfg.p.role}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                <Stat label="Runs" value={cfg.p.runs.toLocaleString()} />
                <Stat label="Avg" value={cfg.p.avg.toString()} />
                <Stat label="SR" value={cfg.p.sr.toString()} />
                <Stat label="100s" value={cfg.p.hundreds.toString()} />
                <Stat label="50s" value={(cfg.p.fifties ?? 0).toString()} />
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard className="border-accent/30">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 text-accent" />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                AI Insight
              </div>
              <p className="mt-1 text-sm text-foreground/90">
                Virat Kohli has a higher consistency score, while Shubman Gill has a better strike
                rate in the powerplay.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="border-primary/30">
          <div className="flex items-start gap-3">
            <Trophy className="mt-0.5 h-5 w-5 text-primary" />
            <div className="w-full">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                Head-to-Head
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Matches Compared</span>
                <span className="font-semibold">IPL Career</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Advantage</span>
                <span
                  className="font-bold"
                  style={{ color: teamColor(pA.consistency >= pB.consistency ? pA.team : pB.team) }}
                >
                  {advantage}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <ChartHeader title="Skills Radar" />
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={chartGrid} />
              <PolarAngleAxis dataKey="stat" stroke={chartAxis} fontSize={11} />
              <Radar name={pA.name} dataKey="A" stroke={colorA} fill={colorA} fillOpacity={0.4} />
              <Radar name={pB.name} dataKey="B" stroke={colorB} fill={colorB} fillOpacity={0.3} />
              <Tooltip contentStyle={chartTooltip} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <ChartHeader title="Stat Comparison" />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid stroke={chartGrid} />
              <XAxis dataKey="label" stroke={chartAxis} fontSize={11} />
              <YAxis stroke={chartAxis} fontSize={11} />
              <Tooltip contentStyle={chartTooltip} />
              <Bar dataKey="A" fill={colorA} radius={[6, 6, 0, 0]} />
              <Bar dataKey="B" fill={colorB} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <ChartHeader title="Form — Last 10 Matches" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={formData}>
              <CartesianGrid stroke={chartGrid} />
              <XAxis dataKey="match" stroke={chartAxis} fontSize={11} />
              <YAxis stroke={chartAxis} fontSize={11} />
              <Tooltip contentStyle={chartTooltip} />
              <Line
                type="monotone"
                dataKey="Kohli"
                stroke="#EC1C24"
                strokeWidth={2.5}
                dot={false}
              />
              <Line type="monotone" dataKey="Gill" stroke="#1B3A6F" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card/40 p-2">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  );
}
