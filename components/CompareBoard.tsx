"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DIRECTIONS } from "./DirectionSwitch";

/**
 * The comparison surface.
 *
 * Five live pages, in iframes rendered at a real device width and scaled to
 * fit — not screenshots, and not five copies of the components rendered
 * inline.
 *
 * Iframes, specifically, for a reason worth keeping. Each direction defines
 * its own colours, its own display face and its own sticky header, and each is
 * written assuming it owns the viewport. Rendered inline into one document
 * they would fight over `position: sticky`, over `100svh`, over
 * `:focus-visible`, and over any `@media` query keyed to viewport width — five
 * columns on a 27" screen are phone-width, so every direction would show its
 * mobile layout and the comparison would be of the wrong thing. An iframe
 * gives each one a real viewport, so what is on screen is what ships.
 *
 * The user asked for two different ways of looking, because they answer two
 * different questions, and one control cannot do both:
 *
 * - **BOARD** — all five at once. This is for "which of these is a different
 *   kind of thing", which is a question about the set and needs them adjacent.
 * - **FLICK** — one at a time, stepped with ← / →, each at a much larger
 *   scale. This is for "which of these is actually good", which is a question
 *   about one page and cannot be answered at 20% scale. Flicking rather than
 *   navigating matters: the frames stay mounted, so the page you come back to
 *   is still where you left it and the comparison is between two things you
 *   have both just read, not between one page and a memory of another.
 *
 * Same-origin, so reaching into `contentWindow` is legitimate here rather than
 * a trick. This whole file is review scaffolding and comes out when a
 * direction is chosen.
 */

const WIDTHS = {
  desktop: { w: 1440, h: 940, label: "Desktop" },
  phone: { w: 390, h: 844, label: "Phone" },
} as const;

type WidthKey = keyof typeof WIDTHS;
type View = "board" | "flick";

