"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  ALIGNS,
  ALL_FACES,
  CASES,
  CONTROLS_BY_PROP,
  FACES,
  HERO,
  LAYOUT,
  MOTION,
  PAIRS,
  PALETTE,
  PRESETS,
  ROLES,
  loadFace,
  over,
  ratio,
  roleControls,
  type Control,
} from "@/components/tweak/schema";
import {
  describe,
  elementAt,
  isSelectable,
  pageOf,
  pathOf,
  shortLabel,
} from "@/components/tweak/dom";

/**
 * The tweak bar: live editing of the site it sits on, in two modes.
 *
 * SYSTEM mode moves the design's tokens — the palette, the four faces, the
 * seven type roles, the shell, the dim. One control changes every instance at
 * once, which is what you want when the question is "is the display face
 * right".
 *
 * ELEMENT mode is the other half of that conversation, and the reason this file
 * is not just a panel of sliders. Most design arguments are not about a system,
 * they are about one thing on one page: this heading, this word, this button.
 * So you turn on Edit, click the thing, and get controls for THAT element —
 * rewrite its copy, recolour it, change its face and size, move it, or take it
 * off the page.
 *
 * Five decisions shape the whole thing.
 *
 * 1. **System mode writes CSS custom properties, not React state.** Every
 *    control writes to `document.documentElement.style`, so the site repaints
 *    without re-rendering — a slider stays smooth with the whole document open.
 *    It also means every page stays a SERVER component: this bar is the only
 *    thing on the site that hydrates, and a visitor who never opens it pays
 *    nothing.
 *
 * 2. **Element mode writes inline styles, addressed by PATH.** An edit cannot
 *    hold a DOM node — the node is gone the moment React re-renders or the
 *    route changes — so it holds the tag-and-index chain that finds it again.
 *    See `tweak/dom.ts`.
 *
 * 3. **The stylesheet holds the design; the bar only overrides.** Delete the
 *    bar and the site is pixel-identical, which is the property that makes it
 *    safe to keep around.
 *
 * 4. **Nothing is destroyed.** Removing an element hides it, editing copy
 *    stores a replacement rather than mutating the source, and every element's
 *    pristine state is captured before it is first touched — so Revert is
 *    always available and Reset really does put the site back.
 *
 * 5. **It can hand the changes back.** EXPORT writes the token overrides as a
 *    paste-ready `:root` block, and lists every element edit against a
 *    findable description of the element it belongs to.
 *
 * It never renders for a real visitor: development only, or `?tweak` on the URL
 * for a deployed preview.
 */

/* ------------------------------------------------------------------- store */

/** What can be changed about one element. All optional; absent means untouched. */
type ElementEdit = {
  /** Inline declarations, camelCase → value. */
  style?: Record<string, string>;
  /** Replacement `innerHTML`, when the copy was rewritten. */
  html?: string;
  /** Hidden rather than deleted — see decision 4. */
  hidden?: boolean;
};

type TweakState = {
  /** Whether the bar may render at all. False on the server, always. */
  enabled: boolean;
  /** Custom property → value, for everything system mode moves. */
  values: Record<string, string>;
  /** Path → edit, for everything element mode moves. */
  elements: Record<string, ElementEdit>;
  /** Element mode: clicking the page selects instead of navigating. */
  picking: boolean;
  outline: boolean;
  grid: boolean;
  guides: boolean;
  stillness: boolean;
};

const DEFAULTS: TweakState = {
  enabled: false,
  values: {},
  elements: {},
  picking: false,
  outline: false,
  grid: false,
  guides: false,
  stillness: false,
};

const STORE_KEY = "pulito.meridian.tweaks.v2";

/**
 * A tiny external store, rather than `useState` seeded from an effect.
 *
 * The natural shape — restore from `localStorage` in a `useEffect`, then
 * `setState` — is the cascading-render pattern React now flags, and the flag is
 * fair: `localStorage` and the URL are external systems, and
 * `useSyncExternalStore` is what external systems are for. It also buys the
 * property that matters here for free: the server snapshot is a constant
 * `enabled: false`, so the first client render agrees with the server and the
 * panel is never briefly painted into a page that should not have it.
 *
 * The snapshot is a STRING, deliberately. `getSnapshot` must return a stable
 * reference or React re-renders forever, and a serialized snapshot is stable by
 * construction; the component parses it once behind a `useMemo`.
 */
const SERVER_SNAPSHOT = JSON.stringify(DEFAULTS);

let snapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

const store = {
  /*
    Hydration hangs off `subscribe`, not off a mount effect, and that is a fix
    rather than a style choice.

    This module holds `snapshot` as a singleton. Fast Refresh re-evaluates the
    module — resetting it to the server snapshot, where `enabled` is false —
    without remounting the component, so a `useEffect(…, [])` that hydrates on
    mount never runs again and the bar silently vanishes the first time you edit
    any file in the project. Which is, of course, exactly when you are using it.

    `subscribe` does not have that problem: a re-evaluated module is a new
    `store` object, so `store.subscribe` is a new function reference and React
    re-subscribes. No notify is needed here — React re-reads `getSnapshot`
    immediately after subscribing, precisely to catch a change made in between.
  */
  subscribe(listener: () => void) {
    if (snapshot === SERVER_SNAPSHOT) store.hydrate();
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => snapshot,
  getServerSnapshot: () => SERVER_SNAPSHOT,

  hydrate() {
    const enabled =
      process.env.NODE_ENV !== "production" ||
      new URLSearchParams(window.location.search).has("tweak");

    let restored: Partial<TweakState> = {};
    try {
      restored = JSON.parse(window.localStorage.getItem(STORE_KEY) ?? "{}");
    } catch {
      /* A corrupt entry must never take the site down with it. */
    }

    snapshot = JSON.stringify({ ...DEFAULTS, ...restored, enabled });
    listeners.forEach((l) => l());
  },

  update(patch: Partial<TweakState>) {
    const next = { ...(JSON.parse(snapshot) as TweakState), ...patch };
    snapshot = JSON.stringify(next);
    /* `enabled` is derived from the environment on every load, so persisting it
       would let a stale entry decide whether the tool appears. `picking` is a
       mode, not a change, and a page that reopened mid-pick would swallow the
       first click a reader made on it. */
    window.localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        values: next.values,
        elements: next.elements,
        outline: next.outline,
        grid: next.grid,
        guides: next.guides,
        stillness: next.stillness,
      }),
    );
    listeners.forEach((l) => l());
  },

  clear() {
    const { enabled } = JSON.parse(snapshot) as TweakState;
    snapshot = JSON.stringify({ ...DEFAULTS, enabled });
    window.localStorage.removeItem(STORE_KEY);
    listeners.forEach((l) => l());
  },
};

