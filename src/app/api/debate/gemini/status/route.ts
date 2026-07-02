import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

// Hit this in the browser (GET /api/debate/gemini/status) or from the AI Debate
// page's "Check connection" button to see exactly why AI Debate Mode isn't
// working, key missing, key invalid, model unavailable, or actually fine.
export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "GEMINI_API_KEY is not set on the server." }, { status: 503 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: "Reply with exactly: ok",
    });
    return NextResponse.json({ ok: true, reply: response.text });
  } catch (err: any) {
    return NextResponse.json({ ok: false, reason: err?.message ?? "Unknown error" }, { status: 502 });
  }
}
