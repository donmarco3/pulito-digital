import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arcade, Fluting, HeroSlot } from "@/components/Classical";
import { DirectionSwitch, SWITCH_BAR_CLEARANCE } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { PillNav } from "@/components/PillNav";
import { BrokenHeadline, Reveal } from "@/components/Reveal";
import { plinthSkin } from "@/components/skins";
import { directions, site } from "@/content/site";

/**
 * 2 — PLINTH. After the Omega agency template.
 *
 * The one with no chrome. There is not a single card, border, shadow or box on
 * this page: the structure is carried entirely by TONAL BANDS — warm white,
 * recessed warm grey, one inverted near-black — and by type at poster weight.
 * That is the discipline that makes it a different kind of page from the other
 * two rather than a different palette, and it is why the display face is
 * Archivo at 800: on a page with nothing to lean on, the lettering has to
 * carry the whole hierarchy by itself.
 *
 * Two things the user named on the reference:
 *
 * 1. THE PILL NAV. The header leaves the top of the page and contracts into a
 *    floating pill, all properties on one element easing together. It is the
 *    one component on this direction allowed a surface, and it earns it by
 *    being the only thing that overlaps content. See `PillNav.tsx`.
 * 2. THE FIGURES. The reference's key-metrics band, spent on the offer instead
 *    of on results — the user's own call, and the only honest option, because
 *    the business has no results to report yet. Four commitments already made
 *    in words elsewhere on the page, set at the scale a metric gets.
 *
 * The black-and-white illustration is the arcade, drawn large in ink hairlines
 * at the head of the process band. It is the same primitive the other two
 * directions use; here it is the only picture on the page besides the hero
 * slot, so it is given the room to be one.
 */

const d = directions["2"];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

