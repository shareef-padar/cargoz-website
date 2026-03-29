'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { SubtleBlurOrb } from './SubtleBlurOrb';
import { ScrollText } from './ScrollText';
import { sectionSlideChild, sectionStagger } from './motionPresets';

function StepCard({
  step,
  title,
  desc,
  icon,
}: {
  step: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={sectionSlideChild}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -6, boxShadow: '0 28px 60px -40px rgba(0,0,0,0.14)', borderColor: 'rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tw-relative tw-rounded-[2.25rem] tw-frost-card tw-p-6 md:tw-p-7 tw-cursor-default tw-will-change-transform"
    >
      <div className="tw-absolute tw-left-1/2 -tw-translate-x-1/2 -tw-top-3 tw-w-8 tw-h-8 tw-rounded-full tw-bg-white tw-border tw-border-gray-200 tw-grid tw-place-items-center tw-text-xs tw-font-bold tw-text-gray-900">
        {step}
      </div>
      <div className="tw-mt-4 tw-flex tw-items-center tw-justify-center tw-text-primary-500">
        <div className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center">{icon}</div>
      </div>
      <ScrollText
        as="div"
        text={title}
        className="tw-mt-4 tw-text-center tw-text-gray-900 tw-font-semibold"
        split="words"
        amount={0.15}
      />
      <ScrollText
        as="div"
        text={desc}
        className="tw-mt-2 tw-text-center tw-text-sm tw-leading-6 tw-text-gray-500"
        split="words"
        amount={0.12}
      />
    </motion.div>
  );
}

export function FourSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();

  return (
    <section ref={sectionRef} className="tw-relative tw-bg-white tw-px-4 tw-pb-14 md:tw-pb-20 tw-overflow-hidden">
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[54, -54]}
        className="tw-absolute tw-inset-0 tw-z-0 tw-bg-white"
      />
      <SubtleBlurOrb sectionRef={sectionRef} tone="teal" position="top-right" />
      <div className="tw-relative tw-z-10 tw-container tw-mx-auto">
        <div className="tw-text-center tw-mt-14 md:tw-mt-20">
          <ScrollText
            as="h2"
            text="Find Storage in 4 Simple Steps"
            className="tw-text-[22px] md:tw-text-4xl tw-font-bold tw-text-gray-900"
            split="words"
            amount={0.6}
          />
        </div>

        <motion.div
          variants={sectionStagger}
          {...reveal}
          className="tw-mt-10 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-max-w-6xl tw-mx-auto"
        >
          <StepCard
            step={1}
            title="Submit Requirements"
            desc='Click "Get Free Quote", enter details, and submit.'
            icon={
              <svg viewBox="0 0 24 24" className="tw-w-10 tw-h-10" fill="none">
                <path d="M7 3h7l3 3v15H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M10 11h5M10 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <StepCard
            step={2}
            title="Get Consultation"
            desc="Storage advisor will connect in 3 hours to discuss details."
            icon={
              <svg viewBox="0 0 24 24" className="tw-w-10 tw-h-10" fill="none">
                <path d="M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 12v4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 12v4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            }
          />
          <StepCard
            step={3}
            title="Review Quotation"
            desc="You'll get a detailed quotation for review within 24 hours."
            icon={
              <svg viewBox="0 0 24 24" className="tw-w-10 tw-h-10" fill="none">
                <path d="M9 11l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 3h10v18H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            }
          />
          <StepCard
            step={4}
            title="Start Storage"
            desc="Easily move in your goods and we'll store them safely."
            icon={
              <svg viewBox="0 0 24 24" className="tw-w-10 tw-h-10" fill="none">
                <path d="M3 9l9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M3 15l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}

