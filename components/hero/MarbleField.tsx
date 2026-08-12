/**
 * Rosso marble, generated rather than photographed.
 *
 * The reference is a burgundy slab with a white vein network. There is no
 * public-domain photograph of one at the resolution a full-bleed hero needs,
 * and a JPEG of a slab cannot be made to move: it can only be slid around.
 * So the slab is drawn — displaced stripes are the standard way to get
 * marble out of Perlin noise, and two passes at different frequencies give
 * the coarse network and the fine capillaries a real slab has.
 *
 * It costs a few hundred bytes instead of a megabyte, it is resolution
 * independent, and — the point — the browser rasterises the filter once and
 * then the layers are free to be transformed by the pointer every frame.
 * Nothing here re-evaluates a filter during motion.
 *
 * The caller owns stacking: this paints edge to edge inside whatever box it
 * is given and sets no z-index of its own.
 *
 * The vein geometry is deliberately hand-placed rather than mapped from an
 * array: a slab's veins are not evenly spaced, and evenly spaced ones read
 * as a texture swatch.
 */
export function MarbleField({
  seed = 11,
  veinClassName,
}: {
  seed?: number;
  /** Applied to the vein group so a caller can drift it. */
  veinClassName?: string;
}) {
  const p = `mf${seed}`;

  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Sub-surface cloud. This is what stops the ground reading as a flat
            fill behind the veins. */}
        <filter id={`${p}-mottle`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.0022 0.0075"
            numOctaves="6"
            seed={seed}
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.5 0 0 0 -0.30"
          />
        </filter>

        {/* Coarse network: long displacement, so the stripes wander far. */}
        <filter id={`${p}-coarse`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0045"
            numOctaves="5"
            seed={seed}
            result="t"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="t"
            scale="300"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.9" />
        </filter>

        {/* Capillaries: higher frequency, shorter throw, so they read as
            fracture rather than as a second set of the same veins. */}
        <filter id={`${p}-fine`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011"
            numOctaves="4"
            seed={seed + 30}
            result="t"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="t"
            scale="120"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>

        <g id={`${p}-c`} fill="#efe7dd">
          <rect y="40" width="1440" height="2" />
          <rect y="190" width="1440" height="4" />
          <rect y="330" width="1440" height="1.5" />
          <rect y="470" width="1440" height="5" />
          <rect y="600" width="1440" height="2" />
          <rect y="760" width="1440" height="3" />
          <rect y="880" width="1440" height="2" />
        </g>

        <g id={`${p}-f`} fill="#f4efe6">
          <rect y="0" width="1440" height="1" />
          <rect y="90" width="1440" height="1" />
          <rect y="140" width="1440" height="1" />
          <rect y="250" width="1440" height="1" />
          <rect y="290" width="1440" height="1" />
          <rect y="390" width="1440" height="1" />
          <rect y="430" width="1440" height="1" />
          <rect y="530" width="1440" height="1" />
          <rect y="660" width="1440" height="1" />
          <rect y="700" width="1440" height="1" />
          <rect y="820" width="1440" height="1" />
        </g>
      </defs>

      <rect width="1440" height="900" fill="var(--color-accent-deep)" />
      <rect
        width="1440"
        height="900"
        fill="var(--color-accent-shade)"
        filter={`url(#${p}-mottle)`}
        opacity="0.85"
      />

      {/* Both vein passes move as one group: they are one stone. */}
      <g className={veinClassName} style={{ transformOrigin: "50% 50%" }}>
        <use href={`#${p}-c`} filter={`url(#${p}-coarse)`} opacity="0.72" />
        <use href={`#${p}-f`} filter={`url(#${p}-fine)`} opacity="0.34" />
      </g>
    </svg>
  );
}
