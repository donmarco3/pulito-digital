import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Manifesto band. No image, no columns, no cards. It is the one section on
 * the page whose only job is to make the reader recognise their own website.
 */
export function Problem() {
  return (
    <section className="border-b border-ink-line px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-[20ch]">
          <h2 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance text-bone md:text-5xl">
            {site.problem.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 lg:mt-14 lg:pl-[38%]">
          <p className="max-w-[58ch] text-[1.0625rem] leading-[1.75] text-bone-muted md:text-lg">
            {site.problem.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
