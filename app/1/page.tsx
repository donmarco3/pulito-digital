import type { Metadata } from "next";
import Image from "next/image";
import { FontSwitch } from "@/components/FontSwitch";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Cornice } from "@/components/Classical";
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
 * - THE ACTION is VERDIGRIS, chosen after two rounds of review. It was bone,
 *   which was right while the page was monochrome and the action separated
 *   itself by fill rather than by hue — and wrong the moment the hero gained a
 *   pale travertine arcade it measured 1.09:1 against. The warm metals were
 *   tried first and rejected: a metal needs a specular highlight to read as
 *   metal, and a flat fill has none. Reasoning in full in `globals.css`.
 * - THE HEADLINE is the user's line, shortened at their request from "Built to
 *   be looked at." One word of it — "seen" — is set in the accent, which only
 *   says anything now that the accent is a hue. Which word comes from
 *   `content/site.ts` so the copy stays one editable string.
 * - THE DISPLAY FACE is UNDER REVIEW. It was Schibsted Grotesk on the argument
 *   that a display serif belonged to the classical world this build replaced.
 *   The user has since seen the serif on the other build and wants it here, so
 *   `FontSwitch` is on the page while five faces are compared. It moves
 *   HEADINGS only — controls, nav and running text stay where they are.
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

/*
  Split the headline around the one word that takes the accent.

  Written to degrade rather than to assume: if `headlineAccent` is ever edited
  to a word the headline no longer contains, this returns the line whole and
  unaccented instead of rendering a highlighted fragment that is not in the
  copy. `indexOf` rather than `split` for the same reason — a word that occurs
  twice would otherwise scatter the emphasis across both.
*/
function splitHeadline(line: string, word: string) {
  const at = line.indexOf(word);
  if (!word || at === -1) return { before: line, accent: "", after: "" };
  return {
    before: line.slice(0, at),
    accent: word,
    after: line.slice(at + word.length),
  };
}

