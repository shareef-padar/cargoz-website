'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { QuoteBuilder } from './QuoteBuilder';
import { motion, useReducedMotion } from 'framer-motion';
import { LogoSlider } from './LogoSlider';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { CountUp } from './CountUp';

const HERO_HEADLINE = 'Find your warehouse today.\nMove in tomorrow.';

/** Soft ease-in (slow start) — calmer than the default snappy section preset */
const heroEaseIn: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** Orchestrates stagger only; each row fades/slides via `heroRestItemVariants` */
const heroRestVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.17,
      delayChildren: 0.42,
    },
  },
} as const;

const heroRestItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: heroEaseIn,
    },
  },
} as const;

function useHeroTypewriter(enabled: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(HERO_HEADLINE);
      setComplete(true);
      return;
    }

    setDisplayed('');
    setComplete(false);
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const delayAfter = (index: number) => {
      if (index <= 0) return 520;
      const prev = HERO_HEADLINE[index - 1];
      const ch = HERO_HEADLINE[index];
      if (prev === '.' || prev === '!' || prev === '?') return 360;
      if (ch === ' ') return 32;
      return 42;
    };

    const tick = (nextLen: number) => {
      if (cancelled) return;
      if (nextLen > HERO_HEADLINE.length) {
        setComplete(true);
        return;
      }
      setDisplayed(HERO_HEADLINE.slice(0, nextLen));
      if (nextLen === HERO_HEADLINE.length) {
        setComplete(true);
        return;
      }
      timeoutId = setTimeout(() => tick(nextLen + 1), delayAfter(nextLen));
    };

    timeoutId = setTimeout(() => tick(1), 480);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [enabled]);

  return { displayed, complete };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = reduceMotionPref === true;
  const { displayed, complete } = useHeroTypewriter(!reduceMotion);
  /** After H1 finishes (or immediately if reduced motion), reveal stats → copy → CTA → logos */
  const showHeroRest = complete || reduceMotion;

  return (
    <section
      ref={sectionRef}
      className="tw-relative tw-min-w-0 tw-overflow-x-hidden tw-pt-10 md:tw-pt-16 tw-min-h-[calc(100vh-140px)] md:tw-min-h-[calc(100vh-160px)] tw-flex tw-items-center"
    >
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[39, -36]}
        className="tw-pointer-events-none tw-absolute tw-top-8 tw-right-[8%] tw-z-[2] tw-h-[min(380px,55vw)] tw-w-[min(380px,70vw)] tw-rounded-full tw-bg-purple-300/30 tw-blur-3xl"
      />
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[27, -51]}
        className="tw-pointer-events-none tw-absolute tw-top-1/2 tw--left-[18%] tw-z-[2] tw-h-[min(300px,50vw)] tw-w-[min(300px,60vw)] tw-rounded-full tw-bg-teal-200/25 tw-blur-3xl"
      />
      <div className="tw-relative tw-z-10 tw-container tw-mx-auto tw-px-4 tw-flex tw-flex-col tw-items-center tw-gap-8 md:tw-gap-10">
        <div className="tw-text-center tw-w-full tw-max-w-5xl tw-mx-auto">
          <h1 className="tw-mt-4 tw-text-[2rem] md:tw-text-[3.35rem] lg:tw-text-[4.25rem] 2xl:tw-text-7xl tw-font-black tw-text-gray-900 tw-leading-tight">
            <span className="tw-sr-only">{HERO_HEADLINE}</span>
            <span className="tw-grid tw-w-full tw-text-center" aria-hidden="true">
              <span className="tw-col-start-1 tw-row-start-1 tw-invisible tw-whitespace-pre-wrap">
                {'Find your warehouse today.\nMove in tomorrow.'}
              </span>
              <span className="tw-col-start-1 tw-row-start-1 tw-whitespace-pre-wrap">
                {complete ? (
                  <>
                    {'Find your warehouse today.\n'}
                    {'Move in '}
                    <span className="tw-gradient-text">tomorrow.</span>
                  </>
                ) : (
                  <>
                    {displayed}
                    <span
                      className="tw-inline-block tw-w-[0.08em] tw-animate-pulse tw-text-gray-400 tw-align-baseline"
                      aria-hidden
                    >
                      |
                    </span>
                  </>
                )}
              </span>
            </span>
          </h1>
        </div>

        <motion.div
          variants={heroRestVariants}
          initial="hidden"
          animate={showHeroRest ? 'show' : 'hidden'}
          aria-hidden={!showHeroRest}
          className="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-8 md:tw-gap-10"
        >
          <motion.div
            variants={heroRestItemVariants}
            className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-x-3 tw-gap-y-2 md:tw-gap-x-4"
          >
            {[
              { src: '/hero-social-customers.png', label: <><CountUp end={2000} suffix="+" enabled={showHeroRest} /> customers</>, delay: 0 },
              { src: '/hero-social-warehouses.png', label: <><CountUp end={800} suffix="+" enabled={showHeroRest} /> verified warehouses</>, delay: 0.15 },
              { src: '/hero-social-google.png', label: <>5.0 star-rated on Google</>, delay: 0.3 },
            ].map(({ src, label, delay }) => (
              <motion.span
                key={src}
                animate={showHeroRest && !reduceMotion ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay }}
                className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-gray-200/80 tw-bg-white/70 tw-backdrop-blur-sm tw-px-3 tw-py-1.5 tw-text-gray-600 tw-text-sm md:tw-text-base tw-shadow-sm"
              >
                <Image src={src} alt="" width={20} height={20} className="tw-h-5 tw-w-5 tw-shrink-0 tw-object-contain" />
                {label}
              </motion.span>
            ))}
          </motion.div>

          <div className="tw-text-center">
            <motion.p
              variants={heroRestItemVariants}
              className="tw-mt-3 tw-text-sm md:tw-text-base lg:tw-text-lg tw-text-gray-600"
            >
              Get access to{' '}
              <span className="tw-font-bold tw-text-gray-900">
                <CountUp end={300_000} suffix="+ SQM" durationMs={1400} enabled={showHeroRest} />
              </span>{' '}
              of verified warehouse space matched to your business needs.
            </motion.p>
          </div>

          <div className="tw-flex tw-flex-col tw-items-center tw-gap-8 tw-w-full">
            <motion.div variants={heroRestItemVariants} className="tw-w-full tw-max-w-4xl">
              <QuoteBuilder />
            </motion.div>

            <motion.div variants={heroRestItemVariants} className="tw-w-full">
              <p className="tw-text-xs md:tw-text-sm tw-text-gray-400 tw-text-center -tw-mb-4">
                Trusted by great companies just like you
              </p>
            </motion.div>
            {/* Full-bleed strip without translate (Framer variants use transform for slide-up — would override left-1/2 -translate-x-1/2) */}
            <motion.div
              variants={heroRestItemVariants}
              className="tw-w-[100dvw] tw-max-w-[100vw] tw-ml-[calc(50%-50dvw)]"
            >
              <LogoSlider />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
