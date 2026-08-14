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
      {/* A shorter band than a full section, so it sets its own pad pair
          rather than wearing the site's — still multiplied by `--rhythm`, so
          it loosens and tightens with everything else. */}
      <div
        className="shell band grid gap-10 lg:grid-cols-[1.35fr_auto] lg:items-center lg:gap-16"
        style={{
          ["--band-pad" as string]: "5rem",
          ["--band-pad-wide" as string]: "6rem",
        }}
      >
        <div>
          <h2 className="t-h2 text-balance">{site.offer.headline}</h2>
          <p
            className="t-body mt-5 text-mer-ink-soft"
            style={{ ["--measure" as string]: "58ch" }}
          >
            {site.offer.body}
          </p>
        </div>
        <Link
          href="/#enquiry"
          className="pill t-control justify-self-start bg-mer-accent px-8 py-4 text-center text-mer-3 transition-colors hover:bg-mer-accent-deep lg:justify-self-end"
        >
          {site.cta}
        </Link>
      </div>
    </section>
  );
}
