import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Trophy, Zap, Target, Sparkles } from "lucide-react";
import { GlassCard, PageShell } from "@/components/page-shell";
import { ChartHeader, chartTooltip } from "@/components/chart-helpers";
import {
  liveMatch,
  momentumData,
  runRateData,
  winProbTrend,
  aiInsights,
  ballByBall,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CricInsight AI — Cricket Analytics Dashboard" },
      {
        name: "description",
        content: "Real-time cricket analytics, win probability, momentum and AI-powered insights.",
      },
      { property: "og:title", content: "CricInsight AI" },
      { property: "og:description", content: "Intelligent cricket analytics platform." },
    ],
  }),
  component: Index,
});

const RCB = "#EC1C24";
const GT = "#1B3A6F";

const kpis = [
  {
    label: "Final Score",
    value: `${liveMatch.teamA.score}/${liveMatch.teamA.wickets}`,
    sub: `${liveMatch.teamA.overs} overs`,
    icon: Activity,
    color: "text-primary",
  },
  {
    label: "Win Probability",
    value: `${liveMatch.winProb.a}%`,
    sub: "RCB victory",
    icon: TrendingUp,
    color: "text-secondary",
  },
  {
    label: "Momentum Index",
    value: `+${liveMatch.momentum}`,
    sub: "In favour of RCB",
    icon: Zap,
    color: "text-accent",
  },
  {
    label: "Top Performer",
    value: "V. Kohli",
    sub: "78 (46) · SR 169.5",
    icon: Trophy,
    color: "text-primary",
  },
  {
    label: "Projected Score",
    value: `${liveMatch.projected}`,
    sub: "Final Score",
    icon: Target,
    color: "text-accent",
  },
];

const turningPoints = [
  { over: "—", text: "Virat Kohli 78 (46)", impact: "+18" },
  { over: "—", text: "Rajat Patidar 52 (28)", impact: "+12" },
  { over: "17.3", text: "Rashid Khan wicket", impact: "+22" },
  { over: "19.x", text: "Siraj crucial death over", impact: "+15" },
];