/**
 * Every element's pristine inline style and markup, captured the first time the
 * editor touches it.
 *
 * This is what makes element mode reversible. Applying an edit is destructive
 * to the DOM — once `innerHTML` has been written there is no way to ask the
 * browser what used to be there — so the state before the first write is kept
 * here and restored at the top of every apply pass. Without it, clearing a
 * colour would leave the colour on the page and only the panel would know it
 * had been cleared.
 */
const pristine = new Map<string, { style: string; html: string }>();

/* -------------------------------------------------------------- what to edit */

/** The colours an element's text or ground can be set to, by name. */
const SWATCHES = [
  { label: "Inherit", value: "" },
  { label: "Ink", value: "var(--color-mer-ink)" },
  { label: "Soft ink", value: "var(--color-mer-ink-soft)" },
  { label: "Action", value: "var(--color-mer-accent)" },
  { label: "Deep", value: "var(--color-mer-3)" },
  { label: "Error", value: "var(--color-mer-alert)" },
];

const GROUNDS = [
  { label: "None", value: "" },
  { label: "Ground", value: "var(--color-mer)" },
  { label: "Recessed", value: "var(--color-mer-2)" },
  { label: "Deepest", value: "var(--color-mer-3)" },
  { label: "Action", value: "var(--color-mer-accent)" },
];

/**
 * The element controls, as data — same shape as the system controls so they can
 * share `ControlView`, but writing to one element's inline style rather than to
 * `:root`.
 *
 * `prop` here is a CSS property in camelCase, not a custom property.
 */
const ELEMENT_CONTROLS: Control[] = [
  {
    kind: "select",
    prop: "fontFamily",
    label: "Face",
    fallback: "",
    options: [
      { label: "Unchanged", value: "" },
      ...ALL_FACES.map((f) => ({ label: f.label, value: f.stack })),
    ],
  },
  { kind: "range", prop: "fontSize", label: "Size", min: 8, max: 200, step: 0.5, unit: "px", fallback: 0, auto: 0, autoLabel: "unchanged" },
  { kind: "range", prop: "fontWeight", label: "Weight", min: 100, max: 900, step: 100, unit: "", fallback: 0, auto: 0, autoLabel: "unchanged" },
  { kind: "range", prop: "lineHeight", label: "Leading", min: 0.7, max: 2.4, step: 0.01, unit: "", fallback: 0, auto: 0, autoLabel: "unchanged" },
  { kind: "range", prop: "letterSpacing", label: "Tracking", min: -0.1, max: 0.4, step: 0.005, unit: "em", fallback: 0, auto: 0, autoLabel: "unchanged" },
  {
    kind: "select",
    prop: "textTransform",
    label: "Case",
    fallback: "",
    options: [{ label: "Unchanged", value: "" }, ...CASES.filter((c) => c.value !== "none")],
  },
  {
    kind: "select",
    prop: "textAlign",
    label: "Alignment",
    fallback: "",
    options: [{ label: "Unchanged", value: "" }, ...ALIGNS],
  },
  { kind: "range", prop: "--el-x", label: "Move across", min: -600, max: 600, step: 1, unit: "px", fallback: 0 },
  { kind: "range", prop: "--el-y", label: "Move down", min: -400, max: 400, step: 1, unit: "px", fallback: 0 },
  {
    kind: "range",
    prop: "maxWidth",
    label: "Max width",
    min: 10,
    max: 120,
    step: 1,
    unit: "ch",
    fallback: 0,
    auto: 0,
    autoLabel: "unchanged",
    note: "In characters, so it reads as a measure rather than as a pixel width.",
  },
  { kind: "range", prop: "opacity", label: "Opacity", min: 0, max: 1, step: 0.01, unit: "", fallback: 1 },
];

/* -------------------------------------------------------------------- view */

