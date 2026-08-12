import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Full-bleed image with overlaid copy.
 *
 * This section stands where a case-study grid would normally go. The company
 * is new and has no client work to show, so instead of inventing proof it
 * makes the offer that removes the risk: see the work on your own site.
 * When real before/afters exist, they belong directly beneath this.
 */
export function Offer() {
  return (
    <section id="work" className="relative isolate border-b border-ink-line">
      <Image
        src="https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=1800&q=80"
        alt={site.offer.imageAlt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-ink/80 md:bg-gradient-to-r md:from-ink md:via-ink/90 md:to-ink/50"
      />

      <div className="mx-auto max-w-[1400px] px-5 py-32 md:px-10 md:py-44">
        <Reveal className="max-w-[52ch]">
          <h2 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance text-bone md:text-[3rem]">
            {site.offer.headline}
          </h2>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-[1.75] text-bone-muted md:text-lg">
            {site.offer.body}
          </p>
          <a
            href="#enquiry"
            className="mt-10 inline-block bg-rust px-7 py-4 text-[15px] font-medium whitespace-nowrap text-ink transition-all hover:bg-rust-bright active:translate-y-px"
          >
            {site.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
