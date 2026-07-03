"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Zap, Brain, Swords, Landmark, Library, ArrowRight, Target, AlertTriangle, Clock } from "lucide-react";
import { LANE_LIST } from "@/data/lanes";
import { getMemoryCards, getReviewEvents, getScores, getTranscripts } from "@/lib/local-store";
import { sortByDue } from "@/lib/spaced-repetition";
import { buildAdaptiveProfile } from "@/lib/adaptive-engine";
import { UserScores, MemoryCard, ReviewEvent } from "@/types";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function DashboardClient() {
  const [scores, setScores] = useState<UserScores | null>(null);
  const [dueCards, setDueCards] = useState<MemoryCard[]>([]);
  const [events, setEvents] = useState<ReviewEvent[]>([]);
  const [debateSessions, setDebateSessions] = useState(0);

  useEffect(() => {
    const s = getScores();
    const cards = getMemoryCards();
    const ev = getReviewEvents();
    setScores(s);
    setDueCards(sortByDue(cards).filter((c) => new Date(c.nextReview).getTime() <= Date.now()));
    setEvents(ev);
    setDebateSessions(getTranscripts().length);
  }, []);

  const profile = useMemo(() => scores ? buildAdaptiveProfile(scores, events, getMemoryCards()) : null, [scores, events]);

  if (!scores || !profile) return <div className="p-6 md:p-10 text-ink-faint">Loading...</div>;

  const nextAction = dueCards.length > 0
    ? { label: `Review ${dueCards.length} due card${dueCards.length === 1 ? "" : "s"}`, href: "/memory", detail: "Memory comes first because weak reps compound if ignored." }
    : profile.recommendedLane
      ? { label: `${modeLabel(profile.recommendedMode)} · ${profile.recommendedLane.title}`, href: `/coach`, detail: "The coach picked this from weak lanes, misses, and slow answers." }
      : { label: "Enter Debate Mode", href: "/debate", detail: "Start a sparring session to create signal." };

  const slowEvents = events.filter((e: any) => Number(e.responseMs ?? 0) >= 14000).length;
  const misses = events.filter((e) => e.correct === false).length;

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="eyebrow mb-2">Today</p>
        <h1 className="font-display text-3xl md:text-4xl">Training command center.</h1>
        <p className="text-sm text-ink-soft mt-2 max-w-2xl">The app now tracks facts, hesitation, confidence, debate reps, and weak cards as one training loop.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Overall mastery" value={`${scores.masteryOverall}%`} />
        <StatCard label="Week accuracy" value={`${profile.weekAccuracy}%`} sub={`${events.length} total events`} />
        <StatCard label="Hesitation flags" value={`${slowEvents}`} sub="slow answers" />
        <StatCard label="Due review" value={`${dueCards.length}`} sub="cards" />
      </div>

      <div className="paper-card p-5 md:p-6 mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="eyebrow mb-1">Next best rep</p>
          <p className="font-display text-xl mb-1">{nextAction.label}</p>
          <p className="text-sm text-ink-faint">{nextAction.detail}</p>
        </div>
        <Link href={nextAction.href} className="btn-primary shrink-0">
          Start <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-4 mb-8">
        <div className="paper-card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={17} className="text-gold" />
            <p className="font-display text-lg">Adaptive profile</p>
          </div>
          <p className="text-sm text-ink-soft mb-5">{profile.summary}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="eyebrow mb-3">Weak lanes</p>
              <div className="space-y-3">
                {profile.weakestLanes.slice(0, 4).map((l) => (
                  <div key={l.slug}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{l.title}</span>
                      <span className="text-ink-faint font-mono text-xs">{l.mastery}%</span>
                    </div>
                    <ProgressBar value={l.mastery} tone="rose" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3">Strongest lanes</p>
              <div className="space-y-3">
                {profile.strongestLanes.map((l) => (
                  <div key={l.slug}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{l.title}</span>
                      <span className="text-ink-faint font-mono text-xs">{l.mastery}%</span>
                    </div>
                    <ProgressBar value={l.mastery} tone="slate" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="paper-card p-5 md:p-6">
          <p className="eyebrow mb-3">Signals</p>
          <Signal icon={AlertTriangle} label="Misses to convert" value={String(misses)} />
          <Signal icon={Clock} label="Slow-answer flags" value={String(slowEvents)} />
          <Signal icon={Swords} label="Debate sessions" value={String(debateSessions)} />
          <div className="mt-4 rounded-xl bg-gold-dim/40 border border-gold-soft p-3">
            <p className="text-sm text-ink">Rule: every miss becomes a future rep. Every slow answer becomes a recovery card.</p>
          </div>
        </div>
      </div>

      <p className="eyebrow mb-3">Quick actions</p>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <QuickAction href="/coach" icon={Target} label="Coach" />
        <QuickAction href="/drill" icon={Zap} label="Drill" />
        <QuickAction href="/memory" icon={Brain} label="Memory" />
        <QuickAction href="/debate" icon={Swords} label="Debate" />
        <QuickAction href="/mind-palace" icon={Landmark} label="Mind Palace" />
        <QuickAction href="/facts" icon={Library} label="Facts" />
      </div>
    </div>
  );
}

function modeLabel(mode: string) {
  return mode === "answer-20" ? "20 sec answer" : mode === "one-verse" ? "One verse only" : mode === "cross-exam" ? "Cross-exam" : mode === "trap" ? "Trap drill" : mode === "rewrite" ? "Rewrite" : "Mixed pressure";
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="paper-card p-4">
      <p className="eyebrow mb-1">{label}</p>
      <p className="font-display text-2xl">{value}</p>
      {sub && <p className="text-xs text-ink-faint mt-0.5">{sub}</p>}
    </div>
  );
}

function Signal({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-line last:border-0">
      <div className="flex items-center gap-2 text-sm text-ink-soft"><Icon size={15} className="text-ink-faint" /> {label}</div>
      <span className="font-mono text-sm">{value}</span>
    </div>
  );
}

function QuickAction({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link href={href} className="paper-card p-5 flex flex-col items-center gap-2 text-center hover:bg-paper-dim transition-colors">
      <Icon size={20} strokeWidth={1.75} className="text-slate" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
