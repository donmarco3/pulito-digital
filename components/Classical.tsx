/**
 * The drawing system.
 *
 * The user's own taste is Greco-Roman, and their instruction was to weave some
 * of it in only if it could be done fast. So it is PARAMETRIC GEOMETRY, not
 * illustration: three primitives — an arcade, a run of fluting, a cornice —
 * each generated from a couple of numbers, each a handful of strokes. There is
 * no artwork in this repo to maintain, nothing to re-export when a token
 * moves, and every line takes its colour from the ground it is drawn on.
 *
 * All three are `aria-hidden`. They carry no information a reader needs; a
 * screen reader announcing "arcade" would be describing the wallpaper.
 *
 * Server components. The draw-on animation is CSS (`.stroke-in`), keyed to
 * `pathLength="1"` so the dash values never need remeasuring when a bay count
 * changes.
 */

const BAY = 120; /* width of one bay */
const SPRING = 70; /* the line the arches spring from */
const BASE = 145; /* the top of the plinth the piers stand on */
const RISE = 50; /* arch radius; the crown lands at SPRING - RISE */

/**
 * An arcade in outline: N round arches on piers, over a base rule.
 *
 * `draw` staggers each stroke so the arcade builds left to right instead of
 * appearing all at once — the only place on any of the three pages where the
 * classical layer moves.
 */
export function Arcade({
  bays = 5,
  className = "",
  strokeWidth = 1,
  draw = false,
}: {
  bays?: number;
  className?: string;
  strokeWidth?: number;
  draw?: boolean;
}) {
  const width = bays * BAY;

  const strokes: string[] = [];
  for (let i = 0; i < bays; i += 1) {
    const left = i * BAY + 10;
    const right = i * BAY + BAY - 10;
    strokes.push(`M ${left} ${SPRING} A ${RISE} ${RISE} 0 0 1 ${right} ${SPRING}`);
    strokes.push(`M ${left} ${SPRING} V ${BASE}`);
    strokes.push(`M ${right} ${SPRING} V ${BASE}`);
  }

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${BASE + 6}`}
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      /*
        The arcade's own aspect, declared inline.

        Without it, a `w-full` arcade in a box taller than the drawing gets
        letterboxed by `meet` — the arches shrink to fit the height and float
        centred in a wide empty field, which is exactly how the first build
        looked and why it read as an unfinished placeholder. With it, width
        alone determines height and the drawing always fills its box exactly.
        Callers that set an explicit height still win: an element with both
        dimensions ignores `aspect-ratio`, so the background uses that keep
        working unchanged.
      */
      style={{ aspectRatio: `${width} / ${BASE + 6}` }}
      className={className}
    >
      {strokes.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength="1"
          className={draw ? "stroke-in" : undefined}
          style={draw ? { ["--stroke-delay" as string]: `${0.25 + i * 0.045}s` } : undefined}
        />
      ))}
      <path
        d={`M 0 ${BASE} H ${width}`}
        pathLength="1"
        className={draw ? "stroke-in" : undefined}
        style={draw ? { ["--stroke-delay" as string]: "0.15s" } : undefined}
      />
    </svg>
  );
}

/**
 * A run of fluting: the vertical channels cut into a column shaft, flattened
 * out. Used as a texture band rather than as a picture of a column — at the
 * sizes it appears it reads as a measured rhythm, which is the point.
 */
export function Fluting({
  count = 24,
  className = "",
  strokeWidth = 1,
}: {
  count?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const gap = 8;
  const width = (count - 1) * gap;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} 40`}
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      className={className}
    >
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={`M ${i * gap} 0 V 40`} />
      ))}
    </svg>
  );
}

/**
 * A cornice: the stacked rules that cap a classical order, used here as the
 * divider between sections. Three weights, uneven spacing — an evenly spaced
 * trio would read as a border and not as a moulding.
 */
export function Cornice({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      vectorEffect="non-scaling-stroke"
      className={className}
    >
      <path d="M 0 0.5 H 100" strokeWidth="1" />
      <path d="M 0 3 H 100" strokeWidth="0.5" opacity="0.6" />
      <path d="M 0 7.5 H 100" strokeWidth="2" />
    </svg>
  );
}

/**
 * The reserved hero image box.
 *
 * The user is generating the real hero imagery separately and asked for a
 * placeholder in the meantime. So this is a real, correctly-proportioned slot
 * rather than a grey rectangle: it reserves the exact aspect the supplied
 * image will occupy, so dropping one in later is a one-line change with no
 * reflow anywhere on the page.
 *
 * The placeholder inside is deliberately finished-looking — a lit ground and
 * an arcade in the direction's own hairline — because these three pages are
 * being compared against each other, and a slot that reads as "missing" on all
 * three would make every hero look unfinished in exactly the same way. It is
 * not labelled as a placeholder on the page; the dimensions are recorded in
 * DESIGN.md, which is where whoever supplies the image will look.
 *
 * MERIDIAN's slot is 1600×900. It currently has NO consumer — the hero
 * picture went into the hero section itself — but the component stays with
 * the recorded aspect in `meridian.heroSlot`, so reinstating the plate is a
 * one-line change rather than an excavation. The PLINTH and LATTICE skins
 * left with their directions.
 */
export function HeroSlot({
  w,
  h,
  className = "",
}: {
  w: number;
  h: number;
  className?: string;
}) {
  const skin = {
    frame: "bg-mer-2 ring-1 ring-mer-line",
    wash:
      "bg-[radial-gradient(60%_70%_at_50%_112%,var(--color-mer-accent)_0%,transparent_66%)] opacity-[0.36]",
    line: "text-mer-accent/55",
    flute: "text-mer-accent/12",
    cornice: "text-mer-line-strong/50",
  };

  /*
    COMPOSED, not decorated. The first build put one small arcade at the foot
    of the box and left the top two thirds empty, which read as a slot waiting
    for something rather than as a graphic. Three elements now share the frame
    the way an elevation drawing does: a fluting rhythm behind everything, a
    cornice rule near the head, and an arcade standing on the base at a bay
    count low enough that the arches are large. Three bays, specifically —
    fewer bays means taller arches, and at 3 the arcade stands about
    three-quarters of the height of a 16:9 box.
  */
  return (
    <div
      className={`relative isolate overflow-hidden ${skin.frame} ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <div className={`bloom-breathe absolute inset-0 ${skin.wash}`} />
      <Fluting count={40} className={`absolute inset-0 h-full w-full ${skin.flute}`} />
      {/* An explicit width, not `inset-x`. An inline SVG is a replaced element:
          with `left` and `right` set but `width: auto` it resolves to its own
          intrinsic width — 100 user units — and the cornice rendered as a
          100px stub in the top-left corner instead of a rule across the
          drawing. */}
      <Cornice className={`absolute top-[10%] left-[7%] h-2 w-[86%] ${skin.cornice}`} />
      <Arcade
        bays={3}
        draw
        className={`absolute inset-x-0 bottom-0 w-full ${skin.line}`}
      />
    </div>
  );
}
