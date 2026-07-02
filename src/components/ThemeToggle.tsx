"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("sm_theme") as Theme) || "system";
    setTheme(stored);
    setMounted(true);
  }, []);

  function choose(t: Theme) {
    setTheme(t);
    localStorage.setItem("sm_theme", t);
    applyTheme(t);
  }

  if (!mounted) return null;

  const options: { value: Theme; label: string; icon: any }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="flex gap-1.5">
      {options.map((o) => {
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            onClick={() => choose(o.value)}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border ${theme === o.value ? "bg-ink text-paper border-ink" : "border-line text-ink-soft"}`}
          >
            <Icon size={13} /> {o.label}
          </button>
        );
      })}
    </div>
  );
}
