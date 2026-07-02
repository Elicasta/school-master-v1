"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogIn, Cloud, CloudOff } from "lucide-react";

export function AuthWidget({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function sendLink() {
    if (!email.trim()) return;
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setSent(true);
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
  }

  if (loading) return null;

  if (userEmail) {
    return (
      <div className={`flex items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}>
        <Cloud size={compact ? 12 : 14} className="text-slate" />
        <span className="text-ink-faint">Syncing as {userEmail}</span>
        <button onClick={signOut} className="text-ink-faint hover:text-ink underline underline-offset-2">
          Sign out
        </button>
      </div>
    );
  }

  if (sent) {
    return (
      <p className={`${compact ? "text-xs" : "text-sm"} text-ink-faint`}>
        <CloudOff size={compact ? 12 : 14} className="inline mr-1 -mt-0.5" />
        Check {email} for a sign-in link to enable cloud sync.
      </p>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      <CloudOff size={compact ? 12 : 14} className="text-ink-faint shrink-0" />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email to sync transcripts"
        className="border border-line rounded-lg px-2 py-1 text-xs bg-white flex-1 min-w-0"
      />
      <button onClick={sendLink} className="text-xs text-slate underline underline-offset-2 shrink-0 inline-flex items-center gap-1">
        <LogIn size={11} /> Sign in
      </button>
    </div>
  );
}
