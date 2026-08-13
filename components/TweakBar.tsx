"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { plates, type Plate } from "@/content/site";

/**
 * The tweak bar: live, aggressive editing of the page it sits on.
 *
 * It exists because a landing page is argued about in specifics — "the blue is
 * too cold", "the headline wants to be bigger", "try the other head" — and the
 * loop of edit / rebuild / look is far too slow for that conversation. This
 * closes the loop to zero.
 *
 * Three decisions shape the whole thing:
 *
 * 1. **It moves CSS custom properties, not React state.** Every control writes
 *    to `document.documentElement.style`, so the page re-paints without
 *    re-rendering — a slider stays smooth with the whole document open. It
 *    also means the page stays a SERVER component: this bar is the only thing
 *    on the site that hydrates, and a visitor who never opens it pays nothing.
 *
 * 2. **The defaults live in the stylesheet, not here.** `globals.css` holds
 *    the real design; this file only overrides. Delete the bar and the page is
 *    unchanged, which is the property that makes it safe to keep around.
 *
 * 3. **It can hand the changes back.** A tweak tool that cannot tell you what
 *    you changed is a toy — you end up with a look you like and no way to
 *    ship it. EXPORT writes a paste-ready block: the CSS overrides for
 *    `globals.css`, and any copy you edited keyed by its path in
 *    `content/site.ts`.
 *
 * It never renders for a real visitor: development only, or `?tweak` on the
 * URL for a deployed preview.
 */

/* ------------------------------------------------------------------ schema */

