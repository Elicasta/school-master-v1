"use client";

export function isChrome(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // Exclude Edge, Opera, and other Chromium-based browsers that also match /Chrome/
  // in their UA string, only true Chrome ships the Gemini Nano on-device model.
  return /Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua) && !/Brave/.test(ua);
}

export function hasPromptAPI(): boolean {
  return typeof globalThis !== "undefined" && "LanguageModel" in globalThis && !!globalThis.LanguageModel;
}

export async function getModelAvailability(): Promise<"unsupported" | "unavailable" | "downloadable" | "downloading" | "available"> {
  if (!hasPromptAPI()) return "unsupported";
  try {
    return await globalThis.LanguageModel!.availability();
  } catch {
    return "unavailable";
  }
}

export async function createLocalSession(
  systemPrompt: string,
  onProgress?: (pct: number) => void,
): Promise<LanguageModelSession> {
  if (!hasPromptAPI()) throw new Error("Chrome's on-device Prompt API is not available in this browser.");
  return globalThis.LanguageModel!.create({
    systemPrompt,
    monitor: (m) => {
      m.addEventListener("downloadprogress", (e) => {
        onProgress?.(Math.round(e.loaded * 100));
      });
    },
  });
}
