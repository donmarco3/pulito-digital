import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/Hero";
import { HERO_MOTIONS } from "@/components/hero/motions";

/**
 * The hero on its own, for embedding in the compare view. It exists because
 * the hero's type is sized in `vw` and its height in `dvh`: rendered three
 * times inside one document those units resolve against the whole window and
 * the composition is a lie. In an iframe each one gets a real viewport.
 */
export function generateStaticParams() {
  return HERO_MOTIONS.map((m) => ({ mode: m.id }));
}

export const dynamicParams = false;

export default async function HeroFrame({
  params,
}: PageProps<"/motion/[mode]/frame">) {
  const { mode } = await params;
  const found = HERO_MOTIONS.find((m) => m.id === mode);
  if (!found) notFound();

  return (
    <div className="min-h-dvh bg-surface">
      <Hero mode={found.id} headingLevel="h2" />
    </div>
  );
}
