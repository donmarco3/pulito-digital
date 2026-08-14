import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";

/**
 * A service's own page. One dynamic route rather than three files, because
 * the three pages are the same shape by design and `site.services` is the
 * single source of what services exist — a service added or renamed there
 * appears here, in the nav dropdown and in the showcase's "more" links
 * without a second edit.
 *
 * FIRST-DRAFT SCAFFOLDING from the consolidation commit: the page exists so
 * the nav has a real destination, presenting exactly the facts `site`
 * already carries. Milestone 2 gives each service its full argument.
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
        <section className="border-b border-mer-line">
          <div className="mx-auto max-w-[86rem] px-5 pt-40 pb-16 sm:px-8 sm:pt-44 sm:pb-20">
            <h1 className="hero-arrive max-w-[14ch] display-face text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[0.98] tracking-[-0.04em] text-balance">
              {service.title}
            </h1>
            <p
              className="hero-arrive mt-7 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.12s" }}
            >
              {service.body}
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <dl className="max-w-[72ch]">
                {service.points.map((point) => (
                  <div
                    key={point.title}
                    className="border-t border-mer-line py-6 last:border-b sm:grid sm:grid-cols-[16rem_1fr] sm:gap-10"
                  >
                    <dt className="font-schibsted text-[1.08rem] font-semibold text-mer-ink">
                      {point.title}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-mer-ink-soft sm:mt-0">
                      {point.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
