/**
 * The tweak bar's schema: what can be moved, and what it is called.
 *
 * Pure data and pure functions, deliberately kept out of the component. The bar
 * grew a second mode — clicking a single element rather than moving a token —
 * and the two modes share every face list, every unit and the contrast maths.
 * Splitting the description of the design system away from the UI that edits it
 * is what keeps that sharing honest.
 *
 * Nothing here imports React, and nothing here touches the DOM.
 */

/* ------------------------------------------------------------------ schema */

export type Control =
  | { kind: "colour"; prop: string; label: string; fallback: string; note?: string }
  | {
      kind: "range";
      prop: string;
      label: string;
      min: number;
      max: number;
      step: number;
      unit: string;
      fallback: number;
      /** At this value the override is cleared, not set — the stylesheet's own
          value comes back. Omitted from the export for the same reason. */
      auto?: number;
      /** What that value is called in the readout. Defaults to "auto". */
      autoLabel?: string;
      note?: string;
    }
  | {
      kind: "select";
      prop: string;
      label: string;
      options: { label: string; value: string }[];
      fallback: string;
      note?: string;
    };

/* ----------------------------------------------------------------- palette */

export const PALETTE: Control[] = [
  { kind: "colour", prop: "--color-mer", label: "Ground", fallback: "#12306e" },
  { kind: "colour", prop: "--color-mer-2", label: "Recessed band", fallback: "#0d2454" },
  { kind: "colour", prop: "--color-mer-3", label: "Deepest / footer", fallback: "#081a3e" },
  {
    kind: "colour",
    prop: "--color-mer-sky",
    label: "Hero sky",
    fallback: "#122c79",
    note: "Sampled off the top edge of the hero picture. Move it away from the picture's own blue and the join under the arcade becomes a visible seam on every phone.",
  },
  { kind: "colour", prop: "--color-mer-line", label: "Hairline", fallback: "#2f4c8c" },
  { kind: "colour", prop: "--color-mer-line-strong", label: "Field border", fallback: "#8ba0c8" },
  { kind: "colour", prop: "--color-mer-ink", label: "Ink", fallback: "#f3f1ec" },
  { kind: "colour", prop: "--color-mer-ink-soft", label: "Soft ink", fallback: "#bcc7de" },
  /* These fallbacks are the SHIPPED values and have to track `globals.css`:
     they seed the swatches when nothing is overridden, and the contrast panel
     measures against them. Left on the old verdigris they would report ratios
     for a palette the site no longer has. */
  { kind: "colour", prop: "--color-mer-accent", label: "Action", fallback: "#f5f3ed" },
  { kind: "colour", prop: "--color-mer-accent-deep", label: "Action hover", fallback: "#e2ded2" },
  { kind: "colour", prop: "--color-mer-alert", label: "Error", fallback: "#ffb3a7" },
];

/* ------------------------------------------------------------------- faces */

/**
 * A face is a CSS stack plus, optionally, the Google Fonts query that loads it.
 *
 * NOTHING HERE IS IN THE BUNDLE. The site loads its own four faces through
 * `next/font` in `app/layout.tsx`; every other family below is fetched by this
 * component, on demand, the first time it is selected. That is the whole reason
 * the list can be this long — a font picker that shipped twenty families to
 * every visitor would be a worse trade than not having the picker.
 */
export type Face = { label: string; stack: string; google?: string };

