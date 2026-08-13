import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arcade, HeroSlot } from "@/components/Classical";
import { DirectionSwitch, SWITCH_BAR_CLEARANCE } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { BrokenHeadline, Reveal } from "@/components/Reveal";
import { latticeSkin } from "@/components/skins";
import { directions, site } from "@/content/site";

/**
 * 3 — LATTICE. After Notus, in LIGHT mode.
 *
 * Light, and that is the user's correction rather than my reading: they were
 * looking at that reference with its theme toggle set to light, and preferred
 * it. It leaves this build with one dark direction and two light ones, so
 * PLINTH and LATTICE are pulled hard apart on everything except value —
 * PLINTH is warm, sparse and has no chrome at all; LATTICE is cool, dense, and
 * is ENTIRELY chrome. Bordered cells, a ruled grid ground, soft corners, and
 * more sections than either of the others.
 *
 * The structural system is the lattice its name promises: cells separated by
 * shared hairlines on a grid field, so the page reads as one ruled surface
 * rather than as a stack of floating cards. Where a grid of equal cells would
 * flatten the content, the spans vary — the services run 4/2/2/4 across six
 * columns, because they are not four interchangeable products.
 *
 * The centred hero device is where the reference puts its dashboard
 * screenshot. There is no dashboard to put there and no product UI to
 * photograph, so it is the reserved image slot, at 1600×900, sitting on the
 * grid under a violet bloom.
 */

const d = directions["3"];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "#offer", label: d.sections.offer },
  { href: "#services", label: d.sections.services },
  { href: "#process", label: d.sections.process },
  { href: "#faq", label: d.sections.faq },
] as const;

