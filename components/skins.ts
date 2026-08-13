import type { FormSkin } from "./EnquiryForm";

/*
  One form, five skins. Markup, validation, focus management and the demo-only
  submit are shared, so the five directions can never drift apart on how the
  enquiry actually works — which also means whichever one wins, the form is
  already the tested one. A skin may only change class strings.

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

/** 1 — ULTRAMARINE. Boxed fields cut into the recessed blue band. */
export const ultramarineSkin: FormSkin = {
  id: "ultramarine",
  label:
    "font-archivo text-[11px] font-semibold tracking-[0.22em] uppercase text-ultra-bone-soft",
  hint: "font-sans text-[13px] text-ultra-bone-soft",
  input:
    "w-full border border-ultra-rule-strong bg-ultra px-4 py-3.5 font-sans text-[16px] text-ultra-bone transition-colors hover:border-ultra-bone focus:border-ultra-signal aria-invalid:border-ultra-signal",
  option: "bg-ultra text-ultra-bone",
  /* Marked important: it is appended after `input`, and both are text-*
     utilities, so otherwise the winner is decided by generated CSS order
     rather than by the order they appear in the attribute. */
  placeholder: "text-ultra-bone-soft!",
  /* No red anywhere in this direction, so the error takes the signal bone and
     the invalid border carries it too. Importing a red for errors alone would
     put the only unplanned hue on the page at the one moment the reader is
     already frustrated. */
  error: "font-sans text-[13.5px] text-ultra-signal",
  button:
    "mt-1 w-full bg-ultra-signal px-10 py-5 font-archivo text-[13px] font-semibold tracking-[0.24em] whitespace-nowrap text-obsidian uppercase transition-colors hover:bg-ultra-bone active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border border-ultra-signal bg-ultra px-8 py-12",
    title: "font-caslon text-3xl text-ultra-bone",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-ultra-bone-soft",
    link: "mt-7 inline-block border-b border-ultra-signal pb-1 font-sans text-[15px] text-ultra-bone",
  },
};

/** 2 — NERO. Gilt rules on black, no boxes: the field is a line. */
export const neroSkin: FormSkin = {
  id: "nero",
  /* Bone, not gilt. Gilt labels above gilt underlines above a gilt button put
     three weights of the same accent in one panel and cost the button its
     job — and a field label is the most inert thing on the page. */
  label:
    "font-archivo text-[11px] font-medium tracking-[0.26em] uppercase text-nero-bone-soft",
  hint: "font-sans text-[13px] text-nero-bone-soft",
  /* An underline, not a box. It thickens and turns gilt on focus, so the
     focus cue is never carried by colour alone. */
  input:
    "w-full border-0 border-b border-nero-rule-strong bg-transparent px-0 py-3 font-sans text-[16px] text-nero-bone transition-colors hover:border-nero-bone focus:border-b-2 focus:border-gilt aria-invalid:border-b-2 aria-invalid:border-gilt-bright",
  option: "bg-nero text-nero-bone",
  placeholder: "text-nero-bone-soft!",
  error: "font-sans text-[13.5px] text-gilt-bright",
  button:
    "mt-1 w-full border border-gilt bg-transparent px-10 py-5 font-archivo text-[13px] font-medium tracking-[0.3em] whitespace-nowrap text-gilt uppercase transition-colors hover:bg-gilt hover:text-nero active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border border-gilt bg-nero-2 px-8 py-12",
    title: "font-bodoni text-3xl text-nero-bone",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-nero-bone-soft",
    link: "mt-7 inline-block border-b border-gilt pb-1 font-sans text-[15px] text-nero-bone",
  },
};

