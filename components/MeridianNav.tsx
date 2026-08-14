"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

/**
 * The site header: the pill mechanic at the width the user asked for, grown
 * from a one-page anchor bar into the navigation of a multi-page site.
 *
 * The pill itself is unchanged, because it was fought for: the contraction is
 * deliberately small (92rem to 80rem) and the transition is carried by the
 * ends rounding, a hairline appearing, the ground going translucent and the
 * blur switching on — "not so it shrinks, so it stays as a pill but almost a
 * full length of the screen". Everything animates on one element over one
 * duration so the bar resolves as a single object; `max-width` moves between
 * two explicit values because transitioning from `none` is a no-op in every
 * engine.
 *
 * What is new, and the shape rules it obeys:
 *
 * - LINKS ARE PAGES NOW. Services / Process / About on the left, the wordmark
 *   dead centre (a three-column grid from `md` up, because flex with
 *   `justify-between` would centre it only by coincidence), the enquiry
 *   action on the right. The current page's link is marked with the accent —
 *   `aria-current` carries it non-visually.
 *
 * - SERVICES IS A DISCLOSURE, not an ARIA menu. Three items do not need
 *   roving tabindex and typeahead; they need a button with `aria-expanded`
 *   and a panel of plain links. The panel is SQUARE with a hairline border —
 *   it holds content, so the shape rule says square — and it wears the same
 *   soft shadow the stuck pill does, because the elevation rule allows one
 *   shadow on floating nav furniture and this panel is nav furniture. Items
 *   come from `site.services`, so a service rename or re-slug cannot strand
 *   the dropdown.
 *
 * - THE PHONE GETS A REAL MENU. The old bar simply hid the links below `md`,
 *   which a one-page site got away with and a nine-page site cannot. The
 *   toggle is a pill (it is an action); the sheet it opens is a square panel
 *   hanging under the bar (it is structure), with the services grouped under
 *   the same mono label the enquiry section uses for its contact rows, and
 *   hairline rules between groups. While the sheet is open the bar hardens
 *   into its stuck state whatever the scroll position, so the pair reads as
 *   one object over the dimmed page.
 *
 * Both panels close on Escape, on a click outside, and on navigation. The
 * sheet locks body scroll while open and hands focus back to its toggle when
 * Escape closes it.
 */

