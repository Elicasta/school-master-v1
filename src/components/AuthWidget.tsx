"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogIn, LogOut, Cloud, CloudOff, Loader2 } from "lucide-react";

type Mode = "login" | "signup";

export function AuthWidget({ compact = false }: { compact?: boolean }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  async function submit() {
    if (!email.trim() || !password) {
      setError("Enter both email and password.");
      return;
    }
    setSubmitting(true);
    setError(null);
    setInfo(null);
    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (data.user && !data.session) {
        // Project has "Confirm email" on: account exists but needs the confirmation
        // link before signInWithPassword will work.
        setInfo("Account created. Check your email to confirm before signing in.");
      }
      // If data.session is present, onAuthStateChange above picks it up automatically.
    }
    setSubmitting(false);
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
        <span className="text-ink-faint">Synced as {userEmail}</span>
        <button onClick={signOut} className="text-ink-faint hover:text-ink underline underline-offset-2 inline-flex items-center gap-1">
          <LogOut size={compact ? 11 : 12} /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "text-xs" : "text-sm"}>
      <div className="flex items-center gap-2 mb-2">
        <CloudOff size={compact ? 12 : 14} className="text-ink-faint" />
        <span className="text-ink-faint">Sign in to sync transcripts to the cloud</span>
      </div>

      <div className="flex gap-1.5 mb-2">
        <button
          onClick={() => { setMode("login"); setError(null); setInfo(null); }}
          className={`px-3 py-1.5 rounded-lg border text-xs ${mode === "login" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}
        >
          Log in
        </button>
        <button
          onClick={() => { setMode("signup"); setError(null); setInfo(null); }}
          className={`px-3 py-1.5 rounded-lg border text-xs ${mode === "signup" ? "bg-ink text-paper border-ink" : "border-line text-ink-faint"}`}
        >
          Sign up
        </button>
      </div>

      <div className="flex flex-col gap-2 max-w-xs">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="border border-line rounded-lg px-3 py-2 text-sm bg-surface"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={mode === "signup" ? "Password (min 6 characters)" : "Password"}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className="border border-line rounded-lg px-3 py-2 text-sm bg-surface"
        />
        <button onClick={submit} disabled={submitting} className="btn-primary py-2 text-xs justify-center">
          {submitting ? <Loader2 size={13} className="animate-spin" /> : <LogIn size={13} />}
          {mode === "login" ? "Log in" : "Create account"}
        </button>
      </div>

      {error && <p className="text-rose text-xs mt-2">{error}</p>}
      {info && <p className="text-slate text-xs mt-2">{info}</p>}
    </div>
  );
}
