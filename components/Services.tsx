import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Asymmetric bento: exactly four cells for four services (7/5 then 5/7).
 * Two cells carry visual weight (a photograph and a tinted field) so the grid
 * is not four identical text boxes.
 */
const spans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export function Services() {
  const [design, redesign, seo, automation] = site.services;

  return (
    <section
      id="services"
      className="border-b border-ink-line px-5 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-bone md:text-[2.75rem]">
            What we do for renovation businesses
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px bg-ink-line md:grid-cols-12">
          {/* Cell 1: photographic. */}
          <Reveal className={`${spans[0]} relative isolate bg-ink-raised`}>
            <div className="relative flex min-h-[340px] flex-col justify-end p-8 md:p-10">
              <Image
                src="https://images.unsplash.com/photo-1696986681606-b156ccd761c5?w=1200&q=80"
                alt="A dark kitchen with a stone benchtop looking out to bushland"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="-z-10 object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/25"
              />
              <h3 className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
                {design.title}
              </h3>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-bone-muted">
                {design.body}
              </p>
            </div>
          </Reveal>

          {/* Cell 2: plain. */}
          <Reveal
            delay={0.06}
            className={`${spans[1]} flex flex-col justify-end bg-ink-raised p-8 md:min-h-[340px] md:p-10`}
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
              {redesign.title}
            </h3>
            <p className="mt-4 max-w-[42ch] leading-relaxed text-bone-muted">
              {redesign.body}
            </p>
          </Reveal>

          {/* Cell 3: plain. */}
          <Reveal
            delay={0.06}
            className={`${spans[2]} flex flex-col justify-end bg-ink-raised p-8 md:min-h-[320px] md:p-10`}
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
              {seo.title}
            </h3>
            <p className="mt-4 max-w-[42ch] leading-relaxed text-bone-muted">
              {seo.body}
            </p>
          </Reveal>

          {/* Cell 4: tinted field, the accent's one appearance in this grid. */}
          <Reveal
            delay={0.12}
            className={`${spans[3]} flex flex-col justify-end bg-gradient-to-br from-rust/18 via-ink-raised to-ink-raised p-8 md:min-h-[320px] md:p-10`}
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
              {automation.title}
            </h3>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-bone-muted">
              {automation.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
