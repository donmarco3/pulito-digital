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
      <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <span className="font-schibsted text-[18px] font-semibold tracking-[-0.02em]">
              Pulito
            </span>
            <p className="mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-mer-ink-soft">
              {site.footer.line}
            </p>
          </div>

          <nav aria-label="Services">
            <p className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
              Services
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[14.5px] text-mer-ink transition-colors hover:text-mer-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-mer-ink-soft uppercase">
              Studio
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link
                  href="/process"
                  className="text-[14.5px] text-mer-ink transition-colors hover:text-mer-accent"
                >
                  Process
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[14.5px] text-mer-ink transition-colors hover:text-mer-accent"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#enquiry"
                  className="text-[14.5px] text-mer-ink transition-colors hover:text-mer-accent"
                >
                  {site.cta}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-mer-line pt-6 text-[14.5px] text-mer-ink-soft">
          {site.location} ·{" "}
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-mer-ink transition-colors hover:text-mer-accent"
          >
            {site.contactEmail}
          </a>
        </p>
      </div>
    </footer>
  );
}
