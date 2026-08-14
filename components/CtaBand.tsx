import Link from "next/link";
import { site } from "@/content/site";

/**
 * The inner pages' close: the offer restated once, with the one action.
 *
 * Every page of the site ends at the same place — the enquiry — and the
 * inner pages get there by returning to the form on the landing page rather
 * than by carrying a second copy of it. One form means one tested conversion
 * path; /contact gets its own instance later, deliberately.
 *
 * Recessed ground (`mer-2`), hairline rules, headline at section scale, one
 * pill. Deliberately quieter than the landing page's enquiry section: this
 * is a door, not the room.
 */
export function CtaBand() {
  return (
    <section className="border-t border-mer-line bg-mer-2">
      <div className="mx-auto grid max-w-[86rem] gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.35fr_auto] lg:items-center lg:gap-16">
        <div>
          <h2 className="display-face text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-balance">
            {site.offer.headline}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-relaxed text-mer-ink-soft">
            {site.offer.body}
          </p>
        </div>
        <Link
          href="/#enquiry"
          className="justify-self-start rounded-full bg-mer-accent px-8 py-4 text-center font-schibsted text-[15px] font-semibold text-mer-3 transition-colors hover:bg-mer-accent-deep lg:justify-self-end"
        >
          {site.cta}
        </Link>
      </div>
    </section>
  );
}