const PAGES = [
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

/* A drawn chevron, not a glyph: the build's whole drawing vocabulary is
   hairline line-work in currentColor, and `▾` renders differently on every
   platform. `aria-hidden` — the button's `aria-expanded` already says what
   it does. */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 6"
      className={`h-1.5 w-2.5 transition-transform duration-300 ${open ? "-scale-y-100" : ""}`}
    >
      <path
        d="M1 1l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MeridianNav() {
  const [stuck, setStuck] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

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

  /* Navigation closes everything. `pathname` is the dependency on purpose:
     the panels hold links, so a route change is the one event that always
     means "done here". */
  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  /* The dropdown stands down on any click outside it and on Escape. */
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  /* The sheet locks the page behind it, and lets go on close, on Escape (which
     also returns focus to the toggle so a keyboard user is not stranded), and
     on the viewport growing past `md`, where the sheet is display:none but
     would otherwise still be holding the scroll hostage. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const isCurrent = useCallback(
    (href: string) => (pathname === href ? ("page" as const) : undefined),
    [pathname],
  );

  const hardened = stuck || menuOpen || servicesOpen;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 sm:px-5">
      <div
        className={`mt-3 flex w-full items-center justify-between gap-4 border transition-[max-width,padding,border-radius,background-color,border-color,box-shadow] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:grid md:grid-cols-[1fr_auto_1fr] ${
          hardened
            ? "max-w-[80rem] rounded-full border-mer-line bg-mer/90 px-4 py-2.5 shadow-[0_16px_44px_-26px_rgb(4_12_30/0.9)] backdrop-blur-xl sm:px-5"
            : "max-w-[92rem] rounded-none border-transparent bg-transparent px-2 py-4 shadow-none sm:px-4"
        }`}
      >
        <nav aria-label="Site" className="hidden items-center gap-7 md:flex">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-2 text-[13.5px] transition-colors hover:text-mer-ink ${
                servicesOpen || pathname.startsWith("/services")
                  ? "text-mer-ink"
                  : "text-mer-ink-soft"
              }`}
            >
              Services
              <Chevron open={servicesOpen} />
            </button>

            {/* Square, hairline-bordered, one soft shadow: nav furniture. */}
            <div
              id="services-menu"
              hidden={!servicesOpen}
              className="absolute top-full left-0 mt-4 w-64 border border-mer-line bg-mer/95 shadow-[0_16px_44px_-26px_rgb(4_12_30/0.9)] backdrop-blur-xl"
            >
              <ul className="divide-y divide-mer-line/60">
                {site.services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      aria-current={isCurrent(`/services/${service.slug}`)}
                      className={`block px-5 py-3.5 text-[14px] transition-colors hover:bg-mer-2/60 hover:text-mer-ink aria-[current]:text-mer-accent ${
                        pathname === `/services/${service.slug}`
                          ? "text-mer-ink"
                          : "text-mer-ink-soft"
                      }`}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              aria-current={isCurrent(page.href)}
              className={`text-[13.5px] transition-colors hover:text-mer-ink ${
                pathname === page.href ? "text-mer-ink" : "text-mer-ink-soft"
              }`}
            >
              {page.label}
            </Link>
          ))}
        </nav>

        {/* The wordmark alone, holding the centre column. On the way to any
            inner page it is also the way home. */}
        <Link href="/" className="flex items-center md:justify-center">
          <span className="font-schibsted text-[19px] font-semibold tracking-[-0.02em] text-mer-ink">
            Pulito
          </span>
        </Link>

        <div className="flex items-center justify-end gap-2.5">
          <Link
            href="/#enquiry"
            className={`rounded-full bg-mer-accent font-schibsted font-semibold whitespace-nowrap text-mer-3 transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-mer-accent-deep ${
              hardened ? "px-4 py-2 text-[13px]" : "px-5 py-2.5 text-[13.5px]"
            }`}
          >
            {site.cta}
          </Link>

          {/* The menu toggle: a pill, because it is an action. The icon is two
              hairline rules that cross into an X — drawn, in currentColor,
              like every other line on the build. */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-mer-line-strong text-mer-ink transition-colors hover:border-mer-ink md:hidden"
          >
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* The sheet: square structure hanging under the pill. It scrolls its
          own overflow on short landscape phones rather than clipping the
          last link. */}
      <div
        id="site-menu"
        hidden={!menuOpen}
        className="mt-2 max-h-[calc(100dvh-6rem)] w-full max-w-[80rem] overflow-y-auto border border-mer-line bg-mer/95 shadow-[0_16px_44px_-26px_rgb(4_12_30/0.9)] backdrop-blur-xl md:hidden!"
      >
        <nav aria-label="Site" className="px-6 py-6">
          <p className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
            Services
          </p>
          <ul className="mt-2 mb-6">
            {site.services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  aria-current={isCurrent(`/services/${service.slug}`)}
                  className={`block py-2.5 font-schibsted text-[1.35rem] font-semibold tracking-[-0.02em] transition-colors hover:text-mer-accent ${
                    pathname === `/services/${service.slug}`
                      ? "text-mer-accent"
                      : "text-mer-ink"
                  }`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="border-t border-mer-line pt-4">
            {PAGES.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  aria-current={isCurrent(page.href)}
                  className={`block py-2.5 font-schibsted text-[1.35rem] font-semibold tracking-[-0.02em] transition-colors hover:text-mer-accent ${
                    pathname === page.href ? "text-mer-accent" : "text-mer-ink"
                  }`}
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-mer-line pt-5 text-[13.5px] text-mer-ink-soft">
            {site.location} ·{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-mer-ink transition-colors hover:text-mer-accent"
            >
              {site.contactEmail}
            </a>
          </p>
        </nav>
      </div>
    </div>
  );
}
