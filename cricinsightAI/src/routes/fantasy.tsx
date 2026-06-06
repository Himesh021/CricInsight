import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crown, Star, Zap, Target, Sparkles } from "lucide-react";
import { GlassCard, PageShell } from "@/components/page-shell";
import { fantasyPicks } from "@/lib/mock-data";

export const Route = createFileRoute("/fantasy")({
  head: () => ({
    meta: [
      { title: "Fantasy Assistant · CricInsight AI" },
      { name: "description", content: "AI fantasy cricket picks and recommendations." },
    ],
  }),
  component: FantasyPage,
});

const sections = [
  { key: "captains" as const, title: "Captain Picks", icon: Crown, color: "text-accent" },
  { key: "viceCaptains" as const, title: "Vice-Captain Picks", icon: Star, color: "text-primary" },
  {
    key: "differentials" as const,
    title: "Differential Picks",
    icon: Zap,
    color: "text-secondary",
  },
  { key: "bowlers" as const, title: "Bowler Picks", icon: Target, color: "text-muted-foreground" },
];

const teamColor = (t: string) => (t === "RCB" ? "#EC1C24" : "#1B3A6F");

function FantasyPage() {
  return (
    <PageShell title="Fantasy Assistant" subtitle="AI-powered picks for RCB vs GT · IPL 2026.">
      <div className="grid gap-3 md:grid-cols-2">
        <GlassCard className="border-accent/30">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 text-accent" />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                AI Fantasy Insight
              </div>
              <p className="mt-1 text-sm text-foreground/90">
                Virat Kohli is the safest captaincy choice based on current form and Chinnaswamy
                venue record.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="border-primary/30">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                Bowler Edge
              </div>
              <p className="mt-1 text-sm text-foreground/90">
                Rashid Khan offers the highest wicket-taking upside among bowlers in the middle
                overs.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6">
        {sections.map((s) => (
          <div key={s.key}>
            <div className="mb-3 flex items-center gap-2">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <h2 className="text-lg font-bold">{s.title}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {fantasyPicks[s.key].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <GlassCard className="transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(236,28,36,0.35)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg"
                          style={{ backgroundColor: teamColor(p.team) }}
                        >
                          {p.name
                            .split(" ")
                            .map((x) => x[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="text-sm font-bold">{p.name}</div>
                          <div className="text-xs text-muted-foreground">
                            <span style={{ color: teamColor(p.team) }} className="font-semibold">
                              {p.team}
                            </span>{" "}
                            · {p.role}
                          </div>
                          {p.badge && (
                            <div className="mt-1 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                              {p.badge}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-primary">{p.pts}</div>
                        <div className="text-[10px] uppercase text-muted-foreground">Pred. Pts</div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <StatCell label="Risk" value={`${p.risk}%`} />
                      <StatCell label="Form" value={p.form.toFixed(1)} />
                      <StatCell label="Owned" value={`${p.owned}%`} />
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card/40 p-2">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  );
}
