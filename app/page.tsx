import type { Metadata } from "next";
import { CompareBoard } from "@/components/CompareBoard";

/**
 * `/` is the comparison surface while five directions are alive.
 *
 * The five landing pages live at /1 through /5 and none of them is the site
 * yet. Putting the board at the root rather than at /compare is deliberate:
 * the decision to be made right now is which direction ships, and the URL a
 * browser opens by default should be the one that asks it.
 *
 * All six routes are `noindex`. The real site is one page, and five half-built
 * directions competing with it in a search index is the one way this
 * comparison could do actual damage.
 *
 * When a direction is chosen it moves to `/`, the other four are deleted, and
 * this file becomes that page. DESIGN.md records what each deletion takes.
 */
export const metadata: Metadata = {
  title: "Five directions | Pulito Digital",
  robots: { index: false, follow: false },
};

export default function Compare() {
  return <CompareBoard />;
}