export const SERIFS: Face[] = [
  { label: "Libre Caslon Display — shipped", stack: "var(--font-caslon-src), Georgia, serif" },
  { label: "Bodoni Moda", stack: "'Bodoni Moda', Georgia, serif", google: "Bodoni+Moda:opsz,wght@6..96,400..900" },
  { label: "EB Garamond", stack: "'EB Garamond', Georgia, serif", google: "EB+Garamond:wght@400..800" },
  { label: "Instrument Serif", stack: "'Instrument Serif', Georgia, serif", google: "Instrument+Serif" },
  { label: "Fraunces", stack: "'Fraunces', Georgia, serif", google: "Fraunces:opsz,wght@9..144,300..900" },
  { label: "Playfair Display", stack: "'Playfair Display', Georgia, serif", google: "Playfair+Display:wght@400..900" },
  { label: "DM Serif Display", stack: "'DM Serif Display', Georgia, serif", google: "DM+Serif+Display" },
  { label: "Newsreader", stack: "'Newsreader', Georgia, serif", google: "Newsreader:opsz,wght@6..72,200..800" },
  { label: "Spectral", stack: "'Spectral', Georgia, serif", google: "Spectral:wght@200..800" },
  { label: "Georgia (system)", stack: "Georgia, 'Times New Roman', serif" },
];

export const GROTESKS: Face[] = [
  { label: "Schibsted Grotesk — shipped", stack: "var(--font-schibsted-src), system-ui, sans-serif" },
  { label: "Geist", stack: "var(--font-geist), system-ui, sans-serif" },
  { label: "Inter", stack: "'Inter', system-ui, sans-serif", google: "Inter:wght@100..900" },
  { label: "Archivo", stack: "'Archivo', system-ui, sans-serif", google: "Archivo:wght@100..900" },
  { label: "Bricolage Grotesque", stack: "'Bricolage Grotesque', system-ui, sans-serif", google: "Bricolage+Grotesque:opsz,wght@12..96,200..800" },
  { label: "Space Grotesk", stack: "'Space Grotesk', system-ui, sans-serif", google: "Space+Grotesk:wght@300..700" },
  { label: "Manrope", stack: "'Manrope', system-ui, sans-serif", google: "Manrope:wght@200..800" },
  { label: "Work Sans", stack: "'Work Sans', system-ui, sans-serif", google: "Work+Sans:wght@100..900" },
  { label: "system-ui", stack: "system-ui, sans-serif" },
];

export const BODIES: Face[] = [
  { label: "Geist — shipped", stack: "var(--font-geist), system-ui, sans-serif" },
  { label: "Inter", stack: "'Inter', system-ui, sans-serif", google: "Inter:wght@100..900" },
  { label: "Source Sans 3", stack: "'Source Sans 3', system-ui, sans-serif", google: "Source+Sans+3:wght@200..900" },
  { label: "IBM Plex Sans", stack: "'IBM Plex Sans', system-ui, sans-serif", google: "IBM+Plex+Sans:wght@100..700" },
  { label: "Schibsted Grotesk", stack: "var(--font-schibsted-src), system-ui, sans-serif" },
  { label: "Newsreader (serif body)", stack: "'Newsreader', Georgia, serif", google: "Newsreader:opsz,wght@6..72,200..800" },
  { label: "EB Garamond (serif body)", stack: "'EB Garamond', Georgia, serif", google: "EB+Garamond:wght@400..800" },
  { label: "system-ui", stack: "system-ui, sans-serif" },
];

export const MONOS: Face[] = [
  { label: "Geist Mono — shipped", stack: "var(--font-geist-mono), ui-monospace, monospace" },
  { label: "IBM Plex Mono", stack: "'IBM Plex Mono', ui-monospace, monospace", google: "IBM+Plex+Mono:wght@100..700" },
  { label: "JetBrains Mono", stack: "'JetBrains Mono', ui-monospace, monospace", google: "JetBrains+Mono:wght@100..800" },
  { label: "Space Mono", stack: "'Space Mono', ui-monospace, monospace", google: "Space+Mono:wght@400;700" },
  { label: "ui-monospace", stack: "ui-monospace, monospace" },
];

/**
 * The union of the four lists, DEDUPED BY STACK.
 *
 * The lists deliberately overlap — Newsreader and EB Garamond are offered as
 * both display serifs and serif body faces, Schibsted and Geist as both
 * grotesks and body faces — because the right menu depends on the job, not on
 * some canonical home for each family. That is fine while each list is rendered
 * on its own, and a bug the moment they are concatenated into one `<select>`:
 * the stack is the option's value, so a repeated family is a duplicate React
 * key and two options claiming the same value.
 *
 * Deduped on the stack rather than the label, because the stack is what the
 * select round-trips. First list to claim a family keeps its label.
 */
