'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ScrollText } from './ScrollText';

export function Header() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const headerParallaxY = useTransform(scrollY, [0, 500], [0, -36]);

  return (
    <header className="tw-fixed tw-inset-x-0 tw-top-0 tw-z-50">
      {!reduce ? (
        <motion.div
          aria-hidden
          className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-h-44 tw-overflow-hidden"
          style={{ y: headerParallaxY }}
        >
          <div className="tw-absolute tw-inset-0 tw-bg-[radial-gradient(ellipse_90%_120%_at_50%_-30%,rgba(167,139,250,0.18),transparent_60%)]" />
        </motion.div>
      ) : null}
      <nav className="tw-relative tw-z-10 tw-mx-auto tw-mt-3 tw-flex tw-items-center tw-justify-between tw-rounded-[40px] tw-px-6 md:tw-px-12 lg:tw-px-24 tw-py-3 md:tw-py-5 tw-max-w-[min(1440px,calc(100%-24px))] tw-frost">
        <Link href="/" className="tw-inline-flex tw-items-center tw-gap-3 tw-no-underline">
          <Image
            src="/cargoz-logo.png"
            alt="Cargoz"
            width={117}
            height={44}
            priority
          />
        </Link>

        <div className="tw-hidden lg:tw-flex tw-items-center tw-gap-10">
          <Link href="/locations" className="tw-inline-flex tw-items-center tw-gap-1 tw-text-slate-500 hover:tw-text-slate-900 tw-font-bold tw-text-sm tw-no-underline">
            <ScrollText as="span" text="Locations" className="tw-text-inherit" split="lines" amount={0.1} />
            <ChevronDown />
          </Link>
          <Link href="/why-choose-us" className="tw-text-slate-500 hover:tw-text-slate-900 tw-font-bold tw-text-sm tw-no-underline">
            <ScrollText as="span" text="Why Choose Us" className="tw-text-inherit" split="lines" amount={0.1} />
          </Link>
          <Link href="/company" className="tw-inline-flex tw-items-center tw-gap-1 tw-text-slate-500 hover:tw-text-slate-900 tw-font-bold tw-text-sm tw-no-underline">
            <ScrollText as="span" text="Company" className="tw-text-inherit" split="lines" amount={0.1} />
            <ChevronDown />
          </Link>
          <Link href="/login" className="tw-text-slate-500 hover:tw-text-slate-900 tw-font-bold tw-text-sm tw-no-underline">
            <ScrollText as="span" text="Login" className="tw-text-inherit" split="lines" amount={0.1} />
          </Link>
        </div>

        <div className="tw-hidden md:tw-flex tw-items-center tw-gap-4">
          <button
            type="button"
            className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-2xl tw-px-3 tw-py-2 tw-shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200"
            aria-label="Language"
          >
            <span className="tw-inline-flex tw-w-5 tw-h-5 tw-rounded-full tw-overflow-hidden tw-ring-1 tw-ring-black/5">
              <KsaMark />
            </span>
            <span className="tw-text-slate-500 tw-text-sm tw-font-semibold tw-tracking-wide">
              <ScrollText as="span" text="EN" className="tw-text-inherit" split="lines" amount={0.05} />
            </span>
          </button>

          <Link
            href="/list-warehouse"
            className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-px-4 tw-py-3 tw-text-sm tw-font-semibold tw-text-slate-900 tw-no-underline tw-shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200"
          >
            <ScrollText as="span" text="List Your Warehouse" className="tw-text-inherit" split="lines" amount={0.1} />
          </Link>

          <Link
            href="/quote"
            className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-bg-purple-500 tw-px-4 tw-py-3 tw-text-sm tw-font-bold tw-text-white tw-no-underline tw-shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] hover:tw-bg-purple-500/90 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200 focus:tw-ring-offset-2"
          >
            <ScrollText as="span" text="Get a Free Quote" className="tw-text-inherit" split="lines" amount={0.1} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function ChevronDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="tw-opacity-80">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L12 12.5858L15.2929 9.29289C15.6834 8.90237 16.3166 8.90237 16.7071 9.29289C17.0976 9.68342 17.0976 10.3166 16.7071 10.7071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289Z"
        fill="#62748E"
      />
    </svg>
  );
}

function KsaMark() {
  // Lightweight green badge (the exported HTML embeds a complex SVG/clipPath for the flag mark).
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="20" height="20" fill="#005430" />
      <path
        d="M6.2 12.8h7.6v1.1H6.2v-1.1Zm2.1-6.4c.5 0 1 .2 1.4.5.4-.3.9-.5 1.4-.5 1.2 0 2.1.9 2.1 2.1 0 1.6-1.7 2.8-3.5 4.0-1.8-1.2-3.5-2.4-3.5-4 0-1.2.9-2.1 2.1-2.1Z"
        fill="#FFFFFF"
        opacity="0.85"
      />
    </svg>
  );
}
