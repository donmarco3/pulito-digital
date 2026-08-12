import type { FormSkin } from "./EnquiryForm";

/*
  Field borders are non-text UI and must clear 3:1 against the ground they sit
  on (WCAG 1.4.11). --color-line-strong is 3.6:1 on the raised surface.
  Nothing here sets focus:outline-none: that would compute away the
  :focus-visible ring authored in globals.css and leave a 1px colour shift as
  the only focus cue.
*/
export const formSkin: FormSkin = {
  id: "enquiry",
  label: "font-mono text-[11px] tracking-[0.22em] uppercase text-accent",
  hint: "font-sans text-[13px] text-fg-muted",
  input:
    "w-full border-2 border-line-strong bg-surface px-4 py-3.5 font-mono text-[14px] text-fg placeholder:text-fg-muted transition-colors hover:border-accent focus:border-accent",
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
