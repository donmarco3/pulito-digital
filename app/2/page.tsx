import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/EnquiryForm";
import { DirectionSwitch } from "@/components/DirectionSwitch";
import { DisclosureMark } from "@/components/Disclosure";
import { BrokenHeadline, Reveal } from "@/components/Reveal";
import { neroSkin } from "@/components/skins";
import { directions, plates, site } from "@/content/site";

/**
 * 2 — NERO. The house catalogue.
 *
 * The world of a furniture house's own book: near-black, gilt hairlines, a
 * didone at a size where its thick and thin actually exist, and objects lit
 * out of the dark. Where ULTRAMARINE is asymmetric and institutional, this one
 * is symmetrical and ceremonial — everything centres, and the display type
 * overlaps the plate beneath it the way a title page overlaps a frontispiece.
 *
 * The Met photographs these busts on a near-black sweep, which is the entire
 * reason this direction works: `mix-blend-mode: screen` erases the sweep into
 * the page ground, so the bust is lit out of the same darkness the type sits
 * in rather than pasted onto it. There is no other treatment on this page —
 * no grading, no duotone. The material was already this colour.
 *
 * One accent, gilt, and the rule it actually keeps is a weaker one than "only
 * on what can be pressed" — worth stating plainly, because the comment here
 * originally claimed the strict version and the page never obeyed it. Gilt
 * also marks a hairline under the offer and the disclosure crosses. What the
 * page does guarantee is that the ACTION is always the loudest instance of the
 * accent on any screen: a bordered gilt control at 4.5rem of padding, against
 * hairlines and 11px marks. Accent discipline is one of the things the five
 * directions are being compared on, so it is recorded as built, not as hoped.
 */

const d = directions["2"];

export const metadata: Metadata = {
  title: `${site.name} | ${d.name} — ${d.tagline}`,
  robots: { index: false, follow: false },
};

