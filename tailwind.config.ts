import type { Config } from "tailwindcss";

// Colors are wired to CSS custom properties (defined in globals.css :root and
// .dark) rather than hardcoded hex, so dark mode is a single class toggle on
// <html> instead of dark: prefixes sprinkled through every component.
function cssVar(name: string) {
  return `rgb(var(${name}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: cssVar("--color-paper"),
        "paper-dim": cssVar("--color-paper-dim"),
        surface: cssVar("--color-surface"),
        ink: cssVar("--color-ink"),
        "ink-soft": cssVar("--color-ink-soft"),
        "ink-faint": cssVar("--color-ink-faint"),
        line: cssVar("--color-line"),
        gold: {
          DEFAULT: cssVar("--color-gold"),
          soft: cssVar("--color-gold-soft"),
          dim: cssVar("--color-gold-dim"),
        },
        slate: {
          DEFAULT: cssVar("--color-slate"),
          soft: cssVar("--color-slate-soft"),
          dim: cssVar("--color-slate-dim"),
        },
        rose: {
          DEFAULT: cssVar("--color-rose"),
          dim: cssVar("--color-rose-dim"),
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.10)",
        glass: "0 1px 1px rgba(0,0,0,0.03), 0 12px 32px -16px rgba(0,0,0,0.14)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