function Index() {
  return (
    <PageShell
      title="RCB vs GT · Match Command Center"
    >
      {/* Match hero */}
      <GlassCard className="overflow-hidden">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent">
            IPL 2026
          </span>
          <span className="text-xs text-muted-foreground">{liveMatch.venue}</span>
        </div>
        <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-lg"
              style={{ background: RCB }}
            >
              RCB
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                2nd Innings
              </div>
              <div className="text-2xl font-bold">{liveMatch.teamA.name}</div>
              <div className="text-3xl font-black" style={{ color: RCB }}>
                {liveMatch.teamA.score}
                <span className="text-lg text-muted-foreground">/{liveMatch.teamA.wickets}</span>
                <span className="ml-2 text-base font-medium text-muted-foreground">
                  ({liveMatch.teamA.overs})
                </span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {liveMatch.status}
            </div>
            <div className="my-2 text-sm font-bold text-accent">{liveMatch.result}</div>
            <div className="text-xs text-muted-foreground">Tata IPL 2026 · Match 47</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                1st Innings
              </div>
              <div className="text-2xl font-bold">{liveMatch.teamB.name}</div>
              <div className="text-3xl font-black" style={{ color: "#4A78B8" }}>
                {liveMatch.teamB.score}
                <span className="text-lg text-muted-foreground">/{liveMatch.teamB.wickets}</span>
                <span className="ml-2 text-base font-medium text-muted-foreground">
                  ({liveMatch.teamB.overs})
                </span>
              </div>
            </div>
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-lg"
              style={{ background: GT }}
            >
              GT
            </div>
          </div>
        </div>

        {/* Win prob bar */}
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs font-medium">
            <span style={{ color: RCB }}>RCB {liveMatch.winProb.a}%</span>
            <span style={{ color: "#4A78B8" }}>GT {liveMatch.winProb.b}%</span>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full bg-muted/40">
            <div
              className="h-full transition-all"
              style={{ width: `${liveMatch.winProb.a}%`, background: RCB }}
            />
            <div
              className="h-full transition-all"
              style={{ width: `${liveMatch.winProb.b}%`, background: GT }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Match Summary */}
      <GlassCard>
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-accent/15 p-2 text-accent">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-accent">
              Match Summary
            </div>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{liveMatch.summary}</p>
          </div>
        </div>
      </GlassCard>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {k.label}
                </span>
                <k.icon className={`h-4 w-4 ${k.color}`} />
              </div>
              <div className="mt-3 text-2xl font-bold">{k.value}</div>
              <div className="text-xs text-muted-foreground">{k.sub}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <ChartHeader title="Run Rate Progression" sub="RCB innings · runs per over" />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={runRateData}>
              <defs>
                <linearGradient id="rr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={RCB} stopOpacity={0.7} />
                  <stop offset="100%" stopColor={RCB} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
              <XAxis dataKey="over" stroke="oklch(0.7 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.7 0.02 160)" fontSize={11} />
              <Tooltip contentStyle={chartTooltip} />
              <Area type="monotone" dataKey="runs" stroke={RCB} fill="url(#rr)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <ChartHeader title="Win Probability" sub="RCB vs GT — over by over" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={winProbTrend}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
              <XAxis dataKey="over" stroke="oklch(0.7 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.7 0.02 160)" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={chartTooltip} />
              <Line type="monotone" dataKey="RCB" stroke={RCB} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="GT" stroke="#4A78B8" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <ChartHeader
            title="Momentum Swing"
            sub="Positive favours RCB · key turning points highlighted"
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={momentumData}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
              <XAxis dataKey="over" stroke="oklch(0.7 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.7 0.02 160)" fontSize={11} />
              <Tooltip contentStyle={chartTooltip} />
              <Bar dataKey="momentum" radius={[6, 6, 0, 0]}>
                {momentumData.map((d, i) => (
                  <Cell key={i} fill={d.momentum >= 0 ? RCB : "#4A78B8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Top Performer */}
        <GlassCard>
          <ChartHeader title="Top Performer" sub="Player of the Match" />
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg"
              style={{ background: RCB }}
            >
              VK
            </div>
            <div>
              <div className="text-lg font-bold">Virat Kohli</div>
              <div className="text-2xl font-black" style={{ color: RCB }}>
                78 <span className="text-base text-muted-foreground">(46)</span>
              </div>
              <div className="text-xs text-muted-foreground">Strike Rate · 169.5</div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Player Impact Score
            </div>
            <div className="text-3xl font-black text-accent">
              9.4<span className="text-base text-muted-foreground">/10</span>
            </div>
          </div>
        </GlassCard>

        {/* Turning Points */}
        <GlassCard className="lg:col-span-2">
          <ChartHeader title="Key Turning Points" sub="Moments that swung the match" />
          <div className="grid gap-2 md:grid-cols-2">
            {turningPoints.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-border/40 bg-background/30 p-3"
              >
                <div>
                  <div className="text-sm font-semibold">{t.text}</div>
                  <div className="text-xs text-muted-foreground">Over {t.over}</div>
                </div>
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
                  {t.impact}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* AI Insights */}
      <GlassCard>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <div className="text-sm font-bold">AI Insights</div>
          <span className="text-xs text-muted-foreground">· generated from this match</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {aiInsights.slice(0, 4).map((ins) => (
            <div
              key={ins.title}
              className="rounded-xl border border-border/40 bg-background/30 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{ins.title}</div>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {ins.tag}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{ins.body}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Recent ball-by-ball */}
      <GlassCard>
        <ChartHeader title="Ball-by-Ball Highlights" sub="Major events in chronological order" />
        <div className="space-y-2">
          {ballByBall.map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border/30 bg-background/20 px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-muted-foreground">{b.over}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    b.event === "SIX" || b.event === "FOUR"
                      ? "bg-accent/20 text-accent"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {b.event}
                </span>
                <span>{b.text}</span>
              </div>
              <span className={`font-bold ${b.impact >= 0 ? "text-accent" : "text-destructive"}`}>
                {b.impact > 0 ? "+" : ""}
                {b.impact}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}

import { Cell } from "recharts";
