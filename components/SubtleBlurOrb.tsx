'use client';

import type { RefObject } from 'react';
import { ParallaxBackdrop } from './ParallaxBackdrop';

type Tone = 'purple' | 'teal';
type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const POSITION: Record<Position, string> = {
  'top-right': 'tw-absolute tw--top-14 tw-right-[4%] md:tw-right-[6%]',
  'top-left': 'tw-absolute tw--top-14 tw-left-[4%] md:tw-left-[6%]',
  'bottom-right': 'tw-absolute tw--bottom-16 tw-right-[5%] md:tw-right-[8%]',
  'bottom-left': 'tw-absolute tw--bottom-16 tw-left-[5%] md:tw-left-[8%]',
};

const TONE: Record<Tone, string> = {
  purple: 'tw-bg-purple-400/14',
  teal: 'tw-bg-teal-300/12',
};

/**
 * One soft blurred circle per section — lower opacity & smaller than hero orbs.
 * Uses the same scroll-linked parallax as `ParallaxBackdrop`.
 */
export function SubtleBlurOrb({
  sectionRef,
  tone = 'purple',
  position = 'top-right',
}: {
  sectionRef: RefObject<HTMLElement | null>;
  tone?: Tone;
  position?: Position;
}) {
  return (
    <ParallaxBackdrop
      sectionRef={sectionRef}
      range={[12, -12]}
      className={[
        'tw-pointer-events-none tw-z-[2]',
        POSITION[position],
        'tw-h-[min(220px,36vw)] tw-w-[min(220px,36vw)] tw-rounded-full tw-blur-3xl',
        TONE[tone],
      ].join(' ')}
    />
  );
}
