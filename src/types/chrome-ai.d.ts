// Minimal ambient types for Chrome's built-in Prompt API (the "LanguageModel" global,
// backed by Gemini Nano running on-device). Not yet in TypeScript's DOM lib, so it's
// declared here. See: https://developer.chrome.com/docs/ai/prompt-api

export {};

declare global {
  type LanguageModelAvailability = "unavailable" | "downloadable" | "downloading" | "available";

  interface LanguageModelDownloadProgressEvent extends Event {
    loaded: number; // 0-1
  }

  interface LanguageModelMonitor {
    addEventListener(type: "downloadprogress", listener: (e: LanguageModelDownloadProgressEvent) => void): void;
  }

  interface LanguageModelCreateOptions {
    systemPrompt?: string;
    temperature?: number;
    topK?: number;
    monitor?: (m: LanguageModelMonitor) => void;
    signal?: AbortSignal;
    initialPrompts?: { role: "system" | "user" | "assistant"; content: string }[];
  }

  interface LanguageModelSession {
    prompt(input: string): Promise<string>;
    promptStreaming(input: string): AsyncIterable<string>;
    destroy(): void;
    tokensLeft?: number;
    maxTokens?: number;
  }

  interface LanguageModelStatic {
    availability(options?: Record<string, unknown>): Promise<LanguageModelAvailability>;
    create(options?: LanguageModelCreateOptions): Promise<LanguageModelSession>;
    params?(): Promise<{ defaultTemperature: number; defaultTopK: number; maxTemperature: number; maxTopK: number }>;
  }

  // eslint-disable-next-line no-var
  var LanguageModel: LanguageModelStatic | undefined;
}
