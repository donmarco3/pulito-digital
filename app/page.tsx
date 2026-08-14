import Image from "next/image";
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
import { splitHeadline } from "@/lib/headline";

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
 * - THE ACTION is BONE, and the page is monochrome: the action separates
 *   itself by FILL rather than by hue. It was verdigris for one round, which
 *   was the right answer while the hero was a pale travertine arcade that bone
 *   measured 1.09:1 against; the hero is a dark silhouette now and the
 *   condition is gone. Full history in `globals.css`.
 * - THE HEADLINE is the user's line, shortened at their request from "Built to
 *   be looked at." It runs UNBROKEN — the accent word left with verdigris,
 *   because bone lettering beside bone lettering marks nothing. The mechanism
 *   is intact in `content/site.ts` if a hue ever comes back.
 * - THE DISPLAY FACE is LIBRE CASLON DISPLAY, chosen by the owner from a
 *   six-way review on this hero (five serifs against the incumbent grotesk,
 *   flicked live with `FontSwitch`, now deleted). Headings only — controls,
 *   nav and running text stay on the grotesk.
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

export default function Home() {
  const headline = splitHeadline(meridian.headline, meridian.headlineAccent);

  return (
    <div className="motion-clear bg-mer text-mer-ink">
      <a
        href="#main"
        className="skip-link pill t-control bg-mer-accent px-4 py-2 text-mer-3"
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

            {/*
              The hero block's placement is entirely token-driven — height,
              which end of the section it hangs from, which edge it aligns to,
              its padding and its indent. It is the one composition on the site
              worth being able to move without editing, so the tweak bar's
              Placement group drives these five properties directly.
            */}
            <div
              className="shell flex flex-col"
              style={{
                minHeight: "var(--hero-min-h)",
                justifyContent: "var(--hero-place)",
                alignItems: "var(--hero-items)",
                paddingTop: "var(--hero-pad-top)",
                paddingBottom: "var(--hero-pad-bottom)",
                /* Handed to `shell`, which folds it into its own responsive
                   padding — see the note there for why this must not be a
                   margin. */
                ["--shell-indent" as string]: "var(--hero-indent)",
                /*
                  The hero runs NARROWER than the rest of the site — 79.5rem
                  against the standard 86rem. `shell` reads `--shell`, so
                  overriding it here narrows this one column without touching
                  the fifteen others.

                  It is the room the picture needs. Every other band on the
                  site is type on a flat ground and wants the full measure;
                  this one is type over an arcade, and pulling the column in
                  keeps the headline off the arches instead of running the
                  subhead across them.
                */
                ["--shell" as string]: "79.5rem",
              }}
            >
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
                className="hero-arrive t-h1 max-w-[11ch] text-balance"
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
                className="hero-arrive t-lead mt-8 text-mer-ink-soft lg:max-w-[40ch]"
                style={{
                  ["--arrive-delay" as string]: "0.18s",
                  ["--measure" as string]: "52ch",
                }}
              >
                {meridian.subhead}
              </p>

              <div
                className="hero-arrive mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                style={{ ["--arrive-delay" as string]: "0.3s" }}
              >
                {/*
                  ONE action in the hero, not two.

                  The outlined "See how it works" went at the owner's call, and
                  the reason it can go is that it was never the page's job: the
                  showcase is the next thing under the fold, so the reader
                  scrolls into it whether or not a button points there. What is
                  left is the only thing the page actually wants pressed.

                  `site.ctaSecondary` still has consumers — the service pages
                  keep both actions, where the second one goes somewhere a
                  scroll does not.
                */}
                <a
                  href="#enquiry"
                  className="pill t-control bg-mer-accent px-8 py-4 text-center text-mer-3 transition-colors hover:bg-mer-accent-deep"
                >
                  {site.cta}
                </a>
              </div>
            </div>
          </section>

          <DimSection id="offer" className="border-t border-mer-line">
            <div className="shell band">
              <Reveal>
                <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
                  <h2 className="t-h2 text-balance">
                    {meridian.problem.headline}
                  </h2>

                  <div>
                    <p className="t-body text-mer-ink-soft">
                      {meridian.problem.body}
                    </p>

                    <Cornice className="mt-12 h-2 w-full text-mer-line" />

                    <h3 className="t-h3 mt-12">{site.offer.headline}</h3>
                    <p className="t-body mt-4 text-mer-ink-soft">
                      {site.offer.body}
                    </p>
                    <a
                      href="#enquiry"
                      className="t-control mt-9 inline-block border-b border-mer-accent pb-1 text-mer-ink transition-colors hover:text-mer-accent"
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
            <div className="shell band">
              <Reveal>
                <h2 className="t-h2 mb-14">{meridian.sections.services}</h2>
              </Reveal>
              <Solutions items={site.services} />
            </div>
          </section>

          <DimSection id="process" className="border-t border-mer-line">
            <div className="shell band">
              <Reveal>
                <h2 className="t-h2">{meridian.sections.process}</h2>
              </Reveal>

              {/* Numerals are earned here: this is a sequence, and the order is
                  the information. */}
              <ol className="mt-14 grid gap-px bg-mer-line sm:grid-cols-2 xl:grid-cols-4">
                {site.process.map((step, i) => (
                  <li key={step.title} className="bg-mer p-8 sm:p-9">
                    <Reveal>
                      <span
                        className="t-label text-mer-accent"
                        style={{
                          ["--label-size" as string]: "11px",
                          ["--label-track" as string]: "0.2em",
                          ["--label-case" as string]: "none",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="t-h3 mt-5"
                        style={{ ["--h3-max" as string]: "1.35rem" }}
                      >
                        {step.title}
                      </h3>
                      <p className="t-body mt-3 text-mer-ink-soft">
                        {step.body}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </DimSection>

          <DimSection id="faq" className="border-t border-mer-line bg-mer-2">
            <div className="shell band">
              <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
                <Reveal>
                  <h2 className="t-h2 text-balance lg:sticky lg:top-32">
                    {meridian.sections.faq}
                  </h2>
                </Reveal>

                <div>
                  {site.faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group border-t border-mer-line last:border-b"
                    >
                      <summary
                        className="t-h3 flex cursor-pointer list-none items-start justify-between gap-8 py-6 transition-colors hover:text-mer-accent"
                        style={{ ["--h3-max" as string]: "1.12rem" }}
                      >
                        {faq.q}
                        <DisclosureMark className="mt-0.5 text-[1.4rem] font-normal text-mer-accent" />
                      </summary>
                      <p
                        className="t-body pr-8 pb-7 text-mer-ink-soft"
                        style={{ ["--measure" as string]: "68ch" }}
                      >
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
            <div className="shell band">
              <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <Reveal>
                  <div>
                    <h2 className="t-h2 text-balance">{site.form.headline}</h2>
                    <p
                      className="t-body mt-5 text-mer-ink-soft"
                      style={{ ["--measure" as string]: "52ch" }}
                    >
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
                        <dt className="t-label text-mer-ink-soft">
                          {meridian.contactLabels.email}
                        </dt>
                        <dd>
                          <a
                            href={`mailto:${site.contactEmail}`}
                            className="t-body border-b border-mer-line-strong pb-0.5 text-mer-ink transition-colors hover:border-mer-accent"
                            style={{ ["--body-size" as string]: "15px" }}
                          >
                            {site.contactEmail}
                          </a>
                        </dd>
                      </div>

                      <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-mer-line py-4 sm:grid-cols-[7rem_1fr]">
                        <dt className="t-label text-mer-ink-soft">
                          {meridian.contactLabels.location}
                        </dt>
                        <dd
                          className="t-body text-mer-ink"
                          style={{ ["--body-size" as string]: "15px" }}
                        >
                          {site.location}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="bg-mer p-7 sm:p-10">
                    <EnquiryForm skin={meridianSkin} />
                  </div>
                </Reveal>
              </div>
            </div>
          </DimSection>
        </main>
      </RailProvider>

      <SiteFooter />
    </div>
  );
}
