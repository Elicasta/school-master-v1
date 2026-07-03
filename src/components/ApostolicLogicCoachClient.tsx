"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardList, Download, Loader2, MonitorSmartphone, RefreshCw, ShieldCheck, SlidersHorizontal, Wifi, XCircle } from "lucide-react";
import { MarkdownLite } from "@/components/MarkdownLite";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  APOSTOLIC_LOGIC_MODES,
  APOSTOLIC_LOGIC_PRINCIPLES,
  ApostolicLogicCritique,
  ApostolicLogicMode,
  ApostolicLogicRep,
  getApostolicLogicRep,
  localApostolicLogicCritique,
} from "@/lib/apostolic-logic-coach";
import { buildWeaknessPayload, memoryCardFromWeakness } from "@/lib/adaptive-engine";
import { addMemoryCard, logReviewEvent } from "@/lib/local-store";
import { buildApostolicCritiquePrompt, parseJson } from "@/lib/ai-prompts";
import { createLocalSession, getModelAvailability, hasPromptAPI, isChrome } from "@/lib/browser-ai";

function scoreLabel(score: number) {
  if (score >= 82) return "Locked";
  if (score >= 70) return "Usable";
  if (score >= 55) return "Needs tightening";
  return "Too loose";
}

function modeInstruction(mode: ApostolicLogicMode) {
  switch (mode) {
    case "cadence":
      return "Write like you are live: short thesis, one text move, one question.";
    case "burden-shift":
      return "Do not disprove everything. Make the claimant prove the added category.";
    case "definition-control":
      return "Ask for the definition before answering the opponent's loaded terms.";
    case "cross-exam-ladder":
      return "Write three questions. Each question should tighten the lane.";
    case "overstatement-filter":
      return "Remove the line that gives your opponent an easy side argument.";
    case "opening-statement":
      return "Build your public stance in 30 seconds. Calm. Clear. Scripture-first.";
    case "recovery":
      return "Correct the strawman once, then return to the burden of proof.";
  }
}

