"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Brain, CheckCircle2, Download, Loader2, MonitorSmartphone, RefreshCw, Sparkles, Timer, Wifi, XCircle } from "lucide-react";
import { LANE_LIST } from "@/data/lanes";
import { addMemoryCard, getScores, logReviewEvent, saveScores } from "@/lib/local-store";
import { buildAdaptiveProfile, CoachMode, localAdaptiveFallback, memoryCardFromWeakness, buildWeaknessPayload } from "@/lib/adaptive-engine";
import { applyDrillResult, recordWeakVerse } from "@/lib/scoring";
import { DrillQuestion, LaneSlug } from "@/types";
import { MarkdownLite } from "@/components/MarkdownLite";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buildCoachGenerationPrompt, cleanAiError, parseJson } from "@/lib/ai-prompts";
import { createLocalSession, getModelAvailability, hasPromptAPI, isChrome } from "@/lib/browser-ai";

type CoachPayload = {
  prompt: string;
  choices?: string[];
  answer: string;
  verseId?: string;
  reference?: string;
  coaching?: string;
  idealAnswer?: string;
};

const MODES: { id: CoachMode; label: string; description: string }[] = [
  { id: "answer-20", label: "20 sec answer", description: "Stop freezing. Answer fast, then refine." },
  { id: "one-verse", label: "One verse only", description: "Precision. No verse dumping." },
  { id: "cross-exam", label: "Cross-exam", description: "Win by asking the clean question." },
  { id: "trap", label: "Trap drill", description: "Spot the hidden assumption." },
  { id: "rewrite", label: "Rewrite answer", description: "Compress raw wording into debate cadence." },
  { id: "mixed", label: "Mixed pressure", description: "The coach picks the angle." },
];

