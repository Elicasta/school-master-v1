import { Suspense } from "react";
import { DrillClient } from "@/components/DrillClient";

export default function DrillPage() {
  return (
    <Suspense>
      <DrillClient />
    </Suspense>
  );
}
