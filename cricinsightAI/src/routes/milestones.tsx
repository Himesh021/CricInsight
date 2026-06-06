import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Target, Flame, Shield, Users } from "lucide-react";
import { GlassCard, PageShell } from "@/components/page-shell";
import { milestones } from "@/lib/mock-data";

export const Route = createFileRoute("/milestones")({
  head: () => ({
    meta: [
      { title: "Milestone Tracker · CricInsight AI" },
      { name: "description", content: "Live milestone, century and record alerts." },
    ],
  }),
  component: MilestonesPage,
});

const iconFor = (t: string) => {
  if (t === "Wicket Milestone") return Flame;
  if (t === "Record") return Trophy;
  if (t === "Team Record") return Shield;
  if (t === "Century Watch") return Target;
  return Users;
};

const teamColor = (t?: string) =>
  t === "RCB" ? "#EC1C24" : t === "GT" ? "#1B3A6F" : "oklch(0.7 0.02 160)";

function MilestonesPage() {
  return (
    <PageShell
      title="Milestone Tracker"
      subtitle="Live alerts for centuries, fifties, hat-tricks and record-breaking moments."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((m, i) => {
          const Icon = iconFor(m.type);
          return (
            <motion.div
              key={m.player}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <GlassCard className="h-full transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(255,255,255,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    {m.type}
                  </span>
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-black text-white"
                    style={{ backgroundColor: teamColor(m.team) }}
                  >
                    {m.team}
                  </div>
                  <div className="text-lg font-bold">{m.player}</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Needs <span className="font-semibold text-foreground">{m.needs}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">to reach {m.target}</div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-bold text-primary">{m.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted/40">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: teamColor(m.team) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </PageShell>
  );
}
