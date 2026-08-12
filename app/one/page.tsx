import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { VariantSwitcher } from "@/components/VariantSwitcher";
import { DirectionContract } from "@/components/DirectionContract";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DisclosureMark } from "@/components/Disclosure";
import { skinOne } from "@/components/skins";

const CONTRACT = `
PULITO VARIANT I - STONE
THESIS: A renovation firm's website should read like a stonemason's sample board, not a marketing brochure. Refuses the dark-luxury agency page and the centred SaaS hero stack.
OWN-WORLD: Cool limestone ground, malachite green field, hairline rules, Roman inscriptional capitals in Marcellus, museum plates of Getty and MET marbles. No cards, no shadows, no rounded corners.
STORY: The visitor recognises their own underselling website, sees a legible four-part service colonnade and an honest process, and books a free preview of their own homepage.
FIRST VIEWPORT: Centred inscription at 5rem over a hairline rule, one line of subhead, primary action beneath, a wide draped-marble plate anchoring the fold.
FORM: Symmetrical plate-book order, restrained end of the three-variant spread. Brief-pinned direction, no concept roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function VariantOne() {
  return (
    <div data-v="one" className="min-h-dvh bg-surface text-fg">
      <DirectionContract contract={CONTRACT} />

      {/* ---------------------------------------------------------------- nav */}
      <header className="sticky top-0 z-50 border-b border-line bg-surface/92 backdrop-blur-sm">
        <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-4 px-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8">
          <nav className="hidden items-center gap-7 font-mono text-[11px] tracking-[0.16em] text-fg-muted uppercase md:flex">
            <a className="transition-colors hover:text-accent" href="#services">
              Services
            </a>
            <a className="transition-colors hover:text-accent" href="#process">
              Process
            </a>
          </nav>

          <a
            href="#top"
            className="font-display text-[19px] tracking-[0.3em] text-fg uppercase md:col-start-2"
          >
            Pulito
          </a>

          <div className="flex shrink-0 justify-end">
            <a
              href="#enquiry"
              className="bg-accent px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-accent-fg uppercase transition-opacity hover:opacity-88 md:px-5"
            >
              {site.cta}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ------------------------------------------------------------- hero */}
        {/* On phones the plate leads and the inscription is cut into it, so
            variant one keeps a structural identity at 375 rather than
            collapsing into the same stacked hero as the other two. */}
        <section className="px-5 pt-20 pb-0 md:px-8 md:pt-24">
          {/* The flex context has to live on the element that actually holds
              the ordered children, or the order-* classes are inert. */}
          <div className="mx-auto flex w-full max-w-[1240px] flex-col md:block">
            <Reveal className="order-2 text-center md:order-none">
              <h1 className="mx-auto max-w-[19ch] font-display text-[2.5rem] leading-[1.06] text-balance text-fg md:text-[4rem] lg:text-[5rem]">
                {site.hero.headline}
              </h1>
              <div
                aria-hidden
                className="mx-auto mt-9 h-px w-full max-w-[440px] bg-line-strong"
              />
              <p className="mx-auto mt-8 max-w-[44ch] font-sans text-[1.0625rem] leading-relaxed text-pretty text-fg-muted">
                {site.hero.subhead}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a
                  href="#enquiry"
                  className="bg-accent px-8 py-4 font-mono text-[12px] tracking-[0.2em] whitespace-nowrap text-accent-fg uppercase transition-all hover:opacity-88 active:translate-y-px"
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

            {/* Plate. Shallow arch, the one curve permitted in this world. */}
            <Reveal delay={0.1} className="order-1 mb-12 md:order-none md:mt-20 md:mb-0">
              {/* The museum plate's cool studio ground is multiplied into the
                  limestone so the arch reads as carved stone, not as a grey
                  photograph pasted onto the page. */}
              <figure className="relative mx-auto aspect-[16/10] w-full max-w-[1000px] overflow-hidden rounded-t-[999px] bg-surface md:aspect-[16/8]">
                <Image
                  src="/img/salus.jpg"
                  alt="Roman marble statue of the goddess Salus, draped, with a small attendant figure"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-cover object-[center_18%] mix-blend-multiply saturate-[0.55]"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------- problem */}
        <section className="border-b border-line px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[1240px] text-center">
            <Reveal>
              <h2 className="mx-auto max-w-[17ch] font-display text-[1.9rem] leading-[1.15] text-balance text-fg md:text-[3rem]">
                {site.problem.headline}
              </h2>
              <p className="mx-auto mt-9 max-w-[64ch] font-sans text-[1.0625rem] leading-[1.85] text-fg-muted">
                {site.problem.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- services */}
        <section id="services" className="border-b border-line px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <Reveal>
              <h2 className="text-center font-display text-[1.75rem] tracking-[0.04em] text-fg md:text-[2.4rem]">
                {site.sections.services}
              </h2>
            </Reveal>

            {/* Colonnade: four bays divided by hairlines. The outer bays lose
                their outer padding so the text aligns with the rule above. */}
            <div className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {site.services.map((service, i) => (
                <Reveal
                  key={service.title}
                  delay={i * 0.06}
                  className="border-b border-line lg:border-b-0 lg:not-last:border-r"
                >
                  <div className="h-full py-9 sm:px-7 sm:first:pl-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                    <h3 className="font-display text-[1.5rem] text-fg">
                      {service.title}
                    </h3>
                    <p className="mt-4 font-sans text-[15px] leading-[1.75] text-fg-muted">
                      {service.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- process */}
        <section id="process" className="border-b border-line px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <Reveal>
              <h2 className="font-display text-[1.75rem] tracking-[0.04em] text-fg md:text-[2.4rem]">
                {site.sections.process}
              </h2>
            </Reveal>

            <div className="mt-14 border-t border-line">
              {site.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05}>
                  <div className="grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-10 md:py-10">
                    <h3 className="font-display text-[1.35rem] text-fg md:col-span-3 md:text-[1.6rem]">
                      {step.title}
                    </h3>
                    <p className="max-w-[70ch] font-sans leading-[1.8] text-fg-muted md:col-span-9">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ offer */}
        <section id="work" className="border-b border-line bg-surface-2 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <figure className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
                <Image
                  src="/img/lion.jpg"
                  alt="Ancient marble statue of a crouching lion on a plinth"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover mix-blend-multiply saturate-[0.55]"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-7">
              <h2 className="max-w-[16ch] font-display text-[2rem] leading-[1.12] text-fg md:text-[2.9rem]">
                {site.offer.headline}
              </h2>
              <p className="mt-7 max-w-[56ch] font-sans text-[1.0625rem] leading-[1.85] text-fg-muted">
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                className="mt-9 inline-block bg-accent px-8 py-4 font-mono text-[12px] tracking-[0.2em] whitespace-nowrap text-accent-fg uppercase transition-all hover:opacity-88 active:translate-y-px"
              >
                {site.cta}
              </a>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section className="border-b border-line px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <Reveal>
              <h2 className="text-center font-display text-[1.75rem] tracking-[0.04em] text-fg md:text-[2.4rem]">
                {site.sections.faq}
              </h2>
            </Reveal>

            <div className="mx-auto mt-14 max-w-[900px] border-t border-line">
              {site.faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.03}>
                  <details className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 [&::-webkit-details-marker]:hidden">
                      <span className="font-mono text-[11px] text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[1.2rem] text-fg md:text-[1.35rem]">
                        {faq.q}
                      </span>
                      <DisclosureMark className="size-4 text-fg-muted" />
                    </summary>
                    <p className="max-w-[70ch] pb-7 pl-10 font-sans leading-[1.8] text-fg-muted">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- enquiry */}
        {/* The accent finally owns a whole region rather than an edge. */}
        <section id="enquiry" className="bg-accent px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[760px]">
            <Reveal className="text-center">
              <h2 className="font-display text-[2rem] text-accent-fg md:text-[2.9rem]">
                {site.form.headline}
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans leading-relaxed text-[#c3d8cf]">
                {site.form.body}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <EnquiryForm skin={skinOne} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[17px] tracking-[0.3em] text-fg uppercase">
              Pulito
            </p>
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
        <p className="mx-auto mt-8 max-w-[1240px] font-mono text-[10px] tracking-[0.14em] text-fg-muted uppercase">
          Imagery: Getty Museum and the Metropolitan Museum of Art, public domain
        </p>
      </footer>

      {/* Clearance for the fixed variant switcher. */}
      <div className="h-24" />
      <VariantSwitcher />
    </div>
  );
}
