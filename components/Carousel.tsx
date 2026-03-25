'use client';

import { useMemo, useRef } from 'react';

type Props = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export function Carousel({ title, className, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollBy = useMemo(() => {
    return (dir: -1 | 1) => {
      const el = ref.current;
      if (!el) return;
      const amount = Math.max(280, Math.round(el.clientWidth * 0.85));
      el.scrollBy({ left: dir * amount, behavior: 'smooth' });
    };
  }, []);

  return (
    <div className={className}>
      {title ? <div className="tw-sr-only">{title}</div> : null}
      <div className="tw-relative">
        <div
          ref={ref}
          className="tw-flex tw-gap-6 tw-overflow-x-auto tw-scroll-smooth tw-snap-x tw-snap-mandatory tw-pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:tw-hidden"
        >
          {children}
        </div>

        <div className="tw-hidden md:tw-flex tw-pointer-events-none tw-absolute tw-inset-y-0 tw-left-0 tw-items-center tw-pl-1">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="tw-pointer-events-auto tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-frost tw-text-gray-900 hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200"
            aria-label="Previous"
          >
            <span className="tw-text-xl tw-leading-none">‹</span>
          </button>
        </div>
        <div className="tw-hidden md:tw-flex tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-items-center tw-pr-1">
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="tw-pointer-events-auto tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-frost tw-text-gray-900 hover:tw-bg-white/70 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-200"
            aria-label="Next"
          >
            <span className="tw-text-xl tw-leading-none">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

