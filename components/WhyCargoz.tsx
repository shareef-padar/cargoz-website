'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { motionViewportInView } from '@/lib/motionViewport';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { SubtleBlurOrb } from './SubtleBlurOrb';
import { ScrollText } from './ScrollText';
import { sectionSlideChild, sectionSlideUp, sectionStagger } from './motionPresets';

function FeatureRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.div variants={sectionSlideChild} className="tw-flex tw-items-center tw-gap-3 tw-text-gray-500">
      <div className="tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-text-primary-500">
        {icon}
      </div>
      <ScrollText
        as="span"
        text={label}
        className="tw-text-sm md:tw-text-base"
        split="words"
        amount={0.1}
      />
    </motion.div>
  );
}

export function WhyCargoz() {
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const hexY = useTransform(scrollYProgress, [0, 1], [64, -64]);

  return (
    <section ref={sectionRef} className="tw-relative tw-bg-white tw-px-4 tw-py-14 md:tw-py-20 tw-overflow-hidden">
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[64, -64]}
        className="tw-absolute tw-inset-0 tw-z-0 tw-bg-white"
      />
      <SubtleBlurOrb sectionRef={sectionRef} tone="teal" position="top-right" />

      <div className="tw-relative tw-z-10 tw-container tw-mx-auto">
        <motion.div
          variants={sectionSlideUp}
          {...reveal}
          className="tw-w-full tw-max-w-6xl tw-mx-auto tw-rounded-[3rem] md:tw-rounded-[4rem] tw-frost-card tw-p-6 md:tw-p-12"
        >
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-10 lg:tw-gap-12 tw-items-center">
            {/* Left: image */}
            <div className="lg:tw-col-span-5 tw-flex tw-items-center tw-justify-center">
              <motion.div style={{ y: hexY }} className="tw-relative tw-w-full tw-max-w-[420px]">
                <motion.div
                  className="tw-will-change-transform"
                  animate={reduce ? false : { y: [0, -5, 0] }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  <img
                    src="/why-cargoz.png"
                    alt="Why Cargoz — warehouse team"
                    className="tw-w-full tw-h-auto tw-object-contain tw-drop-shadow-xl"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right: copy + list */}
            <div className="lg:tw-col-span-7">
              <ScrollText
                as="p"
                text="Why Cargoz?"
                className="tw-text-gray-500 tw-font-semibold tw-text-sm md:tw-text-base"
                split="lines"
                amount={0.6}
              />
              <ScrollText
                as="h2"
                text="Storage that works Experience you’ll love"
                className="tw-mt-2 tw-text-[22px] md:tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-gray-900 tw-leading-snug"
                split="words"
                amount={0.55}
              />

              <motion.div
                variants={sectionStagger}
                initial={reduce ? 'show' : 'hidden'}
                whileInView={reduce ? undefined : 'show'}
                viewport={reduce ? undefined : motionViewportInView}
                className="tw-mt-7 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-10 tw-gap-y-5"
              >
                <FeatureRow
                  label="Any Type, Any Size, Any Location"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 3v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="No Hidden Fees"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 22a10 10 0 1 0-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="Monthly Payments"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M7 4v3M17 4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="Pay as you Use Model"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 7H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="No Annual Contracts"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M7 7h10v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 3h6v4H9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="No Real Estate Brokers Involved"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M4 22a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M19 5l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