/** 3 — BIANCO. A catalogue schedule: ruled cells, mono labels, no fills. */
export const biancoSkin: FormSkin = {
  id: "bianco",
  label:
    "font-mono text-[10.5px] font-medium tracking-[0.18em] uppercase text-bianco-ink-soft",
  hint: "font-sans text-[13px] text-bianco-ink-soft",
  input:
    "w-full border border-bianco-rule-strong bg-bianco px-4 py-3.5 font-sans text-[16px] text-bianco-ink transition-colors hover:border-bianco-ink focus:border-vermilion aria-invalid:border-vermilion",
  option: "bg-bianco text-bianco-ink",
  placeholder: "text-bianco-ink-soft!",
  error: "font-sans text-[13.5px] text-vermilion",
  /* Vermilion is 5.4:1 against the paper, so the fill is its own boundary and
     needs no hairline around it. Bone sits on it at 6.2:1. */
  button:
    "mt-1 w-full bg-vermilion px-10 py-5 font-mono text-[12px] font-medium tracking-[0.2em] whitespace-nowrap text-bone uppercase transition-colors hover:bg-vermilion-deep active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border border-vermilion bg-bianco px-8 py-12",
    title: "font-garamond text-3xl text-bianco-ink",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-bianco-ink-soft",
    link: "mt-7 inline-block border-b border-vermilion pb-1 font-sans text-[15px] text-bianco-ink",
  },
};

/** 4 — CAVA. Heavy boxes on dust, the way a site form is actually printed. */
export const cavaSkin: FormSkin = {
  id: "cava",
  label:
    "font-archivo text-[11px] font-bold tracking-[0.16em] uppercase text-cava-ink",
  hint: "font-sans text-[13px] text-cava-ink-soft",
  input:
    "w-full border-2 border-cava-rule-strong bg-cava px-4 py-3.5 font-sans text-[16px] text-cava-ink transition-colors hover:border-cava-ink focus:border-hivis aria-invalid:border-hivis",
  option: "bg-cava text-cava-ink",
  placeholder: "text-cava-ink-soft!",
  error: "font-sans text-[13.5px] text-hivis-deep",
  /* Hi-vis is 5.1:1 on the dust ground and bone sits on it at 5.6:1. */
  button:
    "mt-1 w-full bg-hivis px-10 py-5 font-archivo text-[14px] font-extrabold tracking-[0.14em] whitespace-nowrap text-bone uppercase transition-colors hover:bg-hivis-deep active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border-2 border-hivis bg-cava px-8 py-12",
    title:
      "font-archivo text-2xl font-extrabold tracking-[-0.01em] uppercase text-cava-ink",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-cava-ink-soft",
    link: "mt-7 inline-block border-b-2 border-hivis pb-1 font-sans text-[15px] text-cava-ink",
  },
};

/** 5 — GESSO. Fields sunk into the hall, the acid reserved for the action. */
export const gessoSkin: FormSkin = {
  id: "gesso",
  label:
    "font-bricolage text-[11px] font-semibold tracking-[0.2em] uppercase text-gesso-bone-soft",
  hint: "font-sans text-[13px] text-gesso-bone-soft",
  input:
    "w-full border-0 border-b-2 border-gesso-rule-strong bg-gesso-2 px-4 py-3.5 font-sans text-[16px] text-gesso-bone transition-colors hover:border-gesso-bone focus:border-acid aria-invalid:border-acid",
  option: "bg-gesso text-gesso-bone",
  placeholder: "text-gesso-bone-soft!",
  error: "font-sans text-[13.5px] text-acid",
  /* Acid is 10.4:1 on the hall ground; obsidian sits on the fill at 12.6:1. */
  button:
    "mt-1 w-full bg-acid px-10 py-5 font-bricolage text-[14px] font-bold tracking-[0.12em] whitespace-nowrap text-obsidian uppercase transition-colors hover:bg-acid-deep active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border-2 border-acid bg-gesso-2 px-8 py-12",
    title: "font-bricolage text-3xl font-bold text-gesso-bone",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-gesso-bone-soft",
    link: "mt-7 inline-block border-b-2 border-acid pb-1 font-sans text-[15px] text-gesso-bone",
  },
};
