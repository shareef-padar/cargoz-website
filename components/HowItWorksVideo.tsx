'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { sectionSlideUp } from './motionPresets';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { SubtleBlurOrb } from './SubtleBlurOrb';
import { ScrollText } from './ScrollText';

const YOUTUBE_VIDEO_ID = 'pxZWr8kdibA';
const YOUTUBE_EMBED = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&start=1`;
const COVER_IMAGE = '/how-it-works-cover.jpeg';

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function HowItWorksVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const reveal = useSectionReveal();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  /** Clamped pointer position inside thumbnail (px from top-left) — MotionValues avoid React re-renders. */
  const playX = useMotionValue(0);
  const playY = useMotionValue(0);
  const playTransform = useMotionTemplate`translate(${playX}px, ${playY}px) translate(-50%, -50%)`;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const iframeSrc = useMemo(() => (open ? YOUTUBE_EMBED : ''), [open]);

  const centerPlayButton = useCallback(() => {
    const el = thumbRef.current;
    if (!el) return;
    playX.set(el.offsetWidth / 2);
    playY.set(el.offsetHeight / 2);
  }, [playX, playY]);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    centerPlayButton();
  }, [reduceMotion, centerPlayButton]);

  useEffect(() => setPortalReady(true), []);

  return (
    <section
      ref={sectionRef}
      className="tw-relative tw-bg-white tw-px-4 tw-pt-14 md:tw-pt-16 lg:tw-pt-24 tw-pb-0 tw-overflow-hidden"
    >
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[42, -42]}
        className="tw-pointer-events-none tw-absolute tw-inset-0 tw-z-0 tw-bg-white"
      />
      <SubtleBlurOrb sectionRef={sectionRef} tone="teal" position="bottom-right" />

      <div className="tw-relative tw-z-10 tw-container tw-mx-auto">
        <motion.div
          ref={thumbRef}
          variants={sectionSlideUp}
          {...reveal}
          className="tw-relative tw-w-full tw-max-w-6xl tw-mx-auto tw-rounded-[3rem] md:tw-rounded-[3.5rem] lg:tw-rounded-[4.75rem] xl:tw-rounded-[6.25rem] tw-overflow-hidden tw-aspect-[16/9] tw-shadow-[0_24px_80px_-60px_rgba(2,6,23,0.55)]"
          aria-label="Watch how Cargoz works"
          onMouseMove={(e) => {
            if (reduceMotion) return;
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const pad = 28;
            const mx = clamp(e.clientX - rect.left, pad, rect.width - pad);
            const my = clamp(e.clientY - rect.top, pad, rect.height - pad);
            playX.set(mx);
            playY.set(my);
          }}
          onMouseLeave={centerPlayButton}
        >
          <img
            alt="How Cargoz works — video cover"
            src={COVER_IMAGE}
            className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
          />
          <div className="tw-absolute tw-inset-0 tw-bg-black/40" aria-hidden="true" />

          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileHover={reduceMotion ? { scale: 1.04 } : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={
              reduceMotion
                ? {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    x: '-50%',
                    y: '-50%',
                  }
                : {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: playTransform,
                  }
            }
            className="tw-z-10 tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-bg-white/80 tw-backdrop-blur tw-px-4 tw-py-2 tw-border tw-border-white/60 hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-black/20 tw-shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] tw-will-change-transform"
            aria-label="Open video modal"
          >
            <span className="tw-inline-flex tw-w-9 tw-h-9 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-900">
              <svg viewBox="0 0 24 24" className="tw-w-5 tw-h-5 tw-translate-x-[1px]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 8.5V15.5L16 12L10 8.5Z" fill="white" />
              </svg>
            </span>
            <ScrollText
              as="span"
              text="Watch how it works"
              className="tw-text-sm md:tw-text-[18px] tw-font-bold tw-leading-[26px] tw-text-gray-900"
              split="lines"
              amount={0.15}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Portal the modal to body so ancestor transforms don't trap it */}
      {portalReady &&
        createPortal(
          <AnimatePresence>
            {open ? (
              <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="tw-fixed tw-inset-0 tw-z-[100] tw-bg-black/60 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center tw-px-4"
                role="dialog"
                aria-modal="true"
                aria-label="How it works video"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.21, 0.72, 0.22, 1] }}
                  className="tw-w-full tw-max-w-5xl tw-bg-black tw-rounded-3xl tw-overflow-hidden tw-shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="tw-flex tw-items-center tw-justify-between tw-px-4 md:tw-px-6 tw-py-4 tw-bg-black">
                    <div className="tw-text-white tw-font-semibold">Cargoz — How it works</div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-px-3 tw-py-2 tw-text-white/80 hover:tw-text-white hover:tw-bg-white/10 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white/40"
                      aria-label="Close modal"
                    >
                      <span className="tw-text-2xl tw-leading-none">×</span>
                    </button>
                  </div>
                  <div className="tw-aspect-video tw-bg-black">
                    <iframe
                      title="Cargoz — How it works (YouTube)"
                      src={iframeSrc}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="tw-w-full tw-h-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

