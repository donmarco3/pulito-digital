import { PulitoPage } from "@/components/PulitoPage";

/**
 * Parallax is the default until the three hero motions are compared at
 * /motion/compare and one is chosen. Changing the site's motion is this one
 * word.
 */
export default function Home() {
  return <PulitoPage heroMode="parallax" />;
}
