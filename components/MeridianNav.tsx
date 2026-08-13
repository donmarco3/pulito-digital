"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * MERIDIAN's header: the pill mechanic borrowed from PLINTH, at the width the
 * user asked for.
 *
 * The instruction was specific — keep the pill, but "not so it shrinks, so it
 * stays as a pill but almost a full length of the screen". So the contraction
 * is deliberately small: 92rem to 80rem, which on a 1440px screen is a change
 * from edge-to-edge to about a 96px inset. The transition the user liked is
 * carried almost entirely by the OTHER properties — the ends rounding, a
 * hairline appearing, the ground going translucent and the blur switching on —
 * rather than by the bar getting narrower. A header that shrinks to a stub
 * pulls the eye away from the page; one that just hardens into a pill stays
 * furniture.
 *
 * Everything animates on one element over one duration so the bar resolves as
 * a single object. `max-width` moves between two explicit values because
 * transitioning from `none` is a no-op in every engine and the pill would
 * snap. The border is present in both states and only changes colour —
 * animating its width would shift the contents by a pixel at each end.
 *
 * The layout is a three-column grid FROM `md` UP, because the wordmark has to
 * sit dead centre regardless of how wide the links on the left and the action
 * on the right happen to be, and flex with `justify-between` would centre it
 * only by coincidence.
 *
 * Below `md` it is a plain flex row instead. The centred arrangement needs a
 * left column to balance the action, and on a phone there is nothing to put
 * there — the links are hidden — so the grid gave the empty column the same
 * `1fr` as the button, shoved the wordmark off centre anyway, and left a hole
 * on the left. Wordmark left, action right, which is what a phone header is.
 */

const LINKS = [
  { href: "#offer", label: "The offer" },
  { href: "#services", label: "What we do" },
  { href: "#process", label: "How it works" },
] as const;

export function MeridianNav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    /* 72px, below the header's own resting height, so a one-pixel scroll does
       not flip it. Passive: this listener never calls preventDefault, and a
       non-passive scroll listener blocks the compositor on exactly the phone
       this page is written for. */
    const onScroll = () => setStuck(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-5">
      <div
        className={`mt-3 flex w-full items-center justify-between gap-4 border transition-[max-width,padding,border-radius,background-color,border-color,box-shadow] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:grid md:grid-cols-[1fr_auto_1fr] ${
          stuck
            ? "max-w-[80rem] rounded-full border-mer-line bg-mer/90 px-4 py-2.5 shadow-[0_16px_44px_-26px_rgb(4_12_30/0.9)] backdrop-blur-xl sm:px-5"
            : "max-w-[92rem] rounded-none border-transparent bg-transparent px-2 py-4 shadow-none sm:px-4"
        }`}
      >
        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] text-mer-ink-soft transition-colors hover:text-mer-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* The wordmark alone. It was flanked by slash marks taken from the
            reference; the user asked for them out, and without them the
            centred wordmark has to hold the middle column on its own — which
            it does, because the grid gives it the centre regardless of what
            sits either side. */}
        <a href="#top" className="flex items-center md:justify-center">
          <span className="font-schibsted text-[19px] font-semibold tracking-[-0.02em] text-mer-ink">
            Pulito
          </span>
        </a>

        <div className="flex justify-end">
          <a
            href="#enquiry"
            className={`rounded-full bg-mer-accent font-schibsted font-semibold whitespace-nowrap text-mer-3 transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-mer-accent-deep ${
              stuck ? "px-4 py-2 text-[13px]" : "px-5 py-2.5 text-[13.5px]"
            }`}
          >
            {site.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
