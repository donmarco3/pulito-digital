import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All imagery is vendored under /public/img, so no remote patterns are needed.
  turbopack: {
    root: __dirname,
  },
  images: {
    /*
      Next 16 only honours a `quality` prop whose value is listed here; ask for
      anything else and it silently falls back to 75. That silence cost a round
      of review — the hero read as low quality while the source on disk was
      already 2560 wide, because the optimizer was re-encoding it at 75.

      75 is a good default for photographs and a bad one for the Meridian hero,
      which is almost entirely smooth gradient. Gradients are the one thing
      lossy encoders band, and a 1920-wide re-encode came back at 58 KB —
      smaller than the 2560-wide source it was made from, and visibly worse.

      75 stays in the list and stays first, so every other image is unaffected.
    */
    qualities: [75, 90],
  },
};

export default nextConfig;
