"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutGrid, Zap, Brain, Swords, Landmark, Library, Settings, Target, ShieldCheck } from "lucide-react";
import { AuthWidget } from "@/components/AuthWidget";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/lanes", label: "Lanes", icon: BookOpen },
  { href: "/apostolic-logic", label: "Style", icon: ShieldCheck },
  { href: "/coach", label: "Coach", icon: Target },
  { href: "/drill", label: "Drill", icon: Zap },
  { href: "/memory", label: "Memory", icon: Brain },
  { href: "/debate", label: "Debate", icon: Swords },
  { href: "/mind-palace", label: "Mind Palace", icon: Landmark },
  { href: "/facts", label: "Facts", icon: Library },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden md:flex md:w-60 md:flex-col md:min-h-screen md:border-r md:border-line md:bg-paper-dim/40 md:px-4 md:py-8">
        <div className="px-2 mb-10">
          <span className="font-display text-xl tracking-tight">School Master</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-dim"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-line">
          <AuthWidget />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden sticky top-0 z-30 bg-paper/90 backdrop-blur-xs border-b border-line px-4 py-3 flex items-center justify-between">
          <span className="font-display text-lg">School Master</span>
          <AuthWidget compact />
        </header>

        <main className="pb-24 md:pb-10">{children}</main>

        <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-surface/90 backdrop-blur-xs border-t border-line grid grid-cols-5">
          {NAV_ITEMS.filter((i) => ["/", "/apostolic-logic", "/coach", "/memory", "/debate"].includes(i.href)).map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 py-2.5">
                <Icon size={18} strokeWidth={1.75} className={active ? "text-ink" : "text-ink-faint"} />
                <span className={`text-[10px] ${active ? "text-ink" : "text-ink-faint"}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
