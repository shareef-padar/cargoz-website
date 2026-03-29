'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ScrollText } from './ScrollText';
import { MagneticButton } from './MagneticButton';

function NavLink({
  href,
  children,
  withChevron,
  active,
}: {
  href: string;
  children: React.ReactNode;
  withChevron?: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        'tw-relative tw-inline-flex tw-items-center tw-gap-1 tw-font-bold tw-text-sm tw-no-underline tw-group tw-pb-0.5',
        active ? 'tw-text-slate-900' : 'tw-text-slate-500 hover:tw-text-slate-900',
      ].join(' ')}
    >
      {children}
      {withChevron && <ChevronDown />}
      {/* Animated underline */}
      <motion.span
        className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-h-[1.5px] tw-rounded-full tw-bg-slate-900 tw-origin-left"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
}

export function Header() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const headerParallaxY = useTransform(scrollY, [0, 500], [0, -36]);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <NavLink href="/locations" withChevron active={pathname.startsWith('/locations')}>
            <span>Locations</span>
          </NavLink>
          <NavLink href="/why-choose-us" active={pathname.startsWith('/why-choose-us')}>
            <span>Why Choose Us</span>
          </NavLink>
          <NavLink href="/company" withChevron active={pathname.startsWith('/company')}>
            <span>Company</span>
          </NavLink>
          <NavLink href="/login" active={pathname.startsWith('/login')}>
            <span>Login</span>
          </NavLink>
        </div>

        <div className="tw-hidden md:tw-flex tw-items-center tw-gap-4">
          <button
            type="button"
            className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-2xl tw-px-3 tw-py-2 tw-shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300"
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
            className="tw-hidden lg:tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-px-4 tw-py-3 tw-text-sm tw-font-semibold tw-text-slate-900 tw-no-underline tw-shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300"
          >
            <ScrollText as="span" text="List Your Warehouse" className="tw-text-inherit" split="lines" amount={0.1} />
          </Link>

          <MagneticButton>
            <Link
              href="/quote"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-bg-purple-500 tw-px-4 tw-py-3 tw-text-sm tw-font-bold tw-text-white tw-no-underline tw-shadow-[0px_1px_0.5px_0.05px_rgba(29,41,61,0.02)] hover:tw-bg-purple-500/90 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2"
            >
              <ScrollText as="span" text="Get a Free Quote" className="tw-text-inherit" split="lines" amount={0.1} />
            </Link>
          </MagneticButton>
        </div>

        {/* Hamburger — visible on mobile where desktop nav links and actions are hidden */}
        <button
          type="button"
          className="md:tw-hidden tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-p-2 tw-text-slate-600 hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:tw-hidden tw-absolute tw-inset-x-3 tw-top-[calc(100%+8px)] tw-rounded-[2rem] tw-frost tw-px-6 tw-py-6 tw-flex tw-flex-col tw-gap-1"
          >
            <Link
              href="/locations"
              onClick={() => setMobileOpen(false)}
              className="tw-flex tw-items-center tw-justify-between tw-rounded-2xl tw-px-4 tw-py-3 tw-text-slate-700 tw-font-bold tw-text-base tw-no-underline hover:tw-bg-white/60 active:tw-bg-white/80"
            >
              Locations
              <ChevronDown />
            </Link>
            <Link
              href="/why-choose-us"
              onClick={() => setMobileOpen(false)}
              className="tw-flex tw-items-center tw-rounded-2xl tw-px-4 tw-py-3 tw-text-slate-700 tw-font-bold tw-text-base tw-no-underline hover:tw-bg-white/60 active:tw-bg-white/80"
            >
              Why Choose Us
            </Link>
            <Link
              href="/company"
              onClick={() => setMobileOpen(false)}
              className="tw-flex tw-items-center tw-justify-between tw-rounded-2xl tw-px-4 tw-py-3 tw-text-slate-700 tw-font-bold tw-text-base tw-no-underline hover:tw-bg-white/60 active:tw-bg-white/80"
            >
              Company
              <ChevronDown />
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="tw-flex tw-items-center tw-rounded-2xl tw-px-4 tw-py-3 tw-text-slate-700 tw-font-bold tw-text-base tw-no-underline hover:tw-bg-white/60 active:tw-bg-white/80"
            >
              Login
            </Link>
            <div className="tw-border-t tw-border-gray-200 tw-mt-2 tw-pt-4 tw-flex tw-flex-col tw-gap-3">
              <Link
                href="/list-warehouse"
                onClick={() => setMobileOpen(false)}
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-font-semibold tw-text-slate-900 tw-no-underline hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300"
              >
                List Your Warehouse
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-bg-purple-500 tw-px-4 tw-py-3 tw-text-sm tw-font-bold tw-text-white tw-no-underline hover:tw-bg-purple-500/90 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-300 focus:tw-ring-offset-2"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {open ? (
        <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
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
