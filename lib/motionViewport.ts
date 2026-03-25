/**
 * Shared Framer Motion `viewport` for `whileInView` animations.
 *
 * Without a generous `margin`, IntersectionObserver can fail to fire when
 * ancestors use `overflow-x-hidden` (or similar), leaving `initial="hidden"`
 * content stuck at opacity 0.
 */
export const motionViewportInView = {
  once: true as const,
  /** Low threshold so a sliver of visibility counts */
  amount: 0.05 as const,
  /** Pixels only — percentage margins can break IntersectionObserver in some browsers */
  margin: '0px 0px 200px 0px',
};
