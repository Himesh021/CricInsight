import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { GlassCard, PageShell } from "@/components/page-shell";
import { ChartHeader, chartAxis, chartGrid, chartTooltip } from "@/components/chart-helpers";
import { teamStats } from "@/lib/mock-data";

const TEAMS = ["RCB", "GT"] as const;

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Team Analytics · CricInsight AI" },
      { name: "description", content: "Compare teams across phases of the game." },
    ],
  }),
  component: TeamsPage,
});

const phases = ["powerplay", "middle", "death", "batting", "bowling", "home", "away"] as const;
const labels: Record<string, string> = {
  powerplay: "Powerplay",
  middle: "Middle Overs",
  death: "Death Overs",
  batting: "Batting",
  bowling: "Bowling",
  home: "Home",
  away: "Away",
};

function TeamsPage() {
  const radarData = phases.map((p) => ({
    stat: labels[p],
    RCB: teamStats.RCB[p],
    GT: teamStats.GT[p],
  }));
  return (
    <PageShell title="Team Analytics" subtitle="Phase-by-phase comparison of team strengths.">
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <ChartHeader title="Team Strength Radar" sub="RCB vs GT" />
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={chartGrid} />
              <PolarAngleAxis dataKey="stat" stroke={chartAxis} fontSize={11} />
              <Radar name="RCB" dataKey="RCB" stroke="#EC1C24" fill="#EC1C24" fillOpacity={0.4} />
              <Radar name="GT" dataKey="GT" stroke="#1B3A6F" fill="#1B3A6F" fillOpacity={0.4} />
              <Tooltip contentStyle={chartTooltip} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <ChartHeader title="Phase Comparison" />
          <div className="space-y-4">
            {phases.map((p) => (
              <div key={p}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{labels[p]}</span>
                  <span className="text-muted-foreground">
                    RCB {teamStats.RCB[p]} · GT {teamStats.GT[p]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="h-3 flex-1 overflow-hidden rounded-l-full bg-muted/40">
                    <div
                      className="h-full"
                      style={{ width: `${teamStats.RCB[p]}%`, background: "#EC1C24" }}
                    />
                  </div>
                  <div className="h-3 flex-1 overflow-hidden rounded-r-full bg-muted/40">
                    <div
                      className="h-full"
                      style={{ width: `${teamStats.GT[p]}%`, background: "#1B3A6F" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <ChartHeader
          title="Match-Phase Heatmap"
          sub="Performance index by phase (darker = stronger)"
        />
        <div className="grid grid-cols-8 gap-2 text-xs">
          <div />
          {phases.map((p) => (
            <div key={p} className="text-center text-muted-foreground">
              {labels[p].slice(0, 6)}
            </div>
          ))}
          {TEAMS.map((team) => (
            <Fragment key={team}>
              <div className="font-bold">{team}</div>
              {phases.map((p) => {
                const v = teamStats[team][p];
                return (
                  <div
                    key={`${team}-${p}`}
                    className="aspect-square rounded-md flex items-center justify-center font-bold text-[10px]"
                    style={{
                      background: `oklch(0.78 0.18 145 / ${v / 100})`,
                      color: v > 70 ? "oklch(0.15 0.04 160)" : "oklch(0.97 0.01 150)",
                    }}
                  >
                    {v}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
