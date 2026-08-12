import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Disclosure marker for the FAQ blocks. A drawn glyph from the icon set,
 * rotated on open, rather than a typed "+" standing in for an icon.
 */
export function DisclosureMark({ className = "" }: { className?: string }) {
  return (
    <PlusIcon
      weight="light"
      aria-hidden
      className={`shrink-0 transition-transform duration-300 group-open:rotate-45 ${className}`}
    />
  );
}
