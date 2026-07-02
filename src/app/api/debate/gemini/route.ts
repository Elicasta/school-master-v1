import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getOpponent } from "@/data/debate";
import { LANE_LIST } from "@/data/lanes";

export const runtime = "nodejs";

interface DebateRequestBody {
  opponentType: string;
  topic?: string;
  history: { role: "user" | "opponent"; content: string }[];
  userMessage: string;
}

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
      { error: "AI Debate Mode is not configured. Add GEMINI_API_KEY to your environment to enable it. Offline Debate Mode works without this." },
      { status: 503 },
    );
  }

  const body = (await req.json()) as DebateRequestBody;
  const opponent = getOpponent(body.opponentType);
  if (!opponent) {
    return NextResponse.json({ error: "Unknown opponent type." }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: buildSystemPrompt(opponent.label, opponent.description, body.topic),
  });

  const history = body.history.map((h) => ({
    role: h.role === "user" ? "user" : "model",
    parts: [{ text: h.content }],
  }));

  try {
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(body.userMessage);
    const text = result.response.text();
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Gemini debate error:", err);
    return NextResponse.json({ error: "AI Debate Mode failed to respond. Try Offline Debate Mode instead." }, { status: 502 });
  }
}
