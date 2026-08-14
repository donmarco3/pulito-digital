import Link from "next/link";
import { site } from "@/content/site";

/**
 * The site footer, shared by every page. It grew out of the landing page's
 * two-cell footer when the site went multi-page: the brand block keeps its
 * seat, and the pages get a link list so the footer does the wayfinding job
 * a multi-page footer exists for.
 *
 * Grammar as everywhere: hairline rules for structure, the mono label voice
 * for group headings (the same treatment the enquiry section's contact rows
 * use), no cards, no icons. The deepest ground on the page (`mer-3`),
 * because the footer is the page's basement.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-mer-line bg-mer-3">
      <div
        className="shell band"
        style={{
          ["--band-pad" as string]: "3.5rem",
          ["--band-pad-wide" as string]: "3.5rem",
          ["--body-size" as string]: "14.5px",
        }}
      >
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <span
              className="t-control tracking-[-0.02em]"
              style={{ ["--control-size" as string]: "18px" }}
            >
              Pulito
            </span>
            <p
              className="t-body mt-4 text-mer-ink-soft"
              style={{ ["--measure" as string]: "46ch" }}
            >
              {site.footer.line}
            </p>
          </div>

          <nav aria-label="Services">
            <p className="t-label text-mer-ink-soft">Services</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="t-body text-mer-ink transition-colors hover:text-mer-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="t-label text-mer-ink-soft">Studio</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link
                  href="/process"
                  className="t-body text-mer-ink transition-colors hover:text-mer-accent"
                >
                  Process
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="t-body text-mer-ink transition-colors hover:text-mer-accent"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="t-body text-mer-ink transition-colors hover:text-mer-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p
          className="t-body mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-mer-line pt-6 text-mer-ink-soft"
          style={{ ["--measure" as string]: "none" }}
        >
          <span>
            {site.location} ·{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-mer-ink transition-colors hover:text-mer-accent"
            >
              {site.contactEmail}
            </a>
          </span>
          <Link
            href="/privacy"
            className="transition-colors hover:text-mer-ink"
          >
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
