'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';

type Props = {
  /** Must be the same ref attached to the parent `<section>` / `<footer>` */
  sectionRef: RefObject<HTMLElement | null>;
  /** Vertical parallax travel in px as the section crosses the viewport */
  range?: [number, number];
  className?: string;
};

/**
 * Scroll-linked vertical shift for decorative backgrounds (not for body text).
 * Disabled when `prefers-reduced-motion: reduce`.
 */
export function ParallaxBackdrop({ sectionRef, range = [54, -54], className }: Props) {
  const reduce = useReducedMotion();
  // `layoutEffect: false` — target ref lives on the parent section; default useLayoutEffect runs
  // before the ref is hydrated when this component is a child (Framer warns + scroll can mis-bind).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });
  const y = useTransform(scrollYProgress, [0, 1], range);

  if (reduce) {
    return <div className={className} aria-hidden />;
  }

  return (
    <motion.div
      className={['tw-will-change-transform', className].filter(Boolean).join(' ')}
      style={{ y }}
      aria-hidden
    />
  );
}
