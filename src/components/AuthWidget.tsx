"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogIn, LogOut, Cloud, CloudOff, Loader2, RefreshCw } from "lucide-react";
import { syncTrainingState } from "@/lib/training-sync";
import { getLastSync } from "@/lib/local-store";

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
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [lastSync, setLastSyncState] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setLastSyncState(getLastSync());
      setLoading(false);
      if (data.user) runSync(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      if (session?.user) runSync(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function runSync(showMessage = true) {
    setSyncing(true);
    if (showMessage) setSyncMsg("Syncing training state...");
    const result = await syncTrainingState();
    setSyncing(false);
    setLastSyncState(getLastSync());
    if (showMessage || !result.ok) setSyncMsg(result.message);
  }

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
      else setInfo("Signed in. Syncing your training state now.");
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (data.user && !data.session) {
        setInfo("Account created. Check your email to confirm before signing in.");
      } else {
        setInfo("Account created. Syncing your training state now.");
      }
    }
    setSubmitting(false);
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    setSyncMsg(null);
  }

  if (loading) return null;

  if (userEmail) {
    if (compact) {
      return (
        <button
          onClick={() => runSync(true)}
          disabled={syncing}
          title={userEmail}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1.5 text-[11px] text-ink-faint"
        >
          {syncing ? <Loader2 size={12} className="animate-spin" /> : <Cloud size={12} className="text-slate" />}
          Sync
        </button>
      );
    }

    return (
      <div className="rounded-2xl border border-line bg-surface p-3 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <Cloud size={14} className="text-slate" />
          <div className="min-w-0">
            <p className="text-ink text-xs font-medium truncate">Signed in</p>
            <p className="text-ink-faint text-xs truncate">{userEmail}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => runSync(true)} disabled={syncing} className="btn-secondary py-2 px-3 text-xs">
            {syncing ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
            Sync
          </button>
          <button onClick={signOut} className="btn-secondary py-2 px-3 text-xs">
            <LogOut size={12} /> Sign out
          </button>
        </div>
        {lastSync && <p className="text-[11px] text-ink-faint mt-2">Last sync: {new Date(lastSync).toLocaleString()}</p>}
        {syncMsg && <p className="text-[11px] text-slate mt-1">{syncMsg}</p>}
      </div>
    );
  }

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1.5 text-[11px] text-ink-faint">
        <CloudOff size={12} /> Local
      </span>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-3 text-sm">
      <div className="flex items-center gap-2 mb-3">
        <CloudOff size={14} className="text-ink-faint" />
        <div>
          <p className="text-xs font-medium text-ink">Training sync</p>
          <p className="text-[11px] text-ink-faint">Sign in once, then scores and cards travel with you.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-3 rounded-xl bg-paper-dim p-1">
        <button
          onClick={() => { setMode("login"); setError(null); setInfo(null); }}
          className={`px-3 py-1.5 rounded-lg text-xs ${mode === "login" ? "bg-surface text-ink shadow-sm" : "text-ink-faint"}`}
        >
          Log in
        </button>
        <button
          onClick={() => { setMode("signup"); setError(null); setInfo(null); }}
          className={`px-3 py-1.5 rounded-lg text-xs ${mode === "signup" ? "bg-surface text-ink shadow-sm" : "text-ink-faint"}`}
        >
          Sign up
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="border border-line rounded-xl px-3 py-3 text-sm bg-surface"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={mode === "signup" ? "Password, 6+ characters" : "Password"}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className="border border-line rounded-xl px-3 py-3 text-sm bg-surface"
        />
        <button onClick={submit} disabled={submitting} className="btn-primary py-2.5 text-xs justify-center">
          {submitting ? <Loader2 size={13} className="animate-spin" /> : <LogIn size={13} />}
          {mode === "login" ? "Log in and sync" : "Create account"}
        </button>
      </div>

      {error && <p className="text-rose text-xs mt-2">{error}</p>}
      {info && <p className="text-slate text-xs mt-2">{info}</p>}
    </div>
  );
}
