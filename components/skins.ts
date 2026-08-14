import type { FormSkin } from "./EnquiryForm";

/*
  The enquiry form's skin. There were three — one per direction, over one
  shared form so the directions could never drift apart on how the enquiry
  actually works. MERIDIAN won; the other two skins are in git history with
  their pages. The `skin` indirection stays, because it keeps every class
  string that styles the form in one audited place.

  Contrast is measured, not judged. Field borders are non-text UI and clear
  3:1 against the panel they sit on (WCAG 1.4.11); labels, hints and error
  messages clear 4.5:1. The skin never sets `focus:outline-none` — that would
  compute away the `:focus-visible` ring authored in globals.css and leave a
  colour shift as the only focus cue.

  Every input is 16px, and that is not a taste decision: mobile Safari zooms
  the viewport when a field under 16px is focused and does not zoom back out.
  A 14px input throws the reader into a zoomed, horizontally scrolling page at
  the exact moment he commits, on the one conversion event the page has, on
  the device he is actually holding.
*/

/**
 * MERIDIAN. Square fields cut into the recessed blue panel, pill action.
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
  /* Error text gets its own hue because the accent alone could not mark it:
     with the old bone accent, error text set in the accent was the same
     colour as the label above it. `mer-alert` is a soft rose at 8.8:1 on this
     panel, shown only on failure. The invalid BORDER stays quiet, so the
     field and its message are not both shouting. */
  error: "font-sans text-[13.5px] text-mer-alert",
  button:
    "mt-1 w-full rounded-full bg-mer-accent px-10 py-5 font-schibsted text-[14px] font-semibold tracking-[0.02em] whitespace-nowrap text-mer-3 transition-colors hover:bg-mer-accent-deep active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border border-mer-accent bg-mer-3 px-8 py-12",
    /* The success panel's heading follows the display face with every other
       heading. Weight comes from `display-face`. */
    title: "display-face text-3xl tracking-[-0.02em] text-mer-ink",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-mer-ink-soft",
    link: "mt-7 inline-block border-b border-mer-accent pb-1 font-sans text-[15px] text-mer-ink",
  },
};