type Control =
  | {
      kind: "colour";
      /* The Tailwind `@theme` property this overrides. Utilities already
         reference these, so setting one repaints every `bg-ultra` on the
         page without the page knowing anything about it. */
      prop: string;
      label: string;
      fallback: string;
    }
  | {
      kind: "range";
      prop: string;
      label: string;
      min: number;
      max: number;
      step: number;
      unit: string;
      fallback: number;
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

const PALETTE: Control[] = [
  { kind: "colour", prop: "--color-ultra", label: "Ground", fallback: "#12306e" },
  { kind: "colour", prop: "--color-ultra-2", label: "Recessed band", fallback: "#0d2454" },
  { kind: "colour", prop: "--color-ultra-rule", label: "Hairline", fallback: "#2f4c8c" },
  { kind: "colour", prop: "--color-ultra-rule-strong", label: "Field border", fallback: "#8ba0c8" },
  { kind: "colour", prop: "--color-ultra-bone", label: "Text", fallback: "#f3f1ec" },
  { kind: "colour", prop: "--color-ultra-bone-soft", label: "Soft text", fallback: "#bcc7de" },
  { kind: "colour", prop: "--color-ultra-signal", label: "Action fill", fallback: "#e8e3d6" },
];

const TYPE: Control[] = [
  {
    kind: "select",
    prop: "--font-caslon",
    label: "Display face",
    fallback: "var(--font-caslon-src), Georgia, serif",
    options: [
      { label: "Libre Caslon Display", value: "var(--font-caslon-src), Georgia, serif" },
      { label: "Bodoni Moda", value: "var(--font-bodoni-src), Georgia, serif" },
      { label: "EB Garamond", value: "var(--font-garamond-src), Georgia, serif" },
      { label: "Bricolage Grotesque", value: "var(--font-bricolage-src), sans-serif" },
      { label: "Archivo", value: "var(--font-archivo-src), sans-serif" },
    ],
    note: "Three of these load only for this picker. Once the lettering is settled they come out of app/layout.tsx — they are the page's largest remaining weight.",
  },
  { kind: "range", prop: "--h1-size-px", label: "Headline size", min: 32, max: 160, step: 1, unit: "px", fallback: 0, note: "Overrides the fluid clamp. 0 restores it." },
  { kind: "range", prop: "--h1-lead", label: "Headline leading", min: 0.8, max: 1.4, step: 0.01, unit: "", fallback: 0.94 },
  { kind: "range", prop: "--h1-track", label: "Headline tracking", min: -0.06, max: 0.12, step: 0.005, unit: "em", fallback: -0.015 },
  { kind: "range", prop: "--h2-size-px", label: "Section heading", min: 20, max: 90, step: 1, unit: "px", fallback: 0, note: "0 restores the fluid clamp." },
  { kind: "range", prop: "--sub-size", label: "Subhead", min: 13, max: 28, step: 0.5, unit: "px", fallback: 17 },
  { kind: "range", prop: "--body-size", label: "Body", min: 13, max: 22, step: 0.5, unit: "px", fallback: 16 },
  { kind: "range", prop: "--measure", label: "Measure", min: 40, max: 90, step: 1, unit: "ch", fallback: 62, note: "65–75ch is the comfortable band for running text." },
];

const LAYOUT: Control[] = [
  { kind: "range", prop: "--shell", label: "Content width", min: 56, max: 110, step: 1, unit: "rem", fallback: 88 },
  { kind: "range", prop: "--rhythm", label: "Section rhythm", min: 0.5, max: 1.8, step: 0.05, unit: "", fallback: 1, note: "Scales every band's vertical padding at once." },
  {
    kind: "range",
    prop: "--radius",
    label: "Corner radius",
    min: 0,
    max: 24,
    step: 1,
    unit: "px",
    fallback: 0,
    note: "Load-bearing at 0. The only curves on this page are inside the photograph; give a button a radius and the carved shoulder becomes decoration.",
  },
];

const PLATE: Control[] = [
  { kind: "range", prop: "--plate-col", label: "Plate column", min: 24, max: 62, step: 1, unit: "%", fallback: 46 },
  { kind: "range", prop: "--plate-pos-x", label: "Crop across", min: 0, max: 100, step: 1, unit: "%", fallback: 50 },
  { kind: "range", prop: "--plate-pos-y", label: "Crop down", min: 0, max: 100, step: 1, unit: "%", fallback: 38 },
  { kind: "range", prop: "--plate-bright", label: "Brightness", min: 0.4, max: 1.6, step: 0.01, unit: "", fallback: 1 },
  { kind: "range", prop: "--plate-contrast", label: "Contrast", min: 0.6, max: 1.8, step: 0.01, unit: "", fallback: 1 },
];

/** Every control, flat, for unit lookup when applying and exporting. */
const ALL_CONTROLS: Control[] = [...PALETTE, ...TYPE, ...LAYOUT, ...PLATE];

const GROUPS: { title: string; controls: Control[] }[] = [
  { title: "Palette", controls: PALETTE },
  { title: "Type", controls: TYPE },
  { title: "Layout", controls: LAYOUT },
  { title: "Photograph", controls: PLATE },
];

const STORE_KEY = "pulito.tweaks.v1";

/* ------------------------------------------------------------------ store */

type TweakState = {
  /** Whether the bar may render at all. False on the server, always. */
  enabled: boolean;
  /** Custom property → value, for everything the sliders and swatches move. */
  values: Record<string, string>;
  heroPlate: keyof typeof plates;
  figurePlate: keyof typeof plates;
  screen: boolean;
  vignette: boolean;
};

const DEFAULTS: TweakState = {
  enabled: false,
  values: {},
  heroPlate: "caracalla",
  figurePlate: "diadoumenos",
  screen: true,
  vignette: true,
};

/**
 * A tiny external store, rather than `useState` seeded from an effect.
 *
 * The natural shape — restore from `localStorage` in a `useEffect`, then
 * `setState` — is the cascading-render pattern React now flags, and the flag
 * is fair: `localStorage` and the URL are external systems, and
 * `useSyncExternalStore` is what external systems are for. It also buys the
 * property that matters here for free: the server snapshot is a constant
 * `enabled: false`, so the first client render agrees with the server and the
 * panel is never briefly painted into a page that should not have it.
 *
 * The snapshot is a STRING, deliberately. `getSnapshot` must return a stable
 * reference or React re-renders forever, and a serialized snapshot is stable
 * by construction; the component parses it once behind a `useMemo`.
 */
const SERVER_SNAPSHOT = JSON.stringify(DEFAULTS);

let snapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

const store = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => snapshot,
  getServerSnapshot: () => SERVER_SNAPSHOT,

  /** Called once on mount: decide whether to show, and restore any session. */
  hydrate() {
    const enabled =
      process.env.NODE_ENV !== "production" ||
      new URLSearchParams(window.location.search).has("tweak");

    let restored: Partial<TweakState> = {};
    try {
      restored = JSON.parse(window.localStorage.getItem(STORE_KEY) ?? "{}");
    } catch {
      /* A corrupt entry must never take the page down with it. */
    }

    const next = { ...DEFAULTS, ...restored, enabled };
    snapshot = JSON.stringify(next);
    listeners.forEach((l) => l());
  },

  update(patch: Partial<TweakState>) {
    const next = { ...(JSON.parse(snapshot) as TweakState), ...patch };
    snapshot = JSON.stringify(next);
    /* `enabled` is derived from the environment on every load, so persisting
       it would let a stale entry decide whether the tool appears. */
    window.localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        values: next.values,
        heroPlate: next.heroPlate,
        figurePlate: next.figurePlate,
        screen: next.screen,
        vignette: next.vignette,
      }),
    );
    listeners.forEach((l) => l());
  },

  clear() {
    const enabled = (JSON.parse(snapshot) as TweakState).enabled;
    snapshot = JSON.stringify({ ...DEFAULTS, enabled });
    window.localStorage.removeItem(STORE_KEY);
    listeners.forEach((l) => l());
  },
};

