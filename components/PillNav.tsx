"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * PLINTH's signature: the header that leaves the top of the page and becomes a
 * floating pill.
 *
 * The user named this specifically — "the nav bar is in that kind of a pill,
 * and the animation as it goes from the top of the page when you scroll into
 * the pill". So the transition is the point, not the end state, and it is
 * built to be watched:
 *
 * - Every animated property is on ONE element and transitions together over
 *   520ms on an exponential ease-out, so the bar contracts as a single object
 *   rather than as four properties finishing at four different times.
 * - `max-width` moves between two explicit values. Transitioning from `none`
 *   is a no-op in every engine and the pill would snap.
 * - The border is present in both states and only changes colour. Animating
 *   border-width would shift the contents by a pixel at each end, which is the
 *   kind of thing you cannot see but can feel.
 * - Blur belongs to the pill state alone, and it is a specific effect rather
 *   than decoration: the pill floats over the page's own content, and the
 *   backdrop is what stops the words underneath showing through the words on
 *   top.
 *
 * PLINTH is the direction with no chrome — no cards, no borders, no shadows
 * anywhere else on the page — so this is the one component allowed a surface
 * of its own, and it earns it by being the only thing that overlaps content.
 */

const LINKS = [
  { href: "#offer", label: "The offer" },
  { href: "#services", label: "What we do" },
  { href: "#process", label: "How it works" },
  { href: "#faq", label: "FAQ" },
] as const;

export function PillNav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    /* 72px, not 0: the trigger sits below the header's own resting height, so
       a one-pixel scroll does not flip it. Passive, because this listener
       never calls preventDefault and a non-passive one on scroll blocks the
       compositor on exactly the reader this page is for. */
    const onScroll = () => setStuck(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6">
      <div
        className={`mt-3 flex w-full items-center justify-between gap-4 border transition-[max-width,padding,border-radius,background-color,border-color,box-shadow] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          stuck
            ? "max-w-[46rem] rounded-full border-pli-line bg-pli/85 px-3 py-2 shadow-[0_14px_40px_-22px_rgb(20_19_15/0.55)] backdrop-blur-xl"
            : "max-w-[82rem] rounded-none border-transparent bg-transparent px-2 py-4 shadow-none sm:px-4"
        }`}
      >
        <a
          href="#top"
          className="font-archivo text-[17px] font-extrabold tracking-[-0.03em] text-pli-ink"
        >
          Pulito
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[13.5px] text-pli-ink-soft transition-colors hover:bg-pli-2 hover:text-pli-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#enquiry"
          className={`shrink-0 rounded-full bg-pli-accent font-archivo font-semibold whitespace-nowrap text-bone transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-pli-accent-deep ${
            stuck ? "px-4 py-2 text-[13px]" : "px-5 py-2.5 text-[13.5px]"
          }`}
        >
          {site.cta}
        </a>
      </div>
    </div>
  );
}
