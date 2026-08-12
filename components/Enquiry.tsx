import { site } from "@/content/site";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

export function Enquiry() {
  return (
    <section
      id="enquiry"
      className="border-b border-ink-line px-5 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-bone md:text-[2.75rem]">
            {site.form.headline}
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-[1.75] text-bone-muted">
            {site.form.body}
          </p>
          <p className="mt-8 text-[15px] text-bone-faint">
            Prefer email?{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-bone transition-colors hover:text-rust-bright"
            >
              {site.contactEmail}
            </a>
          </p>
        </Reveal>

        <div className="lg:col-span-7">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
