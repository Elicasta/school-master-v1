"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, Brain, Swords, Landmark, Library, ArrowRight } from "lucide-react";
import { LANE_LIST } from "@/data/lanes";
import { getMemoryCards, getReviewEvents, getScores, getTranscripts } from "@/lib/local-store";
import { sortByDue } from "@/lib/spaced-repetition";
import { UserScores, MemoryCard } from "@/types";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function DashboardClient() {
  const [scores, setScores] = useState<UserScores | null>(null);
  const [dueCards, setDueCards] = useState<MemoryCard[]>([]);
  const [activity, setActivity] = useState({ totalReviews: 0, weekAccuracy: 0, debateSessions: 0, weakMisses: 0 });

  useEffect(() => {
    setScores(getScores());
    const cards = getMemoryCards();
    setDueCards(sortByDue(cards).filter((c) => new Date(c.nextReview).getTime() <= Date.now()));
    const events = getReviewEvents();
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weekEvents = events.filter((e) => new Date(e.createdAt).getTime() >= weekAgo && typeof e.correct === "boolean");
    const correctThisWeek = weekEvents.filter((e) => e.correct).length;
    setActivity({
      totalReviews: events.length,
      weekAccuracy: weekEvents.length ? Math.round((correctThisWeek / weekEvents.length) * 100) : 0,
      debateSessions: getTranscripts().length,
      weakMisses: events.filter((e) => e.correct === false).length,
    });
  }, []);

  if (!scores) return <div className="p-6 md:p-10 text-ink-faint">Loading...</div>;

  const weakLanes = LANE_LIST
    .map((l) => ({ slug: l.slug, title: l.title, mastery: scores.laneMastery[l.slug] ?? 0 }))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);

  const nextAction = dueCards.length > 0
    ? { label: `Review ${dueCards.length} due memory card${dueCards.length === 1 ? "" : "s"}`, href: "/memory" }
    : weakLanes[0]?.mastery < 50
      ? { label: `Drill ${weakLanes[0].title}`, href: `/drill?lane=${weakLanes[0].slug}` }
      : { label: "Enter Debate Mode", href: "/debate" };

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="eyebrow mb-2">Today</p>
        <h1 className="font-display text-3xl md:text-4xl">Welcome back.</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Overall mastery" value={`${scores.masteryOverall}%`} />
        <StatCard label="Week accuracy" value={`${activity.weekAccuracy}%`} sub={`${activity.totalReviews} reviews logged`} />
        <StatCard label="Debate sessions" value={`${activity.debateSessions}`} sub={`${scores.debateWins}W - ${scores.debateLosses}L`} />
        <StatCard label="Due for review" value={`${dueCards.length}`} sub="cards" />
      </div>

      <div className="paper-card p-5 md:p-6 mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Next recommended action</p>
          <p className="font-display text-lg">{nextAction.label}</p>
        </div>
        <Link href={nextAction.href} className="btn-primary shrink-0">
          Go <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="paper-card p-5 md:p-6">
          <p className="eyebrow mb-3">Weak areas</p>
          <div className="space-y-3">
            {weakLanes.map((l) => (
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

        <div className="paper-card p-5 md:p-6">
          <p className="eyebrow mb-3">Current doctrine lane</p>
          <p className="font-display text-lg mb-1">{LANE_LIST[0].title}</p>
          <p className="text-sm text-ink-soft mb-4">{LANE_LIST[0].summary.slice(0, 110)}...</p>
          <Link href={`/lanes/${LANE_LIST[0].slug}`} className="text-sm text-slate underline underline-offset-4">
            Open lane
          </Link>
        </div>
      </div>

      <p className="eyebrow mb-3">Quick actions</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickAction href="/drill" icon={Zap} label="Drill" />
        <QuickAction href="/memory" icon={Brain} label="Memory" />
        <QuickAction href="/debate" icon={Swords} label="Debate" />
        <QuickAction href="/mind-palace" icon={Landmark} label="Mind Palace" />
      </div>
    </div>
  );
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

function QuickAction({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link href={href} className="paper-card p-5 flex flex-col items-center gap-2 text-center hover:bg-paper-dim transition-colors">
      <Icon size={20} strokeWidth={1.75} className="text-slate" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
