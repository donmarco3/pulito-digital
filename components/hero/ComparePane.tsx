"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One hero, rendered at a real 1280px viewport inside an iframe and scaled
 * down to whatever column it has been given. Scaling rather than shrinking
 * keeps the composition honest: the type stays the same size relative to the
 * column, which is the thing being judged.
 *
 * The pointer motion works through the scale — the iframe receives the events
 * in its own coordinate space, so hovering a pane drives that hero's cursor
 * behaviour and nothing else's.
 *
 * 1280 is not arbitrary: below the lg breakpoint the hero uses its narrow
 * composition, so a smaller frame would compare three heroes nobody on a
 * desktop will ever see.
 */
const FRAME_W = 1280;
const FRAME_H = 820;

export function ComparePane({ mode }: { mode: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border-2 border-line bg-surface"
      style={{ height: FRAME_H * scale }}
    >
      <iframe
        src={`/motion/${mode}/frame`}
        title={`${mode} hero`}
        loading="lazy"
        className="origin-top-left border-0"
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}