export const ALL_FACES: Face[] = [...SERIFS, ...GROTESKS, ...BODIES, ...MONOS].filter(
  (face, i, all) => all.findIndex((f) => f.stack === face.stack) === i,
);

/** Families already fetched, so a re-select never adds a second `<link>`. */
const loaded = new Set<string>();

export function loadFace(stack: string) {
  const face = ALL_FACES.find((f) => f.stack === stack);
  if (!face?.google || loaded.has(face.google)) return;
  loaded.add(face.google);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${face.google}&display=swap`;
  document.head.appendChild(link);
}

const facesToOptions = (faces: Face[]) =>
  faces.map((f) => ({ label: f.label, value: f.stack }));

export const FACES: Control[] = [
  {
    kind: "select",
    prop: "--font-display",
    label: "Heading face",
    fallback: "var(--font-caslon-src), Georgia, serif",
    options: facesToOptions(SERIFS.concat(GROTESKS)),
    note: "Everything wearing display-face or a t-h role. Loaded on demand — nothing but the shipped four is in the bundle.",
  },
  {
    kind: "range",
    prop: "--font-display-weight",
    label: "Heading weight",
    min: 100,
    max: 900,
    step: 100,
    unit: "",
    fallback: 400,
    note: "Caslon ships a single 400 and the browser will fake anything else — a synthesised bold smears its thin strokes. This is only real once you swap to a family with weights.",
  },
  {
    kind: "select",
    prop: "--font-control",
    label: "Control face",
    fallback: "var(--font-schibsted-src), system-ui, sans-serif",
    options: facesToOptions(GROTESKS.concat(SERIFS)),
    note: "The nav, the wordmark, every button.",
  },
  {
    kind: "select",
    prop: "--font-body",
    label: "Body face",
    fallback: "var(--font-geist), system-ui, sans-serif",
    options: facesToOptions(BODIES),
  },
  {
    kind: "select",
    prop: "--font-measure",
    label: "Measurement face",
    fallback: "var(--font-geist-mono), ui-monospace, monospace",
    options: facesToOptions(MONOS),
    note: "Process numerals, contact-row labels, the footer's group labels.",
  },
];

/* ------------------------------------------------------------------- roles */

export type Role = {
  key: string;
  label: string;
  /** Roles whose size is a clamp get a scale AND an absolute override. */
  clamped: boolean;
  /** Roles that hold running text get a measure control. */
  measured: boolean;
  defaults: { lead: number; track: number; size?: number };
};

export const ROLES: Role[] = [
  { key: "h1", label: "H1 — hero & page titles", clamped: true, measured: false, defaults: { lead: 0.94, track: -0.04 } },
  { key: "h2", label: "H2 — section headings", clamped: true, measured: false, defaults: { lead: 1.05, track: -0.03 } },
  { key: "h3", label: "H3 — small headings", clamped: true, measured: false, defaults: { lead: 1.2, track: -0.02 } },
  { key: "lead", label: "Lead — subheads", clamped: true, measured: true, defaults: { lead: 1.625, track: 0 } },
  { key: "body", label: "Body — running text", clamped: true, measured: true, defaults: { lead: 1.625, track: 0 } },
  { key: "label", label: "Label — the mono voice", clamped: false, measured: false, defaults: { lead: 1.4, track: 0.18, size: 10.5 } },
  { key: "control", label: "Control — nav & buttons", clamped: false, measured: false, defaults: { lead: 1.2, track: 0, size: 15 } },
];

export const CASES = [
  { label: "As written", value: "none" },
  { label: "UPPERCASE", value: "uppercase" },
  { label: "lowercase", value: "lowercase" },
  { label: "Capitalise", value: "capitalize" },
];

export const ALIGNS = [
  { label: "Left", value: "start" },
  { label: "Centre", value: "center" },
  { label: "Right", value: "end" },
  { label: "Justified", value: "justify" },
];

/** The type controls for one role, built rather than written out seven times. */
export function roleControls(role: Role): Control[] {
  const { key, defaults } = role;
  const out: Control[] = [
    {
      kind: "range",
      prop: `--${key}-scale`,
      label: "Scale",
      min: 0.4,
      max: 2.6,
      step: 0.01,
      unit: "",
      fallback: 1,
      note: "A multiplier over every instance, so the hierarchy between them survives. This is the control you want.",
    },
  ];

  if (role.clamped) {
    out.push({
      kind: "range",
      prop: `--${key}-size`,
      label: "Fixed size",
      min: 0,
      max: 160,
      step: 0.5,
      unit: "px",
      fallback: 0,
      auto: 0,
      note: "Replaces the fluid clamp with one flat number everywhere. 0 gives the clamp back. Elements that override the clamp inline — the page titles — ignore this and follow Scale instead.",
    });
  } else {
    out.push({
      kind: "range",
      prop: `--${key}-size`,
      label: "Base size",
      min: 8,
      max: 48,
      step: 0.5,
      unit: "px",
      fallback: defaults.size ?? 15,
      note: "The default for this role. Instances that set their own size ignore it — Scale is what reaches those.",
    });
  }

  out.push(
    {
      kind: "range",
      prop: `--${key}-lead`,
      label: "Leading",
      min: 0.7,
      max: 2.2,
      step: 0.01,
      unit: "",
      fallback: defaults.lead,
    },
    {
      kind: "range",
      prop: `--${key}-track`,
      label: "Tracking",
      min: -0.08,
      max: 0.32,
      step: 0.005,
      unit: "em",
      fallback: defaults.track,
    },
    {
      kind: "select",
      prop: `--${key}-case`,
      label: "Case",
      fallback: key === "label" ? "uppercase" : "none",
      options: CASES,
    },
    {
      kind: "select",
      prop: `--${key}-align`,
      label: "Alignment",
      fallback: "start",
      options: ALIGNS,
    },
    {
      kind: "range",
      prop: `--${key}-x`,
      label: "Nudge across",
      min: -400,
      max: 400,
      step: 1,
      unit: "px",
      fallback: 0,
      note: "A `translate`, not a `transform` — so it composes with the entrance animations instead of fighting them.",
    },
    {
      kind: "range",
      prop: `--${key}-y`,
      label: "Nudge down",
      min: -200,
      max: 200,
      step: 1,
      unit: "px",
      fallback: 0,
    },
  );

  if (role.measured) {
    out.push({
      kind: "range",
      prop: `--${key}-measure`,
      label: "Measure",
      min: 24,
      max: 120,
      step: 1,
      unit: "ch",
      fallback: key === "lead" ? 54 : 66,
      note: "65–75ch is the comfortable band for running text. Paragraphs that pin their own measure ignore this.",
    });
  }

  return out;
}

/* ------------------------------------------------------- placement & shell */

export const HERO: Control[] = [
  {
    kind: "select",
    prop: "--hero-place",
    label: "Block sits",
    fallback: "center",
    options: [
      { label: "Top of the section", value: "flex-start" },
      { label: "Centred", value: "center" },
      { label: "Bottom", value: "flex-end" },
      { label: "Spread apart", value: "space-between" },
    ],
  },
  {
    kind: "select",
    prop: "--hero-items",
    label: "Aligned to",
    fallback: "flex-start",
    options: [
      { label: "The left edge", value: "flex-start" },
      { label: "The centre", value: "center" },
      { label: "The right edge", value: "flex-end" },
      { label: "Full width", value: "stretch" },
    ],
    note: "This moves the BLOCK. Centring the text inside it is the H1 alignment control in Type.",
  },
  { kind: "range", prop: "--hero-indent", label: "Indent", min: 0, max: 480, step: 4, unit: "px", fallback: 0 },
  { kind: "range", prop: "--hero-min-h", label: "Section height", min: 40, max: 130, step: 1, unit: "svh", fallback: 100 },
  { kind: "range", prop: "--hero-pad-top", label: "Pad above", min: 0, max: 24, step: 0.25, unit: "rem", fallback: 8 },
  { kind: "range", prop: "--hero-pad-bottom", label: "Pad below", min: 0, max: 24, step: 0.25, unit: "rem", fallback: 6 },
];

export const LAYOUT: Control[] = [
  { kind: "range", prop: "--shell", label: "Content width", min: 40, max: 120, step: 0.5, unit: "rem", fallback: 86 },
  { kind: "range", prop: "--gutter", label: "Gutter (phone)", min: 0, max: 5, step: 0.125, unit: "rem", fallback: 1.25 },
  { kind: "range", prop: "--gutter-wide", label: "Gutter (desktop)", min: 0, max: 8, step: 0.125, unit: "rem", fallback: 2 },
  {
    kind: "range",
    prop: "--rhythm",
    label: "Vertical rhythm",
    min: 0.25,
    max: 2.5,
    step: 0.05,
    unit: "",
    fallback: 1,
    note: "Scales every band's padding at once — the fastest way to make the site feel tighter or airier.",
  },
  {
    kind: "range",
    prop: "--type-scale",
    label: "Everything type",
    min: 0.5,
    max: 2,
    step: 0.01,
    unit: "",
    fallback: 1,
    note: "One multiplier over all seven roles, on top of each role's own scale.",
  },
  {
    kind: "range",
    prop: "--pill",
    label: "Action radius",
    min: 0,
    max: 64,
    step: 1,
    unit: "px",
    fallback: 64,
    auto: 64,
    autoLabel: "full pill",
    note: "Every control on the site — the nav bar, every button, the submit. Take it to 0 and the pills become boxes, which is the fastest way to see what the radius was doing.",
  },
  {
    kind: "range",
    prop: "--box",
    label: "Structure radius",
    min: 0,
    max: 32,
    step: 1,
    unit: "px",
    fallback: 0,
    note: "Load-bearing at 0. Give a panel a radius and it stops reading as a cut into the ground and starts reading as a card.",
  },
];

export const MOTION: Control[] = [
  {
    kind: "range",
    prop: "--dim-opacity",
    label: "Dim depth",
    min: 0.3,
    max: 1,
    step: 0.01,
    unit: "",
    fallback: 0.72,
    note: "Measured, not chosen: soft ink on the ground composites to 4.60:1 at 0.72 and fails 4.5:1 at 0.70. The contrast panel above re-checks it live.",
  },
  { kind: "range", prop: "--dim-scale", label: "Dim recession", min: 0.9, max: 1, step: 0.001, unit: "", fallback: 0.985 },
  { kind: "range", prop: "--reveal-rise", label: "Entrance rise", min: 0, max: 120, step: 1, unit: "px", fallback: 34 },
  { kind: "range", prop: "--reveal-blur", label: "Entrance blur", min: 0, max: 24, step: 0.5, unit: "px", fallback: 6 },
];

/** Every control, flat — for unit lookup when applying and when exporting. */
const ALL_CONTROLS: Control[] = [
  ...PALETTE,
  ...FACES,
  ...ROLES.flatMap(roleControls),
  ...HERO,
  ...LAYOUT,
  ...MOTION,
];

export const CONTROLS_BY_PROP = new Map(ALL_CONTROLS.map((c) => [c.prop, c]));

/* ----------------------------------------------------------------- presets */

/**
 * Somewhere to jump from, rather than a set of blessed answers. Each is a
 * partial override map in the same shape the sliders write, so a preset is a
 * starting point you then drag around — not a mode the bar is in.
 */
export const PRESETS: { name: string; note: string; values: Record<string, string> }[] = [
  {
    name: "Shipped",
    note: "MERIDIAN as it stands. Same as Reset.",
    values: {},
  },
  {
    name: "Louder",
    note: "Type up, air down, tracking tightened — the site pitched at a bigger screen.",
    values: {
      "--type-scale": "1.14",
      "--h1-scale": "1.1",
      "--h1-track": "-0.05",
      "--rhythm": "0.8",
      "--shell": "94",
    },
  },
  {
    name: "Quiet editorial",
    note: "Smaller display, longer measure, much more air. Reads as a journal rather than a pitch.",
    values: {
      "--h1-scale": "0.72",
      "--h2-scale": "0.82",
      "--h1-track": "-0.02",
      "--body-measure": "72",
      "--lead-measure": "62",
      "--rhythm": "1.35",
      "--shell": "72",
    },
  },
  {
    name: "Centred",
    note: "Every role centred and the hero block centred with them.",
    values: {
      "--h1-align": "center",
      "--h2-align": "center",
      "--h3-align": "center",
      "--lead-align": "center",
      "--hero-items": "center",
    },
  },
  {
    name: "Square",
    note: "The shape rule switched off — pills become boxes. A test, not a proposal.",
    values: { "--pill": "0" },
  },
];

/* --------------------------------------------------------------- contrast */

/**
 * WCAG contrast, computed live from whatever the palette currently is.
 *
 * This is the one part of the bar that is not a convenience. DESIGN.md records
 * a measured ratio beside every colour token, and a tool that lets those
 * colours be dragged without re-measuring would quietly destroy the property
 * those numbers are asserting. So they re-derive on every change, and anything
 * failing is called out rather than left to be noticed later.
 */
function srgbToLinear(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const m = /^#?([\da-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function ratio(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Composite a foreground over a ground at the given alpha — what the dim does. */
export function over(fg: string, bg: string, alpha: number) {
  const f = /^#?([\da-f]{6})$/i.exec(fg.trim());
  const b = /^#?([\da-f]{6})$/i.exec(bg.trim());
  if (!f || !b) return null;
  const fn = parseInt(f[1], 16);
  const bn = parseInt(b[1], 16);
  const mix = (shift: number) => {
    const fc = (fn >> shift) & 255;
    const bc = (bn >> shift) & 255;
    return Math.round(fc * alpha + bc * (1 - alpha));
  };
  return `#${[16, 8, 0].map((s) => mix(s).toString(16).padStart(2, "0")).join("")}`;
}

