import type { Metadata } from "next";
import "./atlas.css";

export const metadata: Metadata = {
  title: { default: "Evidence Atlas | Schoolmaster", template: "%s | Evidence Atlas" },
  description: "A Scripture-first interactive argument map with source-linked biblical evidence and competing interpretations.",
};

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
