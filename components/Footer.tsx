import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-bone">
            Pulito<span className="text-rust">.</span>
          </p>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-bone-faint">
            {site.footer.line}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm md:items-end">
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-bone transition-colors hover:text-rust"
          >
            {site.contactEmail}
          </a>
          <p className="text-bone-faint">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
