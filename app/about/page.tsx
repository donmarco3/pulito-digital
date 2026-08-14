import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { meridian, site } from "@/content/site";

/**
 * The studio page. ABOUT THE STUDIO, NEVER THE FOUNDER — a standing
 * constraint from PRODUCT.md, confirmed again when this page was commissioned:
 * no name, no photograph, no bio. The page argues what Pulito believes and
 * how it works, which is all a new studio can honestly say.
 *
 * FIRST-DRAFT SCAFFOLDING from the consolidation commit: real destination,
 * real facts, full design-and-copy pass in milestone 3.
 */

export const metadata: Metadata = {
  title: `${meridian.pages.about.title} | ${site.name}`,
  description: meridian.pages.about.lede,
};

export default function AboutPage() {
  return (
    <div className="motion-clear bg-mer text-mer-ink">
      <a
        href="#main"
        className="skip-link rounded-full bg-mer-accent px-4 py-2 font-schibsted text-[13px] font-semibold text-mer-3"
      >
        Skip to content
      </a>

      <MeridianNav />

      <main id="main">
        <section className="border-b border-mer-line">
          <div className="mx-auto max-w-[86rem] px-5 pt-40 pb-16 sm:px-8 sm:pt-44 sm:pb-20">
            <h1 className="hero-arrive max-w-[14ch] display-face text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[0.98] tracking-[-0.04em] text-balance">
              {meridian.pages.about.title}
            </h1>
            <p
              className="hero-arrive mt-7 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.12s" }}
            >
              {meridian.pages.about.lede}
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <div className="flex max-w-[66ch] flex-col gap-7">
                {meridian.pages.about.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-[1.08rem] leading-relaxed text-mer-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