export function CoachClient() {
  const [laneSlug, setLaneSlug] = useState<LaneSlug>(LANE_LIST[0].slug);
  const [mode, setMode] = useState<CoachMode>("mixed");
  const [question, setQuestion] = useState<DrillQuestion | null>(null);
  const [aiData, setAiData] = useState<CoachPayload | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [freeAnswer, setFreeAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [profileTick, setProfileTick] = useState(0);
  const [aiSource, setAiSource] = useState<"online" | "local">("local");
  const [localStatus, setLocalStatus] = useState<"idle" | "checking" | "downloadable" | "downloading" | "ready" | "unsupported" | "unavailable">("idle");
  const [localProgress, setLocalProgress] = useState(0);
  const timer = useRef<number | null>(null);
  const localSession = useRef<LanguageModelSession | null>(null);

  const profile = useMemo(() => buildAdaptiveProfile(), [profileTick]);
  const lane = LANE_LIST.find((l) => l.slug === laneSlug) ?? LANE_LIST[0];
  const currentMode = mode === "mixed" ? profile.recommendedMode : mode;
  const isFreeMode = currentMode === "rewrite" || currentMode === "cross-exam" || currentMode === "answer-20";


  async function ensureLocalSession() {
    if (localSession.current) return localSession.current;
    if (!isChrome() || !hasPromptAPI()) {
      setLocalStatus("unsupported");
      throw new Error("Local AI needs Chrome with the built-in Prompt API enabled.");
    }
    setLocalStatus("checking");
    const availability = await getModelAvailability();
    if (availability === "unavailable") {
      setLocalStatus("unavailable");
      throw new Error("Local AI is unavailable on this device.");
    }
    if (availability === "downloadable" || availability === "downloading") setLocalStatus("downloading");
    const session = await createLocalSession(
      "You are the local adaptive debate coach for School Master. Return valid JSON only. Match the Online Gemini feature set exactly, just without network calls.",
      setLocalProgress,
    );
    localSession.current = session;
    setLocalStatus("ready");
    return session;
  }

  useEffect(() => {
    if (aiSource !== "local") return;
    (async () => {
      if (!isChrome() || !hasPromptAPI()) { setLocalStatus("unsupported"); return; }
      setLocalStatus("checking");
      const availability = await getModelAvailability();
      if (availability === "available") setLocalStatus("ready");
      else if (availability === "downloadable") setLocalStatus("downloadable");
      else if (availability === "downloading") setLocalStatus("downloading");
      else setLocalStatus("unavailable");
    })();
  }, [aiSource]);

  useEffect(() => {
    setMode(profile.recommendedMode);
    if (profile.recommendedLane) setLaneSlug(profile.recommendedLane.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!question || revealed) return;
    timer.current = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 250);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [question?.id, revealed, startedAt]);

  async function generate() {
    setLoading(true);
    setError(null);
    setSelected(null);
    setFreeAnswer("");
    setRevealed(false);
    setElapsed(0);
    setStartedAt(Date.now());

    try {
      let data: CoachPayload & { id?: string };
      if (aiSource === "local") {
        const session = await ensureLocalSession();
        const raw = await session.prompt(buildCoachGenerationPrompt({ laneSlug, mode: currentMode, profile: buildWeaknessPayload() }));
        const parsed = parseJson(raw);
        if (!parsed?.prompt || !parsed?.answer) throw new Error("Local AI returned an invalid coach drill.");
        data = parsed;
      } else {
        const res = await fetch("/api/coach/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ laneSlug, mode: currentMode, profile: buildWeaknessPayload() }),
        });
        const payload = await res.json();
        if (!res.ok) throw new Error(payload.error ?? "Coach generation failed.");
        data = payload;
      }
      const q: DrillQuestion = {
        id: data.id ?? `coach-${currentMode}-${Date.now()}`,
        level: 4,
        type: currentMode === "cross-exam" ? "debate-response" : "answer-objection",
        prompt: data.prompt,
        choices: data.choices,
        answer: data.answer,
        verseId: data.verseId || undefined,
      };
      setAiData(data);
      setQuestion(q);
    } catch (err: any) {
      const fallback = localAdaptiveFallback(laneSlug, currentMode);
      setQuestion(fallback);
      setAiData({ prompt: fallback.prompt, choices: fallback.choices, answer: fallback.answer, verseId: fallback.verseId, coaching: cleanAiError(err?.message) });
      setError(`${aiSource === "local" ? "Local" : "Online"} AI was unavailable, so I loaded a built-in pressure drill.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laneSlug, mode, aiSource]);
  useEffect(() => {
    return () => localSession.current?.destroy();
  }, []);


  function grade(correct: boolean) {
    if (!question) return;
    const responseMs = Date.now() - startedAt;
    const scores = getScores();
    let nextScores = applyDrillResult(scores, laneSlug, correct, correct ? 100 : 0, null);
    if (!correct && question.verseId) nextScores = recordWeakVerse(nextScores, question.verseId);
    saveScores(nextScores);
    logReviewEvent({
      id: `${question.id}-${Date.now()}`,
      kind: "coach",
      refId: question.id,
      laneSlug,
      correct,
      responseMs,
      confidence,
      mode: currentMode,
      createdAt: new Date().toISOString(),
    });

    if (!correct || responseMs > 14000 || confidence <= 2) {
      addMemoryCard({
        ...memoryCardFromWeakness({
          laneSlug,
          id: question.id,
          prompt: question.prompt,
          answer: aiData?.idealAnswer || question.answer,
          reference: aiData?.reference,
          verseId: question.verseId,
          type: currentMode,
        }),
        source: "adaptive",
        cardKind: currentMode === "cross-exam" ? "cross-exam" : currentMode === "trap" ? "trap" : currentMode === "rewrite" ? "rewrite" : "objection",
        weaknessTag: `${currentMode}:${laneSlug}`,
      });
    }

    setRevealed(true);
    setProfileTick((n) => n + 1);
  }

  function submitFree() {
    const expected = (question?.answer ?? "").toLowerCase();
    const text = freeAnswer.toLowerCase();
    const correct = text.length > 40 && (expected.split(" ").filter((w) => w.length > 5 && text.includes(w)).length >= 2 || confidence >= 4);
    grade(correct);
  }

  const answerMatches = selected && question ? selected === question.answer : false;

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_360px] gap-5 items-start">
        <section>
          <p className="eyebrow mb-2">Adaptive Coach</p>
          <h1 className="font-display text-3xl md:text-4xl mb-2">Train the hesitation, not just the fact.</h1>
          <p className="text-sm text-ink-soft mb-5 max-w-2xl">
            The coach uses misses, slow answers, confidence, and lane mastery to create tighter traps. Weak reps become memory cards automatically.
          </p>

          <div className="paper-card p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow mb-1">AI source</p>
              <p className="text-xs text-ink-faint">Same drill engine. Online uses Gemini API. Local uses Chrome on-device AI.</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setAiSource("local")} className={`text-xs px-3 py-2 rounded-full border inline-flex items-center gap-1.5 ${aiSource === "local" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}><MonitorSmartphone size={12} /> Local</button>
              <button onClick={() => setAiSource("online")} className={`text-xs px-3 py-2 rounded-full border inline-flex items-center gap-1.5 ${aiSource === "online" ? "bg-gold text-paper border-gold" : "border-line text-ink-faint"}`}><Wifi size={12} /> Online</button>
            </div>
            {aiSource === "local" && localStatus !== "ready" && (
              <p className="basis-full text-xs text-ink-faint inline-flex items-center gap-1.5">
                {localStatus === "downloading" ? <Download size={12} /> : <MonitorSmartphone size={12} />}
                Local AI status: {localStatus}{localStatus === "downloading" ? ` ${localProgress}%` : ""}. Click New rep to initialize/download when needed.
              </p>
            )}
          </div>

          <div className="paper-card p-3 mb-4 grid sm:grid-cols-2 gap-2">
            <select value={laneSlug} onChange={(e) => setLaneSlug(e.target.value)} className="border border-line rounded-xl px-3 py-3 text-sm bg-surface">
              {LANE_LIST.map((l) => <option key={l.slug} value={l.slug}>{l.title}</option>)}
            </select>
            <select value={mode} onChange={(e) => setMode(e.target.value as CoachMode)} className="border border-line rounded-xl px-3 py-3 text-sm bg-surface">
              {MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>

          <div className="grid sm:grid-cols-3 gap-2 mb-4">
            {MODES.filter((m) => m.id !== "mixed").slice(0, 5).map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} className={`paper-card p-3 text-left transition-colors ${currentMode === m.id ? "bg-ink text-paper" : "hover:bg-paper-dim"}`}>
                <p className="text-sm font-medium">{m.label}</p>
                <p className={`text-[11px] mt-1 ${currentMode === m.id ? "text-paper/70" : "text-ink-faint"}`}>{m.description}</p>
              </button>
            ))}
          </div>

          <div className="paper-card p-5 md:p-6 mb-4 min-h-[320px]">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="eyebrow mb-1">{lane.title} · {MODES.find((m) => m.id === currentMode)?.label}</p>
                <h2 className="font-display text-xl">Pressure rep</h2>
              </div>
              <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono ${elapsed > 20 ? "border-rose text-rose" : "border-line text-ink-faint"}`}>
                <Timer size={13} /> {elapsed}s
              </div>
            </div>

            {loading && <p className="text-sm text-ink-faint inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Building the next rep...</p>}
            {error && <p className="text-xs text-rose mb-3">{error}</p>}

            {question && !loading && (
              <>
                <p className="text-lg leading-relaxed mb-5">{question.prompt}</p>

                {isFreeMode ? (
                  <div className="space-y-3">
                    <textarea
                      value={freeAnswer}
                      onChange={(e) => setFreeAnswer(e.target.value)}
                      placeholder="Answer like you are live. Short, clean, no rambling."
                      className="w-full min-h-[130px] border border-line rounded-2xl bg-surface px-4 py-3 text-sm"
                    />
                    <button onClick={submitFree} className="btn-primary w-full">Grade my answer</button>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {(question.choices ?? []).map((choice) => {
                      const active = selected === choice;
                      const isCorrect = revealed && choice === question.answer;
                      const isWrong = revealed && active && choice !== question.answer;
                      return (
                        <button
                          key={choice}
                          disabled={revealed}
                          onClick={() => { setSelected(choice); grade(choice === question.answer); }}
                          className={`text-left rounded-2xl border px-4 py-3 text-sm transition-colors ${
                            isCorrect ? "bg-slate-dim border-slate text-ink" : isWrong ? "bg-rose-dim border-rose text-rose" : active ? "border-ink" : "border-line hover:bg-paper-dim"
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-ink-faint">Confidence</span>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setConfidence(n as 1 | 2 | 3 | 4 | 5)} className={`h-7 w-7 rounded-full border text-xs ${confidence === n ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}>{n}</button>
                    ))}
                  </div>
                  <button onClick={generate} disabled={loading} className="btn-secondary text-xs py-2"><RefreshCw size={13} /> New rep</button>
                </div>
              </>
            )}
          </div>

          {revealed && question && (
            <div className="paper-card p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                {answerMatches || isFreeMode ? <CheckCircle2 size={17} className="text-slate" /> : <XCircle size={17} className="text-rose" />}
                <p className="font-display text-lg">Review</p>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="eyebrow mb-1">Best answer</p>
                  <MarkdownLite text={aiData?.idealAnswer || question.answer} />
                </div>
                {aiData?.coaching && (
                  <div>
                    <p className="eyebrow mb-1">Coach notes</p>
                    <MarkdownLite text={aiData.coaching} />
                  </div>
                )}
                <p className="text-xs text-ink-faint">Weak or slow reps are added to Memory automatically.</p>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-8">
          <div className="paper-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain size={16} className="text-gold" />
              <p className="font-display text-lg">Training profile</p>
            </div>
            <p className="text-sm text-ink-soft mb-4">{profile.summary}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <MiniStat label="Week accuracy" value={`${profile.weekAccuracy}%`} />
              <MiniStat label="Due cards" value={String(profile.dueCardCount)} />
              <MiniStat label="Events" value={String(profile.totalEvents)} />
              <MiniStat label="Overall" value={`${profile.overallMastery}%`} />
            </div>
            <p className="eyebrow mb-2">Weak lanes</p>
            <div className="space-y-3">
              {profile.weakestLanes.slice(0, 4).map((l) => (
                <div key={l.slug}>
                  <div className="flex justify-between gap-2 text-xs mb-1">
                    <span>{l.title}</span>
                    <span className="font-mono text-ink-faint">{l.mastery}%</span>
                  </div>
                  <ProgressBar value={l.mastery} tone="rose" />
                </div>
              ))}
            </div>
          </div>

          <div className="paper-card p-5 bg-gold-dim/40">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={15} className="text-gold" />
              <p className="font-display text-base">Operating rule</p>
            </div>
            <p className="text-sm text-ink-soft">Define the term. Locate the verse. Test the consequence. If you ramble, the app turns it into a recovery card.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="text-[10px] uppercase tracking-wide text-ink-faint font-mono">{label}</p>
      <p className="font-display text-xl">{value}</p>
    </div>
  );
}
