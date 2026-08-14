import Image from "next/image";
import { FontSwitch } from "@/components/FontSwitch";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Cornice } from "@/components/Classical";
import { DisclosureMark } from "@/components/Disclosure";
import { MeridianNav } from "@/components/MeridianNav";
import { Reveal } from "@/components/Reveal";
import { DimSection, RailProvider } from "@/components/SectionRail";
import { SiteFooter } from "@/components/SiteFooter";
import { Solutions } from "@/components/Solutions";
import { meridianSkin } from "@/components/skins";
import { meridian, site } from "@/content/site";

/**
 * The landing page — MERIDIAN, the direction that won the three-way
 * comparison and moved here from /1 when the comparison closed.
 *
 * It KEEPS THE FULL PITCH by the user's decision: a cold visitor can read
 * everything and enquire without clicking further. The inner pages add depth
 * rather than taking content away — the showcase panels link into the
 * service pages, and the nav carries Process and About.
 *
 * What it is made of, and where each piece came from:
 *
 * - THE GROUND is the ultramarine from the build running alongside this one —
 *   the user's own pick, taken across with its recessed band, hairlines and
 *   bone text rather than approximated.
 * - THE ACTION is VERDIGRIS, chosen after two rounds of review. It was bone,
 *   which was right while the page was monochrome and the action separated
 *   itself by fill rather than by hue — and wrong the moment the hero gained a
 *   pale travertine arcade it measured 1.09:1 against. Reasoning in full in
 *   `globals.css`.
 * - THE HEADLINE is the user's line, shortened at their request from "Built to
 *   be looked at." One word of it — "seen" — is set in the accent. Which word
 *   comes from `content/site.ts` so the copy stays one editable string.
 * - THE DISPLAY FACE is UNDER REVIEW. `FontSwitch` is on the page in
 *   development while five serifs are compared against the incumbent grotesk.
 *   It moves HEADINGS only — controls, nav and running text stay where they
 *   are.
 * - THE PILL NAV came from PLINTH, widened, and has since grown the site's
 *   page navigation. See `MeridianNav.tsx`.
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

export default function Home() {
  const headline = splitHeadline(meridian.headline, meridian.headlineAccent);

  return (
    <div className="motion-clear bg-mer text-mer-ink">
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

            THE PICTURE FILLS THE SECTION. It was a band across the bottom
            first, and that was wrong: a 16:9 frame inside a 3:1 box has to
            lose about 42% off its top, the deck leaves the picture near the
            top of its right edge, and a 1920-wide screen therefore showed a
            row of decapitated arches with the cornice gone entirely.

            The file carries the fix rather than the CSS. `hero-arcade…webp` is
            2560 x 2060: the generated frame is the bottom 1434px, and the
            626px above it is the picture's own top row repeated upward. The
            sky there is flat by design, so the extension is seamless.
            `object-cover` anchored to the bottom trims that spare sky instead
            of the arcade, on every viewport up to about 2:1.

            Beyond 2:1 — a 21:9 ultrawide — the content is taller than the
            viewport once it is scaled to full width, and the top of the arcade
            starts to go again. Fixing that needs a wider render, not a taller
            one.
          */}
          <section
            id="top"
            className="relative isolate overflow-hidden bg-mer-sky"
          >
            {/*
              `quality` and the version in the filename are both scar tissue.

              Next's optimizer caches its variants against the source URL, so
              replacing a file in place kept serving the old 1376-wide render
              from `.next/cache/images`. The version is in the name so that
              cannot happen again silently.

              Quality is 90 rather than the default 75 because this frame is
              almost entirely smooth gradient, which is the one thing lossy
              encoders band, and Next 16 ignores any value not declared in
              `images.qualities`.

              THERE IS NO LEFT FALLOFF ANY MORE, and its deletion is the point
              of this image rather than a side effect: the frame inverts past
              the halfway point, the arches darker than the sky, the cloud
              pulled right. The brightest pixel inside the text block is
              #25438b — 8.25:1 against the headline and 5.48:1 against the
              subhead. The picture supplies its own shadow, so the page no
              longer has to fake one.
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
              The soft light behind the nav — header furniture, not weather:
              white rather than warm, and capped to the top 46vh so it stays
              behind the nav instead of spreading across the arcade.
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
                reading of the line that the page does not intend.

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

              {/* 58ch on a wide screen ran the subhead out across the stone.
                  The measure sits inside the clear triangle above the
                  cornice — which is also a better measure for reading. */}
              <p
                className="hero-arrive mt-8 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.24rem)] leading-relaxed text-mer-ink-soft lg:max-w-[40ch]"
                style={{ ["--arrive-delay" as string]: "0.18s" }}
              >
                {meridian.subhead}
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

          <DimSection id="offer" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <Reveal>
                <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
                  <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance">
                    {meridian.problem.headline}
                  </h2>

                  <div>
                    <p className="max-w-[66ch] text-[1.05rem] leading-relaxed text-mer-ink-soft">
                      {meridian.problem.body}
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
                  {meridian.sections.services}
                </h2>
              </Reveal>
              <Solutions items={site.services} />
            </div>
          </section>

          <DimSection id="process" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <Reveal>
                <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em]">
                  {meridian.sections.process}
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
                    {meridian.sections.faq}
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

          {/*
            The pitch takes 1.35fr and the form 1fr: four stacked fields do not
            want a wide column, and the room belongs to the side with something
            to say.

            THE PANEL STAYS. `--color-mer-2` is defined as the ground of "the
            showcase, the enquiry panel", and the fields are measured against
            it: the skin's borders clear 4.8:1 on `mer-line-strong`, and the
            error rose reads 8.8:1 on this panel specifically.

            Square corners, because the rule is that actions are pills and
            structure is square. The one pill in this section is the submit
            control, and it should stay the only one.
          */}
          <DimSection id="enquiry" className="border-t border-mer-line">
            <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
              <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <Reveal>
                  <div>
                    <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance">
                      {site.form.headline}
                    </h2>
                    <p className="mt-5 max-w-[52ch] leading-relaxed text-mer-ink-soft">
                      {site.form.body}
                    </p>

                    {/*
                      A description list, the build's standing shape for
                      label/value pairs. Ruled rows, because MERIDIAN's
                      structure is hairline rules between everything. No
                      icons: a drawn envelope would only repeat in another
                      language what the label beside it already says.

                      TWO rows, not three. The phone row left when the owner
                      confirmed the business publishes an email address and
                      nothing else — a placeholder number that looks live
                      invites the one tap this audience is most likely to
                      make, on the device it fails on.
                    */}
                    <dl className="mt-10 border-t border-mer-line lg:mt-12">
                      <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-mer-line py-4 sm:grid-cols-[7rem_1fr]">
                        <dt className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
                          {meridian.contactLabels.email}
                        </dt>
                        <dd>
                          <a
                            href={`mailto:${site.contactEmail}`}
                            className="border-b border-mer-line-strong pb-0.5 text-[15px] text-mer-ink transition-colors hover:border-mer-accent"
                          >
                            {site.contactEmail}
                          </a>
                        </dd>
                      </div>

                      <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-mer-line py-4 sm:grid-cols-[7rem_1fr]">
                        <dt className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
                          {meridian.contactLabels.location}
                        </dt>
                        <dd className="text-[15px] text-mer-ink">{site.location}</dd>
                      </div>
                    </dl>
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

      <SiteFooter />

      {/*
        Review scaffolding for the heading face, gated on NODE_ENV rather than
        hidden with CSS: in a production build this branch is dead and the
        panel is absent from the rendered HTML — checked against a real
        `next build`, not assumed.

        It comes out in the same commit that writes the chosen face into
        `globals.css`, along with the four losing faces in `layout.tsx`.
      */}
      {process.env.NODE_ENV === "development" ? <FontSwitch /> : null}
    </div>
  );
}
