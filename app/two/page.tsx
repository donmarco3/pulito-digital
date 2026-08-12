import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { VariantSwitcher } from "@/components/VariantSwitcher";
import { DirectionContract } from "@/components/DirectionContract";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DisclosureMark } from "@/components/Disclosure";
import { skinTwo } from "@/components/skins";

const CONTRACT = `
PULITO VARIANT II - PALAZZO
THESIS: The enquiry is staged like a night viewing at an auction house. Refuses the light editorial agency page and the symmetrical plate-book order of variant I.
OWN-WORLD: Near-black ground, gilt hairlines, Bodoni Moda didone display at large scale, museum plates lit against darkness, catalogue numerals. Rules and type do the dividing; there are no cards.
STORY: The visitor is met by one lit marble and a claim about their own website, walks a catalogue of four services and a four-part process, and books a free preview.
FIRST VIEWPORT: Full-height plate held right of centre, display headline breaking across it from the left, gilt rule and primary action stacked beneath the type column.
FORM: Asymmetric catalogue spread, middle of the three-variant spread. Brief-pinned direction, no concept roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function VariantTwo() {
  return (
    <div data-v="two" className="min-h-dvh bg-surface text-fg">
      <DirectionContract contract={CONTRACT} />

      {/* ---------------------------------------------------------------- nav */}
      <header className="sticky top-0 z-50 border-b border-line bg-surface/88 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 md:px-10">
          <a href="#top" className="font-display text-[22px] tracking-[0.16em] text-fg">
            PULITO
          </a>

          <nav className="hidden items-center gap-8 font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase lg:flex">
            <a className="transition-colors hover:text-accent" href="#services">
              Services
            </a>
            <a className="transition-colors hover:text-accent" href="#process">
              Process
            </a>
            <a className="transition-colors hover:text-accent" href="#faq">
              Questions
            </a>
          </nav>

          <a
            href="#enquiry"
            className="border border-accent px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-accent uppercase transition-colors hover:bg-accent hover:text-accent-fg md:px-5"
          >
            {site.cta}
          </a>
        </div>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- hero */}
        <section className="relative border-b border-line">
          {/* The plate is placed first in the source and the type column is
              pulled back over it, so the headline genuinely crosses the
              image at every width instead of sitting politely beside it. */}
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center px-5 pt-16 pb-20 md:px-10 lg:grid-cols-12 lg:py-24">
            <Reveal
              delay={0.1}
              move="draw"
              className="order-1 -mb-16 w-[78%] self-end justify-self-end sm:w-[62%] lg:order-2 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mb-0 lg:w-full"
            >
              <figure className="relative aspect-[4/5] w-full">
                <Image
                  src="/img/commodus-front.jpg"
                  alt="Roman marble portrait bust of the emperor Commodus, lit against a dark ground"
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 46vw"
                  className="feather-plate object-cover object-top brightness-[0.92] contrast-[1.08]"
                />
              </figure>
            </Reveal>

            <Reveal
              move="draw"
              className="relative z-10 order-2 lg:order-1 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:pr-4"
            >
              <h1 className="font-display text-[2.5rem] leading-[1.02] text-balance text-fg md:text-[3.5rem] lg:text-[4.1rem]">
                {site.hero.headline}
              </h1>
              <div aria-hidden className="mt-9 h-px w-32 bg-accent" />
              <p className="mt-8 max-w-[46ch] font-sans text-[1.0625rem] leading-relaxed text-fg-muted">
                {site.hero.subhead}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#enquiry"
                  className="bg-accent px-8 py-4 font-mono text-[12px] tracking-[0.2em] whitespace-nowrap text-accent-fg uppercase transition-all hover:brightness-110 active:translate-y-px"
                >
                  {site.cta}
                </a>
                <a
                  href="#work"
                  className="border-b border-line-strong pb-1 font-sans text-[15px] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  How it works
                </a>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ---------------------------------------------------------- problem */}
        <section className="border-b border-line bg-surface-2 px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="max-w-[14ch] font-display text-[2rem] leading-[1.08] text-balance text-fg md:text-[3.2rem]">
                {site.problem.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-6 lg:pt-3">
              <p className="max-w-[58ch] font-sans text-[1.0625rem] leading-[1.85] text-fg-muted">
                {site.problem.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- services */}
        <section id="services" className="border-b border-line px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1320px]">
            <Reveal>
              <h2 className="max-w-[18ch] font-display text-[1.9rem] leading-[1.1] text-fg md:text-[2.8rem]">
                {site.sections.services}
              </h2>
            </Reveal>

            {/* Catalogue entries. Each one a lot number, a title, a description. */}
            <div className="mt-16">
              {site.services.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.05}>
                  <article className="group grid grid-cols-1 gap-x-10 gap-y-4 border-t border-line py-10 transition-colors hover:border-accent md:grid-cols-12 md:py-12 last:border-b">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-accent md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-[1.8rem] leading-tight text-fg md:col-span-4 md:text-[2.2rem]">
                      {service.title}
                    </h3>
                    <p className="max-w-[62ch] font-sans leading-[1.8] text-fg-muted md:col-span-7">
                      {service.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- process */}
        <section id="process" className="border-b border-line bg-surface-2 px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal className="lg:sticky lg:top-32">
                <h2 className="font-display text-[1.9rem] leading-[1.1] text-fg md:text-[2.8rem]">
                  {site.sections.process}
                </h2>
                <div aria-hidden className="mt-7 h-px w-20 bg-accent" />
              </Reveal>
            </div>

            <div className="flex flex-col gap-10 lg:col-span-8 lg:gap-14">
              {site.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05}>
                  <div className="border-l border-line pl-7 md:pl-10">
                    <h3 className="font-display text-[1.5rem] text-fg md:text-[1.9rem]">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-[62ch] font-sans leading-[1.8] text-fg-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ offer */}
        <section id="work" className="relative isolate border-b border-line">
          {/* Lit, not buried. The scrim only covers the column the copy sits
              in, so the plate is legible on the right instead of paying for a
              half-megabyte of invisible texture. */}
          <Image
            src="/img/germanicus.jpg"
            alt="Roman marble portrait bust of Germanicus"
            fill
            sizes="100vw"
            className="-z-10 object-cover object-[72%_center]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-surface/80 md:bg-gradient-to-r md:from-surface md:via-surface/85 md:via-45% md:to-transparent"
          />

          <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-44">
            <Reveal className="max-w-[54ch]">
              <h2 className="font-display text-[2.1rem] leading-[1.08] text-balance text-fg md:text-[3.4rem]">
                {site.offer.headline}
              </h2>
              <div aria-hidden className="mt-8 h-px w-24 bg-accent" />
              <p className="mt-8 max-w-[54ch] font-sans text-[1.0625rem] leading-[1.85] text-fg-muted">
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                className="mt-10 inline-block bg-accent px-8 py-4 font-mono text-[12px] tracking-[0.2em] whitespace-nowrap text-accent-fg uppercase transition-all hover:brightness-110 active:translate-y-px"
              >
                {site.cta}
              </a>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section id="faq" className="border-b border-line px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[880px]">
            <Reveal>
              <h2 className="font-display text-[1.9rem] leading-[1.1] text-fg md:text-[2.8rem]">
                {site.sections.faq}
              </h2>
            </Reveal>

            <div className="mt-14">
              {site.faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.03}>
                  <details className="group border-t border-line last:border-b">
                    <summary className="flex cursor-pointer list-none items-baseline gap-6 py-7 [&::-webkit-details-marker]:hidden">
                      <span className="flex-1 font-display text-[1.3rem] text-fg md:text-[1.55rem]">
                        {faq.q}
                      </span>
                      <DisclosureMark className="size-5 text-accent" />
                    </summary>
                    <p className="max-w-[68ch] pb-8 font-sans leading-[1.85] text-fg-muted">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- enquiry */}
        <section id="enquiry" className="px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <h2 className="font-display text-[2.1rem] leading-[1.08] text-fg md:text-[3rem]">
                {site.form.headline}
              </h2>
              <div aria-hidden className="mt-7 h-px w-20 bg-accent" />
              <p className="mt-7 max-w-[42ch] font-sans text-[1.0625rem] leading-[1.85] text-fg-muted">
                {site.form.body}
              </p>
              <p className="mt-9 font-sans text-[15px] text-fg-muted">
                Prefer email?{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-fg transition-colors hover:text-accent"
                >
                  {site.contactEmail}
                </a>
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="border border-line bg-surface-2 p-7 md:p-10">
                <EnquiryForm skin={skinTwo} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-14 md:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[20px] tracking-[0.16em] text-fg">PULITO</p>
            <p className="mt-3 max-w-[44ch] font-sans text-sm leading-relaxed text-fg-muted">
              {site.footer.line}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 font-sans text-sm md:items-end">
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-fg transition-colors hover:text-accent"
            >
              {site.contactEmail}
            </a>
            <p className="text-fg-muted">{site.location}</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-[1320px] font-mono text-[10px] tracking-[0.14em] text-fg-muted uppercase">
          Imagery: Getty Museum and the Metropolitan Museum of Art, public domain
        </p>
      </footer>

      {/* Clearance for the fixed variant switcher. */}
      <div className="h-24" />
      <VariantSwitcher />
    </div>
  );
}
