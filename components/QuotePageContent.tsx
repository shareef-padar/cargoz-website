'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={['tw-animate-spin', className].filter(Boolean).join(' ')}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        className="tw-opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="tw-opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuotePageContent() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    // Placeholder — wire to your API / CRM
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
  }

  return (
    <div className="tw-container tw-mx-auto tw-max-w-2xl tw-rounded-[2rem] tw-frost-card tw-p-8 tw-relative tw-overflow-hidden">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.21, 0.72, 0.22, 1] }}
            className="tw-text-center tw-py-4"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24, delay: 0.05 }}
              className="tw-mx-auto tw-mb-5 tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-full tw-bg-emerald-500/15 tw-text-emerald-600"
            >
              <CheckIcon className="tw-h-9 tw-w-9" />
            </motion.div>
            <h1 className="tw-text-2xl md:tw-text-3xl tw-font-black tw-text-gray-900">Request received</h1>
            <p className="tw-mt-3 tw-text-gray-600 tw-leading-relaxed">
              Thanks — we&apos;ll get back to you shortly with matched warehouse options.
            </p>
            <div className="tw-mt-8 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-3">
              <Link
                href="/"
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-bg-purple-500 tw-px-5 tw-py-3 tw-text-sm tw-font-semibold tw-text-white tw-no-underline hover:tw-bg-purple-500/90 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-gray-300"
              >
                Back to home
              </Link>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-5 tw-py-3 tw-text-sm tw-font-semibold tw-text-gray-800 hover:tw-bg-gray-50 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-gray-300"
              >
                Send another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="tw-text-2xl md:tw-text-3xl tw-font-black tw-text-gray-900">Get a Free Quote</h1>
            <p className="tw-mt-3 tw-text-gray-600 tw-leading-relaxed">
              Tell us what you need — we&apos;ll match you with verified warehouses.
            </p>

            <form onSubmit={onSubmit} className="tw-mt-8 tw-space-y-5">
              <div>
                <label htmlFor="quote-name" className="tw-block tw-text-sm tw-font-semibold tw-text-gray-800">
                  Name
                </label>
                <input
                  id="quote-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  disabled={status === 'loading'}
                  className="tw-mt-1.5 tw-w-full tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-text-gray-900 tw-outline-none focus:tw-border-gray-400 focus:tw-ring-2 focus:tw-ring-gray-100 disabled:tw-opacity-60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="quote-email" className="tw-block tw-text-sm tw-font-semibold tw-text-gray-800">
                  Work email
                </label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={status === 'loading'}
                  className="tw-mt-1.5 tw-w-full tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-text-gray-900 tw-outline-none focus:tw-border-gray-400 focus:tw-ring-2 focus:tw-ring-gray-100 disabled:tw-opacity-60"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="quote-details" className="tw-block tw-text-sm tw-font-semibold tw-text-gray-800">
                  Storage needs
                </label>
                <textarea
                  id="quote-details"
                  name="details"
                  required
                  rows={4}
                  disabled={status === 'loading'}
                  className="tw-mt-1.5 tw-w-full tw-resize-y tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 tw-text-sm tw-text-gray-900 tw-outline-none focus:tw-border-gray-400 focus:tw-ring-2 focus:tw-ring-gray-100 disabled:tw-opacity-60"
                  placeholder="Space (SQM), location, temperature, duration…"
                />
              </div>

              <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="tw-inline-flex tw-min-h-[48px] tw-min-w-[160px] tw-items-center tw-justify-center tw-gap-2 tw-rounded-2xl tw-bg-purple-500 tw-px-6 tw-py-3 tw-text-sm tw-font-bold tw-text-white tw-transition hover:tw-bg-purple-500/92 disabled:tw-cursor-not-allowed disabled:tw-opacity-70 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-gray-300 focus-visible:tw-ring-offset-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Spinner className="tw-h-5 tw-w-5 tw-text-white" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    'Submit request'
                  )}
                </button>
                <Link
                  href="/"
                  className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-2xl tw-px-4 tw-py-3 tw-text-sm tw-font-semibold tw-text-gray-600 tw-no-underline hover:tw-text-gray-900"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
