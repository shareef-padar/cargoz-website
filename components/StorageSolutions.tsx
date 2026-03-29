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

export function StorageSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const hexY = useTransform(scrollYProgress, [0, 1], [64, -64]);

  return (
    <section ref={sectionRef} className="tw-relative tw-bg-white tw-px-4 tw-pb-12 md:tw-pb-20 tw-overflow-hidden">
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[64, -64]}
        className="tw-absolute tw-inset-0 tw-z-0 tw-bg-white"
      />
      <SubtleBlurOrb sectionRef={sectionRef} tone="teal" position="top-left" />
      <div className="tw-relative tw-z-10 tw-container tw-mx-auto">
        <motion.div
          variants={sectionSlideUp}
          {...reveal}
          className="tw-w-full tw-max-w-6xl tw-mx-auto tw-rounded-[3rem] md:tw-rounded-[4rem] tw-frost-card tw-p-6 md:tw-p-12"
        >
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-10 lg:tw-gap-12 tw-items-center">
            {/* Left: copy */}
            <div className="lg:tw-col-span-7">
              <ScrollText
                as="p"
                text="Storage solutions"
                className="tw-text-gray-500 tw-font-semibold tw-text-sm md:tw-text-base"
                split="lines"
                amount={0.6}
              />
              <ScrollText
                as="h2"
                text="We assist you in finding the best storage for goods"
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
                  label="Ambient Warehouse"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 8l6-5 6 5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M7 21h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="Fire Safety Systems"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 2c3 4 6 6 6 11a6 6 0 1 1-12 0c0-3 2-5 3-7 1 2 2 3 3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="24/7 CCTV & Security Personnel"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M4 7h10l2 3H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M6 10v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M14 10v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 13a3 3 0 1 0 0-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="Insured Warehouse"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="SFDA Approved Warehouses"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 2 2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <FeatureRow
                  label="Inventory Management"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M18 15v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
              </motion.div>
            </div>

            {/* Right: image */}
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
                    src="/storage-solution.png"
                    alt="Storage solutions — warehouse team"
                    className="tw-w-full tw-h-auto tw-object-contain tw-drop-shadow-xl"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

