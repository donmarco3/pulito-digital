"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Pane = {
  slug: string;
  numeral: string;
  name: string;
  blurb: string;
  swatches: string[];
  /**
   * Each variant's first viewport is a different height, so a single frame
   * height would show three sections of one and only the hero of another.
   * These are tuned per variant to land on roughly the same amount of page.
   */
  columnHeight: number;
};

const PANES: Pane[] = [
  {
    slug: "one",
    numeral: "I",
    name: "Stone",
    blurb:
      "Daylight limestone, malachite, Marcellus. Symmetrical: centred inscription, a four-bay colonnade, the enquiry on a full green field.",
    swatches: ["#edebe6", "#0f4d3a", "#141d19"],
    columnHeight: 2600,
  },
  {
    slug: "two",
    numeral: "II",
    name: "Palazzo",
    blurb:
      "Night, gilt hairlines, Bodoni. Asymmetric: the headline crosses the plate, services run as numbered auction lots, the process heading sticks.",
    swatches: ["#0a0a0c", "#c9a227", "#ede8de"],
    columnHeight: 2600,
  },
  {
    slug: "three",
    numeral: "III",
    name: "Porphyry",
    blurb:
      "Obsidian, imperial red, Cinzel capitals running off the edge. Maximalist: a marquee band, carved full-width slabs, a stone frieze.",
    swatches: ["#08070a", "#d1465f", "#f4f0ea"],
    // Its hero is a full viewport, so this pane needs more height to reach
    // the same depth of page as the other two.
    columnHeight: 3400,
  },
];

const DESKTOP_FRAME = 1280;
const PHONE_FRAME = 390;

/**
 * Renders a variant in an iframe scaled to fit its column.
 *
 * Below the breakpoint the frame is rendered at phone width instead of being
 * a shrunken desktop: comparing three 1280px layouts at 0.26 scale produces
 * four-pixel type and shows nothing the phone visitor would actually get.
 */
function ScaledFrame({ slug, height }: { slug: string; height: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [{ scale, frame }, setFit] = useState({ scale: 0, frame: DESKTOP_FRAME });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Which layout to render is a property of the viewer's device, not of how
    // narrow a comparison column happens to be. Keying this off column width
    // made three side-by-side columns on a desktop render phone layouts.
    const phone = window.matchMedia("(max-width: 767px)");

    const fit = () => {
      const width = host.getBoundingClientRect().width;
      const next = phone.matches ? PHONE_FRAME : DESKTOP_FRAME;
      setFit({ scale: Math.min(width / next, 1), frame: next });
    };

    const observer = new ResizeObserver(fit);
    observer.observe(host);
    phone.addEventListener("change", fit);
    return () => {
      observer.disconnect();
      phone.removeEventListener("change", fit);
    };
  }, []);

  const frameHeight = frame === PHONE_FRAME ? Math.round(height * 0.85) : height;

  return (
    <div
      ref={hostRef}
      className="w-full overflow-hidden border border-white/12 bg-[#141416]"
      style={{ height: scale ? frameHeight * scale : undefined }}
    >
      {/* Rendered only once a scale is known, so a full-width layout never
          flashes inside a narrow column. */}
      {scale > 0 && (
        <iframe
          src={`/${slug}`}
          title={`Variant ${slug}`}
          loading="lazy"
          width={frame}
          height={frameHeight}
          className="origin-top-left border-0"
          style={{ transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

export function ComparePanes() {
  const [mode, setMode] = useState<"columns" | "stacked">("columns");

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-8 pb-32 md:px-8">
      <div className="flex flex-col gap-6 border-b border-white/12 pb-7 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-sans text-[22px] font-medium tracking-tight text-white">
            Three directions for Pulito Digital
          </h1>
          <p className="mt-2 max-w-[76ch] font-sans text-[14px] leading-relaxed text-white/55">
            Same words in all three. Everything else differs: palette,
            lettering, how the hero is composed, how the services are laid out
            and how the page is paced. Scroll inside any panel, or open one
            full size to use it properly.
          </p>
        </div>

        <div
          role="group"
          aria-label="Comparison layout"
          className="flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1"
        >
          {(["columns", "stacked"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              aria-pressed={mode === option}
              className={`rounded-full px-4 py-2 font-sans text-[13px] transition-colors ${
                mode === option
                  ? "bg-white text-[#0c0c0e]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {option === "columns" ? "Side by side" : "Stacked"}
            </button>
          ))}
        </div>
      </div>

      <div
        className={
          mode === "columns"
            ? "mt-8 grid grid-cols-1 gap-7 md:grid-cols-3"
            : "mt-8 flex flex-col gap-14"
        }
      >
        {PANES.map((pane) => (
          <section key={pane.slug}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-white/45">
                  {pane.numeral}
                </span>
                <h2 className="font-sans text-[15px] font-medium text-white">
                  {pane.name}
                </h2>
                <span aria-hidden className="flex items-center gap-1">
                  {pane.swatches.map((hex) => (
                    <span
                      key={hex}
                      className="size-3 rounded-full ring-1 ring-white/20"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </span>
              </div>

              <Link
                href={`/${pane.slug}`}
                className="font-sans text-[13px] whitespace-nowrap text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
              >
                Open full size
              </Link>
            </div>

            <p className="mb-4 font-sans text-[13px] leading-relaxed text-white/45">
              {pane.blurb}
            </p>

            {/* Stacked mode is wider, so it shows more page, not less. */}
            <ScaledFrame
              slug={pane.slug}
              height={mode === "columns" ? pane.columnHeight : 4200}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