export function CompareBoard() {
  /*
    Phone is the DEFAULT width, and that is a judgement about the reader
    rather than about the board. PRODUCT.md puts this reader on a phone
    between site visits, so the phone column is the one that decides.

    It also happens to be the only width at which five panels are worth
    looking at. Five 1440px frames across a 1440px window put each column at
    ~270px, which is a scale of 0.19 and a 176px-tall stump — nothing about
    any direction is judgeable at 19%, and the rest of the screen is empty.
    Five 390px frames in the same columns run at about 0.69 and stand ~580px
    tall. The desktop width therefore caps at two columns and scrolls, which
    is the honest trade: an iframe stretched past its device height would show
    more page, but every `svh` and `vh` unit inside it would then be measuring
    a viewport no reader has, and this board's whole job is to show what
    ships.
  */
  const [width, setWidth] = useState<WidthKey>("phone");
  const [view, setView] = useState<View>("board");
  const [locked, setLocked] = useState(true);
  const [solo, setSolo] = useState(0);
  const [scale, setScale] = useState(0.2);

  const columnRef = useRef<HTMLDivElement>(null);
  const frames = useRef<(HTMLIFrameElement | null)[]>([]);

  const device = WIDTHS[width];

  /* Scale is measured from a real column rather than computed from a
     breakpoint: the board is 1, 2, 3 or 5 columns depending on the window and
     the view, and guessing which would put the frames at the wrong size on
     every layout but the one that was guessed.

     Capped at 1:1. A phone frame in a column wider than a phone would
     otherwise be scaled *up*, and a blown-up 390px page is a blurrier,
     larger-than-life thing that is no longer what the reader would see. */
  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;

    const measure = () => setScale(Math.min(1, el.clientWidth / device.w));
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [device.w, view]);

  /*
    The lock is driven by polling the frames from here on a timer, rather than
    by listening for `scroll` inside them.

    A scroll listener on each frame's own window is the obvious build and it is
    the one that does not work: a scaled, transformed iframe does not reliably
    fire scroll events to its own window in every engine, and this was measured
    failing — the frame's scrollY moved to 2200 while both a window-level and a
    document-level listener inside it counted zero events.

    A `requestAnimationFrame` poll is the obvious second build, and it has the
    same shape of problem: rAF is tied to the compositor and does not tick in a
    headless or non-painting context, which is exactly where this board gets
    checked. A timer runs in both. 40ms is under a fifth of the time it takes
    to flick a trackpad, so the followed panels read as attached rather than as
    catching up, and the tick is a handful of property reads.

    The rule behind both rewrites: this control's whole job is to be trusted
    while a decision is being made, so it is built on the mechanism that cannot
    silently do nothing rather than the one that is nominally more correct.
  */
  useEffect(() => {
    if (!locked) return;

    const last = DIRECTIONS.map(() => 0);
    const timer = setInterval(() => {
      const wins = frames.current.map((f) => f?.contentWindow ?? null);
      if (wins.length < DIRECTIONS.length || wins.some((w) => !w)) return;
      const live = wins as Window[];

      /* Whichever frame moved since the last tick is the one the reader is
         driving; the others follow it. */
      const driver = live.findIndex((w, i) => Math.abs(w.scrollY - last[i]) > 0.5);
      if (driver === -1) return;

      const source = live[driver];
      const travel =
        source.document.documentElement.scrollHeight - source.innerHeight;
      /* A frame with nothing to scroll would divide by zero and send NaN into
         the others, parking them at the top for the rest of the session. */
      const fraction = travel > 0 ? source.scrollY / travel : 0;

      live.forEach((win, i) => {
        if (i === driver) return;
        const range = Math.max(
          0,
          win.document.documentElement.scrollHeight - win.innerHeight,
        );
        const target = range * fraction;
        /* `instant` is required, not tidiness: every direction sets
           `scroll-behavior: smooth`, and a followed frame that animates
           towards its target is still moving on the next tick, reads as the
           driver, and they chase each other down the page. */
        if (Math.abs(win.scrollY - target) > 1) {
          win.scrollTo({ top: target, behavior: "instant" });
        }
      });

      live.forEach((w, i) => {
        last[i] = w.scrollY;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [locked]);

  const attach = useCallback(
    (index: number) => (frame: HTMLIFrameElement | null) => {
      frames.current[index] = frame;
    },
    [],
  );

  /*
    Keys. 1–5 select; in board view that means opening the page full size,
    and in flick view it means bringing that panel to the front without
    leaving. ← / → step, and they wrap — the fifth direction's neighbour is
    the first, and a dead end at either end turns a riffle into bookkeeping.
    F swaps the view, because the whole point of flicking is that it is
    faster than reaching for a control.
  */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      ) {
        return;
      }

      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        setView((v) => (v === "board" ? "flick" : "board"));
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const step = e.key === "ArrowRight" ? 1 : -1;
        setView("flick");
        setSolo((s) => (s + step + DIRECTIONS.length) % DIRECTIONS.length);
        return;
      }

      const index = DIRECTIONS.findIndex((d) => d.key === e.key);
      if (index === -1) return;
      e.preventDefault();
      if (view === "flick") setSolo(index);
      else window.location.href = DIRECTIONS[index].href;
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view]);

  const current = DIRECTIONS[solo];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 bg-[#141414]/95 px-5 py-3.5 backdrop-blur-md">
        <div>
          <h1 className="font-mono text-[12px] tracking-[0.2em] uppercase">
            Pulito · five directions
          </h1>
          <p className="mt-1 font-mono text-[10.5px] tracking-[0.12em] text-white/65 uppercase">
            {view === "board"
              ? "1–5 opens one full size · F or ← → to flick through"
              : `← → steps · 1–5 jumps · F returns to the board`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex border border-white/25">
            {(["board", "flick"] as View[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={`px-3.5 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors ${
                  view === key ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex border border-white/25">
            {(Object.keys(WIDTHS) as WidthKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setWidth(key)}
                aria-pressed={width === key}
                className={`px-3.5 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors ${
                  width === key
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {WIDTHS[key].label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLocked((v) => !v)}
            aria-pressed={locked}
            className={`border px-3.5 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors ${
              locked
                ? "border-white bg-white text-black"
                : "border-white/25 text-white/70 hover:text-white"
            }`}
          >
            Locked scroll
          </button>
        </div>
      </header>

      {/*
        Both views render the SAME five frames. They are never unmounted —
        only the wrapper's layout changes — so flicking costs nothing, keeps
        every panel's scroll position, and never reloads a page mid-comparison.
        `hidden` rather than conditional rendering is doing real work here.
      */}
      <div
        className={
          view === "board"
            ? width === "phone"
              ? "grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              : "grid gap-4 p-4 xl:grid-cols-2"
            : "p-4"
        }
      >
        {DIRECTIONS.map((d, i) => {
          const shown = view === "board" || i === solo;
          return (
            <section
              key={d.key}
              className={`min-w-0 ${shown ? "" : "hidden"} ${
                view === "flick" ? "mx-auto w-full max-w-[86rem]" : ""
              }`}
              aria-hidden={!shown}
            >
              <div className="flex items-end justify-between gap-3 pb-2.5">
                {/* The tagline goes on its own line rather than trailing the
                    name on one truncated row. It is the half that says what
                    the reader is comparing — "the quarry", "the cast court" —
                    and a single-line title cut it first. */}
                <h2 className="min-w-0 font-mono text-[11px] tracking-[0.18em] uppercase">
                  <span className="text-white/55">{d.key} ·</span> {d.label}
                  {/* Wraps, never truncates. Moving the tagline onto its own
                      line was not enough on its own — it kept `truncate` and
                      five columns still cut it to "The instituti…", which is
                      the same defect one line lower. The tagline is the half
                      that says what is being compared, so it is allowed the
                      second line it needs. */}
                  <span className="mt-0.5 block text-white/55 normal-case">
                    {d.tagline}
                  </span>
                </h2>
                <div className="flex shrink-0 items-center gap-2">
                  {view === "board" && (
                    <button
                      type="button"
                      onClick={() => {
                        setSolo(i);
                        setView("flick");
                      }}
                      className="border border-white/25 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase transition-colors hover:border-white hover:text-white"
                    >
                      Enlarge
                    </button>
                  )}
                  <a
                    href={d.href}
                    className="border border-white/25 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase transition-colors hover:border-white hover:text-white"
                  >
                    Open full
                  </a>
                </div>
              </div>

              {/* The measured column. The frame inside is rendered at the
                  device's real width and scaled, so the box has to be told the
                  scaled height explicitly — a transform does not affect
                  layout. Only the first visible column is measured, because
                  they are all the same width. */}
              <div
                ref={
                  (view === "board" && i === 0) || (view === "flick" && i === solo)
                    ? columnRef
                    : undefined
                }
                className="relative overflow-hidden border border-white/15 bg-white"
                style={{ height: device.h * scale }}
              >
                <iframe
                  ref={attach(i)}
                  src={d.href}
                  title={`${d.label} direction, ${device.label.toLowerCase()} width`}
                  width={device.w}
                  height={device.h}
                  className="absolute top-0 left-1/2 origin-top border-0"
                  style={{ transform: `translateX(-50%) scale(${scale})` }}
                />
              </div>
            </section>
          );
        })}
      </div>

      {view === "flick" && (
        <div className="flex items-center justify-center gap-3 px-5 pb-6">
          {DIRECTIONS.map((d, i) => (
            <button
              key={d.key}
              type="button"
              onClick={() => setSolo(i)}
              aria-current={i === solo ? "true" : undefined}
              aria-label={`Show ${d.label}`}
              className={`h-1.5 w-12 transition-colors ${
                i === solo ? "bg-white" : "bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
          <span className="ml-3 font-mono text-[10.5px] tracking-[0.14em] text-white/65 uppercase">
            {current.label}
          </span>
        </div>
      )}

      <p className="px-5 pb-10 font-mono text-[10.5px] leading-relaxed tracking-[0.1em] text-white/60 uppercase">
        Each panel is the real page, scrolling and clickable. The switcher bar
        is hidden inside these frames and appears on the full-size pages.
      </p>
    </div>
  );
}
