"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export type RevealVariant = "up" | "mask" | "lines";

type RevealProps = {
  children: ReactNode;
  /** "up" fades and rises, "mask" wipes a clip-path, "lines" staggers block children. */
  variant?: RevealVariant;
  /** Delay in ms before this element animates once in view. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Anchor target, e.g. for a section deep-linked from a redirect. */
  id?: string;
};

/**
 * Scroll-triggered reveal. All visual states live in globals.css under
 * `.motion-ready`, so this component only observes intersection and flips a
 * class — there is no per-component animation logic and nothing is hidden
 * when JS is unavailable or reduced motion is requested.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the motion layer is inactive the element is already in its final
    // state; skip observing entirely.
    if (!document.documentElement.classList.contains("motion-ready")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
