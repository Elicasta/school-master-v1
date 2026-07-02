"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthWidget } from "@/components/AuthWidget";
import { getTranscripts } from "@/lib/local-store";
import { useEffect, useState } from "react";

export function SettingsClient() {
  const [transcriptCount, setTranscriptCount] = useState(0);

  useEffect(() => {
    setTranscriptCount(getTranscripts().length);
  }, []);

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-2xl mx-auto">
      <p className="eyebrow mb-2">Settings</p>
      <h1 className="font-display text-3xl md:text-4xl mb-8">Preferences.</h1>

      <div className="paper-card p-5 mb-4">
        <p className="eyebrow mb-3">Appearance</p>
        <ThemeToggle />
      </div>

      <div className="paper-card p-5 mb-4">
        <p className="eyebrow mb-3">Cloud sync</p>
        <AuthWidget />
      </div>

      <div className="paper-card p-5">
        <p className="eyebrow mb-2">Local data</p>
        <p className="text-sm text-ink-soft">{transcriptCount} saved debate transcript{transcriptCount === 1 ? "" : "s"} stored on this device.</p>
      </div>
    </div>
  );
}