/* --------------------------------------------------------------- contrast */

/**
 * WCAG contrast, computed live from whatever the palette currently is.
 *
 * This is the one part of the bar that is not a convenience. The design system
 * records a measured ratio beside every colour token, and a tool that lets
 * those colours be dragged without re-measuring would quietly destroy the
 * property those comments are asserting. So the numbers re-derive on every
 * change, and anything failing is called out rather than left to be noticed.
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

function ratio(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Pairs that actually appear on the page, with the floor each must clear. */
const PAIRS: { label: string; fg: string; bg: string; min: number; why: string }[] = [
  { label: "Text on ground", fg: "--color-ultra-bone", bg: "--color-ultra", min: 4.5, why: "body copy" },
  { label: "Soft text on ground", fg: "--color-ultra-bone-soft", bg: "--color-ultra", min: 4.5, why: "subhead, service copy, credits" },
  { label: "Soft text on band", fg: "--color-ultra-bone-soft", bg: "--color-ultra-2", min: 4.5, why: "the recessed sections" },
  { label: "Action label on fill", fg: "--color-obsidian", bg: "--color-ultra-signal", min: 4.5, why: "the button's own text" },
  { label: "Field border on band", fg: "--color-ultra-rule-strong", bg: "--color-ultra-2", min: 3, why: "non-text UI, WCAG 1.4.11" },
];

/* ------------------------------------------------------------------- view */

