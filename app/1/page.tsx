import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arcade, Cornice } from "@/components/Classical";
import { DirectionSwitch, SWITCH_BAR_CLEARANCE } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { DimSection, RailProvider } from "@/components/SectionRail";
import { Solutions } from "@/components/Solutions";
import { meridianSkin } from "@/components/skins";
import { directions, site } from "@/content/site";

/**
 * 1 — MERIDIAN. The chosen direction, consolidated.
 *
 * This started as one of three and is now the one being built: the user picked
 * it, then pulled the parts they wanted from the other two and from the
 * references. What it is made of, and where each piece came from:
 *
 * - THE GROUND is the ultramarine from the build running alongside this one —
 *   the user's own pick, taken across with its recessed band, hairlines and
 *   bone text rather than approximated.
 * - THE ACTION is amber-orange, and it is the one warm object on a cold page.
 *   The user asked for a contrasting accent specifically because the bone
 *   button on the other build sat too close to the body text to read as
 *   pressable.
 * - THE HEADLINE is the user's line, shortened at their request from "Built to
 *   be looked at." It is set in the grotesk, not a serif: they liked the words,
 *   and left the typography to me. A display serif belonged to the classical
 *   world this build replaced.
 * - THE PILL NAV came from PLINTH, widened. The user wanted the pill without
 *   the shrink, so the contraction is small and the transition is carried by
 *   the ends rounding and the blur switching on.
 * - THE GRADIENT came from PLINTH too, rebuilt in two stops so amber and
 *   ultramarine meet at a horizon rather than blending into brown.
 * - THE BODY is the reference's solutions section, built from its own
 *   stylesheet rather than from a screenshot. See `Solutions.tsx`.
 *
 * SHAPE. Actions are pills; structure is square. The nav is a pill and so is
 * every button, because a square control inside a pill bar looks like an
 * oversight. Everything that holds content — the showcase box, its panels, the
 * form fields — keeps radius 0. One rule, and it says which things can be
 * pressed.
 *
 * Numerals appear once, on the process, where the order is the information.
 */

const d = directions["1"];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

