import { notFound } from "next/navigation";
import { PulitoPage } from "@/components/PulitoPage";
import { HERO_MOTIONS, type HeroMotion } from "@/components/hero/motions";
import { MotionSwitcher } from "@/components/hero/MotionSwitcher";

/**
 * The full site, once per hero motion, so each option can be judged in place
 * rather than as a thumbnail. Static at build time; the switcher is the only
 * client code these routes add.
 */
export function generateStaticParams() {
  return HERO_MOTIONS.map((m) => ({ mode: m.id }));
}

export const dynamicParams = false;

export default async function MotionPage({
  params,
}: PageProps<"/motion/[mode]">) {
  const { mode } = await params;
  const found = HERO_MOTIONS.find((m) => m.id === mode);
  if (!found) notFound();

  return (
    <>
      <MotionSwitcher current={found.id as HeroMotion} />
      <PulitoPage heroMode={found.id} />
    </>
  );
}
