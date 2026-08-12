"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/content/site";
import { MarbleField } from "./MarbleField";
import type { HeroMotion } from "./motions";

const SPRING = { stiffness: 90, damping: 22, mass: 0.6 };

export function Hero({
  mode,
  /** Compare view renders three at once; only the real page owns the h1. */
  headingLevel = "h1",
}: {
  mode: HeroMotion;
  headingLevel?: "h1" | "h2";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Pointer position within the hero, -0.5 to 0.5 on each axis. Motion values
  // only: a value that changes on every mousemove must never be React state.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  useEffect(() => {
    // Coarse pointers have no cursor to follow, and a hero that reacts to a
    // tap looks broken rather than alive. Those devices get the scroll drift
    // below and nothing else.
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [px, py, reduce]);

  // Shared by all three modes, so the comparison isolates the cursor
  // behaviour rather than the scroll behaviour. This is also the only motion
  // a touch device gets.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "-11%"]);

  const parallax = mode === "parallax" || mode === "live";
  const sheen = mode === "sheen" || mode === "live";

  // The slab moves with the pointer and the column against it: opposing
  // directions are what read as depth. Small numbers — this is a stone
  // building, not a parallax carousel.
  const fieldX = useTransform(sx, (v) => (parallax ? v * 26 : 0));
  const fieldY = useTransform(sy, (v) => (parallax ? v * 16 : 0));
  const columnX = useTransform(sx, (v) => (parallax ? v * -46 : 0));
  const columnY = useTransform(sy, (v) => (parallax ? v * -22 : 0));
  const typeX = useTransform(sx, (v) => (parallax ? v * 12 : 0));

  const sheenX = useTransform(sx, (v) => `${50 + v * 100}%`);
  const sheenY = useTransform(sy, (v) => `${50 + v * 100}%`);
  const sheenBg = useMotionTemplate`radial-gradient(46rem 46rem at ${sheenX} ${sheenY}, rgba(255,238,226,0.20), rgba(255,238,226,0.06) 38%, transparent 68%)`;

  // The column's own highlight. The wrapper is masked by the column's alpha
  // once and never again; only the ellipse inside it is transformed, so this
  // stays a composited move rather than a per-frame mask recalculation.
  const glintX = useTransform(sx, (v) => v * 260);
  const glintY = useTransform(sy, (v) => v * 200);

  const Heading = headingLevel;

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[min(calc(100dvh-70px),880px)] flex-col justify-center overflow-hidden px-5 py-16 md:px-8 md:py-20"
    >
      {/* ---------------------------------------------------------- the slab */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{ x: fieldX, y: fieldY, scale: parallax ? 1.04 : 1 }}
      >
        <MarbleField
          seed={11}
          veinClassName={mode === "live" && !reduce ? "vein-drift" : undefined}
        />
      </motion.div>

      {/* Reading scrim. Bone veins behind bone type destroy local contrast
          however good the ratio against the ground is, so the type sits in a
          pool of shade that lifts off toward the right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_18%_58%,rgba(10,5,8,0.86),rgba(10,5,8,0.55)_45%,rgba(10,5,8,0.18)_78%)]"
      />
      {/* Seats the slab into the near-black page above and below it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-surface to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-surface to-transparent"
      />

      {sheen && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
          style={{ backgroundImage: sheenBg }}
        />
      )}

      {/* -------------------------------------------------------- the column */}
      {/* On a wide screen it stands in front of the lettering — the whole
          point of the composition is that the words run behind the stone.
          The switch is at lg, not md: the shaft only comes forward once
          there is room for the whole copy block to the left of it, and at
          768 it lands straight across the subhead and the second action.
          Below that it moves right, drops behind the type and comes down in
          strength. Inert to the pointer either way, so it can never eat a
          click meant for the copy underneath. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[74%] -z-[5] w-[clamp(96px,15vw,190px)] -translate-x-1/2 pb-6 opacity-45 lg:left-[52%] lg:z-10 lg:pb-10 lg:opacity-100"
        style={{ x: columnX, y: reduce ? undefined : scrollY }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ y: columnY }}
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/img/column-solomonic.webp"
            alt=""
            fill
            priority
            sizes="190px"
            className="object-contain object-center drop-shadow-[0_28px_60px_rgba(10,5,8,0.75)]"
          />

          {sheen && !reduce && (
            <div
              className="absolute inset-0 overflow-hidden mix-blend-screen"
              style={{
                WebkitMaskImage: "url(/img/column-solomonic.webp)",
                maskImage: "url(/img/column-solomonic.webp)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 h-[55%] w-[420%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,244,232,0.55),transparent)] blur-xl"
                style={{ x: glintX, y: glintY }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ---------------------------------------------------------- the type */}
      <motion.div
        className="relative mx-auto w-full max-w-[1440px]"
        style={{ x: typeX }}
      >
        {/* The running header carries this same line from lg up, where it
            would otherwise run straight into the capital. The two are exactly
            complementary — it is never shown twice and never hidden. */}
        <p className="font-mono text-[10px] tracking-[0.3em] text-fg-muted uppercase lg:hidden">
          {site.location} &nbsp;/&nbsp; {site.disciplines}
        </p>

        {/* Set to run under the column rather than around it: the stone
            interrupts the lettering the way a pier interrupts an inscription.
            Line two is the long one, so it is the line the shaft crosses. */}
        {/* Sized so the three authored lines stay three lines on a wide
            screen and the whole hero — type, rule, subhead, action — still
            clears an 830px viewport without scrolling. */}
        <Heading className="mt-6 font-display text-[clamp(2.4rem,8vw,7.2rem)] leading-[0.92] tracking-[-0.02em] text-fg uppercase">
          {site.hero.headlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </Heading>

        {/* Capped so the copy block always stops short of the shaft once the
            shaft is standing in front at lg. */}
        <div className="mt-8 max-w-[38ch] md:mt-10">
          <div aria-hidden className="h-px w-full bg-gild" />
          <p className="mt-6 font-sans text-[1.0625rem] leading-[1.8] text-fg">
            {site.hero.subhead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            {/* Inverted against the rest of the page: on the slab the bone
                fill is the thing that reads, and the burgundy fill used
                everywhere below would sink into the stone. The gilt hairline
                is what keeps it in the same family. */}
            <a
              href="#enquiry"
              className="border border-gild bg-fg px-9 py-4 font-display text-[14px] tracking-[0.22em] whitespace-nowrap text-accent-deep uppercase transition-colors hover:bg-accent-deep hover:text-fg"
            >
              {site.cta}
            </a>
            <a
              href="#work"
              className="border-b border-gild pb-1 font-mono text-[13px] tracking-[0.1em] text-fg uppercase transition-colors hover:text-accent"
            >
              How it works
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
