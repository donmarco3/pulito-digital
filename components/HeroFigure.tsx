"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * The hero plate, uncovered.
 *
 * Motivation: the page's idea is excavation, so the marble should arrive the
 * way something does when it is lifted out of the ground rather than simply
 * appearing. Two moves, both on transform and opacity only:
 *
 *   1. On load it settles once, from slightly oversized and slightly dim to
 *      its resting size. It does not loop.
 *   2. On scroll it drifts upward against the page at a fraction of the
 *      scroll rate, so the type moves past the stone rather than with it.
 *
 * The drift is driven by motion values, never React state, so it does not
 * re-render the tree on every frame.
 */
export function HeroFigure({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);

  return (
    <div
      ref={ref}
      aria-hidden
      /* Held back on phones: at 390 the copy runs across the figure, and a
         portrait at full strength behind body text is unreadable. */
      className="pointer-events-none absolute top-1/2 right-[-22%] -z-10 h-[62%] w-[62%] -translate-y-1/2 opacity-55 md:right-[-4%] md:h-[86%] md:w-[48%] md:opacity-100"
    >
      <motion.div
        className="relative h-full w-full"
        style={reduce ? undefined : { y, scale }}
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 68vw, 48vw"
          className="feather-plate object-cover object-center grayscale contrast-[1.18] brightness-[1.05]"
        />
      </motion.div>
    </div>
  );
}
