import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { DimSection, RailProvider } from "@/components/SectionRail";
import { SiteFooter } from "@/components/SiteFooter";
import { meridianSkin } from "@/components/skins";
import { meridian, site } from "@/content/site";

/**
 * The process page — THE DEEPENED LADDER (milestone-3 review; surface seed
 * b80f7f55, candidate 3 of the grounded list).
 *
 * With no testimonials, case studies or client numbers allowed to exist,
 * the way the work runs IS the proof, and this page makes each step carry
 * its evidence structurally: what happens (the standing step copy), what
 * you leave with (`youGet` — "you get the findings whether or not you hire
 * us" made into a column), and one measured line (`fact`) in the mono
 * measurement voice. Every fact is ratified or already granted; the Design
 * band's "$0" is the free preview sitting inside the sequence at the
 * moment money would normally first change hands.
 *
 * Numerals are earned here twice over: the page is ABOUT the sequence.
 *
 * It ends at the enquiry form — a reader who has just been told what
 * happens when they press send is the reader most ready to press it.
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

      <RailProvider>
        <main id="main">
          <section className="relative isolate overflow-hidden">
            <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40vh]" />
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

          {/*
            The ladder. One full-width ruled band per step. Left: the
            numeral, the step, what happens. Right: a small `dl` — the
            deliverable under the same mono label voice the contact rows
            use, and the step's one measured line on a hairline of its own.
            The dim walks the reader down a band at a time.
          */}
          {site.process.map((step, i) => (
            <DimSection
              key={step.title}
              id={`step-${i + 1}`}
              className="border-t border-mer-line"
            >
              <div className="mx-auto grid max-w-[86rem] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-24">
                <Reveal>
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-mer-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-5 display-face text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.02] tracking-[-0.03em]">
                      {step.title}
                    </h2>
                    <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.35vw,1.18rem)] leading-relaxed text-mer-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </Reveal>

                <Reveal>
                  <dl className="lg:pt-12">
                    <div className="border-t border-mer-line py-5">
                      <dt className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
                        You leave with
                      </dt>
                      <dd className="mt-2.5 max-w-[44ch] leading-relaxed text-mer-ink">
                        {step.youGet}
                      </dd>
                    </div>
                    <div className="border-t border-b border-mer-line py-5">
                      <dt className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
                        Measured
                      </dt>
                      <dd className="mt-2.5 font-mono text-[13px] tracking-[0.04em] text-mer-accent">
                        {step.fact}
                      </dd>
                    </div>
                  </dl>
                </Reveal>
              </div>
            </DimSection>
          ))}

          <DimSection id="enquiry" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <Reveal>
                  <div>
                    <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance">
                      {site.form.headline}
                    </h2>
                    <p className="mt-5 max-w-[52ch] leading-relaxed text-mer-ink-soft">
                      {site.form.body}
                    </p>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="bg-mer-2 p-7 sm:p-10">
                    <EnquiryForm skin={meridianSkin} />
                  </div>
                </Reveal>
              </div>
            </div>
          </DimSection>
        </main>
      </RailProvider>

      <SiteFooter />
    </div>
  );
}