export function TweakBar() {
  const raw = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const { enabled, values, heroPlate, figurePlate, screen, vignette } = useMemo(
    () => JSON.parse(raw) as TweakState,
    [raw],
  );

  /* Panel-local UI, which is never restored and never persisted: reopening a
     page should show it as the reader sees it, not mid-edit. */
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    store.hydrate();
  }, []);

  /* Apply. The two `*-size-px` props are special: they override a fluid clamp
     with a fixed size, and 0 means "give the clamp back" rather than "0px". */
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    for (const [prop, value] of Object.entries(values)) {
      if (prop === "--h1-size-px") {
        root.style.setProperty("--h1-size", Number(value) > 0 ? `${value}px` : "");
      } else if (prop === "--h2-size-px") {
        root.style.setProperty("--h2-size", Number(value) > 0 ? `${value}px` : "");
      } else {
        const control = ALL_CONTROLS.find((c) => c.prop === prop);
        const unit = control && control.kind === "range" ? control.unit : "";
        root.style.setProperty(prop, `${value}${unit}`);
      }
    }
  }, [values, enabled]);

  /* Swap the photographs. `srcset` has to be cleared, not just `src`: Next
     emits a responsive set and the browser prefers it, so setting `src` alone
     changes nothing and looks like a broken control. */
  useEffect(() => {
    if (!enabled) return;
    const apply = (selector: string, plate: Plate) => {
      document.querySelectorAll<HTMLImageElement>(selector).forEach((img) => {
        img.removeAttribute("srcset");
        img.src = plate.src;
        img.alt = plate.alt;
        img.classList.toggle("plate-screen", screen && selector.includes("hero"));
        img.classList.toggle("plate-vignette", vignette && selector.includes("hero"));
      });
    };
    apply('img[data-plate="hero"], img[data-plate="hero-phone"]', plates[heroPlate]);
    apply('img[data-plate="figure"]', plates[figurePlate]);

    document
      .querySelectorAll<HTMLElement>('[data-plate-credit="hero"]')
      .forEach((el) => (el.textContent = plates[heroPlate].credit));
    document
      .querySelectorAll<HTMLElement>('[data-plate-credit="figure"]')
      .forEach((el) => (el.textContent = plates[figurePlate].credit));
  }, [heroPlate, figurePlate, screen, vignette, enabled]);

  /* Copy editing, in place on the real elements rather than in fields in this
     panel — you want to judge a headline where it lives, at its real size,
     against the photograph it sits on. */
  useEffect(() => {
    if (!enabled) return;
    document.querySelectorAll<HTMLElement>("[data-copy]").forEach((el) => {
      if (editing) {
        el.setAttribute("contenteditable", "plaintext-only");
        el.dataset.tweakOutline = "1";
      } else {
        el.removeAttribute("contenteditable");
        delete el.dataset.tweakOutline;
      }
    });
  }, [editing, enabled]);

  /* `T` opens and closes, and stands down inside a field or while editing
     page copy — the page has a form on it, and a panel that opens whenever
     someone types "t" into a phone number is a bug, not a shortcut. */
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(t?.tagName ?? "")
      ) {
        return;
      }
      if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);

  const set = useCallback(
    (prop: string, value: string) => {
      store.update({ values: { ...values, [prop]: value } });
    },
    [values],
  );

  const reset = useCallback(() => {
    /* Removing the inline properties matters as much as clearing the state:
       a custom property set on `documentElement` outlives a React reset, so
       without this the panel would report the shipped design while the page
       kept showing the overrides. */
    const root = document.documentElement;
    for (const prop of Object.keys(values)) root.style.removeProperty(prop);
    root.style.removeProperty("--h1-size");
    root.style.removeProperty("--h2-size");
    store.clear();
    setFlash("Reset to the shipped design");
  }, [values]);

  /** Read the current value of a control, falling back to the stylesheet. */
  const read = (c: Control): string =>
    values[c.prop] ?? (c.kind === "range" ? String(c.fallback) : String(c.fallback));

  const currentColour = (prop: string) => {
    const override = values[prop];
    if (override) return override;
    const found = PALETTE.find((p) => p.prop === prop);
    if (found && found.kind === "colour") return found.fallback;
    return prop === "--color-obsidian" ? "#121214" : "#000000";
  };

  /**
   * Produce something paste-able.
   *
   * Two blocks, because they belong in two files: the CSS overrides go into
   * the `@theme` / `:root` in `globals.css`, and the copy goes into
   * `content/site.ts` at the path each element declares. Without this the tool
   * would leave you with a look you like and no way to ship it.
   */
  const exportChanges = useCallback(async () => {
    const cssLines = Object.entries(values)
      .filter(([, v]) => v !== "")
      .map(([prop, v]) => {
        if (prop === "--h1-size-px") {
          return Number(v) > 0 ? `  --h1-size: ${v}px;` : null;
        }
        if (prop === "--h2-size-px") {
          return Number(v) > 0 ? `  --h2-size: ${v}px;` : null;
        }
        const control = [...PALETTE, ...TYPE, ...LAYOUT, ...PLATE].find(
          (c) => c.prop === prop,
        );
        const unit = control && control.kind === "range" ? control.unit : "";
        return `  ${prop}: ${v}${unit};`;
      })
      .filter(Boolean);

    const copy: string[] = [];
    document.querySelectorAll<HTMLElement>("[data-copy]").forEach((el) => {
      const path = el.dataset.copy;
      if (!path) return;
      const text = (el.innerText || "").replace(/\s+/g, " ").trim();
      if (!text) return;
      if (el.dataset.tweakOriginal === undefined) return;
      if (el.dataset.tweakOriginal === text) return;
      copy.push(`${path}: ${JSON.stringify(text)}`);
    });

    const plateLines: string[] = [];
    if (heroPlate !== "caracalla") plateLines.push(`hero plate: plates.${heroPlate}`);
    if (figurePlate !== "diadoumenos")
      plateLines.push(`figure plate: plates.${figurePlate}`);
    if (!screen) plateLines.push("hero: plate-screen removed");
    if (!vignette) plateLines.push("hero: plate-vignette removed");

    const out = [
      "/* ---- app/globals.css — inside the `html` block in @layer base ---- */",
      cssLines.length ? cssLines.join("\n") : "  (no style changes)",
      "",
      "/* ---- content/site.ts — copy edited on the page ---- */",
      copy.length ? copy.join("\n") : "  (no copy changes)",
      "",
      "/* ---- app/page.tsx — photography ---- */",
      plateLines.length ? plateLines.join("\n") : "  (unchanged)",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(out);
      setFlash("Copied — paste into globals.css and site.ts");
    } catch {
      /* Clipboard is permission-gated and blocked in some contexts. Falling
         back to the console beats losing the work silently. */
      console.info(out);
      setFlash("Clipboard blocked — printed to the console instead");
    }
  }, [values, heroPlate, figurePlate, screen, vignette]);

  /* Remember each editable string's starting text once, so export can report
     only what actually changed rather than dumping the whole page back. */
  useEffect(() => {
    if (!enabled) return;
    document.querySelectorAll<HTMLElement>("[data-copy]").forEach((el) => {
      if (el.dataset.tweakOriginal === undefined) {
        el.dataset.tweakOriginal = (el.innerText || "").replace(/\s+/g, " ").trim();
      }
    });
  }, [enabled]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 3200);
    return () => clearTimeout(t);
  }, [flash]);

  if (!enabled) return null;

  const changed = Object.keys(values).length;

  return (
    <>
      {/* The bar owns its own styling entirely — no page tokens, no page
          faces. It has to stay legible while the palette it is editing is
          being dragged through every colour there is, so it is a fixed
          near-black panel that never inherits anything. */}
      <style>{`
        [data-tweak-outline] {
          outline: 1px dashed rgba(255,255,255,.45);
          outline-offset: 4px;
          cursor: text;
        }
      `}</style>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="tweak-panel"
        /* The tab steps aside when the panel opens. Left at `right-0` it sat
           on top of the panel's own footer and swallowed the clicks meant for
           Export and Reset — a control that covers the controls. */
        className={`fixed bottom-6 z-[90] border border-white/25 border-r-0 bg-neutral-900 px-3 py-2.5 font-mono text-[10.5px] tracking-[0.18em] text-white uppercase transition-[right,background-color] hover:bg-neutral-800 ${
          open ? "right-[21rem]" : "right-0"
        }`}
        style={{ fontFamily: "ui-monospace, monospace" }}
      >
        {open ? "Close" : `Tweak${changed ? ` · ${changed}` : ""}`}
      </button>

      <div
        id="tweak-panel"
        hidden={!open}
        className="fixed inset-y-0 right-0 z-[89] flex w-[21rem] flex-col border-l border-white/15 bg-neutral-950 text-white"
        style={{ fontFamily: "ui-monospace, monospace" }}
      >
        <header className="shrink-0 border-b border-white/15 px-4 py-3">
          <p className="text-[11px] tracking-[0.2em] uppercase">Tweak</p>
          <p className="mt-1 text-[10px] leading-relaxed text-white/55">
            T opens and closes · changes save as you go · nothing here ships
          </p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {/* -------------------------------------------------- contrast */}
          <section className="mb-6">
            <h3 className="text-[10px] tracking-[0.18em] text-white/55 uppercase">
              Measured contrast
            </h3>
            <ul className="mt-2.5 space-y-1.5">
              {PAIRS.map((pair) => {
                const r = ratio(currentColour(pair.fg), currentColour(pair.bg));
                const pass = r !== null && r >= pair.min;
                return (
                  <li key={pair.label} className="flex items-baseline gap-2 text-[10.5px]">
                    <span
                      aria-hidden
                      className="inline-block h-2 w-2 shrink-0"
                      style={{ background: pass ? "#7ddba6" : "#ff8f6b" }}
                    />
                    <span className="flex-1 text-white/70">{pair.label}</span>
                    <span className={pass ? "text-white" : "text-[#ff8f6b]"}>
                      {r ? r.toFixed(2) : "—"}:1
                    </span>
                    <span className="w-10 text-right text-white/40">
                      ≥{pair.min}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-[9.5px] leading-relaxed text-white/40">
              Recomputed on every change. The design system records a ratio
              beside every colour; dragging one without re-measuring is how
              that promise gets quietly broken.
            </p>
          </section>

          {/* ---------------------------------------------------- groups */}
          {GROUPS.map((group) => (
            <section key={group.title} className="mb-6">
              <h3 className="text-[10px] tracking-[0.18em] text-white/55 uppercase">
                {group.title}
              </h3>
              <div className="mt-2.5 space-y-3">
                {group.controls.map((c) => (
                  <div key={c.prop}>
                    {c.kind === "colour" && (
                      <label className="flex items-center gap-2.5 text-[10.5px]">
                        <input
                          type="color"
                          value={currentColour(c.prop)}
                          onChange={(e) => set(c.prop, e.target.value)}
                          className="h-6 w-8 shrink-0 cursor-pointer border border-white/25 bg-transparent p-0"
                        />
                        <span className="flex-1 text-white/70">{c.label}</span>
                        <span className="text-white/40">{currentColour(c.prop)}</span>
                      </label>
                    )}

                    {c.kind === "range" && (
                      <label className="block text-[10.5px]">
                        <span className="flex items-baseline justify-between">
                          <span className="text-white/70">{c.label}</span>
                          <span className="text-white/40">
                            {/* The two clamp overrides use 0 as a sentinel for
                                "let the fluid size do its job", and "0px" reads
                                as a broken control rather than as a default. */}
                            {c.prop.endsWith("-size-px") && Number(read(c)) === 0
                              ? "auto"
                              : `${read(c)}${c.unit}`}
                          </span>
                        </span>
                        <input
                          type="range"
                          min={c.min}
                          max={c.max}
                          step={c.step}
                          value={read(c)}
                          onChange={(e) => set(c.prop, e.target.value)}
                          className="mt-1 w-full accent-white"
                        />
                        {c.note && (
                          <span className="mt-1 block text-[9.5px] leading-relaxed text-white/40">
                            {c.note}
                          </span>
                        )}
                      </label>
                    )}

                    {c.kind === "select" && (
                      <label className="block text-[10.5px]">
                        <span className="text-white/70">{c.label}</span>
                        <select
                          value={values[c.prop] ?? c.fallback}
                          onChange={(e) => set(c.prop, e.target.value)}
                          className="mt-1 w-full border border-white/25 bg-neutral-900 px-2 py-1.5 text-[11px] text-white"
                        >
                          {c.options.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        {c.note && (
                          <span className="mt-1 block text-[9.5px] leading-relaxed text-white/40">
                            {c.note}
                          </span>
                        )}
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* ----------------------------------------------- photographs */}
          <section className="mb-6">
            <h3 className="text-[10px] tracking-[0.18em] text-white/55 uppercase">
              Which photograph
            </h3>
            <div className="mt-2.5 space-y-3 text-[10.5px]">
              <label className="block">
                <span className="text-white/70">Hero</span>
                <select
                  value={heroPlate}
                  onChange={(e) =>
                    store.update({
                      heroPlate: e.target.value as keyof typeof plates,
                    })
                  }
                  className="mt-1 w-full border border-white/25 bg-neutral-900 px-2 py-1.5 text-[11px] text-white"
                >
                  {Object.keys(plates).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-white/70">Framed figure</span>
                <select
                  value={figurePlate}
                  onChange={(e) =>
                    store.update({
                      figurePlate: e.target.value as keyof typeof plates,
                    })
                  }
                  className="mt-1 w-full border border-white/25 bg-neutral-900 px-2 py-1.5 text-[11px] text-white"
                >
                  {Object.keys(plates).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={screen}
                  onChange={(e) => store.update({ screen: e.target.checked })}
                  className="accent-white"
                />
                <span className="text-white/70">Knock out the sweep (screen)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={vignette}
                  onChange={(e) => store.update({ vignette: e.target.checked })}
                  className="accent-white"
                />
                <span className="text-white/70">Dissolve the frame edge</span>
              </label>
              <p className="text-[9.5px] leading-relaxed text-white/40">
                Screen only works on a plate shot against a near-black sweep —
                caracalla, caligula, herodotos. On a mid-grey sweep it leaves a
                pale rectangle, which is what the framed figure below the fold
                avoids by being duotoned instead.
              </p>
            </div>
          </section>

          {/* ------------------------------------------------------ copy */}
          <section className="mb-6">
            <h3 className="text-[10px] tracking-[0.18em] text-white/55 uppercase">
              Copy
            </h3>
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              aria-pressed={editing}
              className={`mt-2.5 w-full border px-3 py-2 text-[10.5px] tracking-[0.14em] uppercase transition-colors ${
                editing
                  ? "border-white bg-white text-neutral-950"
                  : "border-white/25 text-white/70 hover:text-white"
              }`}
            >
              {editing ? "Editing text — click to stop" : "Edit text on the page"}
            </button>
            <p className="mt-2 text-[9.5px] leading-relaxed text-white/40">
              Every dashed region becomes editable in place, at its real size,
              against the photograph it sits on — which is the only way to
              judge a headline. Export reports just what you changed, keyed to
              its path in content/site.ts.
            </p>
          </section>
        </div>

        {/* ---------------------------------------------------------- foot */}
        <footer className="shrink-0 space-y-2 border-t border-white/15 px-4 py-3">
          {flash && (
            <p role="status" className="text-[10px] leading-relaxed text-[#7ddba6]">
              {flash}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportChanges}
              className="flex-1 border border-white bg-white px-3 py-2 text-[10.5px] tracking-[0.14em] text-neutral-950 uppercase transition-colors hover:bg-white/85"
            >
              Export
            </button>
            <button
              type="button"
              onClick={reset}
              className="border border-white/25 px-3 py-2 text-[10.5px] tracking-[0.14em] text-white/70 uppercase transition-colors hover:text-white"
            >
              Reset
            </button>
          </div>
          <p className="text-[9.5px] leading-relaxed text-white/40">
            {changed
              ? `${changed} value${changed === 1 ? "" : "s"} overridden`
              : "Showing the shipped design"}
          </p>
        </footer>
      </div>
    </>
  );
}
