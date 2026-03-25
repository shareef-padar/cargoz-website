'use client';

import { useId, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { motionViewportInView } from '@/lib/motionViewport';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { SubtleBlurOrb } from './SubtleBlurOrb';
import { faqCardSlideUp } from './motionPresets';

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: 'What is Cargoz and how can it help my business?',
    a: 'Cargoz is a technology platform that assists businesses in finding the right storage space to meet their growing business needs in the UAE and KSA.',
  },
  {
    q: 'How many warehouses does Cargoz work with?',
    a: 'Cargoz works with a large network of verified warehouses across key cities. Availability varies by location and storage type.',
  },
  {
    q: 'What services can I get through Cargoz?',
    a: 'You can access flexible warehousing options, temperature-controlled storage, and value-added services depending on your requirements.',
  },
  {
    q: 'How can I find the warehouse that matches my needs?',
    a: 'Submit your requirements and location. Our team will share matched options and a quotation, then help you finalize the best fit.',
  },
  {
    q: 'Can Cargoz handle pallets, cartons, or other types of packaging?',
    a: 'Yes. Warehouses in our network support different handling requirements including pallets, cartons, and specialized goods (subject to site capability).',
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={[
        'tw-w-5 tw-h-5 tw-text-gray-500 tw-transition-transform tw-duration-200',
        open ? 'tw-rotate-180' : 'tw-rotate-0',
      ].join(' ')}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Faq() {
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="tw-relative tw-bg-white tw-px-4 tw-py-14 md:tw-py-20 tw-overflow-hidden">
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[48, -48]}
        className="tw-absolute tw-inset-0 tw-z-0 tw-bg-white"
      />
      <SubtleBlurOrb sectionRef={sectionRef} tone="teal" position="top-left" />

      <div className="tw-relative tw-z-10 tw-container tw-mx-auto">
        <div className="tw-text-center">
          <h2 className="tw-text-[22px] md:tw-text-4xl tw-font-bold tw-text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="tw-mt-10 tw-max-w-5xl tw-mx-auto tw-space-y-4">
          {FAQS.map((item, idx) => {
            const open = idx === openIdx;
            const buttonId = `${baseId}-btn-${idx}`;
            const panelId = `${baseId}-panel-${idx}`;
            return (
              <motion.div
                key={item.q}
                custom={idx}
                variants={faqCardSlideUp}
                initial={reduceMotion ? 'show' : 'hidden'}
                whileInView={reduceMotion ? undefined : 'show'}
                viewport={reduceMotion ? undefined : motionViewportInView}
                whileHover={{
                  y: -4,
                  boxShadow: '0 24px 50px -40px rgba(121,87,255,0.28)',
                  borderColor: 'rgba(121,87,255,0.30)',
                  transition: { duration: 0.35, ease: [0.21, 0.72, 0.22, 1] },
                }}
                className="tw-rounded-[1.75rem] tw-frost-card tw-overflow-hidden"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="tw-w-full tw-flex tw-items-center tw-justify-between tw-gap-4 tw-text-left tw-px-6 md:tw-px-8 tw-py-5 md:tw-py-6"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIdx(open ? -1 : idx)}
                >
                  <span className="tw-flex-1 tw-min-w-0 tw-text-gray-900 tw-font-semibold tw-text-sm md:tw-text-base">
                    {item.q}
                  </span>
                  <Chevron open={open} />
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.72, 0.22, 1] }}
                      className="tw-px-6 md:tw-px-8 tw-pb-6"
                    >
                      <p className="tw-text-gray-500 tw-text-sm md:tw-text-base tw-leading-7">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

