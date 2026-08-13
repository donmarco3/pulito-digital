import type { FormSkin } from "./EnquiryForm";

/*
  One form, one skin.

  There were five while five directions were being compared, and the split is
  kept even now that four are gone: markup, validation, focus management and
  the demo-only submit live in `EnquiryForm.tsx`, and a skin may only change
  class strings. That is what meant the surviving form was already the tested
  one on the day a direction was chosen, and it is what keeps a future restyle
  from quietly changing how the enquiry behaves.

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

/** Boxed fields cut into the recessed blue band. */
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
  /* No red anywhere on this page, so the error takes the signal bone and the
     invalid border carries it too. Importing a red for errors alone would put
     the only unplanned hue on the page at the one moment the reader is already
     frustrated — and it would survive the tweak bar recolouring everything
     else, which is worse. */
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
