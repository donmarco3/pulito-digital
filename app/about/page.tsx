import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { DimSection, RailProvider } from "@/components/SectionRail";
import { SiteFooter } from "@/components/SiteFooter";
import { meridian, site } from "@/content/site";
import { splitHeadline } from "@/lib/headline";

/**
 * The studio page — THE MIRROR (milestone-3 review; surface seed c5cdef18,
 * candidate 3 of the grounded list).
 *
 * ABOUT THE STUDIO, NEVER THE FOUNDER — the standing constraint. What a
 * new studio can honestly say about itself is how it works, so the page
 * says it in the reader's own terms: four rows pairing the way a
 * renovation trade runs a job with the way Pulito runs one. Every studio
 * cell is a fact PRODUCT.md already grants; the reader's cells are their
 * own craft, stated with respect and no cosplay.
 *
 * The opening statement deliberately closes the loop with the hero:
 * "seen" takes the accent here for the same reason it does on the landing
 * page, and a reader who arrives here last hears the echo.
 *
 * It closes with the studio's plain facts and the CtaBand — the offer is
 * the shared ground the mirror walks to, and the form it points at is the
 * landing page's.
 */

export const metadata: Metadata = {
  title: `${meridian.pages.about.title} | ${site.name}`,
  description: meridian.pages.about.lede,
};

export default function AboutPage() {
  const statement = splitHeadline(
    meridian.pages.about.statement,
    meridian.pages.about.statementAccent,
  );
  const labels = meridian.pages.about.mirrorLabels;

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
            <div className="mx-auto flex min-h-[70svh] max-w-[86rem] flex-col justify-center px-5 pt-32 pb-16 sm:px-8 sm:pt-36">
              <h1
                className="hero-arrive max-w-[16ch] display-face text-[clamp(2.8rem,7vw,5.6rem)] leading-[1.02] tracking-[-0.04em] text-balance"
                style={{ ["--arrive-delay" as string]: "0.05s" }}
              >
                {statement.before}
                <span className="text-mer-accent">{statement.accent}</span>
                {statement.after}
              </h1>
              <p
                className="hero-arrive mt-8 max-w-[54ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft"
                style={{ ["--arrive-delay" as string]: "0.18s" }}
              >
                {meridian.pages.about.lede}
              </p>
            </div>
          </section>

          {/*
            The mirror. Four ruled rows, two voices per row, the reader's
            side first. The cells carry the same mono group labels the
            contact rows and the footer use, once per row on desktop where
            the columns make the voices obvious — and on every cell on a
            phone, where the stack needs them.
          */}
          {meridian.pages.about.mirror.map((row, i) => (
            <DimSection
              key={row.you}
              id={`mirror-${i + 1}`}
              className="border-t border-mer-line"
            >
              <div className="mx-auto grid max-w-[86rem] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-0">
                <Reveal>
                  <div className="lg:border-r lg:border-mer-line lg:pr-16">
                    <p className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
                      {labels.you}
                    </p>
                    <p className="mt-4 max-w-[30ch] display-face text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-balance">
                      {row.you}
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="lg:pl-16">
                    <p className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-accent uppercase">
                      {labels.us}
                    </p>
                    <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-mer-ink-soft">
                      {row.us}
                    </p>
                  </div>
                </Reveal>
              </div>
            </DimSection>
          ))}

          {/*
            The studio, plainly. What Pulito is and who it serves, in
            running text after four rows of display voice — the quiet close
            the mirror earns.
          */}
          <DimSection id="studio" className="border-t border-mer-line bg-mer-2">
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
          </DimSection>

          <CtaBand />
        </main>
      </RailProvider>

      <SiteFooter />
    </div>
  );
}
