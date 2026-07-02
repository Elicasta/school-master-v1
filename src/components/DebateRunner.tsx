"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { DebateNode, DebateOpponent, DebateTopic } from "@/types";
import { getScores, saveScores, logReviewEvent } from "@/lib/local-store";
import { applyDebateResult } from "@/lib/scoring";

export function DebateRunner({ opponent }: { opponent: DebateOpponent }) {
  const [topic, setTopic] = useState<DebateTopic | null>(null);
  const [node, setNode] = useState<DebateNode | null>(null);
  const [chosenKey, setChosenKey] = useState<string | null>(null);
  const [rubric, setRubric] = useState<string | null>(null);
  const [finished, setFinished] = useState<"won" | "lost" | null>(null);

  function startTopic(t: DebateTopic) {
    setTopic(t);
    setNode(t.tree);
    setChosenKey(null);
    setRubric(null);
    setFinished(null);
  }

  function choose(choiceKey: string) {
    if (!node || !topic) return;
    const choice = node.choices.find((c) => c.key === choiceKey)!;
    setChosenKey(choiceKey);
    setRubric(choice.rubricNote);

    logReviewEvent({
      id: `${node.id}-${Date.now()}`,
      kind: "debate",
      refId: node.id,
      laneSlug: null,
      correct: choice.correct,
      createdAt: new Date().toISOString(),
    });

    if (choice.correct && choice.next) {
      // continue to pushback after a short beat, handled by "Continue" button below
      return;
    }
    if (choice.correct && !choice.next) {
      const scores = getScores();
      saveScores(applyDebateResult(scores, true));
      setFinished("won");
    }
    if (!choice.correct) {
      const scores = getScores();
      saveScores(applyDebateResult(scores, false));
      setFinished("lost");
    }
  }

  function continueToNext() {
    if (!node || !chosenKey) return;
    const choice = node.choices.find((c) => c.key === chosenKey)!;
    if (choice.next) {
      setNode(choice.next);
      setChosenKey(null);
      setRubric(null);
    }
  }

  function retry() {
    if (!topic) return;
    startTopic(topic);
  }

  if (opponent.topics.length === 0) {
    return (
      <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
        <BackLink />
        <h1 className="font-display text-3xl mb-3">{opponent.label}</h1>
        <p className="text-ink-soft">
          This opponent's argument trees ship in the next pass, the original spec never defined a
          topic list for it. Six opponents are fully built and ready now: Trinitarian, Murray,
          Jehovah's Witness, Mormon, Muslim, and Jewish Monotheist.
        </p>
        <Link href="/debate" className="btn-primary inline-flex mt-6">Pick a ready opponent</Link>
      </div>
    );
  }

  if (!topic || !node) {
    return (
      <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
        <BackLink />
        <p className="eyebrow mb-2">Debate Mode &middot; Offline</p>
        <h1 className="font-display text-3xl mb-2">{opponent.label}</h1>
        <p className="text-ink-soft mb-8">{opponent.description}</p>
        <div className="grid gap-2">
          {opponent.topics.map((t) => (
            <button key={t.slug} onClick={() => startTopic(t)} className="paper-card p-4 text-left hover:bg-paper-dim transition-colors">
              <p className="font-display text-base">{t.title}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <button onClick={() => setTopic(null)} className="inline-flex items-center gap-1.5 text-sm text-ink-faint mb-6 hover:text-ink">
        <ArrowLeft size={14} /> {opponent.label} topics
      </button>

      <p className="eyebrow mb-1">{topic.title}</p>
      <div className="paper-card p-6 mb-5">
        <p className="text-xs font-mono text-rose uppercase mb-2">{opponent.label} says</p>
        <p className="font-display text-lg leading-snug mb-2">{node.statement}</p>
        {node.verseRefs && <p className="text-xs text-ink-faint font-mono">{node.verseRefs.join(", ")}</p>}
      </div>

      {!chosenKey ? (
        <div className="grid gap-2">
          {node.choices.map((c) => (
            <button
              key={c.key}
              onClick={() => choose(c.key)}
              className="text-left text-sm px-4 py-3 rounded-xl border border-line bg-surface hover:bg-paper-dim transition-colors"
            >
              <span className="font-mono text-xs text-ink-faint mr-2">{c.key}</span>
              {c.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`paper-card p-4 ${node.choices.find((c) => c.key === chosenKey)?.correct ? "bg-slate-dim" : "bg-rose-dim"}`}>
            <p className="text-xs font-mono uppercase mb-1">{node.choices.find((c) => c.key === chosenKey)?.correct ? "Solid answer" : "Weak answer"}</p>
            <p className="text-sm">{rubric}</p>
          </div>

          {node.choices.find((c) => c.key === chosenKey)?.next && (
            <button onClick={continueToNext} className="btn-primary w-full">Hear the pushback</button>
          )}

          {finished && (
            <div className="paper-card p-5 text-center">
              <p className="font-display text-xl mb-2">{finished === "won" ? "You held the line." : "That branch lost ground."}</p>
              <div className="flex gap-2 justify-center mt-3">
                <button onClick={retry} className="btn-secondary">Retry topic</button>
                <button onClick={() => setTopic(null)} className="btn-primary">Next topic</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 paper-card p-4 flex items-center gap-3 opacity-70">
        <Sparkles size={16} className="text-gold shrink-0" />
        <p className="text-xs text-ink-faint">Want the opponent to improvise instead of following the tree? Try AI Debate Mode with Gemini, coming from the dashboard once your API key is configured.</p>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/debate" className="inline-flex items-center gap-1.5 text-sm text-ink-faint mb-6 hover:text-ink">
      <ArrowLeft size={14} /> All opponents
    </Link>
  );
}