export default function Lattice() {
  return (
    <div
      className={`motion-assemble bg-lat font-manrope text-lat-ink ${SWITCH_BAR_CLEARANCE}`}
    >
      <a
        href="#main"
        className="skip-link rounded-lg bg-lat-accent px-4 py-2 text-[13px] font-semibold text-bone"
      >
        Skip to content
      </a>

      <header
        id="top"
        className="sticky top-0 z-40 border-b border-lat-line bg-lat/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[82rem] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
          <a href="#top" className="text-[18px] font-extrabold tracking-[-0.03em]">
            Pulito
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-[14px] font-medium text-lat-ink-soft transition-colors hover:bg-lat-2 hover:text-lat-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#enquiry"
            className="shrink-0 rounded-lg bg-lat-accent px-4 py-2.5 text-[14px] font-bold whitespace-nowrap text-bone transition-colors hover:bg-lat-accent-deep"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="main">
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="lat-grid pointer-events-none absolute inset-0 -z-10"
          />
          {/* Flattened to a horizon glow and weakened on a phone, for the same
              reason as PLINTH's: a percentage-sized radial concentrates into a
              violet blob behind the header at 375px. */}
          <div
            aria-hidden
            className="bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(115%_36%_at_50%_0%,var(--color-lat-accent)_0%,transparent_70%)] opacity-[0.30] sm:opacity-[0.42]"
          />

          <div className="mx-auto max-w-[82rem] px-5 pt-24 pb-16 text-center sm:px-8 sm:pt-32">
            <h1
              /* 26ch, not 19: the headline is authored on two lines and 19ch
                 re-wrapped both of them, so the hero opened on four lines and
                 pushed its own actions to the fold. */
              className="hero-arrive mx-auto max-w-[26ch] text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance"
              style={{ ["--arrive-delay" as string]: "0.05s" }}
            >
              <BrokenHeadline lines={d.headlineLines} headline={d.headline} />
            </h1>

            <p
              className="hero-arrive mx-auto mt-7 max-w-[62ch] text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-lat-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.18s" }}
            >
              {d.subhead}
            </p>

            <div
              className="hero-arrive mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ ["--arrive-delay" as string]: "0.3s" }}
            >
              <a
                href="#enquiry"
                className="w-full rounded-lg bg-lat-accent px-7 py-3.5 text-[15px] font-bold text-bone transition-colors hover:bg-lat-accent-deep sm:w-auto"
              >
                {site.cta}
              </a>
              <a
                href="#process"
                className="w-full rounded-lg border border-lat-line bg-lat px-7 py-3.5 text-[15px] font-bold text-lat-ink transition-colors hover:border-lat-line-strong hover:bg-lat-2 sm:w-auto"
              >
                {site.ctaSecondary}
              </a>
            </div>
          </div>

          {/* The centred device, where the reference puts its dashboard. */}
          <div className="mx-auto max-w-[82rem] px-5 pb-20 sm:px-8 sm:pb-24">
            <Reveal>
              <HeroSlot w={d.heroSlot.w} h={d.heroSlot.h} variant="lattice" />
            </Reveal>
          </div>
        </section>

        {/* The offer, tinted rather than boxed: the one place the accent owns
            a whole region instead of marking a control. */}
        <section id="offer" className="border-y border-lat-line bg-lat-accent-soft">
          <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">
                  {site.offer.headline}
                </h2>
                <div>
                  <p className="max-w-[64ch] text-[1.05rem] leading-relaxed text-lat-ink-soft">
                    {site.offer.body}
                  </p>
                  <a
                    href="#enquiry"
                    className="mt-8 inline-block rounded-lg bg-lat-accent px-6 py-3 text-[14.5px] font-bold text-bone transition-colors hover:bg-lat-accent-deep"
                  >
                    {site.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-lat">
          <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">
                  {d.problem.headline}
                </h2>
                <p className="max-w-[64ch] text-[1.05rem] leading-relaxed text-lat-ink-soft">
                  {d.problem.body}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Bento, with the spans varied 4/2/2/4. Four equal cells would say
            the four services are interchangeable; they are not. */}
        <section id="services" className="border-t border-lat-line bg-lat-2">
          <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em]">
                {d.sections.services}
              </h2>
            </Reveal>

            {/* Spans 6 / 3 / 3 across six columns: the first service takes a
                full row and the other two split the next. Was 4/2/2/4 when
                there were four services; with three, that pattern left a
                half-empty row. */}
            <div className="mt-12 grid gap-4 lg:grid-cols-6">
              {site.services.map((service, i) => (
                <Reveal
                  key={service.code}
                  className={i === 0 ? "lg:col-span-6" : "lg:col-span-3"}
                >
                  <div className="h-full rounded-xl border border-lat-line bg-lat p-7 transition-colors hover:border-lat-line-strong sm:p-8">
                    <h3 className="text-[1.3rem] font-extrabold tracking-[-0.025em]">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-[60ch] leading-relaxed text-lat-ink-soft">
                      {service.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/*
          The lattice proper: six cells sharing hairlines on one ruled surface,
          rather than six floating cards with six shadows. The `gap-px` over a
          line-coloured ground is what makes the borders shared instead of
          doubled.
        */}
        <section className="border-t border-lat-line bg-lat">
          <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-[-0.025em]">
                What that actually includes
              </h2>
            </Reveal>

            <div className="mt-10 overflow-hidden rounded-xl border border-lat-line">
              {/* Flattened from the services rather than kept as a separate
                  list: the detail used to live in its own `capabilities`
                  array, and now belongs to the service it describes. Nine
                  cells across three columns. */}
              <div className="grid gap-px bg-lat-line sm:grid-cols-2 lg:grid-cols-3">
                {site.services
                  /* Spread, not `s.points` directly: `as const` makes each
                     service's points a distinct readonly TUPLE, and flatMap
                     cannot reconcile three different tuple types into one
                     element type. Copying to a plain array widens them. */
                  .flatMap((s) => [...s.points])
                  .map((item) => (
                  <div key={item.title} className="bg-lat p-6 sm:p-7">
                    <h3 className="text-[1.02rem] font-bold tracking-[-0.015em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-lat-ink-soft">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="border-t border-lat-line bg-lat-2">
          <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em]">
                {d.sections.process}
              </h2>
            </Reveal>

            {/* Numerals earned: this is a sequence and the order is the
                information. The rule behind them is the connector. */}
            <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
              <span
                aria-hidden
                className="rule-draw absolute top-4 right-0 left-0 -z-0 hidden h-px bg-lat-line xl:block"
              />
              {site.process.map((step, i) => (
                <li key={step.title} className="relative">
                  <Reveal>
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-lat-accent text-[13px] font-bold text-bone">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-[1.2rem] font-extrabold tracking-[-0.025em]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[42ch] leading-relaxed text-lat-ink-soft">
                      {step.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="border-t border-lat-line bg-lat">
          <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
              <Reveal>
                <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance lg:sticky lg:top-28">
                  {d.sections.faq}
                </h2>
              </Reveal>

              <div className="overflow-hidden rounded-xl border border-lat-line">
                {site.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border-b border-lat-line last:border-b-0"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 p-6 text-[1.05rem] font-bold tracking-[-0.015em] transition-colors hover:bg-lat-2">
                      {faq.q}
                      <DisclosureMark className="mt-0.5 text-[1.35rem] font-normal text-lat-accent" />
                    </summary>
                    <p className="max-w-[68ch] px-6 pb-6 leading-relaxed text-lat-ink-soft">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-lat-3 text-bone">
          <Arcade
            bays={8}
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[85%] w-full text-lat-accent/25"
          />
          <div className="mx-auto max-w-[82rem] px-5 py-20 text-center sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="mx-auto max-w-[22ch] text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">
                Send us the website. We will send back the redesign.
              </h2>
              <a
                href="#enquiry"
                className="mt-9 inline-block rounded-lg bg-lat-accent px-8 py-3.5 text-[15px] font-bold text-bone transition-colors hover:bg-lat-accent-deep"
              >
                {site.cta}
              </a>
            </Reveal>
          </div>
        </section>

        <section id="enquiry" className="border-t border-lat-line bg-lat-2">
          <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <Reveal>
                <div>
                  <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">
                    {site.form.headline}
                  </h2>
                  <p className="mt-5 max-w-[46ch] leading-relaxed text-lat-ink-soft">
                    {site.form.body}
                  </p>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="mt-8 inline-block text-[15px] font-bold text-lat-accent transition-colors hover:text-lat-accent-deep"
                  >
                    {site.contactEmail}
                  </a>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-xl border border-lat-line bg-lat p-7 sm:p-9">
                  <EnquiryForm skin={latticeSkin} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-lat-3 text-bone">
        <div className="mx-auto flex max-w-[82rem] flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[18px] font-extrabold tracking-[-0.03em]">
              Pulito
            </span>
            <p className="mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-bone/70">
              {site.footer.line}
            </p>
          </div>
          <p className="text-[14.5px] text-bone/70">
            {site.location} ·{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-bone transition-colors hover:text-lat-accent"
            >
              {site.contactEmail}
            </a>
          </p>
        </div>
      </footer>

      <DirectionSwitch current="3" />
    </div>
  );
}
