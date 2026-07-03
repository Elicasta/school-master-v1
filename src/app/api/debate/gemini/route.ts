import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getOpponent } from "@/data/debate";
import { LANE_LIST } from "@/data/lanes";

export const runtime = "nodejs";

interface DebateRequestBody {
  opponentType: string;
  topic?: string;
  history: { role: "user" | "opponent" | "coach"; content: string }[];
  userMessage: string;
  coachMode?: "visible" | "hidden";
  difficulty?: 1 | 2 | 3 | 4 | 5;
  userProfile?: {
    weakLanes?: string[];
    weakVerseIds?: string[];
    weakObjectionIds?: string[];
    recentMisses?: string[];
  };
}

const MODEL = "gemini-flash-latest";

function buildSystemPrompt(
  opponentLabel: string,
  opponentDescription: string,
  topic: string | undefined,
  coachMode: "visible" | "hidden",
  userProfile: DebateRequestBody["userProfile"],
  difficulty: DebateRequestBody["difficulty"] = 3,
): string {
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

OPPONENT PROFILE: ${opponentLabel}
${opponentDescription}
${topic ? `TOPIC LOCK: Stay strictly inside the topic "${topic}". Do not introduce arguments from other opponent profiles or unrelated topics.` : ""}

USER TRAINING PROFILE:
${weakProfile || "No weak spots recorded yet. Start by probing definitions, burden of proof, and verse handling."}

DIFFICULTY LEVEL: ${difficulty}
1 friendly pushback, 2 pastor-level, 3 apologist-level, 4 hostile debate pressure, 5 cross-exam only. At level 5, mostly ask questions and force short answers.

STYLE TARGET:
The user is training a measured Scripture-first debate cadence: define the claim, locate the verse, test the consequence. Apply pressure without ranting. Ask one clean question at a time.

RULES YOU MUST FOLLOW:
1. Stay in character as ${opponentLabel} only. Do not mix in arguments from other traditions unless the user explicitly asks you to.
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

function splitReply(raw: string): { reply: string; coaching: string } {
  const opponentMatch = raw.match(/OPPONENT_REPLY:\s*([\s\S]*?)(?:\n\s*COACHING_NOTES:|$)/i);
  const coachMatch = raw.match(/COACHING_NOTES:\s*([\s\S]*)$/i);
  const reply = (opponentMatch?.[1] ?? raw).trim();
  const coaching = (coachMatch?.[1] ?? "No separate coach notes returned.").trim();
  return { reply, coaching };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY is not set on the server. If you already added it in Vercel, redeploy after saving env vars. Offline Debate Mode still works without this.",
      },
      { status: 503 },
    );
  }

  let body: DebateRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const opponent = getOpponent(body.opponentType);
  if (!opponent) {
    return NextResponse.json({ error: `Unknown opponent type: ${body.opponentType}` }, { status: 400 });
  }
  if (!body.userMessage?.trim()) {
    return NextResponse.json({ error: "Empty message." }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: MODEL,
      config: {
        systemInstruction: buildSystemPrompt(
          opponent.label,
          opponent.description,
          body.topic,
          body.coachMode ?? "hidden",
          body.userProfile,
          body.difficulty ?? 3,
        ),
      },
      history: (body.history ?? [])
        .filter((h) => h.role !== "coach")
        .map((h) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        })),
    });

    const result = await chat.sendMessage({ message: body.userMessage });
    const text = result.text;

    if (!text) {
      return NextResponse.json({ error: "Gemini returned an empty response. Try again." }, { status: 502 });
    }

    return NextResponse.json(splitReply(text));
  } catch (err: any) {
    console.error("Gemini debate error:", err);
    const message: string = err?.message ?? "Unknown error";

    if (message.includes("API key not valid") || message.includes("API_KEY_INVALID")) {
      return NextResponse.json({ error: "GEMINI_API_KEY is set but invalid. Generate a fresh key at aistudio.google.com/app/apikey." }, { status: 401 });
    }
    if (message.includes("404") || message.toLowerCase().includes("not found")) {
      return NextResponse.json({ error: `Model "${MODEL}" was not found or not available for this key/region.` }, { status: 502 });
    }
    if (message.includes("429") || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit")) {
      return NextResponse.json({ error: "Gemini rate limit or quota exceeded for this key. Wait a moment and try again." }, { status: 429 });
    }

    return NextResponse.json({ error: `AI Debate Mode failed: ${message}. Offline Debate Mode still works.` }, { status: 502 });
  }
}
