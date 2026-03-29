'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { ScrollText } from './ScrollText';
import { sectionSlideUp } from './motionPresets';

const CITIES = [
  { name: 'Riyadh', nameAr: 'الرياض', x: 52, y: 48, size: 'lg', warehouses: 24 },
  { name: 'Jeddah', nameAr: 'جدة', x: 28, y: 56, size: 'lg', warehouses: 18 },
  { name: 'Dammam', nameAr: 'الدمام', x: 73, y: 42, size: 'md', warehouses: 12 },
  { name: 'Mecca', nameAr: 'مكة', x: 26, y: 52, size: 'sm', warehouses: 7 },
  { name: 'Medina', nameAr: 'المدينة', x: 30, y: 38, size: 'sm', warehouses: 6 },
  { name: 'Khobar', nameAr: 'الخبر', x: 76, y: 44, size: 'sm', warehouses: 5 },
  { name: 'Tabuk', nameAr: 'تبوك', x: 18, y: 26, size: 'sm', warehouses: 4 },
  { name: 'Abha', nameAr: 'أبها', x: 34, y: 72, size: 'sm', warehouses: 3 },
];

const STATS = [
  { value: '79+', label: 'Verified Warehouses' },
  { value: '8', label: 'Cities Covered' },
  { value: '500K+', label: 'Sq. Meters Available' },
  { value: '24h', label: 'Avg. Response Time' },
];

type CitySize = 'lg' | 'md' | 'sm';

const dotSize: Record<CitySize, string> = {
  lg: 'tw-w-4 tw-h-4',
  md: 'tw-w-3 tw-h-3',
  sm: 'tw-w-2.5 tw-h-2.5',
};

const pulseSize: Record<CitySize, string> = {
  lg: 'tw-w-8 tw-h-8',
  md: 'tw-w-6 tw-h-6',
  sm: 'tw-w-5 tw-h-5',
};

export function CoverageMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();

  return (
    <section
      ref={sectionRef}
      className="tw-relative tw-bg-slate-950 tw-py-20 md:tw-py-28 tw-overflow-hidden"
      aria-label="Our coverage"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,58,237,0.12),transparent_70%)]"
      />

      <div className="tw-relative tw-z-10 tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-max-w-7xl">
        {/* Heading */}
        <div className="tw-text-center tw-mb-12 md:tw-mb-16">
          <ScrollText
            as="h2"
            text="We Cover the Kingdom"
            className="tw-font-outfit tw-text-3xl md:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-white tw-tracking-tight"
            split="words"
            amount={0.4}
          />
          <ScrollText
            as="p"
            text="Premium storage solutions in Saudi Arabia's most strategic cities."
            className="tw-mt-4 tw-text-slate-400 tw-text-base md:tw-text-lg tw-max-w-xl tw-mx-auto"
            split="words"
            amount={0.4}
          />
        </div>

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-8 lg:tw-gap-12 tw-items-center">
          {/* Map */}
          <motion.div
            variants={sectionSlideUp}
            {...reveal}
            className="lg:tw-col-span-7 tw-relative tw-aspect-[4/3] tw-rounded-3xl tw-overflow-hidden tw-bg-slate-900 tw-border tw-border-white/5 tw-shadow-2xl"
          >
            {/* SVG map of Saudi Arabia — simplified outline */}
            <svg
              viewBox="0 0 100 90"
              className="tw-absolute tw-inset-0 tw-w-full tw-h-full"
              aria-hidden="true"
            >
              {/* KSA simplified shape */}
              <path
                d="M15 20 L25 10 L45 8 L65 10 L82 18 L88 30 L90 50 L85 65 L75 75 L60 80 L45 82 L30 78 L20 68 L15 55 L12 40 Z"
                fill="rgba(124,58,237,0.06)"
                stroke="rgba(124,58,237,0.25)"
                strokeWidth="0.5"
              />
              {/* Grid lines */}
              {[20, 35, 50, 65, 80].map((x) => (
                <line key={`vl-${x}`} x1={x} y1="5" x2={x} y2="85" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
              ))}
              {[15, 30, 45, 60, 75].map((y) => (
                <line key={`hl-${y}`} x1="5" y1={y} x2="95" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
              ))}
            </svg>

            {/* City dots */}
            {CITIES.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="tw-absolute tw-group"
                style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* Pulse ring */}
                <span
                  className={`tw-absolute tw-inset-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 ${pulseSize[city.size as CitySize]} tw-rounded-full tw-bg-purple-500/20 tw-animate-ping tw-opacity-75`}
                  style={{ animationDelay: `${i * 0.3}s`, animationDuration: '2.5s' }}
                />
                {/* Dot */}
                <span
                  className={`tw-relative tw-block ${dotSize[city.size as CitySize]} tw-rounded-full tw-bg-purple-400 tw-ring-2 tw-ring-purple-300/30 tw-shadow-[0_0_12px_rgba(167,139,250,0.6)]`}
                />
                {/* Tooltip */}
                <div className="tw-absolute tw-bottom-full tw-left-1/2 -tw-translate-x-1/2 tw-mb-2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-150 tw-pointer-events-none tw-z-10">
                  <div className="tw-bg-slate-800 tw-rounded-xl tw-px-3 tw-py-2 tw-text-center tw-shadow-xl tw-border tw-border-white/10 tw-whitespace-nowrap">
                    <p className="tw-text-white tw-text-xs tw-font-semibold">{city.name}</p>
                    <p className="tw-text-purple-300 tw-text-[10px]">{city.warehouses} warehouses</p>
                  </div>
                  <div className="tw-w-2 tw-h-2 tw-bg-slate-800 tw-rotate-45 tw-mx-auto -tw-mt-1 tw-border-r tw-border-b tw-border-white/10" />
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="tw-absolute tw-bottom-4 tw-left-4 tw-flex tw-flex-col tw-gap-1.5">
              {(['lg', 'md', 'sm'] as CitySize[]).map((size, i) => (
                <div key={size} className="tw-flex tw-items-center tw-gap-2">
                  <span className={`tw-block tw-rounded-full tw-bg-purple-400 ${dotSize[size]}`} />
                  <span className="tw-text-slate-400 tw-text-[10px]">
                    {i === 0 ? 'Major hub' : i === 1 ? 'Regional hub' : 'City'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats + city list */}
          <div className="lg:tw-col-span-5 tw-flex tw-flex-col tw-gap-6">
            {/* Stats grid */}
            <motion.div
              variants={sectionSlideUp}
              {...reveal}
              className="tw-grid tw-grid-cols-2 tw-gap-3"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="tw-rounded-2xl tw-bg-white/5 tw-border tw-border-white/8 tw-p-4"
                >
                  <p className="tw-text-2xl tw-font-bold tw-text-white tw-font-outfit">{stat.value}</p>
                  <p className="tw-text-slate-400 tw-text-xs tw-mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* City list */}
            <motion.div
              variants={sectionSlideUp}
              {...reveal}
              className="tw-rounded-2xl tw-bg-white/5 tw-border tw-border-white/8 tw-divide-y tw-divide-white/5"
            >
              {CITIES.slice(0, 6).map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3"
                >
                  <div className="tw-flex tw-items-center tw-gap-2.5">
                    <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-purple-400 tw-flex-shrink-0" />
                    <span className="tw-text-white tw-text-sm tw-font-medium">{city.name}</span>
                    <span className="tw-text-slate-500 tw-text-xs">{city.nameAr}</span>
                  </div>
                  <span className="tw-text-slate-400 tw-text-xs">{city.warehouses} warehouses</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
