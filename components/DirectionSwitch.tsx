"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { directions, type DirectionKey } from "@/content/site";

/**
 * Review furniture: the way from any one direction to the other four.
 *
 * This is not part of any of the five worlds and is not meant to look like
 * one. It is a scaffold, and it comes out in the same commit as the four
 * losing directions — deleting it is this file plus one line in each page.
 *
 * Three things it has to get right:
 *
 * 1. **It hides itself inside the compare view.** The board renders all five
 *    in iframes, and five fixed switchers stacked in five scaled panels would
 *    be the loudest thing on that screen. The check is `window.self !==
 *    window.top`, and it runs through `useSyncExternalStore` so the server
 *    snapshot and the first client render agree — rendering the bar on the
 *    server and removing it on hydration would flash it into all five panels
 *    on every load of the board.
 *
 * 2. **1–5 jump, and ← / → step.** Comparing means flipping between pages
 *    fast and repeatedly, and a mouse trip to a corner control breaks that.
 *    Number keys are for going somewhere specific; the arrows are for the
 *    actual comparing motion, which is riffling back and forth through
 *    neighbours without deciding anything yet. Stepping wraps, because the
 *    fifth direction's neighbour is the first — a dead end at either end
 *    turns a riffle into a bookkeeping exercise.
 *
 * 3. **It stands down inside a field.** Every direction has a form on it, and
 *    a switcher that hijacks "4" while someone types a phone number is a bug,
 *    not a shortcut.
 *
 * It is a fixed bar over a page it is not part of, so it owes that page the
 * space it occupies. `--switch-bar` is declared here and consumed by every
 * direction's root as bottom padding; without it the bar sat across the hero's
 * primary action on a 390px screen — scaffolding covering the one control the
 * page exists to offer, which is a worse bug than anything it was built to
 * check. The variable, not a magic number in five files, so the bar can change
 * height in one place.
 */
export const SWITCH_BAR_CLEARANCE = "pb-[var(--switch-bar)]";

export const DIRECTIONS = (
  Object.entries(directions) as [DirectionKey, (typeof directions)[DirectionKey]][]
).map(([key, value]) => ({
  key,
  href: `/${key}`,
  label: value.name,
  tagline: value.tagline,
}));

/* An iframe check is not React state and never changes after mount, so it is
   read through a store with a constant server snapshot rather than an effect
   that would necessarily paint the wrong thing first. */
const subscribe = () => () => {};
const isFramed = () => window.self !== window.top;
const isFramedOnServer = () => false;

export function DirectionSwitch({ current }: { current: DirectionKey }) {
  const router = useRouter();
  const framed = useSyncExternalStore(subscribe, isFramed, isFramedOnServer);

  useEffect(() => {
    if (framed) return;

    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      /* Typing in the enquiry form must never navigate. `isContentEditable`
         covers the case a plain tag check misses. */
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      ) {
        return;
      }

      const index = DIRECTIONS.findIndex((d) => d.key === current);

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const step = event.key === "ArrowRight" ? 1 : -1;
        const next =
          (index + step + DIRECTIONS.length) % DIRECTIONS.length;
        event.preventDefault();
        router.push(DIRECTIONS[next].href);
        return;
      }

      if (event.key === "0") {
        event.preventDefault();
        router.push("/");
        return;
      }

      const hit = DIRECTIONS.find((d) => d.key === event.key);
      if (hit && hit.key !== current) {
        event.preventDefault();
        router.push(hit.href);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, framed, router]);

  if (framed) return null;

  return (
    <nav
      aria-label="Design directions"
      className="fixed bottom-0 left-0 z-70 flex w-full items-stretch gap-px border-t border-neutral-700 bg-neutral-900 text-[11px] tracking-[0.14em] text-neutral-400 uppercase"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <Link
        href="/"
        className="hidden shrink-0 items-center px-4 py-2.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white sm:flex"
      >
        Compare
      </Link>
      {DIRECTIONS.map((d) => {
        const active = d.key === current;
        return (
          <Link
            key={d.key}
            href={d.href}
            aria-current={active ? "page" : undefined}
            aria-label={`${d.label} — ${d.tagline}`}
            className={`flex flex-1 items-baseline justify-center gap-2 px-2 py-2.5 transition-colors sm:px-4 ${
              active
                ? "bg-white text-neutral-950"
                : "hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <span className={active ? "text-neutral-600" : "text-neutral-400"}>
              {d.key}
            </span>
            {/* The name is hidden below `sm`, not truncated. Five names at
                11px tracked do not fit 390px however they are cut, and
                "ULTRAMARI…" next to "GESS" is worse than a row of numerals
                that matches the 1–5 shortcut exactly. The full name stays on
                the link's accessible name either way. */}
            <span className="hidden truncate sm:inline">{d.label}</span>
          </Link>
        );
      })}
      <span className="hidden shrink-0 items-center px-4 py-2.5 text-neutral-400 lg:flex">
        1–5 · ← →
      </span>
    </nav>
  );
}
