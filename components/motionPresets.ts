import type { Variants } from 'framer-motion';

/**
 * `hidden` keeps opacity: 1 so SSR / failed observers never leave the page blank.
 * Blur + motion reads as a “reveal” without invisible text.
 */
export const cardReveal: Variants = {
  hidden: {
    opacity: 1,
    y: 18,
    scale: 0.985,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.21, 0.72, 0.22, 1] },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.16,
    },
  },
};

export const itemReveal: Variants = {
  hidden: { opacity: 1, y: 12, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.21, 0.72, 0.22, 1] },
  },
};

/** FAQ accordion rows: slide up on scroll. Pass `custom={index}` for stagger delay. */
export const faqCardSlideUp: Variants = {
  hidden: { opacity: 1, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: typeof i === 'number' ? i * 0.07 : 0,
      ease: [0.21, 0.72, 0.22, 1],
    },
  }),
};

/** Large section blocks / frosted cards — slide up, no blur (pairs with FAQ motion language). */
export const sectionSlideUp: Variants = {
  hidden: { opacity: 1, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.72, 0.22, 1] },
  },
};

/** Parent for staggered `sectionSlideChild` items (grids, hero chips, etc.). */
export const sectionStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Stagger child: short slide up, no blur. */
export const sectionSlideChild: Variants = {
  hidden: { opacity: 1, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.72, 0.22, 1] },
  },
};

