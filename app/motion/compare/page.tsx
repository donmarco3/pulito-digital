import Link from "next/link";
import type { Metadata } from "next";
import { HERO_MOTIONS } from "@/components/hero/motions";
import { ComparePane } from "@/components/hero/ComparePane";

export const metadata: Metadata = {
  title: "Hero motion — three options",
  robots: { index: false, follow: false },
};

/**
 * Review furniture. Three live heroes at once, each in its own viewport, so
 * the cursor behaviours can be compared without remembering the last one.
 * Not linked from the site and not indexed.
 */
export default function Compare() {
  return (
    <div className="min-h-dvh bg-surface px-5 py-10 md:px-8">
      <header className="mx-auto max-w-[1800px]">
        <p className="font-mono text-[10px] tracking-[0.3em] text-fg-muted uppercase">
          Pulito Digital / hero motion
        </p>
        <h1 className="mt-4 font-display text-[1.8rem] leading-[1.1] text-fg uppercase md:text-[2.6rem]">
          Three ways the stone can answer the cursor
        </h1>
        <div aria-hidden className="mt-8 h-px w-full max-w-[420px] bg-gild" />
        <p className="mt-6 max-w-[68ch] font-sans leading-[1.8] text-fg-muted">
          Move the pointer across each one. Every other part of the page is
          identical, and all three share the same scroll drift, so the only
          difference is what the cursor does. Open any of them full size to see
          it on the real page.
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-[1800px] grid-cols-1 gap-10 xl:grid-cols-3">
        {HERO_MOTIONS.map((m, i) => (
          <section key={m.id}>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[1.6rem] leading-none text-accent">
                {i + 1}
              </span>
              <h2 className="font-display text-[1.25rem] tracking-[0.06em] text-fg uppercase">
                {m.name}
              </h2>
            </div>
            <p className="mt-3 mb-5 min-h-[3.2em] max-w-[46ch] font-sans text-sm leading-[1.7] text-fg-muted">
              {m.note}
            </p>

            <ComparePane mode={m.id} />

            <Link
              href={`/motion/${m.id}`}
              className="mt-5 inline-block border-b border-gild pb-1 font-mono text-[12px] tracking-[0.14em] text-fg uppercase transition-colors hover:text-accent"
            >
              Open the full page
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
