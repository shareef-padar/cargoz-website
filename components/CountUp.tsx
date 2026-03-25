'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Props = {
  end: number;
  /** Total animation length */
  durationMs?: number;
  suffix?: string;
  className?: string;
  /**
   * When false, holds at 0 and does not run. Use when the counter is in a parent that is
   * hidden (e.g. opacity 0) until revealed — otherwise `useInView` can fire early and the
   * animation finishes before the user sees it.
   */
  enabled?: boolean;
};

/**
 * Counts from 0 → `end` once when scrolled into view (and when `enabled` is true).
 * Respects `prefers-reduced-motion`.
 */
export function CountUp({
  end,
  durationMs = 1100,
  suffix = '',
  className,
  enabled = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.3 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled) {
      started.current = false;
      if (reduce !== true) setValue(0);
      return;
    }
    if (!isInView) return;
    if (reduce) {
      setValue(end);
      return;
    }
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * end));
      if (t < 1) requestAnimationFrame(tick);
      else setValue(end);
    };
    requestAnimationFrame(tick);
  }, [enabled, isInView, end, durationMs, reduce]);

  return (
    <span ref={ref} className={['tw-tabular-nums', className].filter(Boolean).join(' ')}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
