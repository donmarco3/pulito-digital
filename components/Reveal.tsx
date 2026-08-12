"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Section entrance.
 *
 * One authored move per variant rather than the same fade everywhere: stone
 * settles straight down like a slab, palazzo draws in from the gutter, and
 * porphyry rises. Content starts at 25 percent opacity rather than fully
 * hidden, so nothing is invisible if the observer never fires.
 */
const MOVES = {
  settle: { y: 14, x: 0 },
  draw: { y: 0, x: -18 },
  rise: { y: 26, x: 0 },
} as const;

export function Reveal({
  children,
  delay = 0,
  move = "settle",
  className,
}: {
  children: ReactNode;
  delay?: number;
  move?: keyof typeof MOVES;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const from = MOVES[move];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0.25, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