export function ApostolicLogicCoachClient() {
  const [mode, setMode] = useState<ApostolicLogicMode>("cadence");
  const [rep, setRep] = useState<ApostolicLogicRep>(() => getApostolicLogicRep("cadence", 1));
  const [answer, setAnswer] = useState("");
  const [critique, setCritique] = useState<ApostolicLogicCritique | null>(null);
  const [loading, setLoading] = useState(false);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [autoCard, setAutoCard] = useState(true);
  const [aiSource, setAiSource] = useState<"online" | "local">("local");
  const [localStatus, setLocalStatus] = useState<"idle" | "checking" | "downloadable" | "downloading" | "ready" | "unsupported" | "unavailable">("idle");
  const [localProgress, setLocalProgress] = useState(0);
  const localSession = useRef<LanguageModelSession | null>(null);
  const profile = useMemo(() => buildWeaknessPayload(), []);


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
      "You are the local Apostolic Logic style coach for School Master. Return valid JSON only. Match the Online Gemini critique feature set exactly, just without network calls.",
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
    return () => localSession.current?.destroy();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 300);
    return () => window.clearInterval(timer);
  }, [startedAt]);

  function nextRep(nextMode = mode) {
    const seed = Date.now();
    setMode(nextMode);
    setRep(getApostolicLogicRep(nextMode, seed));
    setAnswer("");
    setCritique(null);
    setStartedAt(Date.now());
    setElapsed(0);
  }

  async function grade() {
    if (!answer.trim()) return;
    setLoading(true);
    setCritique(null);
    const responseMs = Date.now() - startedAt;

    try {
      let result: ApostolicLogicCritique;
      if (aiSource === "local") {
        const session = await ensureLocalSession();
        const raw = await session.prompt(buildApostolicCritiquePrompt({ rep, response: answer, profile }));
        const parsed = parseJson(raw);
        const fallback = localApostolicLogicCritique(rep, answer);
        result = parsed?.betterAnswer && typeof parsed.score === "number"
          ? { ...fallback, ...parsed, score: Math.max(0, Math.min(100, Math.round(parsed.score))) }
          : fallback;
      } else {
        const res = await fetch("/api/apostolic-logic/critique", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rep, response: answer, profile }),
        });
        const data = await res.json();
        result = res.ok ? data : localApostolicLogicCritique(rep, answer);
      }
      setCritique(result);
      logReviewEvent({
        id: `apostolic-logic-${rep.id}-${Date.now()}`,
        kind: "coach",
        refId: rep.id,
        laneSlug: rep.laneSlug ?? null,
        correct: result.passed,
        responseMs,
        confidence: result.score >= 82 ? 5 : result.score >= 70 ? 4 : result.score >= 55 ? 3 : 2,
        mode: `apostolic-logic:${rep.mode}`,
        createdAt: new Date().toISOString(),
      });

      if (autoCard && !result.passed) {
        addMemoryCard({
          ...memoryCardFromWeakness({
            laneSlug: rep.laneSlug ?? "apostolic-logic",
            id: rep.id,
            prompt: result.memoryPrompt || rep.prompt,
            answer: result.memoryAnswer || result.betterAnswer,
            reference: "Apostolic Logic Coach",
            verseId: rep.id,
            type: rep.mode,
          }),
          source: "adaptive",
          cardKind: rep.mode === "cross-exam-ladder" ? "cross-exam" : rep.mode === "overstatement-filter" ? "recovery" : "definition",
          weaknessTag: `apostolic-logic:${rep.mode}`,
        });
      }
    } catch {
      const result = localApostolicLogicCritique(rep, answer);
      setCritique(result);
    } finally {
      setLoading(false);
    }
  }

  const currentMode = APOSTOLIC_LOGIC_MODES.find((m) => m.id === mode) ?? APOSTOLIC_LOGIC_MODES[0];

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-7xl mx-auto">
      <div className="grid xl:grid-cols-[1fr_390px] gap-5 items-start">
        <section>
          <p className="eyebrow mb-2">Apostolic Logic Coach</p>
          <h1 className="font-display text-3xl md:text-4xl mb-2">Train the stance before the spar.</h1>
          <p className="text-sm text-ink-soft mb-5 max-w-3xl">
            This is separate from the debate engine. It trains the adapted GodLogic mechanics as your own style: define the claim, locate the text, test the consequence, and keep the burden where it belongs.
          </p>

          <div className="paper-card p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow mb-1">AI source</p>
              <p className="text-xs text-ink-faint">Same style coach. Online uses Gemini API. Local uses Chrome on-device AI.</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setAiSource("local")} className={`text-xs px-3 py-2 rounded-full border inline-flex items-center gap-1.5 ${aiSource === "local" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}><MonitorSmartphone size={12} /> Local</button>
              <button onClick={() => setAiSource("online")} className={`text-xs px-3 py-2 rounded-full border inline-flex items-center gap-1.5 ${aiSource === "online" ? "bg-gold text-paper border-gold" : "border-line text-ink-faint"}`}><Wifi size={12} /> Online</button>
            </div>
            {aiSource === "local" && localStatus !== "ready" && (
              <p className="basis-full text-xs text-ink-faint inline-flex items-center gap-1.5">
                {localStatus === "downloading" ? <Download size={12} /> : <MonitorSmartphone size={12} />}
                Local AI status: {localStatus}{localStatus === "downloading" ? ` ${localProgress}%` : ""}. Grade once to initialize/download when needed.
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
            {APOSTOLIC_LOGIC_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => nextRep(m.id)}
                className={`paper-card p-3 text-left transition-colors ${mode === m.id ? "bg-ink text-paper" : "hover:bg-paper-dim"}`}
              >
                <p className="text-sm font-medium">{m.label}</p>
                <p className={`text-[11px] mt-1 leading-relaxed ${mode === m.id ? "text-paper/70" : "text-ink-faint"}`}>{m.description}</p>
              </button>
            ))}
          </div>

          <div className="paper-card p-5 md:p-6 mb-4">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <p className="eyebrow mb-1">{currentMode.label} · {elapsed}s</p>
                <h2 className="font-display text-2xl">{rep.title}</h2>
              </div>
              <button onClick={() => nextRep()} className="btn-secondary text-xs px-3 py-2"><RefreshCw size={13} /> New rep</button>
            </div>

            {rep.opponentLine && (
              <div className="rounded-2xl border border-line bg-paper-dim/50 p-4 mb-4">
                <p className="eyebrow mb-1">Opponent line</p>
                <p className="text-sm leading-relaxed">{rep.opponentLine}</p>
              </div>
            )}

            <div className="rounded-2xl border border-line bg-surface p-4 mb-4">
              <p className="eyebrow mb-1">Your task</p>
              <p className="text-base leading-relaxed mb-3">{rep.prompt}</p>
              <p className="text-xs text-ink-faint inline-flex items-center gap-2"><SlidersHorizontal size={13} /> {modeInstruction(mode)}</p>
            </div>

            <div className="grid md:grid-cols-[1fr_260px] gap-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write it like you would say it live. Short. Clean. No panic."
                className="w-full min-h-[210px] border border-line rounded-2xl bg-surface px-4 py-3 text-sm leading-relaxed"
              />
              <div className="rounded-2xl border border-line p-4 bg-paper-dim/40">
                <p className="eyebrow mb-2">Target shape</p>
                <div className="space-y-2">
                  {rep.targetShape.map((item, index) => (
                    <div key={item} className="flex gap-2 text-sm">
                      <span className="font-mono text-ink-faint">{index + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <label className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
                  <input type="checkbox" checked={autoCard} onChange={(e) => setAutoCard(e.target.checked)} />
                  Create memory card when failed
                </label>
              </div>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <button onClick={grade} disabled={loading || !answer.trim()} className="btn-primary">
                {loading ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />} Grade style
              </button>
              <button onClick={() => setAnswer(rep.idealAnswer)} className="btn-secondary">Show ideal</button>
            </div>
          </div>

          {critique && (
            <div className="paper-card p-5 md:p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="eyebrow mb-1">Style Review</p>
                  <h2 className="font-display text-2xl">{scoreLabel(critique.score)}</h2>
                </div>
                <div className="w-28">
                  <p className="text-right text-xs text-ink-faint mb-1">{critique.score}%</p>
                  <ProgressBar value={critique.score} />
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-paper-dim/40 p-4 mb-4">
                <p className="text-sm font-medium mb-1">Verdict</p>
                <p className="text-sm text-ink-soft">{critique.verdict}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="eyebrow mb-2">What worked</p>
                  <div className="space-y-2">
                    {critique.strengths.map((item) => (
                      <p key={item} className="text-sm flex gap-2"><CheckCircle2 size={15} className="text-slate mt-0.5 shrink-0" /> {item}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-2">Fix next</p>
                  <div className="space-y-2">
                    {critique.fixes.map((item) => (
                      <p key={item} className="text-sm flex gap-2"><XCircle size={15} className="text-rose mt-0.5 shrink-0" /> {item}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-4">
                <p className="eyebrow mb-2">Better answer</p>
                <MarkdownLite text={critique.betterAnswer} />
              </div>

              <button onClick={() => nextRep()} className="btn-primary mt-4"><ArrowRight size={15} /> Next rep</button>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="paper-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList size={17} />
              <h2 className="font-display text-xl">The profile</h2>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed mb-4">
              This coach does not create an opponent. It grades whether your answer sounds like Apostolic Logic before you enter debate mode.
            </p>
            <div className="space-y-3">
              {APOSTOLIC_LOGIC_PRINCIPLES.map((p) => (
                <details key={p.id} className="rounded-xl border border-line bg-surface p-3">
                  <summary className="cursor-pointer text-sm font-medium">{p.label}</summary>
                  <p className="text-xs text-ink-soft mt-2 leading-relaxed">{p.target}</p>
                  <div className="mt-3 grid gap-2">
                    <p className="text-xs text-rose"><span className="font-medium">Weak:</span> {p.weakVersion}</p>
                    <p className="text-xs text-slate"><span className="font-medium">Strong:</span> {p.strongVersion}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="paper-card p-5">
            <p className="eyebrow mb-2">Operating sentence</p>
            <p className="font-display text-xl leading-snug mb-3">“I affirm the biblical words. I am asking you to prove your later definition.”</p>
            <p className="text-sm text-ink-soft leading-relaxed">
              That sentence is the hinge. It prevents you from sounding like you deny the text while forcing them to defend the category they imported into it.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
