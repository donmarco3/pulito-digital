/**
 * Split a headline around the one word that takes the accent.
 *
 * Written to degrade rather than to assume: if the accent word is ever
 * edited to one the headline no longer contains, this returns the line
 * whole and unaccented instead of rendering a highlighted fragment that is
 * not in the copy. `indexOf` rather than `split` for the same reason — a
 * word that occurs twice would otherwise scatter the emphasis across both.
 *
 * Lives here because two surfaces use the device now: the landing hero and
 * each service page's claim.
 */
export function splitHeadline(line: string, word: string) {
  const at = line.indexOf(word);
  if (!word || at === -1) return { before: line, accent: "", after: "" };
  return {
    before: line.slice(0, at),
    accent: word,
    after: line.slice(at + word.length),
  };
}
