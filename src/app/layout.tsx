import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavShell } from "@/components/NavShell";
import { AuthCodeHandler } from "@/components/AuthCodeHandler";

export const viewport: Viewport = {
  themeColor: "#F5F3EE",
};

export const metadata: Metadata = {
  title: "School Master",
  description: "Scripture study, doctrine mastery, and debate prep.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "School Master",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sm_theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t!=='light'&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AuthCodeHandler />
        <NavShell>{children}</NavShell>
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {})); }`,
          }}
        />
      </body>
    </html>
  );
}
