import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DirectionSwitch } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { BrokenHeadline, Reveal } from "@/components/Reveal";
import { biancoSkin } from "@/components/skins";
import { directions, plates, site } from "@/content/site";

/**
 * 3 — BIANCO. The auction catalogue.
 *
 * The quiet pole of the five, and the one that argues by restraint: a
 * catalogue of antiquities, where every object gets a plate, a reference and
 * a description, and nothing shouts because the objects do not need it.
 *
 * Two decisions keep this out of the rut it is closest to. The ground is COLD
 * paper, not cream — warm cream under a serif is the single most predictable
 * thing this page could have been, and the coldness is what stops a catalogue
 * reading as a wedding invitation. And the display size is SMALL on purpose:
 * this is the only one of the five whose headline does not fill the screen,
 * because a catalogue's authority comes from its margins and its
 * consistency, not from its type size.
 *
 * The lots are the services, referenced by the codes that already exist in
 * `content/site.ts`. Nothing here invents a provenance, an estimate or a date:
 * a catalogue is the most convincing typeface a lie can wear, and this one
 * sells a business with no track record yet.
 *
 * The plates are NOT knocked out. Every one sits on the grey sweep it was
 * photographed against, framed and captioned — which is what a catalogue does
 * with a photograph anyway, and it means no plate on this page depends on a
 * blend mode to look deliberate.
 */

const d = directions["3"];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

/** One plate per service, in the order the services are listed. */
const LOT_PLATES = [plates.eros, plates.rosso, plates.boy, plates.constantine];

