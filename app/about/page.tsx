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
        className="skip-link pill t-control bg-mer-accent px-4 py-2 text-mer-3"
      >
        Skip to content
      </a>

      <MeridianNav />

      <RailProvider>
        <main id="main">
          <section className="relative isolate overflow-hidden">
            <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40vh]" />
            <div className="shell flex min-h-[70svh] flex-col justify-center pt-32 pb-16 sm:pt-36">
              <h1
                className="hero-arrive t-h1 max-w-[16ch] text-balance"
                style={{
                  ["--arrive-delay" as string]: "0.05s",
                  ["--h1-min" as string]: "2.8rem",
                  ["--h1-fluid" as string]: "7vw",
                  ["--h1-max" as string]: "5.6rem",
                  ["--h1-lead" as string]: "1.02",
                }}
              >
                {statement.before}
                <span className="text-mer-accent">{statement.accent}</span>
                {statement.after}
              </h1>
              <p
                className="hero-arrive t-lead mt-8 text-mer-ink-soft"
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
              <div
                className="shell band grid gap-8 lg:grid-cols-2 lg:gap-0"
                style={{
                  ["--band-pad" as string]: "3.5rem",
                  ["--band-pad-wide" as string]: "4rem",
                }}
              >
                <Reveal>
                  <div className="lg:border-r lg:border-mer-line lg:pr-16">
                    <p className="t-label text-mer-ink-soft">{labels.you}</p>
                    <p
                      className="t-h3 mt-4 max-w-[30ch] text-balance"
                      style={{
                        ["--h3-min" as string]: "1.5rem",
                        ["--h3-fluid" as string]: "2.6vw",
                        ["--h3-max" as string]: "2.1rem",
                        ["--h3-lead" as string]: "1.15",
                      }}
                    >
                      {row.you}
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="lg:pl-16">
                    <p className="t-label text-mer-accent">{labels.us}</p>
                    <p
                      className="t-body mt-4 text-mer-ink-soft"
                      style={{ ["--measure" as string]: "52ch" }}
                    >
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
            <div
              className="shell band"
              style={{
                ["--band-pad" as string]: "5rem",
                ["--band-pad-wide" as string]: "6rem",
              }}
            >
              <Reveal>
                <div className="flex max-w-[66ch] flex-col gap-7">
                  {meridian.pages.about.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="t-body text-mer-ink-soft"
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