export default function Meridian() {
  const headline = splitHeadline(d.headline, d.headlineAccent);

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
            The hero is text and one picture, and the picture is weather.

            An arcade of Roman arches climbing left to right out of a cloud
            bank, under a raking cornice. The size ramp is the argument — small
            and quiet under the headline, colossal by the right edge — and it is
            drawn rather than photographed on purpose. The earlier photoreal
            versions were beautiful and ate the type alive; at this scale the
            hero's job is atmosphere, and the headline and the action are what
            the reader is supposed to see.

            It replaces the drawn `<Arcade>` — uniform bays, pinned to the
            bottom, saying nothing.

            THE PICTURE FILLS THE SECTION. It was a band across the bottom
            first, and that was wrong: a 16:9 frame inside a 3:1 box has to
            lose about 42% off its top, the deck leaves the picture near the
            top of its right edge, and a 1920-wide screen therefore showed a
            row of decapitated arches with the cornice gone entirely. No amount
            of fading that boundary fixes a crop that is eating the subject.

            The file carries the fix rather than the CSS. `hero-arcade.webp` is
            2560 x 2060: the generated frame is the bottom 1434px, and the
            626px above it is the picture's own top row repeated upward. The
            sky there is flat by design — that is what removing the corner
            light produced — so the extension is seamless. `object-cover`
            anchored to the bottom now trims that spare sky instead of the
            arcade, on every viewport up to about 2:1.

            Beyond 2:1 — a 21:9 ultrawide — the content is taller than the
            viewport once it is scaled to full width, and the top of the arcade
            starts to go again. No amount of added sky helps, because sky and
            content scale together. Fixing that needs a wider render, not a
            taller one.
          */}
          <section
            id="top"
            className="relative isolate overflow-hidden bg-mer-sky"
          >
            {/*
              `quality` and the version in the filename are both scar tissue.

              Next's optimizer caches its variants against the source URL, so
              replacing a file in place kept serving the old 1376-wide render
              from `.next/cache/images` — the picture looked soft for a whole
              round of review while the source on disk was already 2560. The
              version is in the name so that cannot happen again silently.

              Quality is 90 rather than the default 75 because this frame is
              almost entirely smooth gradient, which is the one thing lossy
              encoders band, and Next 16 ignores any value not declared in
              `images.qualities`. 75 is a sensible default for photographs and
              the wrong default for a sky.

              THERE IS NO LEFT FALLOFF ANY MORE, and its deletion is the point
              of this image rather than a side effect.

              The previous frame lit the arcade in pale travertine, which
              measured 1.25:1 against the headline inside the text block — the
              picture and the type were the same brightness. A CSS gradient was
              laid over the left to fix it, and that was a compromise: the left
              was dark because a sheet was on top of it, not because the scene
              was dark there.

              This frame inverts past the halfway point. The arches are DARKER
              than the sky, so they read as structure in silhouette, and the
              cloud is pulled right and thinned off the left edge. The brightest
              pixel inside the text block is now #25438b — 8.25:1 against the
              headline and 5.48:1 against the subhead. The picture supplies its
              own shadow, so the page no longer has to fake one.
            */}
            <Image
              src="/img/hero-arcade-silhouette-2k.webp"
              alt=""
              aria-hidden
              width={2560}
              height={2060}
              quality={90}
              priority
              sizes="100vw"
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-contain object-bottom lg:object-cover lg:object-bottom"
            />
            {/*
              Back by request: the soft light behind the nav. It was removed
              when the corner hotspot came out of the picture, on the reasoning
              that two light sources fight — but the thing being asked for is
              furniture for the header, not weather, so it is narrow, high, and
              sits above the picture rather than inside it.
            */}
            <div className="mer-bloom bloom-breathe pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46vh]" />
            {/* The section ends mid-cloud. This resolves it into the page
                ground instead of cutting the weather off with a straight
                edge. */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[13%] bg-[linear-gradient(to_bottom,transparent,var(--color-mer))] sm:h-[17%] lg:h-[24%]"
            />

            <div className="mx-auto flex min-h-svh max-w-[86rem] flex-col justify-center px-5 pt-32 pb-24 sm:px-8 sm:pt-36 sm:pb-28">
              {/*
                Three words, so it is allowed to be very large — this is the
                size the line was written for.

                One of those words carries the accent. It is a `<span>` and not
                an `<em>` or a `<strong>`: the emphasis is decorative, and a
                screen reader announcing stress on "seen" would be inventing a
                reading of the line that the page does not intend. Which word
                it is comes from `content/site.ts`, so the copy stays one
                editable string.

                At this size the accent is LARGE TEXT under WCAG, so it needs
                3:1 rather than 4.5:1. Verdigris measures 4.75:1 on this
                ground, so it clears the stricter bar anyway.
              */}
              <h1
                className="hero-arrive max-w-[11ch] display-face text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.94] tracking-[-0.04em] text-balance"
                style={{ ["--arrive-delay" as string]: "0.05s" }}
              >
                {headline.before}
                <span className="text-mer-accent">{headline.accent}</span>
                {headline.after}
              </h1>

              {/* 58ch on a wide screen ran the subhead out across the lit
                  stone. The measure is now cut to sit inside the clear triangle
                  above the cornice — which is also a better measure for reading
                  than 58ch was. */}
              <p
                className="hero-arrive mt-8 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft lg:max-w-[40ch]"
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
                  <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance">
                    {d.problem.headline}
                  </h2>

                  <div>
                    <p className="max-w-[66ch] text-[1.05rem] leading-relaxed text-mer-ink-soft">
                      {d.problem.body}
                    </p>

                    <Cornice className="mt-12 h-2 w-full text-mer-line" />

                    <h3 className="mt-12 display-face text-[1.6rem] tracking-[-0.02em]">
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
                <h2 className="mb-14 display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em]">
                  {d.sections.services}
                </h2>
              </Reveal>
              <Solutions items={site.services} />
            </div>
          </section>

          <DimSection id="process" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <Reveal>
                <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em]">
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
                      <h3 className="mt-5 display-face text-[1.35rem] tracking-[-0.02em]">
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
                  <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance lg:sticky lg:top-32">
                    {d.sections.faq}
                  </h2>
                </Reveal>

                <div>
                  {site.faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group border-t border-mer-line last:border-b"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 display-face text-[1.12rem] font-medium transition-colors hover:text-mer-accent">
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
                    <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance">
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

      {/*
        Review scaffolding for the heading face, gated on NODE_ENV rather than
        hidden with CSS: in a production build this branch is dead and the
        panel is absent from the rendered HTML — checked against a real
        `next build`, not assumed.

        It does NOT keep the module out of the client bundle, which an earlier
        version of this comment claimed. Importing a `"use client"` component
        puts it in the client graph regardless of the condition. See the note in
        `FontSwitch.tsx`.

        It comes out in the same commit that writes the chosen face into
        `globals.css`, along with the four losing faces in `layout.tsx`.
      */}
      {process.env.NODE_ENV === "development" ? <FontSwitch /> : null}

    </div>
  );
}
