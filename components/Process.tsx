import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Stacked rows with a single hairline between them. This section is doing the
 * job proof would normally do, so it stays plain and legible: the verb is the
 * label, no numbering, no cards.
 */
export function Process() {
  return (
    <section
      id="process"
      className="border-b border-ink-line px-5 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-bone md:text-[2.75rem]">
            How the work runs
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-ink-line border-t border-ink-line">
          {site.process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-4 py-9 md:grid-cols-12 md:gap-10 md:py-11">
                <h3 className="font-display text-xl font-semibold tracking-tight text-bone md:col-span-4 md:text-2xl">
                  {step.title}
                </h3>
                <p className="max-w-[62ch] leading-relaxed text-bone-muted md:col-span-8">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
