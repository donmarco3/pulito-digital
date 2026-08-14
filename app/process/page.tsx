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
        className="skip-link pill t-control bg-mer-accent px-4 py-2 text-mer-3"
      >
        Skip to content
      </a>

      <MeridianNav />

      <RailProvider>
        <main id="main">
          <section className="relative isolate overflow-hidden">
            <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40vh]" />
            <div className="shell pt-40 pb-16 sm:pt-44 sm:pb-20">
              <h1
                className="hero-arrive t-h1 max-w-[16ch] text-balance"
                style={{
                  ["--h1-min" as string]: "2.6rem",
                  ["--h1-fluid" as string]: "6.5vw",
                  ["--h1-max" as string]: "4.8rem",
                  ["--h1-lead" as string]: "0.98",
                }}
              >
                {meridian.pages.process.title}
              </h1>
              <p
                className="hero-arrive t-lead mt-7 text-mer-ink-soft"
                style={{
                  ["--arrive-delay" as string]: "0.12s",
                  ["--measure" as string]: "58ch",
                }}
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
              <div
                className="shell band grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-24"
                style={{
                  ["--band-pad" as string]: "4rem",
                  ["--band-pad-wide" as string]: "5rem",
                }}
              >
                <Reveal>
                  <div>
                    <span
                      className="t-label text-mer-accent"
                      style={{
                        ["--label-size" as string]: "11px",
                        ["--label-track" as string]: "0.2em",
                        ["--label-case" as string]: "none",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="t-h2 mt-5"
                      style={{
                        ["--h2-min" as string]: "2rem",
                        ["--h2-fluid" as string]: "4.2vw",
                        ["--h2-max" as string]: "3.2rem",
                        ["--h2-lead" as string]: "1.02",
                      }}
                    >
                      {step.title}
                    </h2>
                    <p
                      className="t-body mt-6 text-mer-ink-soft"
                      style={{
                        ["--body-max" as string]: "1.18rem",
                        ["--body-fluid" as string]: "1.35vw",
                        ["--measure" as string]: "58ch",
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </Reveal>

                <Reveal>
                  <dl className="lg:pt-12">
                    <div className="border-t border-mer-line py-5">
                      <dt className="t-label text-mer-ink-soft">
                        You leave with
                      </dt>
                      <dd
                        className="t-body mt-2.5 text-mer-ink"
                        style={{ ["--measure" as string]: "44ch" }}
                      >
                        {step.youGet}
                      </dd>
                    </div>
                    <div className="border-t border-b border-mer-line py-5">
                      <dt className="t-label text-mer-ink-soft">Measured</dt>
                      <dd
                        className="t-label mt-2.5 text-mer-accent"
                        style={{
                          ["--label-size" as string]: "13px",
                          ["--label-track" as string]: "0.04em",
                          ["--label-case" as string]: "none",
                        }}
                      >
                        {step.fact}
                      </dd>
                    </div>
                  </dl>
                </Reveal>
              </div>
            </DimSection>
          ))}

          <DimSection id="enquiry" className="border-t border-mer-line">
            <div className="shell band">
              <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <Reveal>
                  <div>
                    <h2 className="t-h2 text-balance">{site.form.headline}</h2>
                    <p
                      className="t-body mt-5 text-mer-ink-soft"
                      style={{ ["--measure" as string]: "52ch" }}
                    >
                      {site.form.body}
                    </p>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="bg-mer p-7 sm:p-10">
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