export default function Bianco() {
  return (
    <div className="bg-bianco motion-turn pb-[var(--switch-bar)] text-bianco-ink">
      <a
        href="#main"
        className="skip-link bg-vermilion px-4 py-2 text-bone"
      >
        Skip to content
      </a>

      {/* Paper tooth. Multiplied in, never screened on: screening a white noise
          field over a light sheet only washes it out. */}
      <div
        aria-hidden
        className="tooth-layer pointer-events-none fixed inset-0 z-40 opacity-[0.05] mix-blend-multiply"
      />

      {/* ------------------------------------------------------------ header */}
      <header className="sticky top-0 z-50 border-b border-bianco-ink bg-bianco/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[78rem] items-baseline gap-6 px-6 py-3.5 lg:px-10">
          <a href="#main" className="font-garamond text-[20px] tracking-[0.04em]">
            Pulito Digital
          </a>
          <span className="hidden font-mono text-[10.5px] tracking-[0.14em] text-bianco-ink-soft uppercase md:block">
            {d.eyebrow}
          </span>
          <a
            href="#enquiry"
            className="ml-auto font-mono text-[10.5px] tracking-[0.14em] text-vermilion uppercase underline decoration-vermilion underline-offset-4 transition-colors hover:text-vermilion-deep"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="main">
        {/* --------------------------------------------------------- title page */}
        <section className="border-b border-bianco-ink">
          <div className="mx-auto grid max-w-[78rem] gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
            <div className="lg:col-span-6">
              {/* No kicker above the headline — see app/1/page.tsx. Adelaide
                  was the one thing this line carried that the subhead does
                  not, and the title-block below already schedules it under
                  Region, which is where a catalogue puts it anyway. */}
              <h1 className="max-w-[20ch] font-garamond text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.12] tracking-[-0.005em] text-balance">
                <BrokenHeadline lines={d.headlineLines} headline={d.headline} />
              </h1>

              <div className="mt-8 h-px w-full bg-bianco-rule" />

              <p className="mt-8 max-w-[54ch] font-sans text-[16.5px] leading-[1.72] text-bianco-ink-soft">
                {d.subhead}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#enquiry"
                  className="bg-vermilion px-8 py-4 font-mono text-[12px] tracking-[0.18em] text-bone uppercase transition-colors hover:bg-vermilion-deep"
                >
                  {site.cta}
                </a>
                <a
                  href="#offer"
                  className="border-b border-bianco-rule-strong pb-1 font-sans text-[15px] text-bianco-ink-soft transition-colors hover:border-bianco-ink hover:text-bianco-ink"
                >
                  Terms of the preview
                </a>
              </div>

              {/* The running metadata a catalogue carries on its title page.
                  Every cell is a fact PRODUCT.md already states. */}
              <dl className="mt-14 grid max-w-[34rem] grid-cols-2 gap-x-8 gap-y-5 border-t border-bianco-rule pt-8">
                {[
                  ["Studio", "Pulito Digital"],
                  ["Disciplines", site.disciplines],
                  ["Region", "Adelaide and regional SA"],
                  ["Ownership", "Domain, hosting and code in your name"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-bianco-ink-soft uppercase">
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-sans text-[14.5px] leading-snug">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/*
              The frontispiece, and two decisions worth recording.

              It comes FIRST on a phone (`order-first`). Left in source order
              the phone fold was headline, rule, subhead, action and a
              four-cell metadata grid — a spec sheet — and this direction's
              own contract says it opens on a photograph. It is also cropped
              to 4:5 below `lg`: at its native 1500x2043 the plate ate 530px
              of an 844px screen and pushed the action off the fold to buy
              nothing, since a catalogue plate is a crop by nature.

              The plate is the Athena rather than the Diadoumenos. Both are
              Met CC0 and either carries the classical argument, but this page
              is opened cold, on a phone, on a building site, sometimes with a
              client standing there — and the Diadoumenos is a full-frontal
              nude at the largest scale on the page. That is a bad thing to
              hand someone as a first impression when a draped torso does the
              identical work. The standing figure is off this page entirely —
              it still leads ULTRAMARINE, where it is one plate among two
              rather than the register of the whole thing.
            */}
            <figure className="plate-develop order-first lg:order-none lg:col-span-5 lg:col-start-8">
              <div className="border border-bianco-ink bg-bianco-2 p-3">
                <Image
                  src={plates.athena.src}
                  alt={plates.athena.alt}
                  width={plates.athena.width}
                  height={plates.athena.height}
                  priority
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="bg-bianco-2 aspect-[4/5] w-full object-cover object-top lg:aspect-auto lg:object-fill"
                />
              </div>
              <figcaption className="mt-4 font-mono text-[10.5px] leading-relaxed tracking-[0.1em] text-bianco-ink-soft uppercase">
                Frontispiece — {plates.athena.credit}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ----------------------------------------------------------- problem */}
        <Reveal>
          <section className="border-b border-bianco-ink bg-bianco-2">
            <div className="mx-auto max-w-[78rem] px-6 py-20 lg:px-10 lg:py-24">
              <h2 className="max-w-[26ch] font-garamond text-[clamp(1.7rem,3vw,2.7rem)] leading-[1.18] text-balance">
                {d.problem.headline}
              </h2>
              <p className="mt-7 max-w-[68ch] font-sans text-[16.5px] leading-[1.78] text-bianco-ink-soft">
                {d.problem.body}
              </p>
            </div>
          </section>
        </Reveal>

        {/* -------------------------------------------------------- the lots */}
        <Reveal>
          <section className="border-b border-bianco-ink">
            <div className="mx-auto max-w-[78rem] px-6 py-20 lg:px-10 lg:py-24">
              <div className="flex items-baseline justify-between gap-6 border-b border-bianco-ink pb-4">
                <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
                  {d.sections.services}
                </h2>
                <p className="font-mono text-[11px] tracking-[0.22em] text-bianco-ink-soft uppercase">
                  Four references
                </p>
              </div>

              {/* A single-pixel gap grid, so the four cells share drawn
                  boundaries rather than each becoming a floating card. */}
              <ul className="mt-px grid gap-px bg-bianco-rule sm:grid-cols-2 lg:grid-cols-4">
                {site.services.map((service, index) => {
                  const plate = LOT_PLATES[index];
                  return (
                    <li key={service.code} className="bg-bianco px-5 py-7">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-[11px] tracking-[0.18em] text-vermilion uppercase">
                          Ref. {service.code}
                        </span>
                        <span className="font-mono text-[11px] text-bianco-ink-soft tabular-nums">
                          {String(index + 1).padStart(2, "0")}/04
                        </span>
                      </div>

                      <div className="mt-5 border border-bianco-rule bg-bianco-2 p-2">
                        <Image
                          src={plate.src}
                          alt={plate.alt}
                          width={plate.width}
                          height={plate.height}
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                          className="bg-bianco-2 aspect-[3/4] w-full object-cover object-top"
                        />
                      </div>

                      <h3 className="mt-6 font-garamond text-[26px] leading-tight">
                        {service.title}
                      </h3>
                      <p className="mt-3 font-sans text-[14.5px] leading-[1.7] text-bianco-ink-soft">
                        {service.body}
                      </p>
                      <p className="mt-5 font-mono text-[9.5px] leading-relaxed tracking-[0.08em] text-bianco-ink-soft uppercase">
                        {plate.credit}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ------------------------------------------------------------ method */}
        <Reveal>
          <section className="border-b border-bianco-ink bg-bianco-2">
            <div className="mx-auto max-w-[78rem] px-6 py-20 lg:px-10 lg:py-24">
              <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
                {d.sections.process}
              </h2>
              <ol className="mt-10 grid gap-px border-y border-bianco-rule bg-bianco-rule lg:grid-cols-4">
                {site.process.map((step, index) => (
                  <li key={step.title} className="reveal bg-bianco-2 px-5 py-8">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-vermilion tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-garamond text-[24px] leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-sans text-[14.5px] leading-[1.7] text-bianco-ink-soft">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </Reveal>

        {/* ------------------------------------------------------------- offer */}
        <Reveal>
          <section id="offer" className="border-b border-bianco-ink">
            <div className="mx-auto grid max-w-[78rem] gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
              <figure className="lg:col-span-4">
                <div className="border border-bianco-ink bg-bianco-2 p-3">
                  <Image
                    src={plates.eros.src}
                    alt={plates.eros.alt}
                    width={plates.eros.width}
                    height={plates.eros.height}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="bg-bianco-2 w-full"
                  />
                </div>
                <figcaption className="mt-4 font-mono text-[10.5px] tracking-[0.1em] text-bianco-ink-soft uppercase">
                  {plates.eros.credit}
                </figcaption>
              </figure>

              <div className="lg:col-span-7 lg:col-start-6">
                <h2 className="font-mono text-[11px] tracking-[0.22em] text-vermilion uppercase">
                  {d.sections.offer}
                </h2>
                <p className="mt-6 max-w-[18ch] font-garamond text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.1] text-balance">
                  {site.offer.headline}
                </p>
                <p className="mt-7 max-w-[58ch] font-sans text-[16.5px] leading-[1.78] text-bianco-ink-soft">
                  {site.offer.body}
                </p>
                <a
                  href="#enquiry"
                  className="mt-10 inline-block bg-vermilion px-8 py-4 font-mono text-[12px] tracking-[0.18em] text-bone uppercase transition-colors hover:bg-vermilion-deep"
                >
                  {site.cta}
                </a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- enquiry */}
        <Reveal>
          <section id="enquiry" className="border-b border-bianco-ink bg-bianco-2">
            <div className="mx-auto grid max-w-[78rem] gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
              <div className="lg:col-span-4">
                <h2 className="font-garamond text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.12]">
                  {site.form.headline}
                </h2>
                <p className="mt-6 max-w-[42ch] font-sans text-[15.5px] leading-[1.72] text-bianco-ink-soft">
                  {site.form.body}
                </p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-8 inline-block border-b border-vermilion pb-1 font-sans text-[15px]"
                >
                  {site.contactEmail}
                </a>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <EnquiryForm skin={biancoSkin} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* --------------------------------------------------------------- faq */}
        <Reveal>
          <section className="border-b border-bianco-ink">
            <div className="mx-auto max-w-[78rem] px-6 py-20 lg:px-10 lg:py-24">
              <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
                {d.sections.faq}
              </h2>
              <div className="mt-10 border-t border-bianco-rule">
                {site.faqs.map((faq) => (
                  <details key={faq.q} className="group border-b border-bianco-rule">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-5 font-garamond text-[clamp(1.15rem,1.6vw,1.45rem)] leading-snug marker:content-none">
                      {faq.q}
                      <DisclosureMark className="mt-0.5 font-garamond text-[24px] text-vermilion" />
                    </summary>
                    <p className="max-w-[76ch] pb-7 font-sans text-[15.5px] leading-[1.78] text-bianco-ink-soft">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      {/* ------------------------------------------------------------- footer */}
      <footer className="mx-auto max-w-[78rem] px-6 pt-14 pb-28 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-bianco-ink pt-8">
          <p className="font-garamond text-[30px] leading-none">Pulito Digital</p>
          <div className="font-sans text-[14px] text-bianco-ink-soft">
            <p>{site.footer.line}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-2 inline-block border-b border-vermilion pb-0.5 text-bianco-ink"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>
        <p className="mt-10 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-bianco-ink-soft uppercase">
          All plates: The Met, Open Access (CC0). Full licence details in
          public/img/CREDITS.md
        </p>
      </footer>

      <DirectionSwitch current="3" />
    </div>
  );
}
