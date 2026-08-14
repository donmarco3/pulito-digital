"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/**
 * The sticky-sidebar showcase — MERIDIAN's body, and the thing the user asked
 * for by name after looking at Dali's solutions section.
 *
 * It is worth recording what that section ACTUALLY is, because two plausible
 * readings of "a sidebar that scrolls through" are both wrong and both cost a
 * day to build. It is not a tab strip that swaps a panel on click, and it is
 * not a pinned section that hijacks the scroll to advance through slides. It
 * is the plainest of the three: a two-column grid whose left column is
 * `position: sticky`, whose right column is a normal stack of very tall
 * panels, and a scrollspy that marks the link belonging to whichever panel is
 * currently being read. Read out of their stylesheet rather than guessed:
 *
 *   .showcase     grid-template-columns: minmax(13.5rem,.28fr) minmax(0,1fr)
 *   .sidebarInner position: sticky; top: clamp(5.5rem,14vh,8.5rem)
 *   .panel        min-height: min(82vh,48rem); border-bottom: 1px
 *   .sidebarLink[aria-current=location]  border-left-color: accent;
 *                                        transform: translateX(.25rem)
 *
 * Those proportions are kept. The 82vh panel height is the load-bearing one:
 * it is what gives the sticky column enough scroll distance to feel like it is
 * doing something, and a panel sized to its own content instead would make the
 * whole mechanism pointless.
 *
 * The mobile behaviour is theirs too, and it is the part most builds of this
 * pattern get wrong by simply hiding the sidebar. Below `lg` the grid collapses
 * and the sidebar becomes a sticky horizontal chip bar under the header, with
 * the active state moving from a left border to a bottom border. The reader
 * keeps the wayfinding on the device they are actually holding.
 */

type Item = (typeof site.services)[number];

const PANEL_ID = (code: string) => `service-${code}`;

export function Solutions({ items }: { items: readonly Item[] }) {
  const [active, setActive] = useState<string>(PANEL_ID(items[0].code));
  const panels = useRef(new Map<string, Element>());

  useEffect(() => {
    /*
      A READ LINE, not an observer band, and the choice is deliberate.

      The obvious build is an IntersectionObserver with a thin `rootMargin`
      band, the way the page-level dimming works. It was built that way first
      and it did not mark the right panel: with panels this tall, exactly which
      one is "intersecting a 10% band" depends on scroll velocity and on the
      order the entries arrive in, and a callback that only ever sees the
      entries that CHANGED cannot answer "which of the three is current" — it
      only knows which one just crossed. Panels that never re-cross keep a
      stale marker.

      So the active panel is COMPUTED from all three every time, rather than
      inferred from whichever one happened to fire: the current panel is the
      last one whose top edge has passed a line 30% down the viewport. That is
      a total function of scroll position, it cannot go stale, and it produces
      the same answer whether the reader arrives by scrolling, by deep link, or
      by restoring a scroll position on reload.

      Throttled to one read per frame. Three `getBoundingClientRect` calls in a
      rAF callback is cheaper than the layout the browser is doing anyway, and
      the listener is passive so it never blocks the compositor.
    */
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = PANEL_ID(items[0].code);
      for (const [id, el] of panels.current) {
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <div className="grid border border-mer-line lg:grid-cols-[minmax(13.5rem,0.28fr)_minmax(0,1fr)]">
      {/*
        Two sticky positions, one per layout. On a phone this is a chip bar
        pinned under the page header, so `top` has to clear the header; on
        desktop it is a column pinned partway down the viewport, and the
        `max-height` plus `overflow-y` stop a long list from being cut off on
        a short screen. `bg-mer` is not decoration on the mobile bar — without
        it the panel text scrolls visibly underneath the chips.
      */}
      {/* 4.25rem clears the floating nav pill, which is 12px of margin plus
          its own height — at 3.6rem the chips tucked under it. `bg-mer-2`
          rather than `bg-mer`, because this bar sits inside a `mer-2` section
          and a `mer` strip reads as a seam across the box. */}
      <aside className="sticky top-[4.25rem] z-30 border-b border-mer-line bg-mer-2 lg:static lg:z-auto lg:border-r lg:border-b-0 lg:bg-transparent">
        <div className="lg:sticky lg:top-[clamp(5.5rem,14vh,8.5rem)] lg:max-h-[calc(100vh-clamp(6rem,16vh,10rem))] lg:overflow-y-auto lg:px-6 lg:py-10">
          <nav
            aria-label="Services"
            className="flex gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none] lg:grid lg:gap-1 lg:overflow-visible lg:px-0 lg:py-0 [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const id = PANEL_ID(item.code);
              const on = active === id;
              return (
                <a
                  key={item.code}
                  href={`#${id}`}
                  aria-current={on ? "location" : undefined}
                  className={`shrink-0 border-b-2 px-3 py-2.5 text-[15px] font-medium whitespace-nowrap transition-[color,border-color,transform] duration-200 lg:border-b-0 lg:border-l-2 lg:py-2 lg:pr-0 lg:pl-3 ${
                    on
                      ? "border-mer-accent text-mer-ink lg:translate-x-1"
                      : "border-transparent text-mer-ink-soft/70 hover:text-mer-ink lg:hover:translate-x-0.5"
                  }`}
                >
                  {item.title}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      <div>
        {items.map((item) => {
          const id = PANEL_ID(item.code);
          return (
            <article
              key={item.code}
              id={id}
              ref={(el) => {
                if (el) panels.current.set(id, el);
                else panels.current.delete(id);
              }}
              /* `scroll-margin-top` clears both the page header and the mobile
                 chip bar, so a panel jumped to from the sidebar does not
                 arrive underneath the control that sent you there. */
              className="flex min-h-[min(82vh,48rem)] scroll-mt-32 flex-col justify-center border-b border-mer-line/70 px-6 py-16 last:border-b-0 sm:px-10 sm:py-20 lg:px-14"
            >
              <h3 className="max-w-[14ch] display-face text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.03em]">
                {item.title}
              </h3>

              <p className="mt-6 max-w-[56ch] text-[1.08rem] leading-relaxed text-mer-ink-soft">
                {item.body}
              </p>

              {/* A ruled list, not three cards. Cards here would put a second
                  container language inside a section that is already a box
                  inside a grid. */}
              <dl className="mt-12 max-w-[62ch]">
                {item.points.map((point) => (
                  <div
                    key={point.title}
                    className="border-t border-mer-line py-5 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-8"
                  >
                    <dt className="font-schibsted text-[1.02rem] font-semibold text-mer-ink">
                      {point.title}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-mer-ink-soft sm:mt-0">
                      {point.body}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#enquiry"
                className="mt-12 inline-block self-start border-b border-mer-accent pb-1 font-schibsted text-[15px] font-semibold text-mer-ink transition-colors hover:text-mer-accent"
              >
                {site.cta}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
