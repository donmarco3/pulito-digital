/**
 * Disclosure marker for the FAQ blocks.
 *
 * A typographic mark set in the block's own face, not an icon. The brief rules
 * out vector art, and an icon set is vector art with a licence attached — the
 * moment one drawn glyph appears, every direction has a second visual language
 * running underneath its photography. A plus rotating to a cross is the same
 * affordance, costs no dependency, and inherits the direction's lettering for
 * free.
 *
 * `aria-hidden`, because the `<summary>` it sits in already announces its own
 * expanded state; a screen reader that also read "plus" would be describing
 * the furniture.
 */
export function DisclosureMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`shrink-0 leading-none transition-transform duration-300 select-none group-open:rotate-45 ${className}`}
    >
      +
    </span>
  );
}
