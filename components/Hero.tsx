import Image from "next/image";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] border-b border-ink-line"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch lg:grid-cols-12">
        {/* Copy column. Deliberately narrower than the asset so the layout
            reads asymmetric rather than a 50/50 split. */}
        <div className="flex flex-col justify-center px-5 pt-32 pb-16 md:px-10 lg:col-span-6 lg:pt-24 lg:pr-16 lg:pb-24 xl:col-span-5">
          <h1 className="font-display text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-balance text-bone md:text-6xl xl:text-[4.2rem]">
            {site.hero.headline}
          </h1>

          <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-bone-muted md:text-lg">
            {site.hero.subhead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#enquiry"
              className="bg-rust px-7 py-4 text-[15px] font-medium whitespace-nowrap text-ink transition-all hover:bg-rust-bright active:translate-y-px"
            >
              {site.cta}
            </a>
            <a
              href="#work"
              className="border-b border-ink-line-strong pb-1 text-[15px] text-bone transition-colors hover:border-rust"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Asset column. Full-bleed to the right edge on desktop. */}
        <div className="relative min-h-[52vh] lg:col-span-6 lg:min-h-[100dvh] xl:col-span-7">
          <Image
            src="https://images.unsplash.com/photo-1632583824020-937ae9564495?w=1800&q=80"
            alt={site.hero.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
          {/* Scrim: ties the photo into the page and keeps the left edge from
              cutting hard against the copy column. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/25 to-transparent lg:from-ink lg:via-ink/10"
          />
        </div>
      </div>
    </section>
  );
}
