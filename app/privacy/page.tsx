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
        className="skip-link rounded-full bg-mer-accent px-4 py-2 font-schibsted text-[13px] font-semibold text-mer-3"
      >
        Skip to content
      </a>

      <MeridianNav />

      <main id="main">
        <section>
          <div className="mx-auto max-w-[86rem] px-5 pt-40 pb-12 sm:px-8 sm:pt-44 sm:pb-14">
            <h1 className="hero-arrive display-face text-[clamp(2.4rem,5.5vw,4rem)] leading-[1] tracking-[-0.04em]">
              {privacy.title}
            </h1>
            <p className="hero-arrive mt-4 font-mono text-[12px] tracking-[0.08em] text-mer-ink-soft">
              Last updated {privacy.dated}
            </p>
            <p
              className="hero-arrive mt-7 max-w-[62ch] text-[1.08rem] leading-relaxed text-mer-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.12s" }}
            >
              {privacy.lede}
            </p>
          </div>
        </section>

        <section className="border-t border-mer-line">
          <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-16">
            <div className="max-w-[66ch]">
              {privacy.sections.map((section) => (
                <section
                  key={section.heading}
                  className="border-b border-mer-line py-8 first:pt-0 last:border-b-0"
                >
                  <h2 className="display-face text-[1.45rem] tracking-[-0.02em]">
                    {section.heading}
                  </h2>
                  <p className="mt-4 leading-relaxed text-mer-ink-soft">
                    {section.body}
                  </p>
                </section>
              ))}

              <p className="pt-8 leading-relaxed text-mer-ink-soft">
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
