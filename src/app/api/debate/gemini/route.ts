import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getOpponent } from "@/data/debate";
import { LANE_LIST } from "@/data/lanes";

export const runtime = "nodejs";

interface DebateRequestBody {
  opponentType: string;
  topic?: string;
  history: { role: "user" | "opponent"; content: string }[];
  userMessage: string;
}

// "gemini-flash-latest" is a Google-managed alias that auto-updates to the current
// stable Flash model. Pinning to a dated model string (e.g. gemini-1.5-flash) is
// what broke this route last time, Google shut that model down entirely. The alias
// exists specifically to prevent that class of bug from recurring here.
const MODEL = "gemini-flash-latest";

function buildSystemPrompt(opponentLabel: string, opponentDescription: string, topic: string | undefined): string {
  const verseIndex = LANE_LIST.flatMap((lane) =>
    lane.verses.map((v) => `${v.reference} (${lane.title}): ${v.function}`),
  ).join("\n");

  return `You are simulating a debate opponent in a Scripture study app called School Master.

OPPONENT PROFILE: ${opponentLabel}
${opponentDescription}
${topic ? `TOPIC LOCK: Stay strictly inside the topic "${topic}". Do not introduce arguments from other opponent profiles or unrelated topics.` : ""}

RULES YOU MUST FOLLOW:
1. Stay in character as ${opponentLabel} only. Do not mix in arguments from other traditions unless the user explicitly asks you to.
2. Ask one challenge or follow-up question at a time. Do not dump multiple arguments in one turn.
3. After the user responds, give brief correction/coaching feedback: score their clarity, scripture use, logic, and fairness on a 1-5 scale each, then continue the debate in character.
4. When citing scripture, prefer the reference list below, which is the app's own stored doctrine data. Treat this as the source of truth for what the user has studied. Do not invent doctrine outside your opponent profile.
5. Keep responses concise, 3-6 sentences for the in-character challenge, plus a short coaching note.
6. Never break character to discuss AI safety, your own nature, or meta-commentary about being an AI.

APP'S STORED VERSE REFERENCE INDEX (for citation grounding):
${verseIndex}`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY is not set on the server. If you already added it in Vercel, redeploy after saving env vars, they don't apply to a build that already ran. Offline Debate Mode works without this.",
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
        systemInstruction: buildSystemPrompt(opponent.label, opponent.description, body.topic),
      },
      history: (body.history ?? []).map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })),
    });

    const result = await chat.sendMessage({ message: body.userMessage });
    const text = result.text;

    if (!text) {
      return NextResponse.json({ error: "Gemini returned an empty response. Try again." }, { status: 502 });
    }

    return NextResponse.json({ reply: text });
  } catch (err: any) {
    // Surface the real cause instead of a generic failure, this is the #1 thing
    // that makes "AI Debate Mode isn't working" reports impossible to debug.
    console.error("Gemini debate error:", err);
    const message: string = err?.message ?? "Unknown error";

    if (message.includes("API key not valid") || message.includes("API_KEY_INVALID")) {
      return NextResponse.json({ error: "GEMINI_API_KEY is set but invalid. Generate a fresh key at aistudio.google.com/app/apikey." }, { status: 401 });
    }
    if (message.includes("404") || message.toLowerCase().includes("not found")) {
      return NextResponse.json({ error: `Model "${MODEL}" was not found or not available for this key/region. Try again, or check ai.google.dev/gemini-api/docs/models for the current model list.` }, { status: 502 });
    }
    if (message.includes("429") || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit")) {
      return NextResponse.json({ error: "Gemini rate limit or quota exceeded for this key. Wait a moment and try again." }, { status: 429 });
    }

    return NextResponse.json({ error: `AI Debate Mode failed: ${message}. Offline Debate Mode still works.` }, { status: 502 });
  }
}
