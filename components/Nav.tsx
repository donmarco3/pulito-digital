import Link from "next/link";
import { site } from "@/content/site";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10">
        <Link
          href="#top"
          className="font-display text-[17px] font-semibold tracking-tight text-bone"
        >
          Pulito<span className="text-rust">.</span>
        </Link>

        <nav className="hidden items-center gap-9 text-[14px] text-bone-muted lg:flex">
          <a className="transition-colors hover:text-bone" href="#services">
            Services
          </a>
          <a className="transition-colors hover:text-bone" href="#process">
            Process
          </a>
          <a className="transition-colors hover:text-bone" href="#faq">
            FAQ
          </a>
        </nav>

        <a
          href="#enquiry"
          className="bg-rust px-4 py-2.5 text-[13px] font-medium whitespace-nowrap text-ink transition-colors hover:bg-rust-bright md:px-5 md:text-[14px]"
        >
          {site.cta}
        </a>
      </div>
    </header>
  );
}
