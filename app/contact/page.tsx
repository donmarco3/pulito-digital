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
        className="skip-link rounded-full bg-mer-accent px-4 py-2 font-schibsted text-[13px] font-semibold text-mer-3"
      >
        Skip to content
      </a>

      <MeridianNav />

      <main id="main">
        <section className="relative isolate overflow-hidden">
          <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40vh]" />
          <div className="mx-auto max-w-[86rem] px-5 pt-40 pb-20 sm:px-8 sm:pt-44 sm:pb-24">
            <h1 className="hero-arrive max-w-[14ch] display-face text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[0.98] tracking-[-0.04em] text-balance">
              {meridian.pages.contact.title}
            </h1>
            <p
              className="hero-arrive mt-7 max-w-[54ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.12s" }}
            >
              {meridian.pages.contact.lede}
            </p>
          </div>
        </section>

        <section className="border-t border-mer-line">
          <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
              <Reveal>
                <div>
                  <h2 className="display-face text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.03em] text-balance">
                    {site.form.headline}
                  </h2>
                  <p className="mt-5 max-w-[52ch] leading-relaxed text-mer-ink-soft">
                    {site.form.body}
                  </p>

                  <dl className="mt-10 border-t border-mer-line lg:mt-12">
                    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-mer-line py-4 sm:grid-cols-[7rem_1fr]">
                      <dt className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
                        {meridian.contactLabels.email}
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${site.contactEmail}`}
                          className="border-b border-mer-line-strong pb-0.5 text-[15px] text-mer-ink transition-colors hover:border-mer-accent"
                        >
                          {site.contactEmail}
                        </a>
                      </dd>
                    </div>

                    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-mer-line py-4 sm:grid-cols-[7rem_1fr]">
                      <dt className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
                        {meridian.contactLabels.location}
                      </dt>
                      <dd className="text-[15px] text-mer-ink">{site.location}</dd>
                    </div>
                  </dl>

                  <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-mer-ink-soft">
                    {meridian.pages.contact.area}
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
