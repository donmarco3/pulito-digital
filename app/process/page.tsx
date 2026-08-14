import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { meridian, site } from "@/content/site";

/**
 * The process page: the free-preview mechanism, step by step. With no
 * testimonials, case studies or client numbers allowed to exist, the way the
 * work runs IS the proof — this page is the argument made slowly.
 *
 * FIRST-DRAFT SCAFFOLDING from the consolidation commit: real destination,
 * real facts, full design-and-copy pass in milestone 3.
 */

export const metadata: Metadata = {
  title: `${meridian.pages.process.title} | ${site.name}`,
  description: meridian.pages.process.lede,
};

export default function ProcessPage() {
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
            <h1 className="hero-arrive max-w-[16ch] display-face text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[0.98] tracking-[-0.04em] text-balance">
              {meridian.pages.process.title}
            </h1>
            <p
              className="hero-arrive mt-7 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.12s" }}
            >
              {meridian.pages.process.lede}
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-24">
            {/* The same ruled sequence the landing page carries, at reading
                pace. Numerals are earned here: the order is the information. */}
            <ol className="grid gap-px bg-mer-line sm:grid-cols-2">
              {site.process.map((step, i) => (
                <li key={step.title} className="bg-mer p-8 sm:p-10">
                  <Reveal>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-mer-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-5 display-face text-[1.5rem] tracking-[-0.02em]">
                      {step.title}
                    </h2>
                    <p className="mt-3 max-w-[52ch] leading-relaxed text-mer-ink-soft">
                      {step.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
