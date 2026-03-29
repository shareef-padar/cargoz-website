'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { motionViewportInView } from '@/lib/motionViewport';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { SubtleBlurOrb } from './SubtleBlurOrb';
import { ScrollText } from './ScrollText';
import { sectionSlideChild, sectionSlideUp, sectionStagger } from './motionPresets';

function Item({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div variants={sectionSlideChild} className="tw-flex tw-items-center tw-gap-3 tw-text-gray-500">
      <span className="tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center tw-text-primary-500">
        {icon}
      </span>
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

function WareCard({ card }: { card: { title: string; img: string; desc: string; icon: React.ReactNode } }) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
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
      variants={sectionSlideChild}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      whileHover={reduceMotion ? undefined : { y: -6, boxShadow: '0 28px 60px -40px rgba(0,0,0,0.14)', borderColor: 'rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tw-rounded-[2.25rem] tw-frost-card tw-overflow-hidden tw-will-change-transform"
    >
      <div className="tw-p-6">
        <div className="tw-h-36 tw-rounded-2xl tw-overflow-hidden tw-border tw-border-gray-100 tw-bg-gray-50 tw-flex tw-items-center tw-justify-center">
          <img
            src={card.img}
            alt={card.title}
            className="tw-w-full tw-h-full tw-object-contain tw-p-2"
          />
        </div>
        <div className="tw-mt-5 tw-flex tw-items-center tw-gap-2 tw-text-gray-900 tw-font-semibold">
          <span className="tw-text-primary-500">{card.icon}</span>
          <ScrollText
            as="span"
            text={card.title}
            className="tw-text-inherit"
            split="lines"
            amount={0.12}
          />
        </div>
        <ScrollText
          as="div"
          text={card.desc}
          className="tw-mt-2 tw-text-sm tw-leading-6 tw-text-gray-500"
          split="words"
          amount={0.1}
        />
      </div>
    </motion.div>
  );
}

function IllustrationBlock() {
  return (
    <div className="tw-relative tw-w-full tw-max-w-[420px]">
      <img
        src="/warehousing-options.png"
        alt="Warehousing options"
        className="tw-w-full tw-h-auto tw-object-contain tw-drop-shadow-xl"
      />
    </div>
  );
}

export function WarehousingOptions() {
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();
  const reduce = useReducedMotion();

  return (
    <section ref={sectionRef} className="tw-relative tw-bg-white tw-px-4 tw-py-14 md:tw-py-20 tw-overflow-hidden">
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[58, -58]}
        className="tw-absolute tw-inset-0 tw-z-0 tw-bg-white"
      />
      <SubtleBlurOrb sectionRef={sectionRef} tone="teal" position="bottom-right" />

      <div className="tw-relative tw-z-10 tw-container tw-mx-auto">
        <div className="tw-text-center tw-mb-10 md:tw-mb-12">
          <ScrollText
            as="p"
            text="Find storage solutions that fit your business"
            className="tw-text-gray-500 tw-font-semibold tw-text-sm md:tw-text-base"
            split="lines"
            amount={0.7}
          />
          <ScrollText
            as="h2"
            text="Warehousing options for all types of goods"
            className="tw-mt-2 tw-text-[22px] md:tw-text-4xl tw-font-bold tw-text-gray-900"
            split="words"
            amount={0.55}
          />
        </div>

        <motion.div
          variants={sectionSlideUp}
          {...reveal}
          className="tw-w-full tw-max-w-6xl tw-mx-auto tw-rounded-[3rem] md:tw-rounded-[4rem] tw-frost-card tw-p-6 md:tw-p-12"
        >
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-10 lg:tw-gap-12 tw-items-center">
            <div className="lg:tw-col-span-5 tw-flex tw-justify-center">
              <IllustrationBlock />
            </div>
            <div className="lg:tw-col-span-7">
              <ScrollText
                as="div"
                text="Different types of warehouses"
                className="tw-text-gray-900 tw-font-bold tw-text-base md:tw-text-lg"
                split="words"
                amount={0.15}
              />

              <motion.div
                variants={sectionStagger}
                initial={reduce ? 'show' : 'hidden'}
                whileInView={reduce ? undefined : 'show'}
                viewport={reduce ? undefined : motionViewportInView}
                className="tw-mt-6 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-10 tw-gap-y-5"
              >
                <Item
                  label="Ambient & Dry"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    </svg>
                  }
                />
                <Item
                  label="Short / Long Term"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M7 4v3M17 4v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <Item
                  label="Chemical & Dangerous Goods"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M10 2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    </svg>
                  }
                />
                <Item
                  label="Medical & Pharma"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 21s7-4.6 9.2-9C19 8.7 16.9 6 13.8 6c-1.7 0-3 .8-3.8 1.9C9.2 6.8 7.9 6 6.2 6 3.1 6 1 8.7 2.8 12 5 16.4 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
                <Item
                  label="SFDA Approved"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <Item
                  label="Bulk / Pallet Space"
                  icon={
                    <svg viewBox="0 0 24 24" className="tw-w-6 tw-h-6" fill="none">
                      <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M7 17v3M12 17v3M17 17v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  }
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionStagger}
          initial={reduce ? 'show' : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={reduce ? undefined : motionViewportInView}
          className="tw-mt-10 md:tw-mt-12 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-max-w-6xl tw-mx-auto"
        >
          {[
            {
              title: 'Size',
              img: '/warehouse-size.png',
              desc: 'Flexible storage from 10 SQM to 10,000 SQM, available weekly, monthly, or yearly.',
              icon: (
                <svg viewBox="0 0 24 24" className="tw-w-5 tw-h-5" fill="none">
                  <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M4 12h3M17 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: 'Type',
              img: '/storage-interior.png',
              desc: 'General cargo includes engineering goods, textiles, pharmaceuticals, spices, and more.',
              icon: (
                <svg viewBox="0 0 24 24" className="tw-w-5 tw-h-5" fill="none">
                  <path d="M4 20V8l8-4 8 4v12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M8 20v-6h8v6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              title: 'Location',
              img: '/ksa-map.png',
              desc: 'Find warehouses within the city or in nearby industrial locations.',
              icon: (
                <svg viewBox="0 0 24 24" className="tw-w-5 tw-h-5" fill="none">
                  <path d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              ),
            },
          ].map((card) => (
            <WareCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

