import { notFound } from "next/navigation";
import { getOpponent, OPPONENT_LIST } from "@/data/debate";
import { DebateRunner } from "@/components/DebateRunner";

export function generateStaticParams() {
  return OPPONENT_LIST.map((o) => ({ opponent: o.type }));
}

export default function OpponentPage({ params }: { params: { opponent: string } }) {
  const opponent = getOpponent(params.opponent);
  if (!opponent) notFound();

  return <DebateRunner opponent={opponent} />;
}
