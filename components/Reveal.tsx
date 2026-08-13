import type { ReactNode } from "react";

/**
 * Section entrance: content rises into place as it is scrolled to, once.
 *
 * Scroll-driven CSS, and a server component — no client JavaScript, no
 * observer, no state.
 *
 * This replaced a Framer Motion version, and the reason is worth keeping.
 * That version set `initial={{ opacity: 0.25 }}`, which meant the
 * server-rendered HTML carried `opacity:0.25` on twenty-three blocks — every
 * section below the hero — and nothing removed it until the JavaScript
 * arrived and hydrated. Body copy at 25% measures 1.41:1 on the sheet. The
 * comment there claimed 0.25 existed "so nothing is invisible if the observer
 * never fires"; 1.41:1 *is* invisible, so the mitigation was the bug. On the
 * reader this page is for — a phone, on site, on whatever signal is going —
 * a stalled bundle left the whole page unreadable below the first screen.
 *
 * The CSS version cannot fail that way. A browser without `animation-timeline`
 * drops that one declaration, which leaves a zero-duration animation with
 * `both` fill: it resolves immediately to the finished state, so the fallback
 * for no support, and for no JavaScript at all, is simply the content.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

/**
 * Authored line breaks, above `sm` only.
 *
 * Each direction's headline is set on lines chosen for it — three lines of
 * Bodoni centred, four lines of Archivo flush left — and those choices are
 * made at desktop width. Forced onto a 390px screen the same breaks re-wrap
 * into five and six lines with two-word orphans stranded on their own, which
 * is a worse rag than the browser would have produced unaided.
 *
 * So the breaks are a desktop decision, applied only where they were decided:
 * below `sm` the headline is one string and `text-balance` does the work.
 */
export function BrokenHeadline({
  lines,
  headline,
}: {
  lines: readonly string[];
  headline: string;
}) {
  return (
    <>
      <span className="sm:hidden">{headline}</span>
      <span className="hidden sm:contents">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    </>
  );
}