/** The pairs that actually appear on the site, with the floor each must clear. */
export const PAIRS: { label: string; fg: string; bg: string; min: number; dim?: boolean }[] = [
  { label: "Ink on ground", fg: "--color-mer-ink", bg: "--color-mer", min: 4.5 },
  { label: "Soft ink on ground", fg: "--color-mer-ink-soft", bg: "--color-mer", min: 4.5 },
  { label: "Soft ink on band", fg: "--color-mer-ink-soft", bg: "--color-mer-2", min: 4.5 },
  { label: "Soft ink, dimmed", fg: "--color-mer-ink-soft", bg: "--color-mer", min: 4.5, dim: true },
  { label: "Ink on hero sky", fg: "--color-mer-ink", bg: "--color-mer-sky", min: 4.5 },
  { label: "Action on ground", fg: "--color-mer-accent", bg: "--color-mer", min: 3 },
  { label: "Label on action", fg: "--color-mer-3", bg: "--color-mer-accent", min: 4.5 },
  { label: "Label on hover", fg: "--color-mer-3", bg: "--color-mer-accent-deep", min: 4.5 },
  /* Measured on the GROUND, not on the recessed band: the enquiry form was
     flattened onto `--color-mer`, so that is the surface a field border and an
     error line actually sit on now. Measuring the old panel would report a
     ratio for a surface the form no longer uses — and it is the friendlier of
     the two, which is the wrong way for a check to be wrong. */
  { label: "Field border on ground", fg: "--color-mer-line-strong", bg: "--color-mer", min: 3 },
  { label: "Error on ground", fg: "--color-mer-alert", bg: "--color-mer", min: 4.5 },
];

