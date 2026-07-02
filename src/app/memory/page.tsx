import { Suspense } from "react";
import { MemoryClient } from "@/components/MemoryClient";

export default function MemoryPage() {
  return (
    <Suspense>
      <MemoryClient />
    </Suspense>
  );
}
