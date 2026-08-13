import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DisclosureMark } from "@/components/Disclosure";
import { Reveal } from "@/components/Reveal";
import { TweakBar } from "@/components/TweakBar";
import { ultramarineSkin } from "@/components/skins";
import { direction as d, plates, site } from "@/content/site";

/**
 * ULTRAMARINE. The institution.
 *
 * One colour, drenched, and one lit head standing in it. The argument is
 * authority: this is what it looks like when a business is presented the way
 * an institution presents its collection, and the reader's own work has never
 * been given that treatment.
 *
 * The whole page rests on one technical decision. The Met photographs objects
 * on a near-black sweep, so `mix-blend-mode: screen` throws the sweep away and
 * leaves only the lit stone — the head stops sitting on a rectangle and starts
 * standing in the page. `plate-vignette` mops up the residue, because the
 * sweep lifts slightly towards the top of the frame and `screen` would
 * otherwise leave a faint straight edge floating in the blue.
 *
 * Composition is deliberately asymmetric and deliberately not centred: the
 * head holds the right two-fifths at full height, the headline runs under and
 * across it, and the action sits in the reading path rather than beside it.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS FILE LOOKS SLIGHTLY UNUSUAL
 * ---------------------------------------------------------------------------
 * It is wired for live editing, and two conventions carry that:
 *
 * - Sizes, measures, rhythm and the plate's crop come from custom properties
 *   (`var(--h1-size)`, `.band`, …) rather than from literals, so the tweak bar
 *   can move them without a re-render. The DEFAULTS in `globals.css` are the
 *   design; delete the bar tomorrow and this page renders exactly as it does
 *   now.
 * - Every editable string carries `data-copy="<path>"`, naming its home in
 *   `content/site.ts`. The bar turns those into `contenteditable` regions and
 *   reads the paths back when you export, so edits made on the page can be
 *   pasted into the content file rather than retyped.
 *
 * The page itself stays a server component. The bar is the only thing that
 * hydrates, so a visitor who never opens it pays nothing for it.
 */

