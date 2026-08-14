"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

/**
 * Review scaffolding: MERIDIAN's heading face, swappable on the live page.
 *
 * Same shape as the accent review that preceded it, and for the same reason —
 * type at display scale cannot be judged from a specimen. A face that looks
 * elegant in a list looks thin, or shouty, or period-costume once it is set at
 * 7rem over an ultramarine sky with an arcade behind it.
 *
 * It writes two custom properties on the root and nothing else. Every heading
 * carries `display-face`, which reads both, so a swap is total by construction.
 *
 * WHY WEIGHT IS PART OF THE SWAP. The headings were `font-semibold`. Libre
 * Caslon Display and Instrument Serif ship a single 400 weight, so asking for
 * 600 makes the browser synthesise a faux bold — which thickens and smears the
 * thin strokes of precisely the high-contrast faces this review exists to
 * assess. Judging a synthetic bold instead of the real face would have made the
 * whole comparison worthless.
 *
 * Headings only. Controls, the nav, the wordmark and running text stay on
 * Schibsted: a serif at 15px in a pill button is worse than the grotesk it
 * would replace, whichever face wins.
 *
 * Behaviours inherited from `DirectionSwitch`, for the same reasons: it hides
 * inside an iframe so it does not stack into `CompareBoard`'s three panels, and
 * it stands down while a form field has focus. The choice persists to
 * `localStorage`, because judging a face means scrolling the whole page and
 * losing the setting on every navigation would make that impossible.
 *
 * A CORRECTION, VERIFIED AGAINST A REAL BUILD. The page gates this on
 * `NODE_ENV`, and it was described here as meaning the JavaScript never reaches
 * a visitor. That is not true. `next build` leaves the rendered HTML clean —
 * the panel genuinely does not appear — but the module still lands in a client
 * chunk, because importing a `"use client"` component puts it in the client
 * graph whether or not the branch ever runs. Making it literally true needs a
 * `next/dynamic` import behind the same condition. It has been left alone
 * because this file is scaffolding that gets deleted when the face is chosen,
 * and the honest cost is a few KB on a `noindex` comparison page — but the
 * claim should not stand uncorrected in a file someone might copy.
 */

export type DisplayFace = {
  key: string;
  label: string;
  /** What `--font-display` becomes. A token from `globals.css`. */
  stack: string;
  /** What `--font-display-weight` becomes. See the note above. */
  weight: string;
  /** Enough of the face's character to know why it is in the set. */
  note: string;
};

export const FACES: DisplayFace[] = [
  {
    key: "schibsted",
    label: "Schibsted Grotesk",
    stack: "var(--font-schibsted)",
    weight: "600",
    note: "The current face, kept as the control. A newspaper grotesk — the argument for it was that a display serif belonged to the classical world this build replaced.",
  },
  {
    key: "caslon",
    label: "Libre Caslon Display",
    stack: "var(--font-caslon)",
    weight: "400",
    note: "The face from the other build, and the reason for this review. Transitional: sturdy, bookish, even in colour. Institutional without being cold.",
  },
  {
    key: "instrument",
    label: "Instrument Serif",
    stack: "var(--font-instrument)",
    weight: "400",
    note: "High contrast, tightly set, narrow. The most current-looking of the five and the one that changes the hero most — it wants to be very large.",
  },
  {
    key: "fraunces",
    label: "Fraunces",
    stack: "var(--font-fraunces)",
    weight: "600",
    note: "Old-style with deliberate softness and wonk. The warmest and least institutional here — closer to a studio than to an authority.",
  },
  {
    key: "bodoni",
    label: "Bodoni Moda",
    stack: "var(--font-bodoni)",
    weight: "500",
    note: "A didone: extreme thick-to-thin. Reads as luxury and fashion, which may be the wrong register for a trade audience — worth seeing before ruling out.",
  },
  {
    key: "garamond",
    label: "EB Garamond",
    stack: "var(--font-garamond)",
    weight: "500",
    note: "Renaissance humanist, and historically the closest of the five to the Roman world the arcade comes from. The quietest, and the easiest to under-set.",
  },
];

const STORAGE_KEY = "meridian-display-face";

const subscribe = () => () => {};
const isFramed = () => window.self !== window.top;

function useFace() {
  const stored = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb);
      return () => window.removeEventListener("storage", cb);
    },
    () => window.localStorage.getItem(STORAGE_KEY) ?? FACES[0].key,
    () => FACES[0].key,
  );
  return FACES.find((f) => f.key === stored) ?? FACES[0];
}

function apply(face: DisplayFace) {
  const root = document.documentElement;
  root.style.setProperty("--font-display", face.stack);
  root.style.setProperty("--font-display-weight", face.weight);
}

export function FontSwitch() {
  const framed = useSyncExternalStore(subscribe, isFramed, () => false);
  const active = useFace();

  const select = useCallback((face: DisplayFace) => {
    window.localStorage.setItem(STORAGE_KEY, face.key);
    apply(face);
    /* `storage` only fires in OTHER documents, so the writer has to nudge its
       own subscribers. */
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  useEffect(() => {
    apply(active);
  }, [active]);

  useEffect(() => {
    if (framed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (el?.isContentEditable) return;
      if (e.key.toLowerCase() !== "f") return;
      /* `f` cycles. DirectionSwitch owns 1–3 and the arrows. */
      const i = FACES.findIndex((f) => f.key === active.key);
      select(FACES[(i + 1) % FACES.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, framed, select]);

  if (framed) return null;

  return (
    <aside
      aria-label="Heading face review"
      className="fixed right-3 bottom-[calc(var(--switch-bar)+0.75rem)] z-[60] w-[16.5rem] rounded-2xl border border-white/15 bg-[#060d22]/92 p-3 text-mer-ink shadow-2xl backdrop-blur-md sm:right-5"
    >
      <p className="flex items-baseline justify-between font-schibsted text-[11px] tracking-[0.16em] text-white/45 uppercase">
        Heading face
        <span className="tracking-normal normal-case">
          <kbd className="rounded border border-white/20 px-1">f</kbd> cycles
        </span>
      </p>

      <div className="mt-2.5 flex flex-col gap-1">
        {FACES.map((f) => {
          const on = f.key === active.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => select(f)}
              aria-pressed={on}
              aria-label={f.label}
              className={`rounded-lg px-2 py-1.5 text-left transition-colors ${
                on ? "bg-white/12" : "hover:bg-white/6"
              }`}
            >
              {/*
                Each row is set IN its own face. A list of face names all set in
                the same type tells you nothing — the specimen has to be the
                thing being chosen.
              */}
              <span
                className="block truncate text-[17px] leading-tight"
                style={{ fontFamily: f.stack, fontWeight: f.weight }}
              >
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-2.5 border-t border-white/10 pt-2 text-[11.5px] leading-snug text-white/55">
        {active.note}
      </p>
    </aside>
  );
}
