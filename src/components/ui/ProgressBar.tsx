export function ProgressBar({ value, tone = "ink" }: { value: number; tone?: "ink" | "gold" | "slate" | "rose" }) {
  const bar = tone === "gold" ? "bg-gold" : tone === "slate" ? "bg-slate" : tone === "rose" ? "bg-rose" : "bg-ink";
  return (
    <div className="h-1.5 w-full rounded-full bg-paper-dim overflow-hidden">
      <div className={`h-full ${bar} rounded-full transition-all duration-500`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
