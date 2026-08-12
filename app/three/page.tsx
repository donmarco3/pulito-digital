import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { VariantSwitcher } from "@/components/VariantSwitcher";
import { DirectionContract } from "@/components/DirectionContract";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DisclosureMark } from "@/components/Disclosure";
import { skinThree } from "@/components/skins";

const CONTRACT = `
PULITO VARIANT III - PORPHYRY
THESIS: An excavation, not a brochure. The page is a dig site of oversized inscription, marble fragments and imperial porphyry. Refuses both the polite plate book of variant I and the tasteful catalogue of variant II.
OWN-WORLD: Obsidian ground, imperial porphyry red, Cinzel Roman capitals at architectural scale bleeding off the canvas, marble fragments knocked back to luminosity, 2px structural borders, mono field labels, a fixed grain layer.
STORY: The visitor is hit by the scale of the claim, reads four services as carved slabs, sees a process that de-risks the job, and books a free preview.
FIRST VIEWPORT: Full-height stack of Roman capitals overrunning the right edge, a marble portrait behind the type at 55 percent, porphyry rule and action bottom left, running header of mono metadata.
FORM: Excavated maximalism, the loud end of the three-variant spread. Brief-pinned direction, no concept roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function VariantThree() {
  return (
    <div data-v="three" className="min-h-dvh overflow-x-clip bg-surface text-fg">
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
            className="border-2 border-accent bg-accent px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-accent-fg uppercase transition-colors hover:bg-transparent hover:text-accent md:px-5"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- hero */}
        {/* Capped as well as viewport-relative: an uncapped 100dvh hero
            expands to fill whatever height an embedding frame gives it, which
            turned this page into one enormous hero inside the compare view. */}
        <section className="relative isolate flex min-h-[min(calc(100dvh-70px),880px)] flex-col justify-center overflow-hidden px-5 py-20 md:px-8">
          {/* Fragment behind the inscription. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[-14%] -z-10 h-[78%] w-[62%] -translate-y-1/2 opacity-45 md:right-[-6%] md:w-[46%] md:opacity-55"
          >
            <Image
              src="/img/herodotos.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 62vw, 46vw"
              className="feather-plate object-cover object-center grayscale contrast-[1.15]"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-surface via-surface/70 to-transparent"
          />

          <div className="mx-auto w-full max-w-[1440px]">
            <Reveal move="rise">
              {/* The capitals are sized to overrun the right edge at every
                  width. The clip lives on the section, so the last line runs
                  off the canvas the way carved lettering runs off a lintel. */}
              {/* The middle line is the one that runs off the canvas. The
                  last line stays inside the gutter: "builders" is the word
                  that tells the reader the page is for him, and bleeding it
                  was costing it on a phone. */}
              <h1 className="font-display text-[clamp(1.75rem,7.4vw,6.2rem)] leading-[0.98] tracking-[-0.015em] text-fg uppercase">
                {site.hero.headlineLines.map((line, i) => (
                  <span
                    key={line}
                    className={`block ${i === 1 ? "-mr-[14vw] whitespace-nowrap" : ""} ${
                      i === 2 ? "text-accent" : ""
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <div aria-hidden className="mt-12 h-1 w-full max-w-[520px] bg-accent" />

              <p className="mt-8 max-w-[44ch] font-sans text-[1.0625rem] leading-relaxed text-fg-muted">
                {site.hero.subhead}
              </p>

              <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href="#enquiry"
                  className="border-2 border-accent bg-accent px-9 py-4 font-display text-[14px] tracking-[0.22em] whitespace-nowrap text-accent-fg uppercase transition-colors hover:bg-transparent hover:text-accent"
                >
                  {site.cta}
                </a>
                <a
                  href="#work"
                  className="border-b-2 border-line-strong pb-1 font-mono text-[13px] tracking-[0.1em] text-fg uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  How it works
                </a>
              </div>
            </Reveal>
          </div>
        </section>

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
                {/* The page's own rule grammar, not a left accent bar. */}
                <div aria-hidden className="mt-10 h-1 w-28 bg-accent md:mt-12" />
                <p className="mt-8 max-w-[62ch] font-sans text-[1.0625rem] leading-[1.9] text-fg-muted md:text-lg">
                  {site.problem.body}
                </p>
              </Reveal>
            </div>

            {/* A second fragment, so the right of this section carries weight
                rather than reading as unplanned emptiness. */}
            <Reveal delay={0.14} className="lg:col-span-4">
              <figure className="relative h-full min-h-[280px] w-full">
                <Image
                  src="/img/commodus-profile.jpg"
                  alt="Roman marble portrait bust of Commodus seen in profile"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="feather-plate object-cover grayscale contrast-[1.15]"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- services */}
        <section id="services" className="border-b-2 border-line px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal move="rise">
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
                <Reveal key={service.title} delay={i * 0.04} move="rise">
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

            {/* The lion runs the full width beneath the slabs, cropped to a
                letterbox so it reads as an excavated frieze. */}
            <Reveal delay={0.1} move="rise" className="mt-16">
              <figure className="relative aspect-[16/5] w-full overflow-hidden md:aspect-[21/6]">
                <Image
                  src="/img/lion.jpg"
                  alt="Ancient marble statue of a crouching lion"
                  fill
                  sizes="100vw"
                  className="object-cover object-center grayscale contrast-[1.1]"
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
          {/* A carved Greek signature, brought up far enough to read as stone
              rather than as grey noise. The scrim is weighted left, behind the
              copy, and lifts off the right where the carving is. */}
          <Image
            src="/img/seated-man.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover grayscale contrast-[1.2]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-surface/85 md:bg-gradient-to-r md:from-surface md:via-surface/88 md:via-50% md:to-surface/35"
          />

          <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-8 md:py-44">
            <Reveal>
              <h2 className="max-w-[15ch] font-display text-[2rem] leading-[1.05] text-fg uppercase md:text-[3.6rem]">
                {site.offer.headline}
              </h2>
              <div aria-hidden className="mt-9 h-1 w-40 bg-accent" />
              <p className="mt-9 max-w-[56ch] font-sans text-[1.0625rem] leading-[1.9] text-fg-muted md:text-lg">
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                className="mt-11 inline-block border-2 border-accent bg-accent px-9 py-4 font-display text-[14px] tracking-[0.22em] whitespace-nowrap text-accent-fg uppercase transition-colors hover:bg-transparent hover:text-accent"
              >
                {site.cta}
              </a>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section className="border-b-2 border-line px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Reveal move="rise">
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
              <div aria-hidden className="mt-8 h-1 w-28 bg-accent" />
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
                <EnquiryForm skin={skinThree} />
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

      {/* Clearance for the fixed variant switcher. */}
      <div className="h-24" />
      <VariantSwitcher />
    </div>
  );
}
