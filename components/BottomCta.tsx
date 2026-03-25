'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { ScrollText } from './ScrollText';
import { sectionSlideUp } from './motionPresets';

/**
 * Sits between FAQ (white) and footer (navy): background is split so the card
 * “bridges” the two surfaces; negative margin pulls the footer up under the card.
 */
export function BottomCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();

  return (
    <section
      ref={sectionRef}
      className="tw-relative tw-z-20 tw-overflow-visible tw-bg-white tw-px-4 tw-py-12 md:tw-py-16 lg:tw-py-20"
      aria-label="Get a storage quote"
    >
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[26, -26]}
        className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-z-0 tw-h-full tw-bg-white"
      />

      <div className="tw-relative tw-z-10 tw-container tw-mx-auto">
        <motion.div
          variants={sectionSlideUp}
          {...reveal}
          className={[
            'tw-relative tw-z-20 tw-w-full tw-max-w-7xl tw-mx-auto',
            /* Float over the footer — tune with Footer top padding */
            'tw-mb-[-6.5rem] sm:tw-mb-[-7.5rem] md:tw-mb-[-9rem] lg:tw-mb-[-10rem]',
            'tw-overflow-hidden tw-rounded-[3rem] md:tw-rounded-[3.5rem] lg:tw-rounded-[4rem]',
            'tw-border tw-border-white/10',
            'tw-shadow-[0_28px_90px_-24px_rgba(0,0,0,0.45)]',
            'tw-bg-[linear-gradient(90deg,#0F766E_0%,#2563EB_55%,#7C3AED_100%)]',
          ].join(' ')}
        >
          <div className="tw-relative tw-z-10 tw-grid tw-grid-cols-1 md:tw-grid-cols-12 md:tw-items-stretch md:tw-min-h-[280px] lg:tw-min-h-[320px]">
            <div className="md:tw-col-span-7 tw-flex tw-flex-col tw-justify-center tw-px-8 tw-pt-10 tw-pb-6 md:tw-px-12 md:tw-py-12 lg:tw-px-14 lg:tw-py-14">
              <ScrollText
                as="h2"
                text="Looking for Flexible Storage for Your Goods?"
                className="tw-max-w-xl tw-text-white tw-font-outfit tw-text-3xl md:tw-text-4xl lg:tw-text-[2.5rem] tw-font-bold tw-leading-[1.15] tw-tracking-tight"
                split="words"
                amount={0.55}
              />
              <div className="tw-mt-7 md:tw-mt-8">
                <Link
                  href="/quote"
                  className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-px-8 tw-py-3.5 tw-text-base md:tw-text-lg tw-font-semibold tw-text-[#0F766E] tw-no-underline tw-shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] tw-transition tw-duration-200 hover:tw-bg-white hover:tw-shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)] hover:tw--translate-y-0.5 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-[#0F766E]"
                >
                  Get your quote
                </Link>
              </div>
            </div>

            <div className="tw-relative md:tw-col-span-5 tw-min-h-[200px] tw-h-[220px] sm:tw-min-h-[240px] sm:tw-h-[260px] md:tw-min-h-0 md:tw-h-full">
              <Image
                src="/bottom-cta-asset.png"
                alt="Isometric warehouse and logistics illustration"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="tw-object-contain tw-object-bottom tw-object-right tw-select-none tw-pointer-events-none tw-pr-2 md:tw-pr-0 tw-pb-2 md:tw-pb-0"
                priority={false}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
