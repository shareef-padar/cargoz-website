'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MagneticButton } from './MagneticButton';

/** Reserves scroll space for `StickyMobileCta` (mobile only). Omit on `/quote` where the bar is hidden. */
export function MobileBottomSpacer() {
  const pathname = usePathname();
  if (pathname === '/quote') return null;
  return (
    <div
      className="tw-h-[calc(4.25rem+env(safe-area-inset-bottom,0px))] tw-shrink-0 md:tw-hidden"
      aria-hidden
    />
  );
}

/**
 * Fixed bottom bar on small screens — primary conversion path without cluttering desktop.
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  if (pathname === '/quote') return null;

  return (
    <div
      className="tw-pointer-events-auto tw-fixed tw-inset-x-0 tw-bottom-0 tw-z-40 tw-border-t tw-border-gray-200/90 tw-bg-white/95 tw-backdrop-blur-md tw-px-4 tw-pt-3 tw-shadow-[0_-10px_40px_-16px_rgba(15,23,42,0.18)] md:tw-hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      role="region"
      aria-label="Quick quote"
    >
      <div className="tw-mx-auto tw-flex tw-max-w-lg tw-items-center tw-justify-center">
        <MagneticButton strength={0.2}>
          <Link
            href="/quote"
            className="tw-flex tw-min-h-[48px] tw-w-full tw-items-center tw-justify-center tw-rounded-2xl tw-bg-purple-500 tw-px-4 tw-text-sm tw-font-bold tw-text-white tw-no-underline tw-shadow-md tw-transition active:tw-scale-[0.98] hover:tw-bg-purple-500/92 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-gray-300 focus-visible:tw-ring-offset-2"
          >
            Get a Free Quote
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
