import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { DimSection, RailProvider } from "@/components/SectionRail";
import { SiteFooter } from "@/components/SiteFooter";
import { meridianSkin } from "@/components/skins";
import { site } from "@/content/site";
import { splitHeadline } from "@/lib/headline";

/**
 * A service's own page — ONE CLAIM PER ROOM.
 *
 * The structure chosen at the milestone-2 review (surface seed c95ba129,
 * candidate 7 of the grounded list; the dealt challengers all failed
 * audience identification for a builder on a phone): the page opens on one
 * oversized claim, then gives each of the service's three strengths an
 * entire dimmed room — Meridian's signature dim doing the pacing — and ends
 * at the page's own enquiry form. Slow and monumental on purpose: a page
 * that gives each idea a whole room is itself the argument that this studio
 * does not crowd things.
 *
 * The rooms breathe with the dim exactly like the landing page's sections,
 * so the site has one motion vocabulary. Room bodies alternate a quarter
 * indent at `lg` — rhythm inside one grammar, not a second layout system.
 *
 * One dynamic route rather than three files: `site.services` is the single
 * source of what services exist, so a service added or renamed there
 * appears here, in the nav dropdown and in the showcase's "more" links
 * without a second edit.
 */

export function generateStaticParams() {
  return site.services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${site.name}`,
    description: service.body,
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const claim = splitHeadline(service.claim, service.claimAccent);
  const others = site.services.filter((s) => s.slug !== slug);

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
          {/*
            The claim room. The service's whole argument in three or four
            words at display scale, one word in the accent — the same device
            the landing hero owns, which is what makes the pages read as one
            family. The lede beneath is the service's standing description,
            unchanged from the showcase panel, so a reader arriving from
            there recognises the page as the same thing said larger.
          */}
          <section className="relative isolate overflow-hidden">
            <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40vh]" />
            <div className="mx-auto flex min-h-[88svh] max-w-[86rem] flex-col justify-center px-5 pt-32 pb-16 sm:px-8 sm:pt-36">
              <h1
                className="hero-arrive max-w-[12ch] display-face text-[clamp(3rem,8.5vw,6.8rem)] leading-[0.96] tracking-[-0.04em] text-balance"
                style={{ ["--arrive-delay" as string]: "0.05s" }}
              >
                {claim.before}
                <span className="text-mer-accent">{claim.accent}</span>
                {claim.after}
              </h1>

              <p
                className="hero-arrive mt-8 max-w-[54ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft"
                style={{ ["--arrive-delay" as string]: "0.18s" }}
              >
                {service.body}
              </p>

              <div
                className="hero-arrive mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                style={{ ["--arrive-delay" as string]: "0.3s" }}
              >
                <a
                  href="#enquiry"
                  className="rounded-full bg-mer-accent px-8 py-4 text-center font-schibsted text-[15px] font-semibold text-mer-3 transition-colors hover:bg-mer-accent-deep"
                >
                  {site.cta}
                </a>
                <Link
                  href="/process"
                  className="rounded-full border border-mer-line-strong px-8 py-4 text-center font-schibsted text-[15px] font-semibold text-mer-ink transition-colors hover:border-mer-ink hover:bg-mer-2"
                >
                  {site.ctaSecondary}
                </Link>
              </div>
            </div>
          </section>

          {/*
            The three rooms. Each point gets a whole dimmed section: title at
            section-display scale, the standing point body as the loud
            paragraph, `more` as the quieter second read. The middle room
            indents a quarter at `lg` so the descent has rhythm without a
            second layout language. `min-height` is viewport-relative from
            `sm` up only — a phone reader gets the pacing from the dim and
            the air, not from three empty screens.
          */}
          {service.points.map((point, i) => (
            <DimSection
              key={point.title}
              id={`point-${i + 1}`}
              className="border-t border-mer-line"
            >
              <div
                className={`mx-auto flex max-w-[86rem] flex-col justify-center px-5 py-24 sm:min-h-[72svh] sm:px-8 sm:py-28 ${
                  i === 1 ? "lg:pl-[22%]" : ""
                }`}
              >
                <Reveal>
                  <div className="max-w-[30ch]">
                    <h2 className="display-face text-[clamp(2.1rem,4.6vw,3.7rem)] leading-[1.02] tracking-[-0.03em] text-balance">
                      {point.title}
                    </h2>
                  </div>
                  <p className="mt-7 max-w-[54ch] text-[clamp(1.08rem,1.4vw,1.22rem)] leading-relaxed text-mer-ink">
                    {point.body}
                  </p>
                  <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-relaxed text-mer-ink-soft">
                    {point.more}
                  </p>
                </Reveal>
              </div>
            </DimSection>
          ))}

          {/*
            The way sideways: the other two services, as quiet ruled rows.
            No heading — a reader at this depth knows where they are, and a
            title would outrank the rooms above it.
          */}
          <section aria-label="Other services" className="border-t border-mer-line bg-mer-2">
            <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
              <div className="grid sm:grid-cols-2">
                {others.map((other, i) => (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className={`group flex items-baseline justify-between gap-6 py-8 sm:py-10 ${
                      i === 1 ? "border-t border-mer-line sm:border-t-0 sm:border-l sm:pl-10" : "sm:pr-10"
                    }`}
                  >
                    <span className="display-face text-[1.4rem] tracking-[-0.02em] transition-colors group-hover:text-mer-accent">
                      {other.title}
                    </span>
                    <span
                      aria-hidden
                      className="font-schibsted text-[15px] font-semibold text-mer-ink-soft transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-mer-accent"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/*
            The page ends at its own form — the milestone-plan commitment
            ("each service page argues one service deeply and ends at the
            enquiry form"). Same proportions and panel as the landing page's
            enquiry section, minus the contact list: this section is the
            close of an argument, not a contact directory. Web design alone
            carries its ratified delivery estimate above the form.
          */}
          <DimSection id="enquiry" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <Reveal>
                  <div>
                    <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance">
                      {site.offer.headline}
                    </h2>
                    <p className="mt-5 max-w-[56ch] leading-relaxed text-mer-ink-soft">
                      {site.offer.body}
                    </p>
                    {service.timeline && (
                      <p className="mt-8 border-t border-mer-line pt-6 max-w-[56ch] text-[15px] leading-relaxed text-mer-ink">
                        {service.timeline}
                      </p>
                    )}
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
