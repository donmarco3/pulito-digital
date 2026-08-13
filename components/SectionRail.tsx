"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * MERIDIAN's section dimming: the section being read is the only one at full
 * strength.
 *
 * This file used to export a second thing — a thin index in the left page
 * margin — built from the user's remark about "the little column on the left
 * as another little navigation" on the reference. That reading was wrong. Read
 * against the reference's actual stylesheet, they were describing the sticky
 * sidebar inside its solutions section, which is now built properly in
 * `Solutions.tsx`. The margin rail came out rather than being kept alongside
 * it: two navigations on one screen compete, and the reference does not have
 * both either. The dimming is a separate effect the user liked separately, and
 * it stays.
 *
 * WHY AN OBSERVER AND NOT A SCROLL TIMELINE. Everything else that moves on
 * these three pages is scroll-driven CSS with no JavaScript at all. This
 * cannot be: `animation-timeline: view()` can tell an element about its own
 * position, but the question here is which of six siblings is the current one,
 * and that is a comparison across elements. The rootMargin below collapses the
 * viewport to a thin band across its middle, so exactly one section is
 * intersecting at a time and "active" needs no scoring, no ratios and no
 * tie-break.
 *
 * The dim itself is CSS (`.dimmable[data-active="false"]` in globals.css),
 * including its measured 0.72 floor and its removal under reduced motion. This
 * file only decides which section is current.
 *
 * Sections register themselves through context rather than being handed down
 * as refs, so the page stays a server component: `DimSection` is a thin client
 * wrapper around server-rendered children, and none of the copy or markup
 * inside it ships as client JavaScript.
 */

type RailContext = {
  active: string | null;
  register: (id: string, el: Element | null) => void;
};

const Ctx = createContext<RailContext>({
  active: null,
  register: () => {},
});

export function RailProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const elements = useRef(new Map<string, Element>());

  const register = useCallback((id: string, el: Element | null) => {
    if (el) elements.current.set(id, el);
    else elements.current.delete(id);
  }, []);

  useEffect(() => {
    /* Ref callbacks commit before effects, and children commit before parents,
       so every section has registered by the time this runs. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const el of elements.current.values()) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const value = useMemo(() => ({ active, register }), [active, register]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/**
 * A section that dims when it is not the one being read.
 *
 * `data-active` is true while nothing has become active yet — that is the
 * state the page loads in, with the hero on screen and no body section near
 * the middle band, and a page that opened with every section already dimmed
 * would read as broken rather than as focused.
 */
export function DimSection({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { active, register } = useContext(Ctx);

  return (
    <section
      id={id}
      ref={(el) => {
        register(id, el);
        return () => register(id, null);
      }}
      data-active={active === null || active === id}
      className={`dimmable ${className}`}
    >
      {children}
    </section>
  );
}
