import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlassCard, PageShell } from "@/components/page-shell";
import { aiInsights } from "@/lib/mock-data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "AI Insights · CricInsight AI" },
      { name: "description", content: "AI-generated cricket insights and analysis." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const [q, setQ] = useState("");
  return (
    <PageShell
      title="AI Insights"
      subtitle="Pattern recognition across players, venues and match-ups."
    >
      <GlassCard>
        <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3">
          <Bot className="h-5 w-5 text-primary" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask CricInsight AI… e.g. 'How does Siraj perform in death overs?'"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="rounded-lg bg-[image:var(--gradient-primary)] px-3 py-1.5 text-xs font-bold text-primary-foreground">
            Ask
          </button>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        {aiInsights.map((ins, i) => (
          <motion.div
            key={ins.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                  {ins.tag}
                </span>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-3 text-base font-bold">{ins.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ins.body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
