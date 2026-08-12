/**
 * The three cursor behaviours, as the user asked to compare them.
 *
 *   sheen    — a light is carried past a polished slab. Nothing moves; the
 *              highlight does.
 *   parallax — the slab and the column separate, so the hero has depth.
 *   live     — both, over a slow autonomous drift of the veining, so the
 *              stone is never completely still.
 *
 * This lives outside Hero.tsx because Hero is a client module, and a client
 * module's exports arrive in a server component as references rather than as
 * the array itself — `generateStaticParams` cannot map over it.
 */
export type HeroMotion = "sheen" | "parallax" | "live";

export const HERO_MOTIONS: {
  id: HeroMotion;
  name: string;
  note: string;
}[] = [
  {
    id: "sheen",
    name: "Sheen",
    note: "Light travels over the stone. The slab and the column stay put.",
  },
  {
    id: "parallax",
    name: "Parallax",
    note: "Slab and column separate and move against each other.",
  },
  {
    id: "live",
    name: "Live stone",
    note: "Sheen and parallax, over a 46-second drift of the veins.",
  },
];
