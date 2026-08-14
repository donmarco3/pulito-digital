import type { Metadata } from "next";
import { MeridianNav } from "@/components/MeridianNav";
import { SiteFooter } from "@/components/SiteFooter";
import { meridian, site } from "@/content/site";

/**
 * The privacy notice. It exists because the enquiry form is real — see
 * `lib/leadForm.ts` — and it stays plain: what the form collects, where
 * it goes, what we do with it, and how to ask us to stop. The copy lives
 * in `content/site.ts` with the rule that any change to what this build
 * actually collects has to change the notice and its date together.
 *
 * A Read surface, deliberately quiet: no dim, no rooms, no display
 * statements. Running text at a comfortable measure under one title —
 * the calmest page on the site, because that is what this page is for.
 */

export const metadata: Metadata = {
  title: `${meridian.pages.privacy.title} | ${site.name}`,
  description: meridian.pages.privacy.lede,
};

export default function PrivacyPage() {
  const privacy = meridian.pages.privacy;

  return (
    <div className="motion-clear bg-mer text-mer-ink">
      <a
        href="#main"
        className="skip-link pill t-control bg-mer-accent px-4 py-2 text-mer-3"
      >
        Skip to content
      </a>

      <MeridianNav />

      <main id="main">
        <section>
          <div className="shell pt-40 pb-12 sm:pt-44 sm:pb-14">
            <h1
              className="hero-arrive t-h1"
              style={{
                ["--h1-min" as string]: "2.4rem",
                ["--h1-fluid" as string]: "5.5vw",
                ["--h1-max" as string]: "4rem",
                ["--h1-lead" as string]: "1",
              }}
            >
              {privacy.title}
            </h1>
            <p
              className="hero-arrive t-label mt-4 text-mer-ink-soft"
              style={{
                ["--label-size" as string]: "12px",
                ["--label-track" as string]: "0.08em",
                ["--label-case" as string]: "none",
              }}
            >
              Last updated {privacy.dated}
            </p>
            <p
              className="hero-arrive t-body mt-7 text-mer-ink-soft"
              style={{
                ["--arrive-delay" as string]: "0.12s",
                ["--measure" as string]: "62ch",
              }}
            >
              {privacy.lede}
            </p>
          </div>
        </section>

        <section className="border-t border-mer-line">
          <div
            className="shell band"
            style={{
              ["--band-pad" as string]: "3.5rem",
              ["--band-pad-wide" as string]: "4rem",
            }}
          >
            <div className="max-w-[66ch]">
              {privacy.sections.map((section) => (
                <section
                  key={section.heading}
                  className="border-b border-mer-line py-8 first:pt-0 last:border-b-0"
                >
                  <h2
                    className="t-h2"
                    style={{
                      ["--h2-min" as string]: "1.45rem",
                      ["--h2-fluid" as string]: "1.45rem",
                      ["--h2-max" as string]: "1.45rem",
                      ["--h2-lead" as string]: "1.2",
                      ["--h2-track" as string]: "-0.02em",
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p className="t-body mt-4 text-mer-ink-soft">
                    {section.body}
                  </p>
                </section>
              ))}

              <p className="t-body pt-8 text-mer-ink-soft">
                Questions about any of this:{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="border-b border-mer-line-strong pb-0.5 text-mer-ink transition-colors hover:border-mer-accent"
                >
                  {site.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
