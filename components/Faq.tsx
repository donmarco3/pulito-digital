import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Faq() {
  return (
    <section
      id="faq"
      className="border-b border-ink-line px-5 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-bone md:text-[2.75rem]">
            Questions we get asked
          </h2>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="divide-y divide-ink-line border-y border-ink-line">
            {site.faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.04}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-lg font-medium tracking-tight text-bone md:text-xl">
                      {faq.q}
                    </span>
                    <CaretDownIcon
                      weight="regular"
                      className="size-5 shrink-0 text-bone-faint transition-transform duration-300 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="max-w-[68ch] pb-7 leading-[1.75] text-bone-muted">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
