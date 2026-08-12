import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { Hero } from "@/components/hero/Hero";
import { MarbleField } from "@/components/hero/MarbleField";
import type { HeroMotion } from "@/components/hero/motions";
import { DirectionContract } from "@/components/DirectionContract";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DisclosureMark } from "@/components/Disclosure";
import { formSkin } from "@/components/skins";

const CONTRACT = `
PULITO DIGITAL
THESIS: An excavation, not a brochure. Premium craft is sold the way a museum shows worked stone. Refuses the agency page that leads with services, and the local-trades page that leads with a suburb.
OWN-WORLD: Near-black ground, bone, burgundy. A generated rosso marble slab under the first viewport with a Solomonic marble column standing on it and the Cinzel capitals running behind the shaft. Below the slab the burgundy is the accent and gold survives only as hairlines. 2px structural rules, mono field labels, a fixed grain layer. No cards, no shadows, radius zero.
STORY: The visitor recognises his own standard in the stone, reads four services as carved slabs, sees a process that removes the risk, and books a free preview of his own homepage.
FIRST VIEWPORT: A burgundy marble field that answers the cursor, a spiral column standing through the centre of the headline, three lines of capitals passing behind it, a gilt hairline over the subhead, action bottom left.
FORM: Excavated maximalism. Chosen by the user from a three-direction spread; brief-pinned aesthetic, no concept roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

/**
 * The whole site. Parameterised only by which of the three hero motions runs,
 * so /, /motion/sheen, /motion/parallax and /motion/live are genuinely the
 * same page and the comparison isolates the one thing being compared.
 */
export function PulitoPage({ heroMode }: { heroMode: HeroMotion }) {
  return (
    <div className="min-h-dvh overflow-x-clip bg-surface text-fg">
      <DirectionContract contract={CONTRACT} />

      {/* Marble tooth over the whole surface. Fixed and inert, never on a
          scrolling container. */}
      <div
        aria-hidden
        className="grain-layer pointer-events-none fixed inset-0 z-[60] opacity-[0.055] mix-blend-screen"
      />

      {/* ---------------------------------------------------------------- nav */}
      <header className="sticky top-0 z-50 border-b-2 border-line bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-8">
          <a
            href="#top"
            className="font-display text-[19px] tracking-[0.22em] text-fg uppercase"
          >
            Pulito
          </a>

          <p className="hidden font-mono text-[10px] tracking-[0.26em] text-fg-muted uppercase lg:block">
            {site.location} &nbsp;/&nbsp; {site.disciplines}
          </p>

          <a
            href="#enquiry"
            className="border border-gild bg-accent-deep px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-fg uppercase transition-colors hover:bg-fg hover:text-accent-deep md:px-5"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- hero */}
        <Hero mode={heroMode} />

        {/* ----------------------------------------------------------- ticker */}
        {/* The one marquee on the page. It carries the service names so the
            offer is legible before the reader reaches the slabs. */}
        <Marquee
          items={site.services.map((s) => s.title)}
          className="border-y-2 border-line bg-surface-2 py-5"
          itemClassName="font-display text-[1.15rem] tracking-[0.2em] uppercase text-fg-muted md:text-[1.5rem]"
          separatorClassName="text-accent"
        />

        {/* ---------------------------------------------------------- problem */}
        <section className="relative border-b-2 border-line px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="max-w-[22ch] font-display text-[1.7rem] leading-[1.08] text-fg uppercase md:text-[2.8rem]">
                  {site.problem.headline}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                {/* Gilt hairlines are the page's rule grammar now: gold survives
                    here and nowhere else. */}
                <div aria-hidden className="mt-10 h-px w-full max-w-[380px] bg-gild md:mt-12" />
                <p className="mt-8 max-w-[62ch] font-sans text-[1.0625rem] leading-[1.9] text-fg-muted md:text-lg">
                  {site.problem.body}
                </p>
              </Reveal>
            </div>

            {/* Weathered carving opposite the claim: the work outlasts the
                thing that was meant to represent it. */}
            <Reveal delay={0.14} className="lg:col-span-4">
              {/* The plates are printed in the burgundy rather than in grey:
                  below the slab the accent survives as the colour the stone
                  is reproduced in. A greyscale image plus a colour-blend
                  overlay is a duotone — it keeps the carving's full tonal
                  range instead of flattening it to a tint. */}
              <figure className="feather-plate relative isolate h-full min-h-[280px] w-full">
                <Image
                  src="/img/relief-rider.jpg"
                  alt="Weathered Greek marble relief fragment carved with a horse and rider"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover grayscale contrast-[1.05] brightness-[1.45]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-accent-deep mix-blend-multiply"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- services */}
        <section id="services" className="border-b-2 border-line px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <h2 className="max-w-[20ch] font-display text-[1.7rem] leading-[1.1] text-fg uppercase md:text-[2.6rem]">
                {site.sections.services}
              </h2>
            </Reveal>

            {/* Carved slabs, not cards. Each service is a full-bleed band with
                its title set at architectural scale and the description hung
                to the right; the bands are separated by cut lines, and the
                type steps down through the set instead of repeating. */}
            <div className="mt-16 border-t-2 border-line-strong">
              {site.services.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.04}>
                  {/* Stepped, not columnar: the title runs the full width and
                      the description is inset beneath it. Variant two already
                      owns the title-left / body-right catalogue row, and the
                      two dark variants must not share one composition. */}
                  <article className="group border-b-2 border-line py-10 md:py-14">
                    <h3
                      className={`font-display leading-[0.92] text-fg uppercase transition-colors group-hover:text-accent ${
                        i === 0
                          ? "text-[2.1rem] md:text-[4rem]"
                          : "text-[1.7rem] md:text-[3rem]"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-6 max-w-[54ch] font-sans leading-[1.8] text-fg-muted md:mt-8 md:ml-[38%]">
                      {service.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Carved acanthus runs the full width beneath the slabs as a
                frieze. Cropped low: the source is an archival plate with
                annotations along its top edge. */}
            <Reveal delay={0.1} className="mt-16">
              <figure className="relative isolate aspect-[16/5] w-full overflow-hidden md:aspect-[21/6]">
                <Image
                  src="/img/capital-acanthus.jpg"
                  alt="Marble pilaster capital carved with acanthus leaves and volutes"
                  fill
                  sizes="100vw"
                  className="object-cover object-[center_62%] grayscale contrast-[1.05] brightness-[1.4]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-accent-deep mix-blend-multiply"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------- process */}
        <section id="process" className="border-b-2 border-line px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <h2 className="font-display text-[1.7rem] leading-[1.1] text-fg uppercase md:text-[2.6rem]">
                {site.sections.process}
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-px bg-line md:grid-cols-2">
              {site.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05} className="bg-surface">
                  <div className="h-full p-8 md:p-11">
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-[2.4rem] leading-none text-accent md:text-[3.2rem]">
                        {String(i + 1)}
                      </span>
                      <h3 className="font-display text-[1.3rem] text-fg uppercase md:text-[1.55rem]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-6 max-w-[52ch] font-sans leading-[1.8] text-fg-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ offer */}
        <section id="work" className="relative isolate overflow-hidden border-b-2 border-line">
          {/* The slab returns, once, at the conversion point. It is the same
              stone as the first viewport on a different seed, which is the
              only place below the hero the material itself appears — a dark
              museum photograph here read as a grey dead zone however far it
              was lifted. The scrim is weighted left, behind the copy, and
              lifts off to the right where the veining is. */}
          <div aria-hidden className="absolute inset-0 -z-20">
            <MarbleField seed={41} />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-surface/70 md:bg-gradient-to-r md:from-surface md:via-surface/78 md:via-45% md:to-transparent"
          />

          <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-8 md:py-44">
            <Reveal>
              <h2 className="max-w-[15ch] font-display text-[2rem] leading-[1.05] text-fg uppercase md:text-[3.6rem]">
                {site.offer.headline}
              </h2>
              <div aria-hidden className="mt-9 h-px w-full max-w-[420px] bg-gild" />
              <p className="mt-9 max-w-[56ch] font-sans text-[1.0625rem] leading-[1.9] text-fg-muted md:text-lg">
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                className="mt-11 inline-block border border-gild bg-accent-deep px-9 py-4 font-display text-[14px] tracking-[0.22em] whitespace-nowrap text-fg uppercase transition-colors hover:bg-fg hover:text-accent-deep"
              >
                {site.cta}
              </a>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section className="border-b-2 border-line px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <h2 className="font-display text-[1.7rem] leading-[1.1] text-fg uppercase md:text-[2.6rem]">
                {site.sections.faq}
              </h2>
            </Reveal>

            <div className="mt-12">
              {site.faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.03}>
                  <details className="group border-t-2 border-line last:border-b-2">
                    <summary className="flex cursor-pointer list-none items-baseline gap-6 py-6 [&::-webkit-details-marker]:hidden md:gap-10">
                      {/* Mixed case: these are long sentences, and Cinzel caps
                          measurably slow them down. */}
                      <span className="flex-1 font-display text-[1.15rem] leading-snug text-fg md:text-[1.5rem]">
                        {faq.q}
                      </span>
                      <DisclosureMark className="size-5 text-accent" />
                    </summary>
                    <p className="max-w-[66ch] pb-8 font-sans leading-[1.85] text-fg-muted md:pl-[8%]">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- enquiry */}
        <section id="enquiry" className="px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <h2 className="font-display text-[2rem] leading-[1.05] text-fg uppercase md:text-[2.9rem]">
                {site.form.headline}
              </h2>
              <div aria-hidden className="mt-8 h-px w-full max-w-[340px] bg-gild" />
              <p className="mt-8 max-w-[42ch] font-sans text-[1.0625rem] leading-[1.85] text-fg-muted">
                {site.form.body}
              </p>
              <p className="mt-9 font-mono text-[13px] text-fg-muted">
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-fg transition-colors hover:text-accent"
                >
                  {site.contactEmail}
                </a>
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="border-2 border-line bg-surface-2 p-6 md:p-10">
                <EnquiryForm skin={formSkin} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-line px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[18px] tracking-[0.22em] text-fg uppercase">
              Pulito
            </p>
            <p className="mt-3 max-w-[44ch] font-sans text-sm leading-relaxed text-fg-muted">
              {site.footer.line}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 font-mono text-[13px] md:items-end">
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-fg transition-colors hover:text-accent"
            >
              {site.contactEmail}
            </a>
            <p className="text-fg-muted">{site.location}</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-[1440px] font-mono text-[10px] tracking-[0.14em] text-fg-muted uppercase">
          Imagery: Getty Museum and the Metropolitan Museum of Art, public domain
        </p>
      </footer>

      
    </div>
  );
}
