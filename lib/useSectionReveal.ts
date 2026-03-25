'use client';

import { useReducedMotion } from 'framer-motion';
import { motionViewportInView } from './motionViewport';

/** Props for `motion.*` scroll reveals — skips animation when `prefers-reduced-motion` is set. */
export function useSectionReveal() {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? ('show' as const) : ('hidden' as const),
    whileInView: reduce ? undefined : ('show' as const),
    viewport: reduce ? undefined : motionViewportInView,
  };
}
