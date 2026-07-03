import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getOpponent } from "@/data/debate";
import { buildDebateSystemPrompt, cleanAiError, splitDebateReply } from "@/lib/ai-prompts";

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

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not set on the server. Switch AI source to Local, or add the key and redeploy." },
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
  if (!opponent) return NextResponse.json({ error: `Unknown opponent type: ${body.opponentType}` }, { status: 400 });
  if (!body.userMessage?.trim()) return NextResponse.json({ error: "Empty message." }, { status: 400 });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: MODEL,
      config: {
        systemInstruction: buildDebateSystemPrompt({
          opponentType: body.opponentType,
          topic: body.topic,
          userProfile: body.userProfile,
          difficulty: body.difficulty ?? 3,
        }),
      },
      history: (body.history ?? [])
        .filter((h) => h.role !== "coach")
        .map((h) => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.content }] })),
    });

    const result = await chat.sendMessage({ message: body.userMessage });
    const text = result.text;
    if (!text) return NextResponse.json({ error: "Gemini returned an empty response. Try again." }, { status: 502 });
    return NextResponse.json(splitDebateReply(text));
  } catch (err: any) {
    const message = cleanAiError(err?.message);
    return NextResponse.json({ error: message }, { status: message.includes("quota") || message.includes("rate limit") ? 429 : 502 });
  }
}
