import type { FormSkin } from "./EnquiryForm";

/*
  One form, three skins. Markup, validation, focus management and the demo-only
  submit are shared, so the three directions can never drift apart on how the
  enquiry actually works — which also means whichever one wins, the form is
  already the tested one. A skin may only change class strings.

  The skins carry the directions' shape languages honestly, because the form is
  where a shape language stops being a preference and starts being an
  affordance: MERIDIAN's fields are square boxes cut into a recessed panel,
  PLINTH's are underlines with no box at all (it is the direction with no
  chrome, and a bordered field would be the only card on the page), LATTICE's
  are soft-cornered cells on white with a tinted focus.

  Contrast is measured, not judged. Field borders and underlines are non-text
  UI and clear 3:1 against the panel they sit on (WCAG 1.4.11); labels, hints
  and error messages clear 4.5:1. No skin sets `focus:outline-none` — that
  would compute away the `:focus-visible` ring authored in globals.css and
  leave a colour shift as the only focus cue.

  Every input is 16px in every skin, and that is not a taste decision: mobile
  Safari zooms the viewport when a field under 16px is focused and does not
  zoom back out. A 14px input throws the reader into a zoomed, horizontally
  scrolling page at the exact moment he commits, on the one conversion event
  the page has, on the device he is actually holding.
*/

/**
 * 1 — MERIDIAN. Square fields cut into the recessed blue panel, pill action.
 *
 * The split is the direction's shape rule made literal: the things that HOLD
 * something keep radius 0, and the one thing you press is a pill. A form is
 * where that rule stops being a preference and starts telling the reader which
 * element is the control.
 *
 * Fields sit on `mer-3`, a step DARKER than the `mer-2` panel around them
 * rather than lighter. On a saturated mid-blue ground a lighter field reads as
 * a raised card; a darker one reads as a cut, which is what an input is.
 */
export const meridianSkin: FormSkin = {
  id: "meridian",
  label:
    "font-mono text-[10.5px] font-medium tracking-[0.18em] uppercase text-mer-ink-soft",
  hint: "font-sans text-[13px] text-mer-ink-soft",
  input:
    "w-full border border-mer-line-strong bg-mer-3 px-4 py-3.5 font-sans text-[16px] text-mer-ink transition-colors hover:border-mer-ink-soft focus:border-mer-accent aria-invalid:border-mer-accent",
  option: "bg-mer-3 text-mer-ink",
  /* Marked important: it is appended after `input`, and both are text-*
     utilities, so otherwise the winner is decided by generated CSS order
     rather than by the order they appear in the attribute. */
  placeholder: "text-mer-ink-soft!",
  /* The one hue on a monochrome page, and it earns its place. With bone as the
     accent, error text set in the accent is the same colour as the label above
     it and the hint beside it, so nothing but the sentence itself marks the
     field as wrong. `mer-alert` is a soft rose at 8.8:1 on this panel, shown
     only on failure. The invalid BORDER stays bone, so the field and its
     message are not both shouting. */
  error: "font-sans text-[13.5px] text-mer-alert",
  button:
    "mt-1 w-full rounded-full bg-mer-accent px-10 py-5 font-schibsted text-[14px] font-semibold tracking-[0.02em] whitespace-nowrap text-mer-3 transition-colors hover:bg-mer-accent-deep active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border border-mer-accent bg-mer-3 px-8 py-12",
    title: "font-schibsted text-3xl font-semibold tracking-[-0.02em] text-mer-ink",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-mer-ink-soft",
    link: "mt-7 inline-block border-b border-mer-accent pb-1 font-sans text-[15px] text-mer-ink",
  },
};

/** 2 — PLINTH. No boxes anywhere: the field is a rule, the action is a pill. */
export const plinthSkin: FormSkin = {
  id: "plinth",
  label:
    "font-archivo text-[11px] font-bold tracking-[0.16em] uppercase text-pli-ink-soft",
  hint: "font-sans text-[13px] text-pli-ink-soft",
  /* An underline, not a box. It thickens as well as changing colour on focus,
     so the cue is never carried by hue alone. */
  input:
    "w-full border-0 border-b border-pli-line-strong bg-transparent px-0 py-3 font-sans text-[16px] text-pli-ink transition-colors hover:border-pli-ink focus:border-b-2 focus:border-pli-accent aria-invalid:border-b-2 aria-invalid:border-pli-accent",
  option: "bg-pli text-pli-ink",
  placeholder: "text-pli-ink-soft!",
  error: "font-sans text-[13.5px] text-pli-accent",
  button:
    "mt-1 w-full rounded-full bg-pli-accent px-10 py-5 font-archivo text-[14px] font-bold tracking-[0.01em] whitespace-nowrap text-bone transition-colors hover:bg-pli-accent-deep active:translate-y-px disabled:opacity-70",
  success: {
    /* Still no border: the tonal step is the panel, exactly as everywhere else
       on this direction. */
    wrap: "bg-pli-2 px-8 py-12",
    title:
      "font-archivo text-3xl font-extrabold tracking-[-0.035em] text-pli-ink",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-pli-ink-soft",
    link: "mt-7 inline-block border-b-2 border-pli-accent pb-1 font-sans text-[15px] text-pli-ink",
  },
};

/** 3 — LATTICE. Soft cells on white, the accent reserved for the action. */
export const latticeSkin: FormSkin = {
  id: "lattice",
  label: "font-manrope text-[12.5px] font-semibold text-lat-ink",
  hint: "font-sans text-[13px] text-lat-ink-soft",
  input:
    "w-full rounded-lg border border-lat-line bg-lat px-4 py-3.5 font-sans text-[16px] text-lat-ink transition-colors hover:border-lat-line-strong focus:border-lat-accent focus:bg-lat-accent-soft/40 aria-invalid:border-lat-accent",
  option: "bg-lat text-lat-ink",
  placeholder: "text-lat-ink-soft!",
  error: "font-sans text-[13.5px] text-lat-accent",
  button:
    "mt-1 w-full rounded-lg bg-lat-accent px-10 py-4.5 font-manrope text-[15px] font-bold whitespace-nowrap text-bone transition-colors hover:bg-lat-accent-deep active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "rounded-xl border border-lat-line bg-lat-2 px-8 py-12",
    title: "font-manrope text-3xl font-extrabold tracking-[-0.02em] text-lat-ink",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-lat-ink-soft",
    link: "mt-7 inline-block border-b-2 border-lat-accent pb-1 font-sans text-[15px] text-lat-ink",
  },
};
