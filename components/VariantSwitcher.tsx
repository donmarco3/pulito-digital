"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Deliberately neutral chrome. It belongs to the reviewer, not to any of the
 * three design worlds, so it stays the same dark pill on every route and never
 * borrows a variant's palette.
 */
export const VARIANTS = [
  { slug: "one", numeral: "I", name: "Stone" },
  { slug: "two", numeral: "II", name: "Palazzo" },
  { slug: "three", numeral: "III", name: "Porphyry" },
] as const;

export function VariantSwitcher() {
  const pathname = usePathname();
  const [embedded, setEmbedded] = useState(false);

  // Inside the compare page's iframes the switcher is noise, not navigation.
  useEffect(() => {
    setEmbedded(window.self !== window.top);
  }, []);

  if (embedded) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex justify-center px-4 print:hidden">
      <nav
        aria-label="Design variants"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/12 bg-[#0c0c0e]/92 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        {VARIANTS.map((variant) => {
          const active = pathname === `/${variant.slug}`;
          return (
            <Link
              key={variant.slug}
              href={`/${variant.slug}`}
              aria-current={active ? "page" : undefined}
              aria-label={`Variant ${variant.numeral}, ${variant.name}`}
              className={`flex items-center gap-2 rounded-full px-3 py-2 font-sans text-[13px] transition-colors sm:px-4 ${
                active
                  ? "bg-white text-[#0c0c0e]"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="font-mono text-[11px] tracking-[0.1em] opacity-70">
                {variant.numeral}
              </span>
              {/* Numerals alone on the narrowest screens, so the bar never
                  runs off the viewport. */}
              <span aria-hidden className="hidden sm:inline">
                {variant.name}
              </span>
            </Link>
          );
        })}

        <span aria-hidden className="mx-1 h-5 w-px bg-white/12" />

        <Link
          href="/compare"
          aria-current={pathname === "/compare" ? "page" : undefined}
          className={`rounded-full px-3 py-2 font-sans text-[13px] whitespace-nowrap transition-colors sm:px-4 ${
            pathname === "/compare"
              ? "bg-white text-[#0c0c0e]"
              : "text-white/65 hover:bg-white/10 hover:text-white"
          }`}
        >
          All three
        </Link>
      </nav>
    </div>
  );
}