export default function Meridian() {
  return (
    <div className={`motion-clear bg-mer text-mer-ink ${SWITCH_BAR_CLEARANCE}`}>
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
            The hero is text and one light. No slot, no picture, nothing beside
            the words — the plate arrives underneath, on the scroll, which is
            what makes leaving the hero a moment rather than an ending.
          */}
          <section id="top" className="relative isolate overflow-hidden">
            <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-0 -z-10" />
            <Arcade
              bays={7}
              className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[54%] w-full text-mer-ink/10"
            />

            <div className="mx-auto flex min-h-svh max-w-[86rem] flex-col justify-center px-5 pt-32 pb-24 sm:px-8 sm:pt-36 sm:pb-28">
              {/* Three words, so it is allowed to be very large — this is the
                  size the line was written for. */}
              <h1
                className="hero-arrive max-w-[11ch] font-schibsted text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance"
                style={{ ["--arrive-delay" as string]: "0.05s" }}
              >
                {d.headline}
              </h1>

              <p
                className="hero-arrive mt-8 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft"
                style={{ ["--arrive-delay" as string]: "0.18s" }}
              >
                {d.subhead}
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
                <a
                  href="#services"
                  className="rounded-full border border-mer-line-strong px-8 py-4 text-center font-schibsted text-[15px] font-semibold text-mer-ink transition-colors hover:border-mer-ink hover:bg-mer-2"
                >
                  {site.ctaSecondary}
                </a>
              </div>
            </div>
          </section>

          {/*
            THE PLATE IS GONE, at the user's instruction — the arcade image
            that sat between the hero and the body, opening from inset to full
            bleed on the scroll.

            Worth knowing what left with it: that box was the reserved slot for
            the hero image being generated separately, at 1600×900. The hero
            now runs straight into the offer, so when that image arrives there
            is no longer a place on this page for it. `heroSlot` stays in the
            content file and `.plate-open` stays in the stylesheet, both unused
            here, so reinstating it is a few lines rather than a rebuild.
          */}
          <DimSection id="offer" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <Reveal>
                <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
                  <h2 className="font-schibsted text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
                    {d.problem.headline}
                  </h2>

                  <div>
                    <p className="max-w-[66ch] text-[1.05rem] leading-relaxed text-mer-ink-soft">
                      {d.problem.body}
                    </p>

                    <Cornice className="mt-12 h-2 w-full text-mer-line" />

                    <h3 className="mt-12 font-schibsted text-[1.6rem] font-semibold tracking-[-0.02em]">
                      {site.offer.headline}
                    </h3>
                    <p className="mt-4 max-w-[66ch] text-[1.05rem] leading-relaxed text-mer-ink-soft">
                      {site.offer.body}
                    </p>
                    <a
                      href="#enquiry"
                      className="mt-9 inline-block border-b border-mer-accent pb-1 font-schibsted text-[15px] font-semibold text-mer-ink transition-colors hover:text-mer-accent"
                    >
                      {site.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </DimSection>

          {/*
            The showcase. Not wrapped in `DimSection`: it is the longest section
            on the page and it runs its own scrollspy, so dimming it as a single
            unit would fight its internal state and fade three screens of
            content at once.
          */}
          <section id="services" className="border-t border-mer-line bg-mer-2">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <Reveal>
                <h2 className="mb-14 font-schibsted text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                  {d.sections.services}
                </h2>
              </Reveal>
              <Solutions items={site.services} />
            </div>
          </section>

          <DimSection id="process" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <Reveal>
                <h2 className="font-schibsted text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                  {d.sections.process}
                </h2>
              </Reveal>

              {/* Numerals are earned here: this is a sequence, and the order is
                  the information. */}
              <ol className="mt-14 grid gap-px bg-mer-line sm:grid-cols-2 xl:grid-cols-4">
                {site.process.map((step, i) => (
                  <li key={step.title} className="bg-mer p-8 sm:p-9">
                    <Reveal>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-mer-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 font-schibsted text-[1.35rem] font-semibold tracking-[-0.02em]">
                        {step.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-mer-ink-soft">
                        {step.body}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </DimSection>

          <DimSection id="faq" className="border-t border-mer-line bg-mer-2">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
                <Reveal>
                  <h2 className="font-schibsted text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance lg:sticky lg:top-32">
                    {d.sections.faq}
                  </h2>
                </Reveal>

                <div>
                  {site.faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group border-t border-mer-line last:border-b"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 font-schibsted text-[1.12rem] font-medium transition-colors hover:text-mer-accent">
                        {faq.q}
                        <DisclosureMark className="mt-0.5 text-[1.4rem] font-normal text-mer-accent" />
                      </summary>
                      <p className="max-w-[68ch] pr-8 pb-7 leading-relaxed text-mer-ink-soft">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </DimSection>

          <DimSection id="enquiry" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
                <Reveal>
                  <div>
                    <h2 className="font-schibsted text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
                      {site.form.headline}
                    </h2>
                    <p className="mt-5 max-w-[46ch] leading-relaxed text-mer-ink-soft">
                      {site.form.body}
                    </p>
                    <a
                      href={`mailto:${site.contactEmail}`}
                      className="mt-8 inline-block border-b border-mer-line-strong pb-1 text-[15px] text-mer-ink-soft transition-colors hover:border-mer-accent hover:text-mer-ink"
                    >
                      {site.contactEmail}
                    </a>
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

      <footer className="border-t border-mer-line bg-mer-3">
        <div className="mx-auto flex max-w-[86rem] flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-schibsted text-[18px] font-semibold tracking-[-0.02em]">
              Pulito
            </span>
            <p className="mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-mer-ink-soft">
              {site.footer.line}
            </p>
          </div>
          <p className="text-[14.5px] text-mer-ink-soft">
            {site.location} ·{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-mer-ink transition-colors hover:text-mer-accent"
            >
              {site.contactEmail}
            </a>
          </p>
        </div>
      </footer>

      <DirectionSwitch current="1" />
    </div>
  );
}
