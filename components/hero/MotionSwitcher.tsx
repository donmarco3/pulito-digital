import Link from "next/link";
import { HERO_MOTIONS, type HeroMotion } from "./motions";

/**
 * Review furniture, not part of the site. It is fixed to the bottom of the
 * window on the three motion routes so the hero can be tapped through
 * without scrolling back up, and it does not exist on `/`.
 */
export function MotionSwitcher({ current }: { current: HeroMotion }) {
  const note = HERO_MOTIONS.find((m) => m.id === current)?.note;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t-2 border-line bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-2 gap-y-3 px-5 py-3 md:px-8">
        <span className="mr-2 font-mono text-[10px] tracking-[0.24em] text-fg-muted uppercase">
          Hero motion
        </span>

        {HERO_MOTIONS.map((m) => (
          <Link
            key={m.id}
            href={`/motion/${m.id}`}
            aria-current={m.id === current ? "page" : undefined}
            className={`border px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
              m.id === current
                ? "border-gild bg-accent-deep text-fg"
                : "border-line-strong text-fg-muted hover:border-gild hover:text-fg"
            }`}
          >
            {m.name}
          </Link>
        ))}

        <Link
          href="/motion/compare"
          className="border border-line-strong px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-fg-muted uppercase transition-colors hover:border-gild hover:text-fg"
        >
          All three
        </Link>

        {note && (
          <p className="w-full font-sans text-[12px] text-fg-muted lg:ml-4 lg:w-auto">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
