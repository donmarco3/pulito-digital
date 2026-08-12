import type { FormSkin } from "./EnquiryForm";

/*
  Field borders are non-text UI and must clear 3:1 against the ground they sit
  on (WCAG 1.4.11). Measured values are noted per variant. None of these skins
  sets focus:outline-none: that would compute away the :focus-visible ring
  authored in globals.css and leave a 1px colour shift as the only focus cue.
*/

/** Variant I. Form sits on the malachite field, so its type runs light. */
export const skinOne: FormSkin = {
  id: "one",
  label: "font-mono text-[11px] tracking-[0.18em] uppercase text-[#cadfd6]",
  hint: "font-sans text-[13px] text-[#b0cabf]",
  // Border 4.25:1 on #0f4d3a.
  input:
    "w-full border border-[#8cb3a5] bg-transparent px-4 py-3.5 font-sans text-[15px] text-[#f2f0eb] placeholder:text-[#b0cabf] transition-colors hover:border-[#cadfd6] focus:border-[#f2f0eb]",
  option: "bg-[#0f4d3a] text-[#f2f0eb]",
  placeholder: "text-[#b0cabf]",
  error: "font-sans text-[13px] text-[#f3ccc3]",
  buttonWrap: "flex justify-center",
  button:
    "mt-1 bg-[#f2f0eb] px-10 py-4 font-mono text-[12px] tracking-[0.22em] whitespace-nowrap text-[#0f4d3a] uppercase transition-all hover:bg-white active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border border-[#8cb3a5] px-8 py-12 text-center",
    title: "font-display text-3xl text-[#f2f0eb]",
    body: "mx-auto mt-4 max-w-[42ch] font-sans leading-relaxed text-[#cadfd6]",
    link: "mt-7 inline-block border-b border-[#8cb3a5] pb-1 font-sans text-[15px] text-[#f2f0eb]",
  },
};

/** Variant II. Gilt rules on near-black. */
export const skinTwo: FormSkin = {
  id: "two",
  label: "font-mono text-[11px] tracking-[0.2em] uppercase text-accent",
  hint: "font-sans text-[13px] text-fg-muted",
  // Border 3.56:1 on #101013.
  input:
    "w-full border-0 border-b border-[#6a6a75] bg-transparent px-0 py-3 font-sans text-[15px] text-fg placeholder:text-fg-muted transition-colors hover:border-fg-muted focus:border-accent",
  option: "bg-surface-2 text-fg",
  placeholder: "text-fg-muted",
  error: "font-sans text-[13px] text-[#e8a598]",
  button:
    "mt-1 w-full bg-accent px-10 py-4 font-mono text-[12px] tracking-[0.22em] whitespace-nowrap text-accent-fg uppercase transition-all hover:brightness-110 active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border border-accent/60 bg-surface-2 px-8 py-12",
    title: "font-display text-3xl text-fg",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-fg-muted",
    link: "mt-7 inline-block border-b border-accent pb-1 font-sans text-[15px] text-fg",
  },
};

/** Variant III. Heavy boxes, porphyry fill, mono everywhere. */
export const skinThree: FormSkin = {
  id: "three",
  label: "font-mono text-[11px] tracking-[0.22em] uppercase text-accent",
  hint: "font-sans text-[13px] text-fg-muted",
  // Border 3.54:1 on #08070a.
  input:
    "w-full border-2 border-[#6f6180] bg-surface px-4 py-3.5 font-mono text-[14px] text-fg placeholder:text-fg-muted transition-colors hover:border-accent focus:border-accent",
  option: "bg-surface text-fg",
  placeholder: "text-fg-muted",
  error: "font-mono text-[12px] tracking-[0.06em] text-[#ff9d8a]",
  button:
    "mt-1 w-full border-2 border-accent bg-accent px-10 py-5 font-display text-[15px] tracking-[0.24em] whitespace-nowrap text-accent-fg uppercase transition-colors hover:bg-transparent hover:text-accent active:translate-y-px disabled:opacity-70",
  success: {
    wrap: "border-2 border-accent bg-surface-2 px-8 py-12",
    title: "font-display text-2xl tracking-[0.06em] uppercase text-fg",
    body: "mt-4 max-w-[42ch] font-sans leading-relaxed text-fg-muted",
    link: "mt-7 inline-block border-b-2 border-accent pb-1 font-mono text-[14px] text-fg",
  },
};