export default function Nero() {
  return (
    <div className="bg-nero motion-develop pb-[var(--switch-bar)] text-nero-bone">
      <a href="#main" className="skip-link bg-gilt px-4 py-2 text-nero">
        Skip to content
      </a>

      {/* ------------------------------------------------------------ header */}
      <header className="sticky top-0 z-50 border-b border-nero-rule bg-nero/92 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[80rem] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-4 lg:px-10">
          <span className="hidden font-sans text-[11px] tracking-[0.2em] text-nero-bone-soft uppercase md:block">
            {d.eyebrow}
          </span>
          <a
            href="#main"
            className="col-start-2 text-center font-bodoni text-[24px] tracking-[0.14em] text-nero-bone uppercase"
          >
            Pulito
          </a>
          <a
            href="#enquiry"
            className="col-start-3 justify-self-end border-b border-gilt pb-1 font-sans text-[13px] whitespace-nowrap text-gilt transition-colors hover:text-gilt-bright"
          >
            {/* Two words on a phone, four above it. "Get a free preview"
                wrapped to two lines at 390px and shoved the centred wordmark
                off its own axis, which is the one thing a symmetrical header
                cannot survive. */}
            <span className="sm:hidden">Free preview</span>
            <span className="hidden sm:inline">{site.cta}</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- hero */}
        <section className="relative overflow-hidden border-b border-nero-rule pt-16 lg:pt-24">
          <div className="mx-auto max-w-[80rem] px-6 text-center lg:px-10">
            {/* No kicker above the headline — see app/1/page.tsx. */}
            <h1 className="mx-auto max-w-[20ch] font-bodoni text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[1.04] tracking-[-0.005em] text-balance">
              <BrokenHeadline lines={d.headlineLines} headline={d.headline} />
            </h1>
            <p className="mx-auto mt-7 max-w-[52ch] font-sans text-[16.5px] leading-[1.7] text-nero-bone-soft lg:text-[18px]">
              {d.subhead}
            </p>

            {/*
              The action sits ABOVE the plate, not under it. A title page wants
              the frontispiece last, and the first build obeyed that — which
              pushed the only call to action on the first screen below the fold
              on a 900px desktop, on a Persuade surface. The ceremony is worth
              keeping; the cost of it was not.
            */}
            <a
              href="#enquiry"
              className="mt-9 inline-block border border-gilt px-10 py-4.5 font-archivo text-[12px] font-medium tracking-[0.3em] text-gilt uppercase transition-colors hover:bg-gilt hover:text-nero"
            >
              {site.cta}
            </a>
          </div>

          {/*
            `plate-vignette` is not decoration here, it is the fix. The Met's
            sweep is near-black but not black, so `screen` alone lifts it just
            enough to leave a visible grey rectangle hanging in the page — the
            exact failure this direction cannot afford, since its whole claim
            is that the object is lit out of the same darkness the type sits
            in. The mask dissolves the frame edge so the residue has no
            straight line to draw.

            The box is bounded and the image covers it. Left to its intrinsic
            ratio the plate stood 640px tall, and once the mask had faded its
            top and bottom away that was a screen and a half of near-nothing
            between the headline and the next section.
          */}
          <div className="relative mx-auto mt-12 h-[34vh] max-w-[32rem] px-6 lg:h-[38vh] lg:px-10">
            <Image
              src={plates.caligula.src}
              alt={plates.caligula.alt}
              width={plates.caligula.width}
              height={plates.caligula.height}
              priority
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="bg-nero-2 plate-screen plate-vignette plate-develop h-full w-full object-cover object-[50%_24%]"
            />
          </div>

          <div className="mx-auto max-w-[80rem] px-6 pb-14 text-center lg:px-10 lg:pb-20">
            <p className="font-sans text-[11.5px] tracking-[0.12em] text-nero-bone-soft uppercase">
              {plates.caligula.credit}
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------------- problem */}
        <Reveal>
          <section className="relative overflow-hidden border-b border-nero-rule">
            {/*
              The house-book device: the same sentiment set enormous and almost
              unlit behind the passage that says it properly. It is decoration
              that is also structure — it sets the section's width — and it is
              `aria-hidden` because a screen reader announcing the headline
              twice in a row is a defect, not an effect.
            */}
            {/* Sized to FIT rather than clipped to fit. At 15vw the line ran
                past the viewport and `truncate` cut it mid-word, which reads
                as a bug rather than as a watermark — the one thing a device
                like this cannot afford, since it has no other job than to look
                deliberate. */}
            <p
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-10 overflow-hidden text-center font-bodoni text-[clamp(2.6rem,8.6vw,8rem)] leading-none whitespace-nowrap text-nero-bone/[0.05] uppercase select-none"
            >
              Premium craft
            </p>
            <div className="relative mx-auto max-w-[68rem] px-6 py-24 text-center lg:px-10 lg:py-36">
              <h2 className="mx-auto max-w-[22ch] font-bodoni text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.12] text-balance">
                {d.problem.headline}
              </h2>
              <p className="mx-auto mt-8 max-w-[62ch] font-sans text-[17px] leading-[1.75] text-nero-bone-soft">
                {d.problem.body}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ---------------------------------------------------------- services */}
        <Reveal>
          <section className="border-b border-nero-rule">
            <div className="mx-auto max-w-[80rem] px-6 py-20 lg:px-10 lg:py-28">
              <h2 className="text-center font-sans text-[11px] tracking-[0.34em] text-nero-bone-soft uppercase">
                {d.sections.services}
              </h2>

              <ul className="mx-auto mt-14 max-w-[62rem] border-t border-nero-rule">
                {/* No 01/02/03 down the side. The four services are a list,
                    not a sequence — numbering them told the reader an order
                    exists that does not, and bought nothing but the look of
                    rigour. The process steps below ARE a sequence and keep
                    their numerals. */}
                {site.services.map((service) => (
                  <li
                    key={service.code}
                    className="grid gap-3 border-b border-nero-rule py-9 lg:grid-cols-[1fr_1.2fr] lg:items-baseline lg:gap-10"
                  >
                    <h3 className="font-bodoni text-[clamp(1.5rem,2.2vw,2.1rem)] leading-tight">
                      {service.title}
                    </h3>
                    <p className="max-w-[56ch] font-sans text-[15.5px] leading-[1.75] text-nero-bone-soft">
                      {service.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ------------------------------------------------------ gallery band */}
        <Reveal>
          <section className="relative border-b border-nero-rule">
            <Image
              src={plates.galleryRelief.src}
              alt={plates.galleryRelief.alt}
              width={plates.galleryRelief.width}
              height={plates.galleryRelief.height}
              sizes="100vw"
              className="bg-nero-2 h-[46vh] w-full object-cover object-center lg:h-[62vh]"
            />
            {/* A wash, not a tint: the band has to stay a photograph, and the
                gradient exists only so the caption on top of it clears 4.5:1
                against the lightest part of the stone underneath. */}
            <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[80rem] px-6 pb-8 lg:px-10 lg:pb-12">
              <p className="max-w-[34ch] font-bodoni text-[clamp(1.3rem,2.6vw,2.2rem)] leading-tight text-nero-bone">
                Work photographed the way it deserves to be seen.
              </p>
              <p className="mt-3 font-sans text-[11.5px] tracking-[0.12em] text-nero-bone-soft uppercase">
                {plates.galleryRelief.credit}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- process */}
        <Reveal>
          <section className="border-b border-nero-rule bg-nero-2">
            <div className="mx-auto grid max-w-[80rem] gap-14 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
              <div className="lg:col-span-5">
                <h2 className="font-sans text-[11px] tracking-[0.34em] text-nero-bone-soft uppercase">
                  {d.sections.process}
                </h2>
                <Image
                  src={plates.herodotos.src}
                  alt={plates.herodotos.alt}
                  width={plates.herodotos.width}
                  height={plates.herodotos.height}
                  sizes="(min-width: 1024px) 36vw, 70vw"
                  className="bg-nero-2 plate-screen plate-vignette mt-10 w-[70%] max-w-[22rem] lg:w-full"
                />
                <p className="mt-4 font-sans text-[11.5px] tracking-[0.12em] text-nero-bone-soft uppercase">
                  {plates.herodotos.credit}
                </p>
              </div>

              <ol className="border-t border-nero-rule lg:col-span-6 lg:col-start-7">
                {site.process.map((step, index) => (
                  <li
                    key={step.title}
                    className="reveal border-b border-nero-rule py-8"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-bodoni text-[17px] text-nero-bone-soft tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-bodoni text-[24px] leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-[56ch] pl-10 font-sans text-[15.5px] leading-[1.75] text-nero-bone-soft">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </Reveal>

        {/* ------------------------------------------------------------- offer */}
        <Reveal>
          <section id="offer" className="border-b border-nero-rule">
            <div className="mx-auto max-w-[80rem] px-6 py-24 text-center lg:px-10 lg:py-36">
              <h2 className="font-sans text-[11px] tracking-[0.34em] text-nero-bone-soft uppercase">
                {d.sections.offer}
              </h2>
              <p className="mx-auto mt-9 max-w-[16ch] font-bodoni text-[clamp(2.2rem,5.6vw,4.8rem)] leading-[1.04] text-balance">
                {site.offer.headline}
              </p>
              <div className="mx-auto mt-9 h-px w-24 bg-gilt" />
              <p className="mx-auto mt-9 max-w-[58ch] font-sans text-[17px] leading-[1.75] text-nero-bone-soft">
                {site.offer.body}
              </p>
              <a
                href="#enquiry"
                className="mt-11 inline-block border border-gilt px-10 py-4.5 font-archivo text-[12px] font-medium tracking-[0.3em] text-gilt uppercase transition-colors hover:bg-gilt hover:text-nero"
              >
                {site.cta}
              </a>
            </div>
          </section>
        </Reveal>

        {/* ----------------------------------------------------------- enquiry */}
        <Reveal>
          <section id="enquiry" className="border-b border-nero-rule bg-nero-2">
            <div className="mx-auto max-w-[52rem] px-6 py-20 lg:px-10 lg:py-28">
              <div className="text-center">
                <h2 className="font-bodoni text-[clamp(2rem,3.4vw,3rem)] leading-[1.08]">
                  {site.form.headline}
                </h2>
                <p className="mx-auto mt-6 max-w-[48ch] font-sans text-[16px] leading-[1.7] text-nero-bone-soft">
                  {site.form.body}
                </p>
              </div>
              <div className="mt-12">
                <EnquiryForm skin={neroSkin} />
              </div>
              <p className="mt-10 text-center font-sans text-[14px] text-nero-bone-soft">
                Or write to{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="border-b border-gilt pb-0.5 text-nero-bone"
                >
                  {site.contactEmail}
                </a>
              </p>
            </div>
          </section>
        </Reveal>

        {/* --------------------------------------------------------------- faq */}
        <Reveal>
          <section className="border-b border-nero-rule">
            <div className="mx-auto max-w-[62rem] px-6 py-20 lg:px-10 lg:py-28">
              <h2 className="text-center font-sans text-[11px] tracking-[0.34em] text-nero-bone-soft uppercase">
                {d.sections.faq}
              </h2>
              <div className="mt-12 border-t border-nero-rule">
                {site.faqs.map((faq) => (
                  <details key={faq.q} className="group border-b border-nero-rule">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 font-bodoni text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug marker:content-none">
                      {faq.q}
                      <DisclosureMark className="mt-1 font-bodoni text-[24px] text-gilt" />
                    </summary>
                    <p className="max-w-[74ch] pb-8 font-sans text-[16px] leading-[1.75] text-nero-bone-soft">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      {/* ------------------------------------------------------------- footer */}
      <footer className="mx-auto max-w-[80rem] px-6 pt-16 pb-28 text-center lg:px-10">
        <p className="font-bodoni text-[38px] tracking-[0.14em] uppercase">Pulito</p>
        <p className="mt-5 font-sans text-[14px] text-nero-bone-soft">
          {site.footer.line}
        </p>
        <a
          href={`mailto:${site.contactEmail}`}
          className="mt-3 inline-block border-b border-gilt pb-0.5 font-sans text-[14px] text-nero-bone"
        >
          {site.contactEmail}
        </a>
        <p className="mx-auto mt-12 max-w-[70ch] border-t border-nero-rule pt-6 font-sans text-[12px] leading-relaxed text-nero-bone-soft">
          Photography: {plates.caligula.credit}; {plates.herodotos.credit};{" "}
          {plates.galleryRelief.credit}. Full licence details in{" "}
          <code>public/img/CREDITS.md</code>.
        </p>
      </footer>

      <DirectionSwitch current="2" />
    </div>
  );
}