export default function Page() {
  return (
    <div className="motion-settle bg-ultra text-ultra-bone">
      <a href="#main" className="skip-link bg-ultra-signal px-4 py-2 text-obsidian">
        Skip to content
      </a>

      {/* ------------------------------------------------------------ header */}
      <header className="sticky top-0 z-50 border-b border-ultra-rule bg-ultra/92 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[var(--shell)] items-center gap-6 px-6 py-4 lg:px-10">
          <a
            href="#main"
            data-copy="site.name"
            className="font-caslon text-[22px] tracking-[0.02em] text-ultra-bone"
          >
            Pulito
          </a>
          <span
            data-copy="direction.eyebrow"
            className="hidden font-sans text-[12px] tracking-[0.16em] text-ultra-bone-soft uppercase md:block"
          >
            {d.eyebrow}
          </span>
          <a
            href="#enquiry"
            data-copy="site.cta"
            className="ml-auto rounded-[var(--radius)] border border-ultra-signal px-5 py-2.5 font-archivo text-[11px] font-semibold tracking-[0.2em] text-ultra-signal uppercase transition-colors hover:bg-ultra-signal hover:text-obsidian"
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
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[var(--plate-col)] lg:block">
            <Image
              data-plate="hero"
              src={plates.caracalla.src}
              alt={plates.caracalla.alt}
              width={plates.caracalla.width}
              height={plates.caracalla.height}
              priority
              sizes="46vw"
              className="plate-screen plate-vignette plate-develop plate-graded h-full w-full bg-ultra-2 object-cover"
              style={{ objectPosition: "var(--plate-pos-x) var(--plate-pos-y)" }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-[var(--shell)] px-6 pt-10 pb-16 lg:px-10 lg:pt-28 lg:pb-32">
            {/*
              No kicker above the headline. It carried a tracked "Web, search
              and automation" line, and the subhead one element later said the
              same thing again — so the label was not even paying for itself in
              information. The heading carries its own weight.
            */}

            {/* On a phone the plate comes before the headline finishes its
                argument, because the picture is the argument and burying it
                below three screens of type would be making the case
                everywhere except where it is read. */}
            <div className="relative mt-2 max-w-[42rem] lg:hidden">
              <Image
                data-plate="hero-phone"
                src={plates.caracalla.src}
                alt={plates.caracalla.alt}
                width={plates.caracalla.width}
                height={plates.caracalla.height}
                priority
                sizes="100vw"
                className="plate-screen plate-vignette plate-develop plate-graded mx-auto w-[66%] max-w-[17rem] bg-ultra-2"
              />
            </div>

            {/*
              The headline is ONE text node, and the two lines come from the
              measure plus `text-balance` rather than from authored breaks.
              That is a tweak-bar decision as much as a typographic one: the
              previous version rendered a phone variant and a desktop variant
              of the same words, and making that `contenteditable` let the
              caret land between them and produced "Built to be Made to be
              looked at.looked at." on export. A headline you can rewrite in
              place has to be a single string.
            */}
            <h1
              data-copy="direction.headline"
              className="max-w-[16ch] font-caslon text-[length:var(--h1-size)] leading-[var(--h1-lead)] tracking-[var(--h1-track)] text-balance lg:mt-10 lg:max-w-[10ch]"
            >
              {d.headline}
            </h1>

            <p
              data-copy="direction.subhead"
              className="mt-6 max-w-[46ch] font-sans text-[length:var(--sub-size)] leading-[1.65] text-ultra-bone-soft lg:mt-8 lg:text-[length:var(--sub-size-lg)]"
            >
              {d.subhead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-11">
              <a
                href="#enquiry"
                data-copy="site.cta"
                className="rounded-[var(--radius)] bg-ultra-signal px-9 py-4.5 font-archivo text-[13px] font-semibold tracking-[0.22em] text-obsidian uppercase transition-colors hover:bg-ultra-bone"
              >
                {site.cta}
              </a>
              <a
                href="#offer"
                data-copy="site.secondaryCta"
                className="border-b border-ultra-rule-strong pb-1 font-sans text-[15px] text-ultra-bone-soft transition-colors hover:border-ultra-bone hover:text-ultra-bone"
              >
                {site.secondaryCta}
              </a>
            </div>

            <div
              className="rule-draw mt-16 h-px w-full bg-ultra-rule lg:mt-24"
              style={{ ["--draw-delay" as string]: "0.5s" }}
            />
            <p
              data-plate-credit="hero"
              className="mt-4 font-sans text-[12px] tracking-[0.14em] text-ultra-bone-soft uppercase"
            >
              {plates.caracalla.credit}
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- problem */}
        <Reveal>
          <section className="border-b border-ultra-rule bg-ultra-2">
            <div className="band mx-auto grid w-full max-w-[var(--shell)] gap-10 px-6 lg:grid-cols-12 lg:px-10">
              <h2
                data-copy="direction.problem.headline"
                className="font-caslon text-[length:var(--h2-size)] leading-[1.05] tracking-[-0.01em] text-balance lg:col-span-6"
              >
                {d.problem.headline}
              </h2>
              <p
                data-copy="direction.problem.body"
                className="max-w-[var(--measure)] self-end font-sans text-[length:var(--sub-size)] leading-[1.7] text-ultra-bone-soft lg:col-span-5 lg:col-start-8"
              >
                {d.problem.body}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ---------------------------------------------------------- services */}
        <Reveal>
          <section className="border-b border-ultra-rule">
            <div className="band mx-auto w-full max-w-[var(--shell)] px-6 lg:px-10">
              <h2
                data-copy="direction.sections.services"
                className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase"
              >
                {d.sections.services}
              </h2>

              {/* Ruled rows, not cards. A card is a box, and the only closed
                  shape allowed on this page is the photograph. */}
              <ul className="mt-12 border-t border-ultra-rule">
                {site.services.map((service, index) => (
                  <li
                    key={service.code}
                    className="grid gap-4 border-b border-ultra-rule py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
                  >
                    <h3
                      data-copy={`site.services.${index}.title`}
                      className="font-caslon text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.1] lg:col-span-5"
                    >
                      {service.title}
                    </h3>
                    <p
                      data-copy={`site.services.${index}.body`}
                      className="max-w-[58ch] font-sans text-[length:var(--body-size)] leading-[1.7] text-ultra-bone-soft lg:col-span-6 lg:col-start-7"
                    >
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
            <div className="band mx-auto grid w-full max-w-[var(--shell)] gap-14 px-6 lg:grid-cols-12 lg:px-10">
              <div className="lg:col-span-5">
                {/* Framed, captioned and duotoned into the ground — see
                    `plate-duotone` in globals.css for why this plate cannot be
                    screened the way the hero is. */}
                <figure className="border border-ultra-rule bg-ultra">
                  <Image
                    data-plate="figure"
                    src={plates.diadoumenos.src}
                    alt={plates.diadoumenos.alt}
                    width={plates.diadoumenos.width}
                    height={plates.diadoumenos.height}
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="plate-duotone w-full bg-ultra-2"
                  />
                  <figcaption
                    data-plate-credit="figure"
                    className="border-t border-ultra-rule px-5 py-4 font-sans text-[12px] tracking-[0.1em] text-ultra-bone-soft uppercase"
                  >
                    {plates.diadoumenos.credit}
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <h2
                  data-copy="direction.sections.process"
                  className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase"
                >
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
                        <h3
                          data-copy={`site.process.${index}.title`}
                          className="font-caslon text-[22px] leading-tight"
                        >
                          {step.title}
                        </h3>
                        <p
                          data-copy={`site.process.${index}.body`}
                          className="mt-2 max-w-[54ch] font-sans text-[15.5px] leading-[1.7] text-ultra-bone-soft"
                        >
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
            <div className="band mx-auto w-full max-w-[var(--shell)] px-6 text-center lg:px-10">
              <h2
                data-copy="direction.sections.offer"
                className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase"
              >
                {d.sections.offer}
              </h2>
              <p
                data-copy="site.offer.headline"
                className="mx-auto mt-8 max-w-[18ch] font-caslon text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-balance"
              >
                {site.offer.headline}
              </p>
              <p
                data-copy="site.offer.body"
                className="mx-auto mt-8 max-w-[58ch] font-sans text-[length:var(--sub-size)] leading-[1.7] text-ultra-bone-soft"
              >
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                data-copy="site.cta"
                className="mt-11 inline-block rounded-[var(--radius)] bg-ultra-signal px-10 py-4.5 font-archivo text-[13px] font-semibold tracking-[0.22em] text-obsidian uppercase transition-colors hover:bg-ultra-bone"
              >
                {site.cta}
              </a>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- enquiry */}
        <Reveal>
          <section id="enquiry" className="border-b border-ultra-rule bg-ultra-2">
            <div className="band mx-auto grid w-full max-w-[var(--shell)] gap-12 px-6 lg:grid-cols-12 lg:px-10">
              <div className="lg:col-span-4">
                <h2
                  data-copy="site.form.headline"
                  className="font-caslon text-[clamp(2rem,3.2vw,3rem)] leading-[1.05]"
                >
                  {site.form.headline}
                </h2>
                <p
                  data-copy="site.form.body"
                  className="mt-6 max-w-[44ch] font-sans text-[length:var(--body-size)] leading-[1.7] text-ultra-bone-soft"
                >
                  {site.form.body}
                </p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  data-copy="site.contactEmail"
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
            <div className="band mx-auto w-full max-w-[var(--shell)] px-6 lg:px-10">
              <h2
                data-copy="direction.sections.faq"
                className="font-sans text-[12px] tracking-[0.3em] text-ultra-bone-soft uppercase"
              >
                {d.sections.faq}
              </h2>
              <div className="mt-12 border-t border-ultra-rule">
                {site.faqs.map((faq, index) => (
                  <details key={faq.q} className="group border-b border-ultra-rule">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 font-caslon text-[clamp(1.2rem,1.8vw,1.6rem)] leading-snug marker:content-none">
                      <span data-copy={`site.faqs.${index}.q`}>{faq.q}</span>
                      <DisclosureMark className="mt-1 font-caslon text-[26px] text-ultra-bone-soft" />
                    </summary>
                    <p
                      data-copy={`site.faqs.${index}.a`}
                      className="max-w-[74ch] pb-8 font-sans text-[length:var(--body-size)] leading-[1.75] text-ultra-bone-soft"
                    >
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
      <footer className="mx-auto w-full max-w-[var(--shell)] px-6 pt-16 pb-20 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="font-caslon text-[34px] leading-none">Pulito</p>
          <div className="font-sans text-[14px] text-ultra-bone-soft">
            <p data-copy="site.footer.line">{site.footer.line}</p>
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

      <TweakBar />
    </div>
  );
}