export function TweakBar() {
  const raw = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const state = useMemo(() => JSON.parse(raw) as TweakState, [raw]);
  const { enabled, values, elements, picking, outline, grid, guides, stillness } = state;

  /* Panel-local UI, never restored and never persisted: reopening a page should
     show the site as a reader sees it, not the panel mid-edit. */
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"palette" | "type" | "place" | "layout" | "motion">("type");
  const [role, setRole] = useState(ROLES[0].key);
  const [flash, setFlash] = useState<string | null>(null);

  const pathname = usePathname();
  const hoverBox = useRef<HTMLDivElement>(null);
  const selectBox = useRef<HTMLDivElement>(null);

  /*
    The selection remembers WHICH PAGE it was made on, and everything downstream
    is derived from that rather than repaired afterwards.

    The obvious shape — a `selected` string plus an effect that clears it when
    `pathname` changes — is a cascading render, and React now flags it as one.
    It is also a frame late: for one render the panel is describing an element
    that belongs to the page you just left. Carrying the page in the value makes
    a stale selection unrepresentable instead of merely short-lived.
  */
  const [selection, setSelection] = useState<{ page: string; path: string } | null>(null);
  const [, forceRect] = useState(0);
  const [writingOn, setWriting] = useState(false);

  const selected = selection?.page === pathname ? selection.path : null;
  const select = useCallback(
    (path: string | null) => setSelection(path ? { page: pathname, path } : null),
    [pathname],
  );

  const node = selected ? elementAt(selected) : null;
  /* Writing into nothing is not a state the panel can be in. */
  const writing = writingOn && node !== null;
  const edit: ElementEdit = useMemo(
    () => (selected ? (elements[selected] ?? {}) : {}),
    [selected, elements],
  );

  /* ---------------------------------------------------------- apply tokens */
  /*
    Ranges carry their unit here rather than in the stored value, so the stored
    state stays numeric and a slider can read it straight back.

    `--*-size` on a clamped role is special: 0 means "give the fluid clamp back"
    rather than "0px", so it is removed rather than set.
  */
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    for (const [prop, value] of Object.entries(values)) {
      const control = CONTROLS_BY_PROP.get(prop);
      if (control?.kind === "range") {
        if (control.auto !== undefined && Number(value) === control.auto) {
          root.style.removeProperty(prop);
          continue;
        }
        root.style.setProperty(prop, `${value}${control.unit}`);
      } else {
        root.style.setProperty(prop, value);
        if (prop.startsWith("--font-")) loadFace(value);
      }
    }
  }, [values, enabled]);

  /* -------------------------------------------------------- apply elements */
  /*
    Restore-then-apply, every pass. Applying is destructive — once `innerHTML`
    is written the browser cannot tell you what was there — so each element is
    put back to the state captured before the editor first touched it, and the
    current edit is laid on top. That is what makes clearing a control actually
    clear it, rather than leaving the last value stuck on the page.

    Keyed on `pathname` as well as on the edits: a route change hands React a
    fresh DOM, and every edit on the new page has to be re-applied to nodes that
    did not exist a moment ago.
  */
  useEffect(() => {
    if (!enabled) return;

    for (const [path, saved] of pristine) {
      const el = elementAt(path);
      if (!el) continue;
      if (saved.style) el.setAttribute("style", saved.style);
      else el.removeAttribute("style");
      if (el.innerHTML !== saved.html) el.innerHTML = saved.html;
    }

    const entries = Object.entries(elements);

    /*
      COPY FIRST, STYLE SECOND, and copy shallowest-first — the order is
      load-bearing rather than tidy.

      Writing `innerHTML` destroys and recreates every descendant, so any style
      already applied to a child is thrown away with the node that carried it.
      Applying the two in insertion order therefore loses a child's colour
      whenever its parent's text was edited afterwards — which is the normal way
      round to work: recolour the accent word, then fix the typo above it.

      Sorting the rewrites by depth handles the same hazard between a parent and
      a child that were BOTH rewritten: the parent has to land first, or it
      un-does the child.
    */
    for (const [path, spec] of entries
      .filter(([, s]) => s.html !== undefined)
      .sort((a, b) => depthOf(a[0]) - depthOf(b[0]))) {
      const el = elementAt(path);
      if (!el) continue;
      capture(path, el);
      if (spec.html !== el.innerHTML) el.innerHTML = spec.html!;
    }

    for (const [path, spec] of entries) {
      const el = elementAt(path);
      if (!el) continue;
      capture(path, el);

      for (const [prop, value] of Object.entries(spec.style ?? {})) {
        if (!value) continue;
        el.style.setProperty(cssName(prop), value);
        if (prop === "fontFamily") loadFace(value);
      }

      /* The two nudges are one `translate`, and `translate` rather than
         `transform` so an element that is mid-entrance does not snap back when
         its animation finishes. */
      const x = spec.style?.["--el-x"];
      const y = spec.style?.["--el-y"];
      if (x || y) el.style.translate = `${x ?? "0px"} ${y ?? "0px"}`;

      if (spec.hidden) el.style.display = "none";
    }
  }, [elements, enabled, pathname]);

  /* ------------------------------------------------------------- selecting */
  useEffect(() => {
    if (!enabled || !picking) return;

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const box = hoverBox.current;
      if (!box) return;
      if (!isSelectable(el) || writing) {
        box.style.display = "none";
        return;
      }
      frame(box, el as HTMLElement);
    };

    /*
      Capture phase, and it stops the event dead. Without this, picking the
      enquiry button would follow its link and picking a nav item would open a
      disclosure — you would never get to edit either of them.

      Which leaves one hole worth a modifier: with every link inert, edit mode
      also traps you on whatever page you turned it on. ⌘/Ctrl-click is let
      through so the nav still works, and the panel says so.
    */
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!isSelectable(el)) return;
      if (writing || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      e.stopPropagation();
      select(pathOf(el));
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !writing) select(null);
    };

    const box = hoverBox.current;
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
    document.body.style.cursor = writing ? "" : "crosshair";

    return () => {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey, true);
      document.body.style.cursor = "";
      if (box) box.style.display = "none";
    };
  }, [enabled, picking, writing, select]);

  /* The selection outline follows its element through scrolling, resizing and
     every change the panel makes to it. */
  useEffect(() => {
    const box = selectBox.current;
    if (!box) return;
    if (!node || !picking) {
      box.style.display = "none";
      return;
    }
    const draw = () => frame(box, node);
    draw();
    const tick = () => forceRect((n) => n + 1);
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [node, picking, elements, values, raw]);

  /* --------------------------------------------------------------- writing */
  /*
    Copy is edited IN PLACE rather than in a field in this panel, because a
    headline is judged where it lives — at its real size, against the picture it
    sits on. `contenteditable` is left as the default rich mode, not
    `plaintext-only`: the hero headline contains a `<span>` carrying the accent
    word, and plaintext editing would silently eat it the first time anyone
    corrected a typo.
  */
  useEffect(() => {
    if (!node) return;
    if (!writing) {
      node.removeAttribute("contenteditable");
      return;
    }
    node.setAttribute("contenteditable", "true");
    node.focus();

    const save = () => {
      if (!selected) return;
      /*
        Strip the editor's own work out of the descendants before serialising.

        Whatever this element contains is carrying inline styles THIS TOOL put
        there — recolour the accent word, then edit the headline around it, and
        the stored copy would have `style="color: …"` baked into its markup.
        That copy then outlives the edit that produced it: reverting the span
        later leaves its colour stranded inside the parent's HTML, and the
        export reports a hand-authored style that nobody wrote. Putting the
        descendants back to pristine first means the stored copy is the copy.

        The styles come straight back — the store update below re-runs the apply
        pass, which is what puts them on.
      */
      for (const [path, saved] of pristine) {
        if (path === selected) continue;
        const child = elementAt(path);
        if (!child || child === node || !node.contains(child)) continue;
        if (saved.style) child.setAttribute("style", saved.style);
        else child.removeAttribute("style");
      }

      const html = node.innerHTML;
      store.update({
        elements: { ...elements, [selected]: { ...edit, html } },
      });
    };
    node.addEventListener("blur", save);
    return () => {
      node.removeEventListener("blur", save);
      node.removeAttribute("contenteditable");
    };
  }, [writing, node, selected, elements, edit]);

  /* `T` opens and closes, and stands down inside a field or while writing copy —
     the site has a form on it, and a panel that opens whenever someone types "t"
     into a phone number is a bug, not a shortcut. */
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

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 3600);
    return () => clearTimeout(t);
  }, [flash]);

  /* --------------------------------------------------------------- actions */

  const set = useCallback(
    (prop: string, value: string) => {
      store.update({ values: { ...values, [prop]: value } });
    },
    [values],
  );

  const setOnElement = useCallback(
    (prop: string, value: string) => {
      if (!selected) return;
      const control = ELEMENT_CONTROLS.find((c) => c.prop === prop);
      let css = value;
      if (control?.kind === "range") {
        css =
          control.auto !== undefined && Number(value) === control.auto
            ? ""
            : `${value}${control.unit}`;
      }
      const style = { ...(edit.style ?? {}) };
      if (css === "") delete style[prop];
      else style[prop] = css;
      store.update({ elements: { ...elements, [selected]: { ...edit, style } } });
    },
    [selected, edit, elements],
  );

  const revertElement = useCallback(() => {
    if (!selected) return;
    const hadCopy = elements[selected]?.html !== undefined;
    const next = { ...elements };
    delete next[selected];
    store.update({ elements: next });
    setWriting(false);
    if (hadCopy) window.location.reload();
    else setFlash("Element back to how it ships");
  }, [selected, elements]);

  const reset = useCallback(() => {
    /* Removing the inline properties matters as much as clearing the state: a
       custom property set on `documentElement` outlives a React reset, so
       without this the panel would report the shipped design while the site
       kept showing the overrides. */
    const root = document.documentElement;
    for (const prop of Object.keys(values)) root.style.removeProperty(prop);
    for (const [path, saved] of pristine) {
      const el = elementAt(path);
      if (!el) continue;
      if (saved.style) el.setAttribute("style", saved.style);
      else el.removeAttribute("style");
      el.innerHTML = saved.html;
    }
    const hadCopy = Object.values(elements).some((e) => e.html !== undefined);
    pristine.clear();
    store.clear();
    setSelection(null);
    setWriting(false);

    /*
      REWRITTEN COPY IS PUT BACK BY RELOADING, not from the pristine map, and
      that is a correctness fix rather than laziness.

      `pristine` is module state. Fast Refresh re-evaluates this module and
      empties it without remounting the component, so after any code edit the
      next apply pass captures the ALREADY-REWRITTEN markup as though it were
      the original — and Reset then faithfully restores the edit. Which is
      precisely the situation this tool lives in: someone editing the site while
      the bar is open with copy changes in it.

      The true original markup only exists on the server. Asking for it back is
      what a reload is. Styles are different — they are properties we set and
      can unset, so a token-only reset stays instant.
    */
    if (hadCopy) window.location.reload();
    else setFlash("Reset to the shipped design");
  }, [values, elements]);

  const applyPreset = useCallback(
    (name: string) => {
      const preset = PRESETS.find((p) => p.name === name);
      if (!preset) return;
      const root = document.documentElement;
      for (const prop of Object.keys(values)) root.style.removeProperty(prop);
      store.update({ values: { ...preset.values } });
      setFlash(`${preset.name} — drag from here`);
    },
    [values],
  );

  /** The current value of a system control, falling back to the stylesheet's. */
  const read = (c: Control): string => values[c.prop] ?? String(c.fallback);

  /** The current value of an element control, falling back to "unchanged". */
  const readEl = (c: Control): string => {
    const stored = edit.style?.[c.prop];
    if (stored === undefined) return String(c.fallback);
    if (c.kind === "range") return String(parseFloat(stored));
    return stored;
  };

  const currentColour = (prop: string) => {
    const override = values[prop];
    if (override) return override;
    const found = PALETTE.find((p) => p.prop === prop);
    return found?.kind === "colour" ? found.fallback : "#000000";
  };

  /**
   * Produce something paste-able.
   *
   * Two blocks, because they belong in two places: the token overrides are a
   * `:root` block for `globals.css`, and the element edits are a list keyed to
   * a description you can search the source for. Faces this bar fetched from
   * Google export as an instruction rather than a declaration — pasting the
   * stack alone would give a working preview and a broken build.
   */
  const exportChanges = useCallback(async () => {
    const css: string[] = [];
    const notes: string[] = [];

    for (const [prop, value] of Object.entries(values)) {
      const control = CONTROLS_BY_PROP.get(prop);
      if (!control) continue;

      if (control.kind === "range") {
        if (control.auto !== undefined && Number(value) === control.auto) continue;
        if (Number(value) === Number(control.fallback)) continue;
        css.push(`  ${prop}: ${value}${control.unit};`);
        continue;
      }
      if (value === control.fallback) continue;

      if (prop.startsWith("--font-") && control.kind === "select") {
        const face = ALL_FACES.find((f) => f.stack === value);
        if (face?.google) {
          notes.push(
            `  ${prop} wants ${face.label} — add it to app/layout.tsx with next/font/google first, then point ${prop} at its variable.`,
          );
          continue;
        }
      }
      css.push(`  ${prop}: ${value};`);
    }

    const perElement: string[] = [];
    for (const [path, spec] of Object.entries(elements)) {
      const el = elementAt(path);
      const where = el ? describe(el) : `${pageOf(path)} (not on this page)`;
      const lines: string[] = [];
      if (spec.hidden) lines.push("    REMOVE this element");
      if (spec.html !== undefined) lines.push(`    copy: ${spec.html}`);
      for (const [prop, value] of Object.entries(spec.style ?? {})) {
        if (value) lines.push(`    ${cssName(prop)}: ${value};`);
      }
      if (!lines.length) continue;
      perElement.push(`  ${pageOf(path)} → ${where}`, ...lines, "");
    }

    const debug = [
      outline && "outline overlay on",
      grid && "baseline grid on",
      guides && "shell guides on",
      stillness && "motion held still",
    ].filter(Boolean);

    const out = [
      "/* ---- app/globals.css — into the :root block under THE TWEAK CONTRACT ---- */",
      ":root {",
      css.length ? css.sort().join("\n") : "  /* no token changes */",
      "}",
      ...(notes.length
        ? ["", "/* ---- faces that are not in the bundle yet ---- */", ...notes]
        : []),
      ...(perElement.length
        ? ["", "/* ---- one-off element edits, to fold back into the markup ---- */", ...perElement]
        : []),
      ...(debug.length
        ? ["", `/* review overlays, not part of the design: ${debug.join(", ")} */`]
        : []),
    ].join("\n");

    /*
      The clipboard is raced against a timeout, not merely try/caught.
      `writeText` is permission-gated AND it does not reject when the document
      is hidden — Chrome queues the write until the tab is visible again, so the
      promise simply never settles. Awaiting it bare means a button that reports
      nothing at all, which is the one outcome a tool like this cannot have: you
      would think the export failed and drag everything again. Either way the
      block goes to the console, so the work is never lost.
    */
    try {
      await Promise.race([
        navigator.clipboard.writeText(out),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("clipboard timed out")), 1200),
        ),
      ]);
      setFlash("Copied — paste into globals.css");
    } catch {
      console.info(out);
      setFlash("Clipboard unavailable — printed to the console instead");
    }
  }, [values, elements, outline, grid, guides, stillness]);

  if (!enabled) return null;

  const tokenChanges = Object.keys(values).filter((prop) => {
    const c = CONTROLS_BY_PROP.get(prop);
    if (!c) return false;
    return c.kind === "range"
      ? Number(values[prop]) !== Number(c.fallback)
      : values[prop] !== c.fallback;
  }).length;
  const changed = tokenChanges + Object.keys(elements).length;

  const activeRole = ROLES.find((r) => r.key === role) ?? ROLES[0];
  const dim = Number(values["--dim-opacity"] ?? 0.72);
  const hiddenHere = Object.entries(elements).filter(
    ([path, spec]) => spec.hidden && pageOf(path) === pathname,
  );

  const TABS = [
    { key: "palette", label: "Colour" },
    { key: "type", label: "Type" },
    { key: "place", label: "Place" },
    { key: "layout", label: "Layout" },
    { key: "motion", label: "Motion" },
  ] as const;

  return (
    <>
      <style>{`
        [data-tweak] { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
        [data-tweak] * { box-sizing: border-box; }
        [data-tweak] input[type="range"] { width: 100%; accent-color: #fff; height: 18px; }
        [data-tweak] input[type="color"] {
          height: 22px; width: 30px; padding: 0; border: 1px solid rgba(255,255,255,.25);
          background: transparent; cursor: pointer; flex: none;
        }
        [data-tweak] select, [data-tweak] textarea {
          width: 100%; background: #18181b; color: #fff; border: 1px solid rgba(255,255,255,.22);
          padding: 5px 7px; font: inherit; font-size: 11px;
        }
        /* The element being written into gets a dashed ring, so it is obvious
           that the page itself is the text field right now. */
        [contenteditable="true"] { outline: 1px dashed rgba(255,255,255,.6); outline-offset: 4px; }
        body[data-tweak-outline] :is(h1,h2,h3,p,li,dt,dd,summary,a,span) {
          outline: 1px solid color-mix(in oklab, magenta 55%, transparent);
        }
        body[data-tweak-grid]::before {
          content: ""; position: fixed; inset: 0; z-index: 70; pointer-events: none;
          background: repeating-linear-gradient(
            to bottom, rgba(255,255,255,.14) 0 1px, transparent 1px 8px
          );
        }
        body[data-tweak-guides]::after {
          content: ""; position: fixed; inset: 0; z-index: 70; pointer-events: none;
          background: linear-gradient(
            to right,
            transparent calc(50% - var(--shell) / 2 - 1px),
            rgba(255,0,255,.55) calc(50% - var(--shell) / 2 - 1px) calc(50% - var(--shell) / 2),
            transparent calc(50% - var(--shell) / 2),
            transparent calc(50% + var(--shell) / 2),
            rgba(255,0,255,.55) calc(50% + var(--shell) / 2) calc(50% + var(--shell) / 2 + 1px),
            transparent calc(50% + var(--shell) / 2 + 1px)
          );
        }
        body[data-tweak-still] *,
        body[data-tweak-still] *::before,
        body[data-tweak-still] *::after {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          filter: none !important;
        }
      `}</style>

      <BodyFlags outline={outline} grid={grid} guides={guides} stillness={stillness} />

      {/* Two outlines rather than a CSS `:hover` rule: a fixed box drawn over
          the element cannot change its layout, and an `outline` on the element
          itself would be clipped by every `overflow-hidden` section on the
          site — which is most of them. */}
      <div
        data-tweak
        ref={hoverBox}
        aria-hidden
        style={{
          position: "fixed",
          display: "none",
          zIndex: 88,
          pointerEvents: "none",
          border: "1px solid rgba(255,255,255,.55)",
          background: "rgba(255,255,255,.06)",
        }}
      />
      <div
        data-tweak
        ref={selectBox}
        aria-hidden
        style={{
          position: "fixed",
          display: "none",
          zIndex: 89,
          pointerEvents: "none",
          border: "2px solid #43b0a0",
        }}
      />

      <button
        data-tweak
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="tweak-panel"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: open ? "23rem" : 0,
          zIndex: 95,
          background: "#0a0a0b",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.25)",
          borderRight: open ? "1px solid rgba(255,255,255,.25)" : "none",
          padding: "10px 12px",
          fontSize: "10.5px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "right .18s ease-out",
        }}
      >
        {open ? "Close" : `Tweak${changed ? ` · ${changed}` : ""}`}
      </button>

      <div
        data-tweak
        id="tweak-panel"
        hidden={!open}
        style={{
          position: "fixed",
          insetBlock: 0,
          right: 0,
          zIndex: 94,
          display: open ? "flex" : "none",
          flexDirection: "column",
          width: "23rem",
          maxWidth: "100vw",
          background: "#0a0a0b",
          color: "#fff",
          borderLeft: "1px solid rgba(255,255,255,.16)",
        }}
      >
        <header
          style={{
            flex: "none",
            borderBottom: "1px solid rgba(255,255,255,.16)",
            padding: "12px 14px",
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" }}>
            Tweak — MERIDIAN
          </p>
          <p style={{ marginTop: 4, fontSize: 10, lineHeight: 1.55, color: "rgba(255,255,255,.55)" }}>
            T opens and closes · saves as you go · nothing here ships
          </p>

          <button
            type="button"
            onClick={() => {
              store.update({ picking: !picking });
              if (picking) {
                setSelection(null);
                setWriting(false);
              }
            }}
            aria-pressed={picking}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "7px 8px",
              fontSize: 10.5,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: picking ? "#0a0a0b" : "rgba(255,255,255,.75)",
              background: picking ? "#43b0a0" : "transparent",
              border: `1px solid ${picking ? "#43b0a0" : "rgba(255,255,255,.25)"}`,
            }}
          >
            {picking ? "Edit mode on — click anything" : "Edit mode — click to change one thing"}
          </button>
        </header>

        {/* ------------------------------------------------ element inspector */}
        {picking && node && selected ? (
          <div key={selected} style={{ minHeight: 0, flex: 1, overflowY: "auto", padding: 14 }}>
            <Group title={`Selected — ${shortLabel(node)}`}>
              <div style={{ display: "flex", gap: 5 }}>
                <button
                  type="button"
                  onClick={() => {
                    const parent = node.parentElement;
                    if (isSelectable(parent)) select(pathOf(parent));
                  }}
                  style={miniButton}
                >
                  ▲ Parent
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const child = Array.from(node.children).find(isSelectable);
                    if (child) select(pathOf(child));
                  }}
                  style={miniButton}
                >
                  ▼ Child
                </button>
                <button type="button" onClick={() => select(null)} style={miniButton}>
                  Clear
                </button>
              </div>
              <Note>
                The accent word in a headline is its own <code>span</code> — step
                in with Child to recolour just that word, or up with Parent to
                reach the block that holds it.
              </Note>
            </Group>

            <Group title="Copy">
              <button
                type="button"
                onClick={() => setWriting((v) => !v)}
                aria-pressed={writing}
                style={{
                  ...miniButton,
                  width: "100%",
                  padding: "7px 8px",
                  color: writing ? "#0a0a0b" : "rgba(255,255,255,.75)",
                  background: writing ? "#fff" : "transparent",
                }}
              >
                {writing ? "Writing — click to finish" : "Rewrite this text on the page"}
              </button>
              <Note>
                Typed in place, at its real size, against the picture it sits on —
                which is the only way to judge a headline. Any accent word inside
                it survives the edit.
              </Note>
            </Group>

            <Group title="Colour">
              <Swatches
                options={SWATCHES}
                current={edit.style?.color ?? ""}
                onPick={(v) => setOnElement("color", v)}
              />
              <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 10.5 }}>
                <input
                  type="color"
                  value={hexOf(edit.style?.color) ?? "#f3f1ec"}
                  onChange={(e) => setOnElement("color", e.target.value)}
                />
                <span style={{ color: "rgba(255,255,255,.72)" }}>Or any colour</span>
              </label>
              <Note>
                Inherit takes the override off — which is how you see the hero
                headline with its accent word in plain ink.
              </Note>
            </Group>

            <Group title="Ground">
              <Swatches
                options={GROUNDS}
                current={edit.style?.backgroundColor ?? ""}
                onPick={(v) => setOnElement("backgroundColor", v)}
              />
              <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 10.5 }}>
                <input
                  type="color"
                  value={hexOf(edit.style?.backgroundColor) ?? "#12306e"}
                  onChange={(e) => setOnElement("backgroundColor", e.target.value)}
                />
                <span style={{ color: "rgba(255,255,255,.72)" }}>Or any colour</span>
              </label>
            </Group>

            <Group title="Type and place">
              {ELEMENT_CONTROLS.map((c) => (
                <ControlView key={c.prop} control={c} value={readEl(c)} onChange={setOnElement} />
              ))}
            </Group>

            <Group title="Take it off the page">
              <button
                type="button"
                onClick={() =>
                  store.update({
                    elements: {
                      ...elements,
                      [selected]: { ...edit, hidden: !edit.hidden },
                    },
                  })
                }
                style={{
                  ...miniButton,
                  width: "100%",
                  padding: "7px 8px",
                  color: edit.hidden ? "#0a0a0b" : "#ff8f6b",
                  background: edit.hidden ? "#ff8f6b" : "transparent",
                  borderColor: "#ff8f6b",
                }}
              >
                {edit.hidden ? "Hidden — click to bring back" : "Remove this element"}
              </button>
              <Note>
                Hidden rather than deleted, so it is always recoverable and Export
                can still tell you which element to take out of the markup.
              </Note>
            </Group>

            <Group title="This element">
              <button type="button" onClick={revertElement} style={{ ...miniButton, width: "100%", padding: "7px 8px" }}>
                Revert it to how it ships
              </button>
            </Group>
          </div>
        ) : picking ? (
          <div style={{ minHeight: 0, flex: 1, overflowY: "auto", padding: 14 }}>
            <Group title="Pick something">
              <Note>
                Move over the page — the box follows what you are about to
                select. Click it to get its own controls: its words, its colour,
                its face, its size, where it sits, or whether it is there at all.
                Links and buttons do not fire while this is on, so ⌘-click (or
                Ctrl-click) one to actually follow it and edit another page.
              </Note>
            </Group>
            {hiddenHere.length > 0 && (
              <Group title={`Hidden on this page (${hiddenHere.length})`}>
                {hiddenHere.map(([path]) => {
                  const el = elementAt(path);
                  return (
                    <button
                      key={path}
                      type="button"
                      onClick={() => {
                        const next = { ...elements };
                        next[path] = { ...next[path], hidden: false };
                        store.update({ elements: next });
                      }}
                      style={{ ...miniButton, width: "100%", textAlign: "left", padding: "6px 8px" }}
                    >
                      Bring back — {el ? describe(el) : path}
                    </button>
                  );
                })}
              </Group>
            )}
          </div>
        ) : (
          /* -------------------------------------------------- system panel */
          <>
            <div
              style={{
                flex: "none",
                display: "flex",
                gap: 4,
                padding: "10px 14px 0",
              }}
            >
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-pressed={tab === t.key}
                  style={{
                    flex: 1,
                    padding: "5px 2px",
                    fontSize: 10,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    color: tab === t.key ? "#0a0a0b" : "rgba(255,255,255,.65)",
                    background: tab === t.key ? "#fff" : "transparent",
                    border: "1px solid rgba(255,255,255,.22)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* `key={tab}` remounts the scroller on every tab change: without it
                the panel keeps the previous tab's scroll offset, and switching
                from a long tab to a short one lands you mid-way down the new one
                with its first controls scrolled off the top. It reads as a tab
                that failed to render them. */}
            <div key={tab} style={{ minHeight: 0, flex: 1, overflowY: "auto", padding: 14 }}>
              {tab === "palette" && (
                <>
                  <Group title="Measured contrast">
                    <ul style={{ display: "grid", gap: 5, listStyle: "none", margin: 0, padding: 0 }}>
                      {PAIRS.map((pair) => {
                        const bg = currentColour(pair.bg);
                        const fg = pair.dim
                          ? (over(currentColour(pair.fg), bg, dim) ?? currentColour(pair.fg))
                          : currentColour(pair.fg);
                        const r = ratio(fg, bg);
                        const pass = r !== null && r >= pair.min;
                        return (
                          <li key={pair.label} style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 10.5 }}>
                            <span
                              aria-hidden
                              style={{ width: 7, height: 7, flex: "none", background: pass ? "#7ddba6" : "#ff8f6b" }}
                            />
                            <span style={{ flex: 1, color: "rgba(255,255,255,.7)" }}>{pair.label}</span>
                            <span style={{ color: pass ? "#fff" : "#ff8f6b" }}>{r ? r.toFixed(2) : "—"}:1</span>
                            <span style={{ width: 30, textAlign: "right", color: "rgba(255,255,255,.4)" }}>≥{pair.min}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <Note>
                      Recomputed on every change, including the dimmed row —
                      DESIGN.md records a ratio beside every token, and dragging
                      one without re-measuring is how that promise gets quietly
                      broken.
                    </Note>
                  </Group>

                  <Group title="Palette">
                    {PALETTE.map((c) => (
                      <ControlView key={c.prop} control={c} value={read(c)} colour={currentColour(c.prop)} onChange={set} />
                    ))}
                  </Group>
                </>
              )}

              {tab === "type" && (
                <>
                  <Group title="Faces">
                    {FACES.map((c) => (
                      <ControlView key={c.prop} control={c} value={read(c)} onChange={set} />
                    ))}
                  </Group>

                  <Group title="Role">
                    <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Which role to edit">
                      {ROLES.map((r) => (
                        <option key={r.key} value={r.key}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      {roleControls(activeRole).map((c) => (
                        <ControlView key={c.prop} control={c} value={read(c)} onChange={set} />
                      ))}
                    </div>
                  </Group>
                </>
              )}

              {tab === "place" && (
                <>
                  <Group title="The hero block">
                    {HERO.map((c) => (
                      <ControlView key={c.prop} control={c} value={read(c)} onChange={set} />
                    ))}
                    <Note>
                      These move the landing page&apos;s hero. Every other
                      page&apos;s title band follows the role controls in Type.
                    </Note>
                  </Group>

                  <Group title="Nudge a role">
                    <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Which role to move">
                      {ROLES.map((r) => (
                        <option key={r.key} value={r.key}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      {roleControls(activeRole)
                        .filter((c) => /-(align|x|y)$/.test(c.prop))
                        .map((c) => (
                          <ControlView key={c.prop} control={c} value={read(c)} onChange={set} />
                        ))}
                    </div>
                  </Group>
                </>
              )}

              {tab === "layout" && (
                <Group title="Shell and shape">
                  {LAYOUT.map((c) => (
                    <ControlView key={c.prop} control={c} value={read(c)} onChange={set} />
                  ))}
                </Group>
              )}

              {tab === "motion" && (
                <>
                  <Group title="Motion">
                    {MOTION.map((c) => (
                      <ControlView key={c.prop} control={c} value={read(c)} onChange={set} />
                    ))}
                  </Group>

                  <Group title="Review overlays">
                    <Toggle
                      label="Hold everything still"
                      on={stillness}
                      onChange={(v) => store.update({ stillness: v })}
                      note="Freezes the entrances and the dim so a composition can be judged without it re-animating under you."
                    />
                    <Toggle
                      label="Outline the text"
                      on={outline}
                      onChange={(v) => store.update({ outline: v })}
                      note="Every text box drawn, so you can see what a measure or an alignment is actually doing."
                    />
                    <Toggle label="8px baseline grid" on={grid} onChange={(v) => store.update({ grid: v })} />
                    <Toggle
                      label="Shell edges"
                      on={guides}
                      onChange={(v) => store.update({ guides: v })}
                      note="Drawn from the width token, so the guides follow the slider."
                    />
                  </Group>
                </>
              )}

              <Group title="Start from">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {PRESETS.map((p) => (
                    <button key={p.name} type="button" title={p.note} onClick={() => applyPreset(p.name)} style={miniButton}>
                      {p.name}
                    </button>
                  ))}
                </div>
                <Note>
                  Somewhere to jump from, not a blessed answer — a preset writes
                  the same overrides the sliders do, and you drag on from there.
                </Note>
              </Group>
            </div>
          </>
        )}

        <footer
          style={{
            flex: "none",
            display: "grid",
            gap: 8,
            borderTop: "1px solid rgba(255,255,255,.16)",
            padding: "12px 14px",
          }}
        >
          {flash && (
            <p role="status" style={{ fontSize: 10, lineHeight: 1.5, color: "#7ddba6" }}>
              {flash}
            </p>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={exportChanges}
              style={{
                flex: 1,
                padding: "8px 10px",
                fontSize: 10.5,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#0a0a0b",
                background: "#fff",
                border: "1px solid #fff",
                cursor: "pointer",
              }}
            >
              Export
            </button>
            <button type="button" onClick={reset} style={{ ...miniButton, padding: "8px 10px", letterSpacing: ".14em" }}>
              Reset
            </button>
          </div>
          <p style={{ fontSize: 9.5, lineHeight: 1.5, color: "rgba(255,255,255,.4)" }}>
            {changed
              ? `${tokenChanges} token${tokenChanges === 1 ? "" : "s"} · ${Object.keys(elements).length} element${Object.keys(elements).length === 1 ? "" : "s"}`
              : "Showing the shipped design"}
          </p>
        </footer>
      </div>
    </>
  );
}

/* --------------------------------------------------------------- fragments */

const miniButton: React.CSSProperties = {
  padding: "5px 8px",
  fontSize: 10,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,.75)",
  background: "transparent",
  border: "1px solid rgba(255,255,255,.22)",
  cursor: "pointer",
};

/** How deep a path sits, so parents can be applied before their children. */
function depthOf(path: string) {
  return (path.split("|")[1] ?? "").split(">").length;
}

/** Remember an element's pristine state the first time the editor touches it. */
function capture(path: string, el: HTMLElement) {
  if (pristine.has(path)) return;
  pristine.set(path, { style: el.getAttribute("style") ?? "", html: el.innerHTML });
}

/** camelCase → the property name `setProperty` expects. */
function cssName(prop: string) {
  return prop.startsWith("--") ? prop : prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** Position a fixed overlay box over an element's box. */
function frame(box: HTMLElement, el: HTMLElement) {
  const r = el.getBoundingClientRect();
  box.style.display = "block";
  box.style.left = `${r.left}px`;
  box.style.top = `${r.top}px`;
  box.style.width = `${r.width}px`;
  box.style.height = `${r.height}px`;
}

/** A stored colour, as something `<input type="color">` will accept. */
function hexOf(value: string | undefined) {
  return value && /^#[\da-f]{6}$/i.test(value) ? value : null;
}

function Swatches({
  options,
  current,
  onPick,
}: {
  options: { label: string; value: string }[];
  current: string;
  onPick: (value: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {options.map((o) => {
        const on = current === o.value;
        return (
          <button
            key={o.label}
            type="button"
            onClick={() => onPick(o.value)}
            aria-pressed={on}
            style={{
              ...miniButton,
              color: on ? "#0a0a0b" : "rgba(255,255,255,.75)",
              background: on ? "#fff" : "transparent",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The overlays are driven by attributes on `<body>` rather than by a class on a
 * wrapper, because the bar renders at the end of `<body>` and the things it has
 * to draw over — the fixed nav, the hero — are not inside it.
 */
function BodyFlags({
  outline,
  grid,
  guides,
  stillness,
}: {
  outline: boolean;
  grid: boolean;
  guides: boolean;
  stillness: boolean;
}) {
  useEffect(() => {
    const flags: [string, boolean][] = [
      ["data-tweak-outline", outline],
      ["data-tweak-grid", grid],
      ["data-tweak-guides", guides],
      ["data-tweak-still", stillness],
    ];
    for (const [attr, on] of flags) {
      if (on) document.body.setAttribute(attr, "");
      else document.body.removeAttribute(attr);
    }
    return () => {
      for (const [attr] of flags) document.body.removeAttribute(attr);
    };
  }, [outline, grid, guides, stillness]);

  return null;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 22 }}>
      <h3
        style={{
          fontSize: 10,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.55)",
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <div style={{ display: "grid", gap: 10 }}>{children}</div>
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 9.5, lineHeight: 1.55, color: "rgba(255,255,255,.42)" }}>{children}</p>;
}

function Toggle({
  label,
  on,
  onChange,
  note,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
  note?: string;
}) {
  return (
    <label style={{ display: "block", fontSize: 10.5 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} style={{ accentColor: "#fff" }} />
        <span style={{ color: "rgba(255,255,255,.72)" }}>{label}</span>
      </span>
      {note && <Note>{note}</Note>}
    </label>
  );
}

function ControlView({
  control,
  value,
  colour,
  onChange,
}: {
  control: Control;
  value: string;
  colour?: string;
  onChange: (prop: string, value: string) => void;
}) {
  if (control.kind === "colour") {
    return (
      <label style={{ display: "block", fontSize: 10.5 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <input type="color" value={colour ?? control.fallback} onChange={(e) => onChange(control.prop, e.target.value)} />
          <span style={{ flex: 1, color: "rgba(255,255,255,.72)" }}>{control.label}</span>
          <span style={{ color: "rgba(255,255,255,.42)" }}>{colour ?? control.fallback}</span>
        </span>
        {control.note && <Note>{control.note}</Note>}
      </label>
    );
  }

  if (control.kind === "range") {
    const isAuto = control.auto !== undefined && Number(value) === control.auto;
    return (
      <label style={{ display: "block", fontSize: 10.5 }}>
        <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ color: "rgba(255,255,255,.72)" }}>{control.label}</span>
          <span style={{ color: "rgba(255,255,255,.42)" }}>
            {isAuto ? (control.autoLabel ?? "auto") : `${value}${control.unit}`}
          </span>
        </span>
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          onChange={(e) => onChange(control.prop, e.target.value)}
        />
        {control.note && <Note>{control.note}</Note>}
      </label>
    );
  }

  return (
    <label style={{ display: "block", fontSize: 10.5 }}>
      <span style={{ display: "block", marginBottom: 4, color: "rgba(255,255,255,.72)" }}>{control.label}</span>
      <select value={value} onChange={(e) => onChange(control.prop, e.target.value)}>
        {control.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {control.note && <Note>{control.note}</Note>}
    </label>
  );
}
