import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DirectionSwitch } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { BrokenHeadline, Reveal } from "@/components/Reveal";
import { cavaSkin } from "@/components/skins";
import { directions, plates, site } from "@/content/site";

/**
 * 4 — CAVA. The quarry.
 *
 * The one direction that is not about finished classical objects at all. It
 * goes back a step, to the quarry face the marble is cut out of, and it is
 * the direction that argues in the reader's own language: this is a worksite,
 * these are terraces cut to a line, and the material is judged before anyone
 * carves anything.
 *
 * That makes it the anti-cliché of the set, and it is here deliberately. The
 * other four all risk reading as an antiquities dealer. This one reads as the
 * trade, which is who is actually being sold to — a builder on a phone
 * between site visits, in the sun, who judges craftsmanship because that is
 * what he sells.
 *
 * Everything follows from that. Daylight ground rather than a gallery.
 * Hi-vis orange, which is the only colour on a real site that means "act on
 * this". A grotesk at weight 800 in tight capitals, because it has to survive
 * being set over a quarry face in full sun. Nothing is knocked out, tinted or
 * duotoned: `plate-cava` pulls the saturation back a touch and does nothing
 * else, because the argument is that the material is already right.
 */

const d = directions["4"];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

export default function Cava() {
  return (
    <div className="bg-cava motion-setout pb-[var(--switch-bar)] text-cava-ink">
      <a href="#main" className="skip-link bg-hivis px-4 py-2 text-bone">
        Skip to content
      </a>

      <div
        aria-hidden
        className="tooth-layer pointer-events-none fixed inset-0 z-40 opacity-[0.06] mix-blend-multiply"
      />

      {/* ------------------------------------------------------------ header */}
      <header className="sticky top-0 z-50 border-b-2 border-cava-ink bg-cava/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[92rem] items-center gap-6 px-5 py-3.5 lg:px-8">
          <a
            href="#main"
            className="font-archivo text-[20px] font-extrabold tracking-[-0.02em] uppercase"
          >
            Pulito
          </a>
          <span className="hidden font-mono text-[10.5px] tracking-[0.12em] text-cava-ink-soft uppercase md:block">
            {d.eyebrow}
          </span>
          <a
            href="#enquiry"
            className="ml-auto bg-hivis px-5 py-2.5 font-archivo text-[11px] font-extrabold tracking-[0.12em] text-bone uppercase transition-colors hover:bg-hivis-deep"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- hero */}
        <section className="border-b-2 border-cava-ink">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="order-2 flex flex-col justify-center px-5 py-14 lg:order-1 lg:px-12 lg:py-24">
              {/* No kicker above the headline — see app/1/page.tsx. */}
              <h1 className="font-archivo text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.92] font-extrabold tracking-[-0.035em] uppercase text-balance">
                <BrokenHeadline lines={d.headlineLines} headline={d.headline} />
              </h1>

              <div className="mt-8 h-1 w-24 bg-hivis" />

              <p className="mt-8 max-w-[46ch] font-sans text-[17px] leading-[1.68] text-cava-ink-soft lg:text-[18.5px]">
                {d.subhead}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href="#enquiry"
                  className="bg-hivis px-9 py-4.5 font-archivo text-[14px] font-extrabold tracking-[0.12em] text-bone uppercase transition-colors hover:bg-hivis-deep"
                >
                  {site.cta}
                </a>
                <a
                  href="#offer"
                  className="border-b-2 border-cava-rule-strong pb-1 font-sans text-[15px] text-cava-ink-soft transition-colors hover:border-hivis hover:text-cava-ink"
                >
                  What you get, free
                </a>
              </div>
            </div>

            {/* Full-bleed to the edge of the viewport on wide screens: a
                quarry face cropped inside a padded box would be a picture OF a
                quarry rather than the wall of one. */}
            <figure className="relative order-1 lg:order-2">
              <Image
                src={plates.quarryFace.src}
                alt={plates.quarryFace.alt}
                width={plates.quarryFace.width}
                height={plates.quarryFace.height}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="bg-cava-2 plate-cava plate-develop h-[52vh] w-full object-cover object-[54%_50%] lg:h-full lg:min-h-[42rem]"
              />
              {/* A SHORT attribution, not a truncated one. The first build
                  clipped the full string and argued that `title` kept it
                  reachable — `title` is not reachable on a touch screen, and
                  the token being severed was the licence name on a CC BY-SA
                  image, which is the one part of a credit that carries an
                  obligation. Short enough to fit whole at 390px is the fix;
                  the unabridged form is in the footer and in CREDITS.md. */}
              <figcaption className="absolute right-0 bottom-0 bg-cava-ink/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.06em] text-bone uppercase">
                Wittylama · CC BY-SA 4.0
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ----------------------------------------------------------- problem */}
        <Reveal>
          <section className="border-b-2 border-cava-ink bg-cava-2">
            <div className="mx-auto grid max-w-[92rem] gap-8 px-5 py-18 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-26">
              <h2 className="font-archivo text-[clamp(1.9rem,4vw,3.4rem)] leading-[0.98] font-extrabold tracking-[-0.028em] uppercase text-balance lg:col-span-6">
                {d.problem.headline}
              </h2>
              <p className="max-w-[62ch] self-center font-sans text-[17px] leading-[1.72] text-cava-ink-soft lg:col-span-5 lg:col-start-8">
                {d.problem.body}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ---------------------------------------------------------- services */}
        <Reveal>
          <section className="border-b-2 border-cava-ink">
            <div className="mx-auto max-w-[92rem] px-5 py-18 lg:px-12 lg:py-26">
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-archivo text-[clamp(1.5rem,2.4vw,2.1rem)] font-extrabold tracking-[-0.02em] uppercase">
                  {d.sections.services}
                </h2>
                <span className="font-mono text-[11px] tracking-[0.16em] text-cava-ink-soft uppercase">
                  04 items
                </span>
              </div>

              {/* Shared drawn boundaries via a single-pixel gap grid, so the
                  four read as a schedule rather than as four floating cards. */}
              <ul className="mt-8 grid gap-0.5 bg-cava-ink sm:grid-cols-2">
                {site.services.map((service) => (
                  <li key={service.code} className="bg-cava px-6 py-9 lg:px-9 lg:py-11">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-hivis uppercase">
                      {service.code}
                    </span>
                    <h3 className="mt-4 font-archivo text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.02] font-extrabold tracking-[-0.025em] uppercase">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-[52ch] font-sans text-[15.5px] leading-[1.72] text-cava-ink-soft">
                      {service.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* -------------------------------------------------------- range band */}
        <Reveal>
          <section className="relative border-b-2 border-cava-ink">
            <Image
              src={plates.quarryRange.src}
              alt={plates.quarryRange.alt}
              width={plates.quarryRange.width}
              height={plates.quarryRange.height}
              sizes="100vw"
              className="bg-cava-2 plate-cava h-[40vh] w-full object-cover object-center lg:h-[58vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cava-ink/88 via-cava-ink/45 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-[46rem] flex-col justify-center px-5 lg:px-12">
              <p className="font-archivo text-[clamp(1.4rem,3.4vw,2.8rem)] leading-[1.02] font-extrabold tracking-[-0.028em] text-bone uppercase text-balance">
                Everything gets judged before it is cut.
              </p>
              <p className="mt-5 max-w-[48ch] font-sans text-[15.5px] leading-[1.7] text-cava/90">
                We audit the site, the search visibility and the way enquiries
                actually reach you — and you get the findings whether or not you
                hire us.
              </p>
            </div>
            <p className="absolute right-0 bottom-0 bg-cava-ink/85 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.08em] text-bone uppercase">
              {plates.quarryRange.credit}
            </p>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- process */}
        <Reveal>
          <section className="border-b-2 border-cava-ink bg-cava-2">
            <div className="mx-auto max-w-[92rem] px-5 py-18 lg:px-12 lg:py-26">
              <h2 className="font-archivo text-[clamp(1.5rem,2.4vw,2.1rem)] font-extrabold tracking-[-0.02em] uppercase">
                {d.sections.process}
              </h2>
              {/*
                A setout, read down: reference, item, description, ruled off.
                It was a four-column row, which is exactly what GESSO's
                process was, and between that and two matching services grids
                the two directions read as one page in two colourways. This is
                the form a trade actually receives a sequence in — a schedule
                on a sheet — so it costs the direction nothing to take it.
              */}
              <ol className="mt-8 border-t-2 border-cava-ink">
                {site.process.map((step, index) => (
                  <li
                    key={step.title}
                    className="reveal grid gap-2 border-b border-cava-rule-strong py-7 lg:grid-cols-[5rem_18rem_1fr] lg:items-baseline lg:gap-8"
                  >
                    <span className="font-mono text-[11px] tracking-[0.16em] text-hivis tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-archivo text-[clamp(1.4rem,2.4vw,2rem)] leading-none font-extrabold tracking-[-0.025em] uppercase">
                      {step.title}
                    </h3>
                    <p className="max-w-[62ch] font-sans text-[15.5px] leading-[1.72] text-cava-ink-soft">
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
          <section id="offer" className="border-b-2 border-cava-ink">
            <div className="mx-auto max-w-[70rem] px-5 py-20 lg:px-12 lg:py-28">
              {/* The small line is the section HEADING, not a label sitting
                  above one — the same structure every section on this page
                  uses. The large line under it is the section's statement. */}
              <h2 className="font-mono text-[11px] tracking-[0.2em] text-hivis uppercase">
                {d.sections.offer}
              </h2>
              <p className="mt-6 max-w-[16ch] font-archivo text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[0.94] font-extrabold tracking-[-0.032em] uppercase text-balance">
                {site.offer.headline}
              </p>
              <p className="mt-8 max-w-[62ch] font-sans text-[17px] leading-[1.74] text-cava-ink-soft">
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                className="mt-10 inline-block bg-hivis px-10 py-5 font-archivo text-[15px] font-extrabold tracking-[0.12em] text-bone uppercase transition-colors hover:bg-hivis-deep"
              >
                {site.cta}
              </a>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- enquiry */}
        <Reveal>
          <section id="enquiry" className="border-b-2 border-cava-ink bg-cava-2">
            <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-18 lg:grid-cols-12 lg:px-12 lg:py-26">
              <div className="lg:col-span-4">
                <h2 className="font-archivo text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.0] font-extrabold tracking-[-0.025em] uppercase">
                  {site.form.headline}
                </h2>
                <p className="mt-6 max-w-[42ch] font-sans text-[16px] leading-[1.72] text-cava-ink-soft">
                  {site.form.body}
                </p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-8 inline-block border-b-2 border-hivis pb-1 font-sans text-[15px]"
                >
                  {site.contactEmail}
                </a>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <EnquiryForm skin={cavaSkin} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* --------------------------------------------------------------- faq */}
        <Reveal>
          <section className="border-b-2 border-cava-ink">
            <div className="mx-auto max-w-[92rem] px-5 py-18 lg:px-12 lg:py-26">
              <h2 className="font-archivo text-[clamp(1.5rem,2.4vw,2.1rem)] font-extrabold tracking-[-0.02em] uppercase">
                {d.sections.faq}
              </h2>
              <div className="mt-8 border-t-2 border-cava-ink">
                {site.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border-b border-cava-rule-strong"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 font-archivo text-[clamp(1.05rem,1.7vw,1.4rem)] leading-snug font-bold uppercase marker:content-none">
                      {faq.q}
                      <DisclosureMark className="mt-0.5 font-archivo text-[24px] font-bold text-hivis" />
                    </summary>
                    <p className="max-w-[74ch] pb-8 font-sans text-[16px] leading-[1.75] text-cava-ink-soft">
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
      <footer className="mx-auto max-w-[92rem] px-5 pt-14 pb-28 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="font-archivo text-[clamp(3rem,9vw,7rem)] leading-[0.82] font-extrabold tracking-[-0.045em] uppercase">
            Pulito
          </p>
          <div className="font-sans text-[14px] text-cava-ink-soft">
            <p className="max-w-[38ch]">{site.footer.line}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-2 inline-block border-b-2 border-hivis pb-0.5 text-cava-ink"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>
        <p className="mt-10 border-t-2 border-cava-ink pt-5 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-cava-ink-soft uppercase">
          Photography: {plates.quarryFace.credit}; {plates.quarryRange.credit}.
          Full licence details in public/img/CREDITS.md
        </p>
      </footer>

      <DirectionSwitch current="4" />
    </div>
  );
}
