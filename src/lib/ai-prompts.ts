import { getOpponent } from "@/data/debate";
import { getLane, LANE_LIST } from "@/data/lanes";
import { CoachMode } from "@/lib/adaptive-engine";
import { ApostolicLogicRep } from "@/lib/apostolic-logic-coach";

export type DebateDifficulty = 1 | 2 | 3 | 4 | 5;

export type WeaknessProfile = {
  weakLanes?: string[];
  weakVerseIds?: string[];
  weakObjectionIds?: string[];
  recentMisses?: string[];
  [key: string]: unknown;
};

export function parseJson(text: string): any | null {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

export function cleanAiError(message?: string) {
  const raw = message ?? "AI generation failed.";
  const lower = raw.toLowerCase();
  if (raw.includes("429") || lower.includes("quota") || lower.includes("rate limit") || lower.includes("resource_exhausted")) {
    return "Gemini quota or rate limit was hit. Switch AI source to Local, or try Online again later.";
  }
  if (lower.includes("api key") || lower.includes("api_key")) return "Gemini API key is missing or invalid. Switch to Local or fix the server key.";
  if (lower.includes("fetch") || lower.includes("network")) return "Online AI could not be reached. Switch to Local or try again.";
  return raw.length > 240 ? "Online AI failed. Switch AI source to Local or try again." : raw;
}

export function coachModeInstruction(mode: CoachMode): string {
  switch (mode) {
    case "answer-20":
      return "Create a live timed objection the user should answer in 20 seconds. Grade target: short thesis, one verse/function, one burden question.";
    case "one-verse":
      return "Create a drill where the user must pick the best response using one verse only. Four choices. Similar length. Plausible wrong answers.";
    case "cross-exam":
      return "Create a cross-exam builder drill. The correct answer should be the best question to ask, not a speech.";
    case "trap":
      return "Create a trap drill. The user must identify the hidden assumption behind the opponent's statement.";
    case "rewrite":
      return "Create a rewrite drill. Give a raw messy answer and ask the user to rewrite it into measured debate cadence.";
    default:
      return "Create the best next adaptive drill for the user's weak lane. Prefer traps, cross-exam, or tight multiple choice over basic recall.";
  }
}

export function buildCoachGenerationPrompt({ laneSlug, mode, profile }: { laneSlug: string; mode: CoachMode; profile?: WeaknessProfile }) {
  const lane = getLane(laneSlug);
  if (!lane) throw new Error("Unknown lane.");

  const source = {
    lane: { slug: lane.slug, title: lane.title, summary: lane.summary, goal: lane.goal },
    verses: lane.verses.map((v) => ({ id: v.id, reference: v.reference, function: v.function, text: v.text })),
    objections: lane.objections,
    profile: profile ?? {},
  };

  return `You are the adaptive debate coach for an Apostolic Scripture-first training app.

The user wants GodLogic-style pressure mechanics but their own measured Apostolic cadence: define the claim, locate the verse, test the consequence. Do not create childish questions. Do not make the correct answer obvious by length. Wrong options must sound plausible and expose real mistakes: overclaiming, dodging Matthew 28:19, sounding modalist, ignoring John 1:1, vague church language, missing burden of proof, or verse dumping.

Mode instruction: ${coachModeInstruction(mode)}

Return JSON only with this exact shape:
{
  "id": "short-id",
  "prompt": "the drill prompt",
  "choices": ["choice A", "choice B", "choice C", "choice D"],
  "answer": "exact correct choice or ideal short answer",
  "idealAnswer": "best polished answer in the user's cadence",
  "coaching": "why this trains the user's weakness and what to watch for",
  "verseId": "one supplied verse id or empty string",
  "reference": "one supplied verse reference or Adaptive review"
}

Rules:
- For cross-exam and rewrite modes, choices may be omitted, but answer and idealAnswer are required.
- Never invent Bible text. Use supplied verse functions and references only.
- Keep all choices similar length when choices are used.
- The best answer should be strong but fair.
- This prompt must work identically whether the engine is Online Gemini or Local Chrome AI.

Training data:
${JSON.stringify(source)}`;
}

export function buildApostolicCritiquePrompt({ rep, response, profile }: { rep: ApostolicLogicRep; response: string; profile?: WeaknessProfile }) {
  return `You are the Apostolic Logic style coach. This is separate from the debate opponent engine.

The target style is adapted from high-pressure Christian apologetics mechanics, but it must sound like the user's own Apostolic profile: calm, pastoral, Scripture-first, short, definition-focused, burden-aware.

Profile rules:
- Define the claim.
- Locate the verse.
- Test the consequence.
- Affirm biblical language before rejecting imported definitions.
- Never sound anti-Bible, anti-history, bitter, or evasive.
- Do not call everything pagan or invented.
- Do not flatten Father, Son, and Spirit into mere labels.
- Avoid rambling. Prefer one thesis, one text move, one question.

Grade this user answer against the rep.

Return JSON only:
{
  "score": 0-100,
  "verdict": "blunt one sentence",
  "strengths": ["...", "..."],
  "fixes": ["...", "..."],
  "betterAnswer": "polished answer in Apostolic Logic cadence",
  "drillToCreate": "short name for a follow-up drill",
  "memoryPrompt": "flashcard prompt created from the weakness",
  "memoryAnswer": "flashcard answer",
  "passed": true/false
}

Rep:
${JSON.stringify(rep)}

User answer:
${response}

Training profile:
${JSON.stringify(profile ?? {})}`;
}

export function buildDebateSystemPrompt({
  opponentType,
  topic,
  userProfile,
  difficulty = 3,
}: {
  opponentType: string;
  topic?: string;
  userProfile?: WeaknessProfile;
  difficulty?: DebateDifficulty;
}) {
  const opponent = getOpponent(opponentType);
  if (!opponent) throw new Error(`Unknown opponent type: ${opponentType}`);

  const verseIndex = LANE_LIST.flatMap((lane) =>
    lane.verses.map((v) => `${v.reference} (${lane.title}): ${v.function}`),
  ).join("\n");

  const weakProfile = [
    userProfile?.weakLanes?.length ? `Weak lanes: ${userProfile.weakLanes.join(", ")}` : null,
    userProfile?.weakVerseIds?.length ? `Weak verses: ${userProfile.weakVerseIds.join(", ")}` : null,
    userProfile?.weakObjectionIds?.length ? `Weak objections: ${userProfile.weakObjectionIds.join(", ")}` : null,
    userProfile?.recentMisses?.length ? `Recent hesitation/misses: ${userProfile.recentMisses.join(" | ")}` : null,
  ].filter(Boolean).join("\n");

  return `You are simulating a debate opponent in a Scripture study app called School Master.

OPPONENT PROFILE: ${opponent.label}
${opponent.description}
${topic ? `TOPIC LOCK: Stay strictly inside the topic "${topic}". Do not introduce arguments from other opponent profiles or unrelated topics.` : ""}

USER TRAINING PROFILE:
${weakProfile || "No weak spots recorded yet. Start by probing definitions, burden of proof, and verse handling."}

DIFFICULTY LEVEL: ${difficulty}
1 friendly pushback, 2 pastor-level, 3 apologist-level, 4 hostile debate pressure, 5 cross-exam only. At level 5, mostly ask questions and force short answers.

STYLE TARGET:
The user is training a measured Scripture-first debate cadence: define the claim, locate the verse, test the consequence. Apply pressure without ranting. Ask one clean question at a time.

RULES YOU MUST FOLLOW:
1. Stay in character as ${opponent.label} only. Do not mix in arguments from other traditions unless the user explicitly asks you to.
2. The visible opponent reply must be pure debate. Do not include coaching, scores, labels, or meta commentary inside the opponent reply.
3. Still create private coach notes every turn for later review. Diagnose hesitation, weak logic, missing verse use, and the next drill target.
4. If the user dodges, press the exact dodge. If the user is strong, raise difficulty by using tighter distinctions and less obvious objections.
5. Keep the opponent reply concise: 3-6 sentences, one challenge or question at the end.
6. Never break character to discuss AI safety, your own nature, or meta-commentary about being an AI.
7. Output exactly this format:
OPPONENT_REPLY:
<the in-character debate response only>

COACHING_NOTES:
<brief notes: clarity 1-5, scripture 1-5, logic 1-5, fairness 1-5, hesitation signal, recommended drill>

APP'S STORED VERSE REFERENCE INDEX:
${verseIndex}`;
}

export function splitDebateReply(raw: string): { reply: string; coaching: string } {
  const opponentMatch = raw.match(/OPPONENT_REPLY:\s*([\s\S]*?)(?:\n\s*COACHING_NOTES:|$)/i);
  const coachMatch = raw.match(/COACHING_NOTES:\s*([\s\S]*?)(?:\n\s*APP'S STORED VERSE REFERENCE INDEX:|$)/i);
  const reply = (opponentMatch?.[1] ?? raw).trim();
  const coaching = (coachMatch?.[1] ?? "No separate coach notes returned.").trim();
  return { reply, coaching };
}
