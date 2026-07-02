"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Supabase's magic-link email sometimes redirects to the project's configured
 * Site URL (root "/") instead of the specific emailRedirectTo we asked for, if
 * that exact path isn't also in the Redirect URLs allowlist. Rather than making
 * sign-in depend on getting that allowlist perfectly right, this runs on every
 * page and finishes the sign-in from wherever the "?code=" param lands, then
 * cleans the URL. Defense in depth for the "sync link doesn't work" bug.
 */
export function AuthCodeHandler() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const supabase = createClient();
    supabase.auth.exchangeCodeForSession(code).finally(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      window.history.replaceState({}, "", url.toString());
    });
  }, []);

  return null;
}
