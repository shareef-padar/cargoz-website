'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { SubtleBlurOrb } from './SubtleBlurOrb';
import { sectionSlideChild, sectionStagger } from './motionPresets';

/** Replace with your Google Business Profile reviews URL when available */
const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Cargoz+warehouse+reviews';

type Review = {
  name: string;
  initial: string;
  initialBg: string;
  border: string;
  text: string;
};

function Stars() {
  return (
    <div className="tw-flex tw-items-center tw-gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="tw-w-4 tw-h-4 tw-shrink-0"
          fill="#FBBF24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.63L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-.64L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/** Standard multi-color Google “G” mark */
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewCard({ review, wide }: { review: Review; wide?: boolean }) {
  return (
    <div
      className={[
        'tw-h-full tw-flex tw-flex-col tw-rounded-[2.25rem] md:tw-rounded-[2.5rem]',
        'tw-frost-card',
        wide
          ? 'tw-p-6 md:tw-p-8 lg:tw-p-9'
          : 'tw-p-6 md:tw-p-7',
        'tw-shadow-[0_20px_50px_-24px_rgba(15,23,42,0.14)]',
        review.border,
      ].join(' ')}
      dir="rtl"
      lang="ar"
    >
      {/* Stars — top (inline-start in RTL = visual right) */}
      <div className="tw-flex tw-w-full tw-justify-start">
        <Stars />
      </div>

      <p className="tw-mt-4 tw-flex-1 tw-text-right tw-text-gray-600 tw-text-sm md:tw-text-[15px] tw-leading-7 md:tw-leading-8 tw-font-medium">
        {review.text}
      </p>

      {/* Avatar (visual right) then name — RTL row */}
      <div className="tw-mt-6 tw-flex tw-items-center tw-gap-3 tw-justify-start">
        <div
          className={`tw-w-10 tw-h-10 tw-rounded-full tw-grid tw-place-items-center tw-text-white tw-font-bold tw-text-sm tw-shrink-0 ${review.initialBg}`}
        >
          {review.initial}
        </div>
        <div className="tw-min-w-0 tw-text-right tw-text-gray-900 tw-font-bold tw-text-sm md:tw-text-base">
          {review.name}
        </div>
      </div>
    </div>
  );
}

export function GoogleReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();
  const reviews: Review[] = [
    {
      name: 'Yassir Eesaafan',
      initial: 'Y',
      initialBg: 'tw-bg-teal-600',
      border: 'tw-border-teal-100/80',
      text: 'من أفضل الشركات اللي تعاملنا معهم صراحة من ناحية التعامل وتدقيق بإجراءات العملية السلسة نصوحاً استفدنا من مرونة مخازنه',
    },
    {
      name: 'Amani Omar',
      initial: 'A',
      initialBg: 'tw-bg-purple-600',
      border: 'tw-border-purple-100/80',
      text: 'سبق وتعاملت مع شركات تخزين ولكن شفت منهم صراحة ارتداء من كارجوز، متعاونين جداً وشكرًا على تعاونكم. وجودة التعامل ممتازة، يعطيهم العافية. أيضاً مصطفى بذل كل جهده عشان يساعدك، متعاون جداً، وكامل الفريق من موظفين متعاونين جداً. سعيدين جدًا بالتعامل معهم وإن شاءالله تكون بداية تعاونات مشتركة بيننا.',
    },
    {
      name: 'Abdelrahman Jamil',
      initial: 'A',
      initialBg: 'tw-bg-red-600',
      border: 'tw-border-red-100/80',
      text: 'تجربة رائعة جداً، واجمل خدمة راقية، والشكر لكل من الموظفين إنه التجاوب فوراً على استفساراتهم وسرعة الاستجابة والرد والمساعدة.',
    },
    {
      name: 'Elaraby Rizk',
      initial: 'E',
      initialBg: 'tw-bg-orange-500',
      border: 'tw-border-orange-100/80',
      text: 'إلى الآن تجربة ممتازة تعاملها متفاهمين ومتجاوبين. وأستاذ كريم منسق معنا. شكراً لكم 100%',
    },
    {
      name: 'Bandar',
      initial: 'B',
      initialBg: 'tw-bg-rose-500',
      border: 'tw-border-rose-100/80',
      text: 'من أفضل شركات التخزين أشكر الأستاذ فراس على حسن التعامل وسرعة الاستجابة. نرجو استمرار التعاون والرد السريع. شكراً للمتعاونين وإدارة الحساب.',
    },
    {
      name: 'Karin Hamed',
      initial: 'K',
      initialBg: 'tw-bg-blue-600',
      border: 'tw-border-blue-100/80',
      text: 'حابب اشكركم جداً على تعاونكم وحرصكم. العمل جداً دقيق وممتعه. الحمد لله في أي وقت شكراً جداً.',
    },
    {
      name: 'Mohammed Al Suwaidi',
      initial: 'M',
      initialBg: 'tw-bg-indigo-600',
      border: 'tw-border-indigo-100/80',
      text: 'خدمة ممتازة وتنظيم رائع للمخزن، التواصل واضح والتسليم في الوقت المحدد. أنصح بالتعامل مع كارجوز.',
    },
  ];

  /** Bento: row 1 = 3+6+3, row 2 = four equal (3+3+3+3) on a 12-col grid — 7 cards */
  const BENTO_SPANS = [
    'tw-col-span-full lg:tw-col-span-3',
    'tw-col-span-full lg:tw-col-span-6',
    'tw-col-span-full lg:tw-col-span-3',
    'tw-col-span-full lg:tw-col-span-3',
    'tw-col-span-full lg:tw-col-span-3',
    'tw-col-span-full lg:tw-col-span-3',
    'tw-col-span-full lg:tw-col-span-3',
  ] as const;

  return (
    <section ref={sectionRef} className="tw-relative tw-bg-white tw-px-4 tw-py-14 md:tw-py-20 tw-overflow-hidden">
      <ParallaxBackdrop
        sectionRef={sectionRef}
        range={[52, -52]}
        className="tw-absolute tw-inset-0 tw-z-0 tw-bg-white"
      />
      <SubtleBlurOrb sectionRef={sectionRef} tone="purple" position="bottom-left" />

      <div className="tw-relative tw-z-10 tw-container tw-mx-auto tw-max-w-7xl">
        <div className="tw-text-center">
          <p className="tw-text-purple-500 tw-font-semibold tw-text-sm md:tw-text-base">Loved by Customers</p>
          <div className="tw-mt-2 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-x-2 tw-gap-y-1 tw-text-[22px] md:tw-text-4xl tw-font-bold tw-text-gray-900 tw-font-outfit">
            <span className="tw-inline-block">5.0 Star-Rated on</span>
            <GoogleLogo className="tw-w-7 tw-h-7 md:tw-w-9 md:tw-h-9 tw-shrink-0" />
            <span className="tw-inline-block">Google</span>
          </div>
        </div>

        <motion.div
          className="tw-mt-12 tw-grid tw-grid-cols-1 tw-gap-5 lg:tw-grid-cols-12 lg:tw-gap-x-6 lg:tw-gap-y-8"
          variants={sectionStagger}
          {...reveal}
        >
          {reviews.slice(0, 7).map((review, index) => (
            <motion.div
              key={review.name + review.initial}
              variants={sectionSlideChild}
              className={BENTO_SPANS[index]}
            >
              <ReviewCard review={review} wide={index === 1} />
            </motion.div>
          ))}
        </motion.div>

        <div className="tw-mt-10 tw-flex tw-justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tw-inline-flex tw-items-center tw-gap-1 tw-text-purple-600 tw-font-semibold tw-text-sm md:tw-text-base hover:tw-text-purple-700 tw-underline-offset-4 hover:tw-underline tw-transition-colors"
          >
            <span className="tw-text-inherit">Read All Google Reviews</span>
            <span aria-hidden className="tw-text-lg tw-leading-none">
              ›
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
