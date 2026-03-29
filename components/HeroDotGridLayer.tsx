/**
 * Full-viewport dot grid behind the fixed header and hero.
 * No mask here: the same radial mask used on the old hero-only layer faded to transparent
 * near the top of the viewport, so the strip behind the fixed navbar showed body white.
 * Edge softening is left to the next sections’ solid white backgrounds.
 */
export function HeroDotGridLayer() {
  return (
    <div
      className="tw-pointer-events-none tw-fixed tw-inset-0 tw-z-0 tw-bg-white"
      aria-hidden
      style={{
        backgroundImage:
          'radial-gradient(rgba(125, 136, 156, 0.34) 1.1px, transparent 1.1px)',
        backgroundSize: '21px 21px',
      }}
    />
  );
}
