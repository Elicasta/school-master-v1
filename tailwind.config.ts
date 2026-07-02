import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F3EE",
        "paper-dim": "#EDEAE1",
        ink: "#1C1B1A",
        "ink-soft": "#4A4744",
        "ink-faint": "#8B8780",
        line: "#E3DFD5",
        gold: {
          DEFAULT: "#9C7A3C",
          soft: "#C9AD7C",
          dim: "#E9DFC9",
        },
        slate: {
          DEFAULT: "#34506B",
          soft: "#5A7791",
          dim: "#E4EAEF",
        },
        rose: {
          DEFAULT: "#8C4A42",
          dim: "#F0DEDB",
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
        card: "0 1px 2px rgba(28,27,26,0.04), 0 8px 24px -12px rgba(28,27,26,0.10)",
        glass: "0 1px 1px rgba(28,27,26,0.03), 0 12px 32px -16px rgba(28,27,26,0.14)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
