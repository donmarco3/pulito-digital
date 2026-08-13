import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DirectionSwitch } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { BrokenHeadline, Reveal } from "@/components/Reveal";
import { ultramarineSkin } from "@/components/skins";
import { directions, plates, site } from "@/content/site";

/**
 * 1 — ULTRAMARINE. The institution.
 *
 * One colour, drenched, and one lit head standing in it. The argument is
 * authority: this is what it looks like when a business is presented the way
 * an institution presents its collection, and the reader's own work has never
 * been given that treatment.
 *
 * The whole direction rests on one technical decision. The Met photographs
 * objects on a near-black sweep, so `mix-blend-mode: screen` throws the sweep
 * away and leaves only the lit stone — the head stops sitting on a rectangle
 * and starts standing in the page. `plate-vignette` mops up the residue,
 * because the sweep lifts slightly towards the top of the frame and `screen`
 * would otherwise leave a faint straight edge floating in the blue.
 *
 * Composition is deliberately asymmetric and deliberately not centred: the
 * head holds the right two-fifths at full height, the headline runs under and
 * across it, and the action sits in the reading path rather than beside it.
 */

const d = directions["1"];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

export default function Ultramarine() {
  return (
    <div className="bg-ultra motion-settle pb-[var(--switch-bar)] text-ultra-bone">
      <a href="#main" className="skip-link bg-ultra-signal px-4 py-2 text-obsidian">
        Skip to content
      </a>

      {/* ------------------------------------------------------------ header */}
      <header className="sticky top-0 z-50 border-b border-ultra-rule bg-ultra/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[88rem] items-center gap-6 px-6 py-4 lg:px-10">
          <a
            href="#main"
            className="font-caslon text-[22px] tracking-[0.02em] text-ultra-bone"
          >
            Pulito
          </a>
          <span className="hidden font-sans text-[12px] tracking-[0.16em] text-ultra-bone-soft uppercase md:block">
            {d.eyebrow}
          </span>
          <a
            href="#enquiry"
            className="ml-auto border border-ultra-signal px-5 py-2.5 font-archivo text-[11px] font-semibold tracking-[0.2em] text-ultra-signal uppercase transition-colors hover:bg-ultra-signal hover:text-obsidian"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- hero */}
        <section className="relative overflow-hidden border-b border-ultra-rule">
          {/*
            The plate is placed, not floated: it owns a real column on wide
            screens and a real block on a phone. A monument photographed badly
            is worse than no monument — if the head cannot be shown whole, it
            is shown smaller rather than cropped to texture.
          */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
            <Image
              src={plates.caracalla.src}
              alt={plates.caracalla.alt}
              width={plates.caracalla.width}
              height={plates.caracalla.height}
              priority
              sizes="46vw"
              className="bg-ultra-2 plate-screen plate-vignette plate-develop h-full w-full object-cover object-[50%_38%]"
            />
          </div>

          <div className="relative mx-auto max-w-[88rem] px-6 pt-10 pb-16 lg:px-10 lg:pt-28 lg:pb-32">
            {/*
              No kicker above the headline, on any of the five. Every one of
              them carried a tracked "Web, search and automation" line over the
              h1, and every one of them then said the same thing again in the
              subhead one element later — so the label was not even paying for
              itself in information. The heading carries its own weight.
            */}

            {/* On a phone the plate comes before the headline finishes its
                argument, because the picture is the argument and burying it
                below three screens of type would be making the case
                everywhere except where it is read. */}
            <div className="relative mt-2 max-w-[42rem] lg:hidden">
              <Image
                src={plates.caracalla.src}
                alt={plates.caracalla.alt}
                width={plates.caracalla.width}
                height={plates.caracalla.height}
                priority
                sizes="100vw"
                className="bg-ultra-2 plate-screen plate-vignette plate-develop mx-auto w-[66%] max-w-[17rem]"
              />
            </div>

            <h1 className="max-w-[16ch] font-caslon text-[clamp(3rem,9vw,7.5rem)] leading-[0.94] tracking-[-0.015em] text-balance lg:mt-10 lg:max-w-[13ch]">
              <BrokenHeadline lines={d.headlineLines} headline={d.headline} />
            </h1>

            <p className="mt-6 max-w-[46ch] font-sans text-[17px] leading-[1.65] text-ultra-bone-soft lg:mt-8 lg:text-[19px]">
              {d.subhead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-11">
              <a
                href="#enquiry"
                className="bg-ultra-signal px-9 py-4.5 font-archivo text-[13px] font-semibold tracking-[0.22em] text-obsidian uppercase transition-colors hover:bg-ultra-bone"
              >
                {site.cta}
              </a>
              <a
                href="#offer"
                className="border-b border-ultra-rule-strong pb-1 font-sans text-[15px] text-ultra-bone-soft transition-colors hover:border-ultra-bone hover:text-ultra-bone"
              >
                What the preview involves
              </a>
            </div>

            <div
              className="rule-draw mt-16 h-px w-full bg-ultra-rule lg:mt-24"
              style={{ ["--draw-delay" as string]: "0.5s" }}
            />
            <p className="mt-4 font-sans text-[12px] tracking-[0.14em] text-ultra-bone-soft uppercase">
              {plates.caracalla.credit}
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- problem */}
        <Reveal>
          <section className="border-b border-ultra-rule bg-ultra-2">
            <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
              <h2 className="font-caslon text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05] tracking-[-0.01em] text-balance lg:col-span-6">
                {d.problem.headline}
              </h2>
              <p className="max-w-[62ch] self-end font-sans text-[17px] leading-[1.7] text-ultra-bone-soft lg:col-span-5 lg:col-start-8">
                {d.problem.body}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ---------------------------------------------------------- services */}
        <Reveal>
          <section className="border-b border-ultra-rule">
            <div className="mx-auto max-w-[88rem] px-6 py-20 lg:px-10 lg:py-28">
              <h2 className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase">
                {d.sections.services}
              </h2>

              {/* Ruled rows, not cards. A card is a box, and the only closed
                  shapes this direction allows are the photographs. */}
              <ul className="mt-12 border-t border-ultra-rule">
                {site.services.map((service) => (
                  <li
                    key={service.code}
                    className="grid gap-4 border-b border-ultra-rule py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
                  >
                    <h3 className="font-caslon text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.1] lg:col-span-5">
                      {service.title}
                    </h3>
                    <p className="max-w-[58ch] font-sans text-[16px] leading-[1.7] text-ultra-bone-soft lg:col-span-6 lg:col-start-7">
                      {service.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- process */}
        <Reveal>
          <section className="border-b border-ultra-rule bg-ultra-2">
            <div className="mx-auto grid max-w-[88rem] gap-14 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
              <div className="lg:col-span-5">
                {/* Framed, captioned and duotoned into the ground — see
                    `plate-duotone` in globals.css for why this plate cannot be
                    screened the way the hero is. */}
                <figure className="border border-ultra-rule bg-ultra">
                  <Image
                    src={plates.diadoumenos.src}
                    alt={plates.diadoumenos.alt}
                    width={plates.diadoumenos.width}
                    height={plates.diadoumenos.height}
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="bg-ultra-2 plate-duotone w-full"
                  />
                  <figcaption className="border-t border-ultra-rule px-5 py-4 font-sans text-[12px] tracking-[0.1em] text-ultra-bone-soft uppercase">
                    {plates.diadoumenos.credit}
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <h2 className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase">
                  {d.sections.process}
                </h2>
                {/* The steps carry `.reveal` directly rather than being wrapped
                    in the Reveal div: a div between <ol> and <li> is invalid
                    and drops the list semantics a screen reader uses to
                    announce "step 2 of 4". */}
                <ol className="mt-10 border-t border-ultra-rule">
                  {site.process.map((step, index) => (
                    <li
                      key={step.title}
                      className="reveal flex gap-6 border-b border-ultra-rule py-7"
                    >
                      <span className="mt-1 font-caslon text-[20px] text-ultra-bone-soft tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-caslon text-[22px] leading-tight">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-[54ch] font-sans text-[15.5px] leading-[1.7] text-ultra-bone-soft">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ------------------------------------------------------------- offer */}
        <Reveal>
          <section id="offer" className="border-b border-ultra-rule">
            <div className="mx-auto max-w-[88rem] px-6 py-20 text-center lg:px-10 lg:py-32">
              <h2 className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase">
                {d.sections.offer}
              </h2>
              <p className="mx-auto mt-8 max-w-[18ch] font-caslon text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-balance">
                {site.offer.headline}
              </p>
              <p className="mx-auto mt-8 max-w-[58ch] font-sans text-[17px] leading-[1.7] text-ultra-bone-soft">
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                className="mt-11 inline-block bg-ultra-signal px-10 py-4.5 font-archivo text-[13px] font-semibold tracking-[0.22em] text-obsidian uppercase transition-colors hover:bg-ultra-bone"
              >
                {site.cta}
              </a>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- enquiry */}
        <Reveal>
          <section id="enquiry" className="border-b border-ultra-rule bg-ultra-2">
            <div className="mx-auto grid max-w-[88rem] gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
              <div className="lg:col-span-4">
                <h2 className="font-caslon text-[clamp(2rem,3.2vw,3rem)] leading-[1.05]">
                  {site.form.headline}
                </h2>
                <p className="mt-6 max-w-[44ch] font-sans text-[16px] leading-[1.7] text-ultra-bone-soft">
                  {site.form.body}
                </p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-8 inline-block border-b border-ultra-rule-strong pb-1 font-sans text-[15px] text-ultra-bone transition-colors hover:border-ultra-signal"
                >
                  {site.contactEmail}
                </a>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <EnquiryForm skin={ultramarineSkin} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* --------------------------------------------------------------- faq */}
        <Reveal>
          <section className="border-b border-ultra-rule">
            <div className="mx-auto max-w-[88rem] px-6 py-20 lg:px-10 lg:py-28">
              <h2 className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase">
                {d.sections.faq}
              </h2>
              <div className="mt-12 border-t border-ultra-rule">
                {site.faqs.map((faq) => (
                  <details key={faq.q} className="group border-b border-ultra-rule">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 font-caslon text-[clamp(1.2rem,1.8vw,1.6rem)] leading-snug marker:content-none">
                      {faq.q}
                      <DisclosureMark className="mt-1 font-caslon text-[26px] text-ultra-bone-soft" />
                    </summary>
                    <p className="max-w-[74ch] pb-8 font-sans text-[16px] leading-[1.75] text-ultra-bone-soft">
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
      <footer className="mx-auto max-w-[88rem] px-6 pt-16 pb-28 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="font-caslon text-[34px] leading-none">Pulito</p>
          <div className="font-sans text-[14px] text-ultra-bone-soft">
            <p>{site.footer.line}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-2 inline-block border-b border-ultra-rule-strong pb-0.5 text-ultra-bone"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>
        <p className="mt-12 border-t border-ultra-rule pt-6 font-sans text-[12px] leading-relaxed text-ultra-bone-soft">
          Photography: {plates.caracalla.credit}; {plates.diadoumenos.credit}.
          Full licence details in <code>public/img/CREDITS.md</code>.
        </p>
      </footer>

      <DirectionSwitch current="1" />
    </div>
  );
}
