import type { Metadata } from "next";
import { ComparePanes } from "@/components/ComparePanes";
import { VariantSwitcher } from "@/components/VariantSwitcher";

export const metadata: Metadata = {
  title: "Pulito Digital | Three directions",
  robots: { index: false, follow: false },
};

export default function Compare() {
  return (
    <div data-v="compare" className="min-h-dvh bg-[#0c0c0e]">
      <main>
        <ComparePanes />
      </main>
      <VariantSwitcher />
    </div>
  );
}
