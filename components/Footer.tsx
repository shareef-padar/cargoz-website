'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSectionReveal } from '@/lib/useSectionReveal';
import { ParallaxBackdrop } from './ParallaxBackdrop';
import { ScrollText } from './ScrollText';
import { sectionSlideUp } from './motionPresets';

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="tw-block tw-text-sm tw-leading-6 tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-white"
    >
      <ScrollText as="span" text={children} className="tw-text-inherit" split="lines" amount={0.06} />
    </a>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reveal = useSectionReveal();

  return (
    <footer
      ref={footerRef}
      className="tw-relative tw-z-10 tw-mt-auto tw-overflow-hidden tw-bg-[#1e293b] tw-text-slate-300"
    >
      <ParallaxBackdrop
        sectionRef={footerRef}
        range={[38, -40]}
        className="tw-pointer-events-none tw-absolute tw-inset-0 tw-z-0 tw-bg-[radial-gradient(ellipse_85%_55%_at_75%_0%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(ellipse_70%_45%_at_5%_90%,rgba(168,85,247,0.1),transparent_50%)]"
      />
      {/* Extra top padding clears the BottomCta card overlap */}
      <motion.div
        variants={sectionSlideUp}
        {...reveal}
        className="tw-relative tw-z-10 tw-container tw-mx-auto tw-max-w-7xl tw-px-4 tw-pt-36 sm:tw-pt-40 md:tw-pt-44 lg:tw-pt-48 tw-pb-12"
      >
        {/* Top row: logo + social */}
        <div className="tw-flex tw-flex-col tw-gap-6 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-mb-12 md:tw-mb-14">
          <Link href="/" className="tw-inline-flex tw-items-center tw-gap-3 tw-no-underline">
            <Image
              src="/cargoz-logo.png"
              alt="Cargoz"
              width={140}
              height={52}
              className="tw-h-9 tw-w-auto md:tw-h-10"
            />
          </Link>
          <div className="tw-flex tw-items-center tw-gap-4 tw-text-white">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-white tw-opacity-90 tw-transition-opacity hover:tw-opacity-100"
              aria-label="Cargoz on LinkedIn"
            >
              <IconLinkedIn className="tw-h-5 tw-w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-text-white tw-opacity-90 tw-transition-opacity hover:tw-opacity-100"
              aria-label="Cargoz on Instagram"
            >
              <IconInstagram className="tw-h-5 tw-w-5" />
            </a>
          </div>
        </div>

        {/* Main 5-column grid */}
        <div className="tw-grid tw-grid-cols-1 tw-gap-10 sm:tw-grid-cols-2 lg:tw-grid-cols-5 lg:tw-gap-x-8 lg:tw-gap-y-12">
          {/* Column 1 — KSA + Warehouse in Riyadh */}
          <div>
            <ScrollText
              as="div"
              text="Kingdom of Saudi Arabia"
              className="tw-text-sm tw-font-bold tw-text-white"
              split="lines"
              amount={0.1}
            />
            <address className="tw-mt-0 tw-not-italic">
              <ScrollText
                as="p"
                text={'7930, King Abdulaziz Rd,\n4497, Riyadh, KSA'}
                className="tw-mt-3 tw-text-sm tw-leading-6 tw-text-slate-300 tw-whitespace-pre-line"
                split="lines"
                amount={0.08}
              />
            </address>
            <div className="tw-mt-4 tw-space-y-2.5">
              <a
                href="mailto:ksa@cargoz.com"
                className="tw-flex tw-items-start tw-gap-2 tw-text-sm tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-white"
              >
                <IconMail className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-slate-400" />
                <ScrollText as="span" text="ksa@cargoz.com" className="tw-text-inherit" split="lines" amount={0.05} />
              </a>
              <a
                href="https://wa.me/966508129767"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-items-start tw-gap-2 tw-text-sm tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-white"
              >
                <IconWhatsApp className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-slate-400" />
                <ScrollText as="span" text="+966 50 812 9767" className="tw-text-inherit" split="lines" amount={0.05} />
              </a>
              <a
                href="tel:+966508129767"
                className="tw-flex tw-items-start tw-gap-2 tw-text-sm tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-white"
              >
                <IconPhone className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-slate-400" />
                <ScrollText as="span" text="+966 50 812 9767" className="tw-text-inherit" split="lines" amount={0.05} />
              </a>
            </div>

            <ScrollText
              as="div"
              text="Warehouse in Riyadh"
              className="tw-mt-10 tw-text-sm tw-font-bold tw-text-white"
              split="lines"
              amount={0.1}
            />
            <div className="tw-mt-3 tw-space-y-2">
              <FooterLink href="/warehouse/riyadh/al-sulay">Warehouse in Al Sulay</FooterLink>
              <FooterLink href="/warehouse/riyadh/al-aziziyah">Warehouse in Al Aziziyah</FooterLink>
              <FooterLink href="/warehouse/riyadh/al-kharaj">Warehouse in Al Kharaj</FooterLink>
            </div>
          </div>

          {/* Column 2 — UAE */}
          <div>
            <ScrollText
              as="div"
              text="United Arab Emirates"
              className="tw-text-sm tw-font-bold tw-text-white"
              split="lines"
              amount={0.1}
            />
            <address className="tw-mt-0 tw-not-italic">
              <ScrollText
                as="p"
                text={'Office 3008, A5 Building,\nDubai Digital Park,\nDubai Silicon Oasis, Dubai'}
                className="tw-mt-3 tw-text-sm tw-leading-6 tw-text-slate-300 tw-whitespace-pre-line"
                split="lines"
                amount={0.08}
              />
            </address>
            <div className="tw-mt-4 tw-space-y-2.5">
              <a
                href="mailto:hello@cargoz.com"
                className="tw-flex tw-items-start tw-gap-2 tw-text-sm tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-white"
              >
                <IconMail className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-slate-400" />
                <ScrollText as="span" text="hello@cargoz.com" className="tw-text-inherit" split="lines" amount={0.05} />
              </a>
              <a
                href="https://wa.me/971800665544"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-flex tw-items-start tw-gap-2 tw-text-sm tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-white"
              >
                <IconWhatsApp className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-slate-400" />
                <ScrollText as="span" text="+971 800 66 55 44" className="tw-text-inherit" split="lines" amount={0.05} />
              </a>
              <a
                href="tel:+971800665544"
                className="tw-flex tw-items-start tw-gap-2 tw-text-sm tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-white"
              >
                <IconPhone className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-slate-400" />
                <ScrollText as="span" text="+971 800 66 55 44" className="tw-text-inherit" split="lines" amount={0.05} />
              </a>
            </div>
          </div>

          {/* Column 3 — Cargoz */}
          <div>
            <ScrollText
              as="div"
              text="Cargoz"
              className="tw-text-sm tw-font-bold tw-text-white"
              split="lines"
              amount={0.1}
            />
            <nav className="tw-mt-3 tw-space-y-2" aria-label="Cargoz">
              <FooterLink href="#how-it-works">How it works</FooterLink>
              <FooterLink href="/why-choose-cargoz">Why Choose Us</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
            </nav>
          </div>

          {/* Column 4 — More Info */}
          <div>
            <ScrollText
              as="div"
              text="More Info"
              className="tw-text-sm tw-font-bold tw-text-white"
              split="lines"
              amount={0.1}
            />
            <nav className="tw-mt-3 tw-space-y-2" aria-label="More information">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/become-partner">Become a Partner</FooterLink>
              <FooterLink href="/become-affiliate">Become an Affiliate</FooterLink>
              <FooterLink href="/glossary">Glossary</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </nav>
          </div>

          {/* Column 5 — Type of Storage */}
          <div>
            <ScrollText
              as="div"
              text="Type of Storage"
              className="tw-text-sm tw-font-bold tw-text-white"
              split="lines"
              amount={0.1}
            />
            <nav className="tw-mt-3 tw-space-y-2" aria-label="Storage types">
              <FooterLink href="/storage/ac">AC Storage</FooterLink>
              <FooterLink href="/storage/dry">Dry Storage</FooterLink>
              <FooterLink href="/storage/cold">Cold Storage</FooterLink>
              <FooterLink href="/storage/general">General Cargo</FooterLink>
              <FooterLink href="/storage/dangerous">Dangerous Goods</FooterLink>
              <FooterLink href="/storage/food-grade">Food Grade Storage</FooterLink>
              <FooterLink href="/storage/open-yard">Open Yard</FooterLink>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="tw-mt-14 tw-border-t tw-border-white/10 tw-pt-8">
          <div className="tw-flex tw-flex-col tw-gap-4 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between">
            <ScrollText
              as="p"
              text="Copyright © Cargoz. All rights reserved."
              className="tw-text-sm tw-text-slate-400"
              split="lines"
              amount={0.15}
            />
            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-2 tw-text-sm tw-text-slate-400">
              <a href="/privacy" className="tw-text-slate-400 tw-no-underline tw-transition-colors hover:tw-text-white">
                <ScrollText as="span" text="Privacy Policy" className="tw-text-inherit" split="lines" amount={0.1} />
              </a>
              <span className="tw-text-slate-500" aria-hidden>
                |
              </span>
              <a href="/terms" className="tw-text-slate-400 tw-no-underline tw-transition-colors hover:tw-text-white">
                <ScrollText as="span" text="Terms" className="tw-text-inherit" split="lines" amount={0.1} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
