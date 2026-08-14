import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { meridianSkin } from "@/components/skins";
import { meridian, site } from "@/content/site";

/**
 * The contact page — the enquiry, given its own address.
 *
 * Precisely specified in the planning interview, so it was shaped
 * directly rather than rolled: the form, the email, and the service
 * area, and nothing else — the owner confirmed the business publishes an
 * email address only (no phone, no ABN, no street address). It is the
 * nav pill's destination from every page, which is why it opens on the
 * form rather than on an argument: whoever lands here already decided to
 * talk.
 *
 * The layout is the landing page's enquiry section grown to a page: the
 * words and the contact rows on the left, the recessed form panel on the
 * right, the same measured ratios throughout.
 */

export const metadata: Metadata = {
  title: `${meridian.pages.contact.title} | ${site.name}`,
  description: meridian.pages.contact.lede,
};

export default function ContactPage() {
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
        <section className="relative isolate overflow-hidden">
          <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40vh]" />
          <div className="shell pt-40 pb-20 sm:pt-44 sm:pb-24">
            <h1
              className="hero-arrive t-h1 max-w-[14ch] text-balance"
              style={{
                ["--h1-min" as string]: "2.6rem",
                ["--h1-fluid" as string]: "6.5vw",
                ["--h1-max" as string]: "4.8rem",
                ["--h1-lead" as string]: "0.98",
              }}
            >
              {meridian.pages.contact.title}
            </h1>
            <p
              className="hero-arrive t-lead mt-7 text-mer-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.12s" }}
            >
              {meridian.pages.contact.lede}
            </p>
          </div>
        </section>

        <section className="border-t border-mer-line">
          <div
            className="shell band"
            style={{
              ["--band-pad" as string]: "5rem",
              ["--band-pad-wide" as string]: "6rem",
            }}
          >
            <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
              <Reveal>
                <div>
                  <h2
                    className="t-h2 text-balance"
                    style={{
                      ["--h2-min" as string]: "1.7rem",
                      ["--h2-fluid" as string]: "3vw",
                      ["--h2-max" as string]: "2.4rem",
                    }}
                  >
                    {site.form.headline}
                  </h2>
                  <p
                    className="t-body mt-5 text-mer-ink-soft"
                    style={{ ["--measure" as string]: "52ch" }}
                  >
                    {site.form.body}
                  </p>

                  <dl className="mt-10 border-t border-mer-line lg:mt-12">
                    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-mer-line py-4 sm:grid-cols-[7rem_1fr]">
                      <dt className="t-label text-mer-ink-soft">
                        {meridian.contactLabels.email}
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${site.contactEmail}`}
                          className="t-body border-b border-mer-line-strong pb-0.5 text-mer-ink transition-colors hover:border-mer-accent"
                          style={{ ["--body-size" as string]: "15px" }}
                        >
                          {site.contactEmail}
                        </a>
                      </dd>
                    </div>

                    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-mer-line py-4 sm:grid-cols-[7rem_1fr]">
                      <dt className="t-label text-mer-ink-soft">
                        {meridian.contactLabels.location}
                      </dt>
                      <dd
                        className="t-body text-mer-ink"
                        style={{ ["--body-size" as string]: "15px" }}
                      >
                        {site.location}
                      </dd>
                    </div>
                  </dl>

                  <p
                    className="t-body mt-8 text-mer-ink-soft"
                    style={{
                      ["--body-size" as string]: "15px",
                      ["--measure" as string]: "52ch",
                    }}
                  >
                    {meridian.pages.contact.area}
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
