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
        className="skip-link pill t-control bg-mer-accent px-4 py-2 text-mer-3"
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
            <div className="shell flex min-h-[88svh] flex-col justify-center pt-32 pb-16 sm:pt-36">
              <h1
                className="hero-arrive t-h1 max-w-[12ch] text-balance"
                style={{
                  ["--arrive-delay" as string]: "0.05s",
                  ["--h1-min" as string]: "3rem",
                  ["--h1-fluid" as string]: "8.5vw",
                  ["--h1-max" as string]: "6.8rem",
                  ["--h1-lead" as string]: "0.96",
                }}
              >
                {claim.before}
                <span className="text-mer-accent">{claim.accent}</span>
                {claim.after}
              </h1>

              <p
                className="hero-arrive t-lead mt-8 text-mer-ink-soft"
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
                  className="pill t-control bg-mer-accent px-8 py-4 text-center text-mer-3 transition-colors hover:bg-mer-accent-deep"
                >
                  {site.cta}
                </a>
                <Link
                  href="/process"
                  className="pill t-control border border-mer-line-strong px-8 py-4 text-center text-mer-ink transition-colors hover:border-mer-ink hover:bg-mer-2"
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
                className={`shell band flex flex-col justify-center sm:min-h-[72svh] ${
                  i === 1 ? "lg:pl-[22%]" : ""
                }`}
                style={{ ["--band-pad-wide" as string]: "7rem" }}
              >
                <Reveal>
                  <div className="max-w-[30ch]">
                    <h2
                      className="t-h2 text-balance"
                      style={{
                        ["--h2-min" as string]: "2.1rem",
                        ["--h2-fluid" as string]: "4.6vw",
                        ["--h2-max" as string]: "3.7rem",
                        ["--h2-lead" as string]: "1.02",
                      }}
                    >
                      {point.title}
                    </h2>
                  </div>
                  <p
                    className="t-body mt-7 text-mer-ink"
                    style={{
                      ["--body-min" as string]: "1.08rem",
                      ["--body-fluid" as string]: "1.4vw",
                      ["--body-max" as string]: "1.22rem",
                      ["--measure" as string]: "54ch",
                    }}
                  >
                    {point.body}
                  </p>
                  <p
                    className="t-body mt-5 text-mer-ink-soft"
                    style={{
                      ["--body-size" as string]: "1.02rem",
                      ["--measure" as string]: "54ch",
                    }}
                  >
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
            <div className="shell">
              <div className="grid sm:grid-cols-2">
                {others.map((other, i) => (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className={`group flex items-baseline justify-between gap-6 py-8 sm:py-10 ${
                      i === 1 ? "border-t border-mer-line sm:border-t-0 sm:border-l sm:pl-10" : "sm:pr-10"
                    }`}
                  >
                    <span
                      className="t-h3 transition-colors group-hover:text-mer-accent"
                      style={{ ["--h3-max" as string]: "1.4rem" }}
                    >
                      {other.title}
                    </span>
                    <span
                      aria-hidden
                      className="t-control text-mer-ink-soft transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-mer-accent"
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
            <div className="shell band">
              <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <Reveal>
                  <div>
                    <h2 className="t-h2 text-balance">{site.offer.headline}</h2>
                    <p
                      className="t-body mt-5 text-mer-ink-soft"
                      style={{ ["--measure" as string]: "56ch" }}
                    >
                      {site.offer.body}
                    </p>
                    {service.timeline && (
                      <p
                        className="t-body mt-8 border-t border-mer-line pt-6 text-mer-ink"
                        style={{
                          ["--body-size" as string]: "15px",
                          ["--measure" as string]: "56ch",
                        }}
                      >
                        {service.timeline}
                      </p>
                    )}
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
