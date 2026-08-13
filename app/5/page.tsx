import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DirectionSwitch } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { BrokenHeadline, Reveal } from "@/components/Reveal";
import { gessoSkin } from "@/components/skins";
import { directions, plates, site } from "@/content/site";

/**
 * 5 — GESSO. The cast court.
 *
 * A Victorian cast court is a hall full of plaster copies of things that
 * exist somewhere else — full-size, accurate, and not the thing. That is the
 * argument, and it is the sharpest one available to a studio whose reader has
 * a website that looks like three other builders' websites.
 *
 * The visual system follows from the hall rather than from the objects in it.
 * Every photograph is driven to grey by `plate-gesso`, so the ONLY colour
 * anywhere on the page is the acid signal. On a page arguing that copies are
 * worthless, having a single thing on screen that is unmistakably not a copy
 * is the whole design.
 *
 * The acid is not reserved strictly for what can be pressed — it also carries
 * the section eyebrows and the step numerals — and that is recorded honestly
 * rather than claimed away, because accent discipline is one of the things the
 * five directions are being compared on. What does hold is a hierarchy: the
 * only FILLED acid on any screen is a control, and everything else the accent
 * touches is an 11px label or a numeral. The button wins on area by an order
 * of magnitude, which is what protects the single conversion event.
 *
 * Composition sets it apart from the other four: type goes ON the photograph
 * at full bleed, at a size that crops the picture rather than sitting in it.
 * ULTRAMARINE puts type beside its plate, NERO above, CAVA in a split. This
 * one covers it.
 */

const d = directions["5"];

/**
 * The casts standing in the hall, one per service.
 *
 * Every one of these objects also appears on another direction, at full
 * colour and full value. Here they are plaster: same forms, no warmth, no
 * provenance. That is the page's argument standing up as an image.
 */
const HALL_PLATES = [
  plates.caracalla,
  plates.herodotos,
  plates.boy,
  plates.constantine,
];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