export default function Plinth() {
  return (
    <div className={`motion-settle bg-pli text-pli-ink ${SWITCH_BAR_CLEARANCE}`}>
      <a
        href="#main"
        className="skip-link rounded-full bg-pli-accent px-4 py-2 font-archivo text-[13px] font-bold text-bone"
      >
        Skip to content
      </a>

      <PillNav />

      <main id="main">
        <section id="top" className="relative isolate overflow-hidden">
          {/*
            One warm light behind the words, under everything, in no container.

            Wide and short so it reads as a horizon glow rather than a blob,
            and weaker on a phone — the gradient is sized in per cent of its
            own box, so a figure that is a soft wash across 1440px concentrates
            into a smudge behind the header at 375px. Both widths measured.
          */}
          <div
            aria-hidden
            className="bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62vh] bg-[radial-gradient(115%_38%_at_50%_0%,var(--color-pli-accent)_0%,transparent_68%)] opacity-[0.30] sm:opacity-[0.42]"
          />

          <div className="mx-auto max-w-[76rem] px-5 pt-36 pb-20 text-center sm:px-8 sm:pt-44 sm:pb-24">
            <h1
              className="hero-arrive mx-auto max-w-[15ch] font-archivo text-[clamp(2.9rem,8vw,5.8rem)] leading-[0.94] font-extrabold tracking-[-0.038em] text-balance"
              style={{ ["--arrive-delay" as string]: "0.05s" }}
            >
              <BrokenHeadline lines={d.headlineLines} headline={d.headline} />
            </h1>

            <p
              className="hero-arrive mx-auto mt-8 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.24rem)] leading-relaxed text-pli-ink-soft"
              style={{ ["--arrive-delay" as string]: "0.18s" }}
            >
              {d.subhead}
            </p>

            <div
              className="hero-arrive mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
              style={{ ["--arrive-delay" as string]: "0.3s" }}
            >
              <a
                href="#enquiry"
                className="w-full rounded-full bg-pli-accent px-9 py-4 font-archivo text-[15px] font-bold text-bone transition-colors hover:bg-pli-accent-deep sm:w-auto"
              >
                {site.cta}
              </a>
              <a
                href="#process"
                className="w-full rounded-full bg-pli-2 px-9 py-4 font-archivo text-[15px] font-bold text-pli-ink transition-colors hover:bg-pli-line sm:w-auto"
              >
                {site.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Full bleed, edge to edge: on a page with no containers the
              picture is not going to sit inside one either. */}
          <div className="px-5 pb-20 sm:px-8 sm:pb-28">
            <Reveal>
              <HeroSlot
                w={d.heroSlot.w}
                h={d.heroSlot.h}
                variant="plinth"
                className="mx-auto max-w-[92rem]"
              />
            </Reveal>
          </div>
        </section>

        {/*
          THE FIGURES. The reference's metric band, spent on the offer. Every
          one of the four is a promise the page makes in words somewhere else;
          none is a measurement, and none implies a client the business does
          not have.
        */}
        <section id="offer" className="bg-pli-2">
          <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-24">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
              {site.figures.map((figure) => (
                <Reveal key={figure.label}>
                  <div>
                    <dt className="sr-only">{figure.label}</dt>
                    <dd>
                      <span className="block font-archivo text-[clamp(2.6rem,5vw,3.9rem)] leading-none font-extrabold tracking-[-0.04em] text-pli-accent">
                        {figure.value}
                      </span>
                      <span className="mt-4 block max-w-[22ch] text-[14.5px] leading-snug text-pli-ink-soft">
                        {figure.label}
                      </span>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-pli">
          <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <h2 className="max-w-[18ch] font-archivo text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.038em] text-balance">
                {d.problem.headline}
              </h2>
            </Reveal>
            <Reveal>
              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20">
                <p className="max-w-[62ch] text-[1.08rem] leading-relaxed text-pli-ink-soft">
                  {d.problem.body}
                </p>
                <div>
                  <h3 className="font-archivo text-[1.5rem] font-extrabold tracking-[-0.03em]">
                    {site.offer.headline}
                  </h3>
                  <p className="mt-4 max-w-[62ch] text-[1.08rem] leading-relaxed text-pli-ink-soft">
                    {site.offer.body}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Four services, no boxes. Two columns of large type with a great
            deal of air between them — the space is the container. */}
        <section id="services" className="bg-pli-2">
          <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <h2 className="font-archivo text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.038em]">
                {d.sections.services}
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-20">
              {site.services.map((service) => (
                <Reveal key={service.code}>
                  <div>
                    <h3 className="font-archivo text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-extrabold tracking-[-0.035em]">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-relaxed text-pli-ink-soft">
                      {service.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The black-and-white illustration, at the scale it deserves, over
            the process. Ink hairlines on warm white: the only two-colour thing
            on the page. */}
        <section id="process" className="bg-pli">
          <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
            {/* No height class: the arcade now carries its own aspect, so
                `w-full` fills the band exactly. Given a fixed height instead
                it was letterboxed to a third of the width and sat marooned in
                the middle of the page. Seven bays, because at this width that
                is the arch size that reads as an elevation rather than as a
                logo. */}
            <Reveal>
              <Arcade bays={7} className="w-full text-pli-ink/45" strokeWidth={1} />
            </Reveal>

            <Reveal>
              <h2 className="mt-16 font-archivo text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.038em]">
                {d.sections.process}
              </h2>
            </Reveal>

            <ol className="mt-14 grid gap-12 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
              {site.process.map((step, i) => (
                <li key={step.title}>
                  <Reveal>
                    <span className="block font-archivo text-[2.6rem] leading-none font-extrabold tracking-[-0.04em] text-pli-line">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-archivo text-[1.3rem] font-extrabold tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[42ch] leading-relaxed text-pli-ink-soft">
                      {step.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="bg-pli-2">
          <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
              <Reveal>
                <h2 className="font-archivo text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.038em] text-balance lg:sticky lg:top-32">
                  {d.sections.faq}
                </h2>
              </Reveal>

              {/* Separated by space and weight, never by a rule: this is the
                  direction that has no lines on it. */}
              <div className="flex flex-col gap-2">
                {site.faqs.map((faq) => (
                  <details key={faq.q} className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-4 font-archivo text-[1.15rem] font-bold tracking-[-0.02em] transition-colors hover:text-pli-accent">
                      {faq.q}
                      <DisclosureMark className="mt-0.5 text-[1.4rem] font-normal text-pli-accent" />
                    </summary>
                    <p className="max-w-[66ch] pb-6 leading-relaxed text-pli-ink-soft">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The inverted band. The one moment of drama a page with no chrome
            gets, and it goes on the closing argument. */}
        <section className="relative isolate overflow-hidden bg-pli-3 text-bone">
          <Fluting
            count={70}
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-bone/8"
          />
          <div className="mx-auto max-w-[86rem] px-5 py-24 text-center sm:px-8 sm:py-28">
            <Reveal>
              <h2 className="mx-auto max-w-[20ch] font-archivo text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.038em] text-balance">
                {site.offer.headline}
              </h2>
              <a
                href="#enquiry"
                className="mt-10 inline-block rounded-full bg-pli-accent px-10 py-4 font-archivo text-[15px] font-bold text-bone transition-colors hover:bg-pli-accent-deep"
              >
                {site.cta}
              </a>
            </Reveal>
          </div>
        </section>

        <section id="enquiry" className="bg-pli">
          <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
              <Reveal>
                <div>
                  <h2 className="font-archivo text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.038em] text-balance">
                    {site.form.headline}
                  </h2>
                  <p className="mt-5 max-w-[46ch] leading-relaxed text-pli-ink-soft">
                    {site.form.body}
                  </p>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="mt-8 inline-block font-archivo text-[15px] font-bold text-pli-accent transition-colors hover:text-pli-accent-deep"
                  >
                    {site.contactEmail}
                  </a>
                </div>
              </Reveal>

              <Reveal>
                <EnquiryForm skin={plinthSkin} />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-pli-3 text-bone">
        <div className="mx-auto flex max-w-[86rem] flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-archivo text-[19px] font-extrabold tracking-[-0.03em]">
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
              className="text-bone transition-colors hover:text-pli-accent"
            >
              {site.contactEmail}
            </a>
          </p>
        </div>
      </footer>

      <DirectionSwitch current="2" />
    </div>
  );
}