export default function Gesso() {
  return (
    <div className="bg-gesso motion-cast pb-[var(--switch-bar)] text-gesso-bone">
      <a href="#main" className="skip-link bg-acid px-4 py-2 text-obsidian">
        Skip to content
      </a>

      {/* ------------------------------------------------------------ header */}
      <header className="sticky top-0 z-50 border-b border-gesso-rule bg-gesso/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[92rem] items-center gap-6 px-5 py-4 lg:px-10">
          <a
            href="#main"
            className="font-bricolage text-[21px] font-bold tracking-[-0.02em]"
          >
            Pulito
          </a>
          <span className="hidden font-mono text-[10.5px] tracking-[0.14em] text-gesso-bone-soft uppercase md:block">
            {d.eyebrow} — {site.location}
          </span>
          <a
            href="#enquiry"
            className="ml-auto bg-acid px-5 py-2.5 font-bricolage text-[11px] font-bold tracking-[0.1em] text-obsidian uppercase transition-colors hover:bg-acid-deep"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- hero */}
        <section className="relative border-b border-gesso-rule">
          <Image
            src={plates.castRelief.src}
            alt={plates.castRelief.alt}
            width={plates.castRelief.width}
            height={plates.castRelief.height}
            priority
            sizes="100vw"
            className="bg-gesso-2 plate-gesso plate-develop absolute inset-0 h-full w-full object-cover object-[62%_28%]"
          />
          {/*
            Two washes rather than one flat scrim. The vertical one buys the
            headline its contrast where the headline actually is — the bottom
            third — and clears entirely above it; the horizontal one keeps the
            left column readable without touching the carving on the right,
            where the photograph is doing its work.

            The first build had both washes running the full height at 25% and
            85%, which compound to nearly opaque in the top-left and took the
            whole picture with them: a hero photograph that renders as a black
            rectangle is worse than no photograph, because the page still pays
            for it. The rule is that a scrim covers the type's own band, never
            the frame.
          */}
          <div className="absolute inset-0 bg-gradient-to-t from-gesso from-26% via-gesso/72 via-62% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gesso/78 via-gesso/28 via-52% to-transparent" />

          <div className="relative mx-auto flex min-h-[82svh] max-w-[92rem] flex-col justify-end px-5 pt-24 pb-12 lg:px-10 lg:pb-16">
            {/* No kicker above the headline — see app/1/page.tsx. */}
            <h1 className="max-w-[13ch] font-bricolage text-[clamp(3.2rem,11vw,9rem)] leading-[0.86] font-bold tracking-[-0.045em] text-balance">
              <BrokenHeadline lines={d.headlineLines} headline={d.headline} />
            </h1>

            <p className="mt-8 max-w-[52ch] font-sans text-[16.5px] leading-[1.66] text-gesso-bone-soft lg:text-[18px]">
              {d.subhead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#enquiry"
                className="bg-acid px-9 py-4.5 font-bricolage text-[14px] font-bold tracking-[0.1em] text-obsidian uppercase transition-colors hover:bg-acid-deep"
              >
                {site.cta}
              </a>
              <a
                href="#offer"
                className="border-b-2 border-gesso-rule-strong pb-1 font-sans text-[15px] text-gesso-bone-soft transition-colors hover:border-acid hover:text-gesso-bone"
              >
                What the preview involves
              </a>
            </div>

            <p className="mt-12 font-mono text-[11px] tracking-[0.1em] text-gesso-bone-soft uppercase">
              {plates.castRelief.credit}
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- index strip */}
        <Reveal>
          <section className="border-b border-gesso-rule bg-gesso-2">
            <dl className="mx-auto grid max-w-[92rem] gap-px bg-gesso-rule sm:grid-cols-3">
              {[
                ["Region", "Adelaide and regional South Australia"],
                ["Ownership", "Domain, hosting and code in your name"],
                ["Commitment", "No packages, no monthly lock-in"],
              ].map(([label, value]) => (
                <div key={label} className="bg-gesso-2 px-5 py-7 lg:px-8">
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-acid uppercase">
                    {label}
                  </dt>
                  <dd className="mt-2.5 font-sans text-[15.5px] leading-snug text-gesso-bone">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- problem */}
        <Reveal>
          <section className="border-b border-gesso-rule">
            <div className="mx-auto max-w-[92rem] px-5 py-20 lg:px-10 lg:py-32">
              <h2 className="max-w-[16ch] font-bricolage text-[clamp(2.2rem,6.6vw,5.4rem)] leading-[0.94] font-bold tracking-[-0.04em] text-balance">
                {d.problem.headline}
              </h2>
              <p className="mt-10 max-w-[64ch] font-sans text-[17.5px] leading-[1.72] text-gesso-bone-soft lg:ml-auto lg:text-[19px]">
                {d.problem.body}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ---------------------------------------------------------- services */}
        <Reveal>
          <section className="border-b border-gesso-rule bg-gesso-2">
            <div className="mx-auto max-w-[92rem] px-5 py-20 lg:px-10 lg:py-28">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-mono text-[11px] tracking-[0.24em] text-acid uppercase">
                  {d.sections.services}
                </h2>
                {/* The rail says so. On a phone the peek plus the scrollbar is
                    a clear affordance, but at 1440px with a mouse a fourth
                    plate cut at the container edge reads as a grid that broke
                    rather than a hall that continues. */}
                <p
                  aria-hidden
                  className="font-mono text-[11px] tracking-[0.16em] text-gesso-bone-soft uppercase"
                >
                  Four casts — scroll the hall →
                </p>
              </div>

              {/*
                THE HALL. This is the one place on the whole site where you
                move sideways, and that is the point of it: a cast court is a
                hall you walk down past plates on plinths, and every other
                section of every other direction is a vertical stack. The
                first build had this as a ruled vertical list, which made
                GESSO and CAVA the same page in two colourways from the hero
                down — same problem block, same services list, same photo
                band, same four-column process. A direction that is only a
                recolour of its neighbour costs a fifth of the comparison.

                The plates are deliberately objects that appear elsewhere on
                this site, driven to plaster grey. That is not reuse saving
                work, it is the argument: a cast court is full of accurate
                copies of things that exist somewhere else, and so is this
                row.

                Sideways scrolling earns its keep only if nothing is unreachable
                by it. The row carries `tabIndex={0}`, `role="group"` and a
                label, which is the accessible-scroller pattern: the region
                itself takes focus so it can be driven with the arrow keys.
                That is not decoration — the first build asserted in this very
                comment that "every item is in the tab order" while the list
                items held nothing focusable at all, so keyboard reach was
                resting entirely on a browser heuristic that Safari does not
                implement. Scroll-snap then makes it land on a plate rather
                than between two, and on a phone it is the swipe the hardware
                already invites.
              */}
              <ul
                tabIndex={0}
                role="group"
                aria-label="The hall: one cast per service, scrolls sideways"
                className="mt-10 flex snap-x snap-mandatory gap-px overflow-x-auto bg-gesso-rule pb-2"
              >
                {site.services.map((service, index) => {
                  const plate = HALL_PLATES[index];
                  return (
                    <li
                      key={service.code}
                      className="w-[78vw] shrink-0 snap-start bg-gesso sm:w-[46vw] lg:w-[24rem]"
                    >
                      <Image
                        src={plate.src}
                        alt={plate.alt}
                        width={plate.width}
                        height={plate.height}
                        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 46vw, 78vw"
                        className="plate-gesso aspect-[3/4] w-full bg-gesso-2 object-cover object-top"
                      />
                      <div className="px-5 py-7">
                        <h3 className="font-bricolage text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.0] font-bold tracking-[-0.03em]">
                          {service.title}
                        </h3>
                        <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gesso-bone-soft">
                          {service.body}
                        </p>
                        <p className="mt-5 font-mono text-[11px] tracking-[0.08em] text-gesso-bone-soft uppercase">
                          {plate.credit}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ------------------------------------------------------- the hall band */}
        <Reveal>
          <section className="relative border-b border-gesso-rule">
            <Image
              src={plates.castHall.src}
              alt={plates.castHall.alt}
              width={plates.castHall.width}
              height={plates.castHall.height}
              sizes="100vw"
              className="bg-gesso-2 plate-gesso h-[44vh] w-full object-cover object-center lg:h-[64vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gesso/70 via-gesso/25 to-gesso" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[92rem] px-5 pb-8 lg:px-10 lg:pb-14">
              <p className="max-w-[24ch] font-bricolage text-[clamp(1.5rem,4vw,3.2rem)] leading-[0.98] font-bold tracking-[-0.035em] text-balance">
                A hall full of accurate copies of somebody else&apos;s work.
              </p>
              <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-gesso-bone-soft uppercase">
                {plates.castHall.credit}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- process */}
        <Reveal>
          <section className="border-b border-gesso-rule">
            <div className="mx-auto max-w-[92rem] px-5 py-20 lg:px-10 lg:py-28">
              <h2 className="font-mono text-[11px] tracking-[0.24em] text-acid uppercase">
                {d.sections.process}
              </h2>
              <ol className="mt-12 grid gap-px bg-gesso-rule lg:grid-cols-4">
                {site.process.map((step, index) => (
                  <li key={step.title} className="reveal bg-gesso px-6 py-10">
                    <span className="font-bricolage text-[clamp(2.6rem,4vw,3.6rem)] leading-none font-bold text-acid tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-bricolage text-[24px] leading-tight font-bold tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.72] text-gesso-bone-soft">
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
          <section id="offer" className="border-b border-gesso-rule bg-gesso-2">
            <div className="mx-auto max-w-[92rem] px-5 py-20 lg:px-10 lg:py-32">
              {/* The small line is the section HEADING, not a label above one
                  — the same structure every section on this page uses. */}
              <h2 className="font-mono text-[11px] tracking-[0.24em] text-acid uppercase">
                {d.sections.offer}
              </h2>
              <div className="mt-8 grid gap-10 lg:grid-cols-12">
                <p className="max-w-[14ch] font-bricolage text-[clamp(2.4rem,6vw,5rem)] leading-[0.92] font-bold tracking-[-0.04em] text-balance lg:col-span-6">
                  {site.offer.headline}
                </p>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="max-w-[56ch] font-sans text-[17px] leading-[1.74] text-gesso-bone-soft">
                    {site.offer.body}
                  </p>
                  <a
                    href="#enquiry"
                    className="mt-9 inline-block bg-acid px-9 py-4.5 font-bricolage text-[14px] font-bold tracking-[0.1em] text-obsidian uppercase transition-colors hover:bg-acid-deep"
                  >
                    {site.cta}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- enquiry */}
        <Reveal>
          <section id="enquiry" className="border-b border-gesso-rule">
            <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
              <div className="lg:col-span-4">
                <h2 className="font-bricolage text-[clamp(2rem,3.4vw,2.9rem)] leading-[0.98] font-bold tracking-[-0.03em]">
                  {site.form.headline}
                </h2>
                <p className="mt-6 max-w-[42ch] font-sans text-[16px] leading-[1.72] text-gesso-bone-soft">
                  {site.form.body}
                </p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-8 inline-block border-b-2 border-acid pb-1 font-sans text-[15px]"
                >
                  {site.contactEmail}
                </a>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <EnquiryForm skin={gessoSkin} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* --------------------------------------------------------------- faq */}
        <Reveal>
          <section className="border-b border-gesso-rule bg-gesso-2">
            <div className="mx-auto max-w-[92rem] px-5 py-20 lg:px-10 lg:py-28">
              <h2 className="font-mono text-[11px] tracking-[0.24em] text-acid uppercase">
                {d.sections.faq}
              </h2>
              <div className="mt-12 border-t border-gesso-rule">
                {site.faqs.map((faq) => (
                  <details key={faq.q} className="group border-b border-gesso-rule">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 font-bricolage text-[clamp(1.2rem,2vw,1.7rem)] leading-snug font-semibold tracking-[-0.02em] marker:content-none">
                      {faq.q}
                      <DisclosureMark className="mt-0.5 font-bricolage text-[26px] font-bold text-acid" />
                    </summary>
                    <p className="max-w-[74ch] pb-8 font-sans text-[16px] leading-[1.75] text-gesso-bone-soft">
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
      <footer className="mx-auto max-w-[92rem] px-5 pt-16 pb-28 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="font-bricolage text-[clamp(3rem,9vw,7rem)] leading-[0.82] font-bold tracking-[-0.05em]">
            Pulito
          </p>
          <div className="font-sans text-[14px] text-gesso-bone-soft">
            <p className="max-w-[38ch]">{site.footer.line}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-2 inline-block border-b-2 border-acid pb-0.5 text-gesso-bone"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>
        <p className="mt-12 border-t border-gesso-rule pt-6 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-gesso-bone-soft uppercase">
          Photography: {plates.castRelief.credit}; {plates.castHall.credit}. Full
          licence details in public/img/CREDITS.md
        </p>
      </footer>

      <DirectionSwitch current="5" />
    </div>
  );
}
