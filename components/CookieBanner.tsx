'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === null) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="tw-fixed tw-bottom-0 tw-inset-x-0 tw-z-[100] tw-px-4 tw-pb-4 tw-pt-0">
          <motion.div
            key="cookie-banner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="tw-mx-auto tw-max-w-4xl tw-rounded-2xl tw-bg-white tw-shadow-[0_-4px_40px_-8px_rgba(0,0,0,0.12)] tw-border tw-border-gray-100 tw-p-5 md:tw-p-6 tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-gap-4"
          >
            <p className="tw-text-sm tw-text-slate-600 tw-flex-1">
              We use cookies to improve your experience and analyze site traffic.
            </p>
            <div className="tw-flex tw-items-center tw-gap-3 tw-shrink-0">
              <button
                onClick={handleAccept}
                className="tw-bg-purple-500 tw-text-white tw-rounded-xl tw-px-5 tw-py-2.5 tw-text-sm tw-font-semibold hover:tw-bg-purple-600"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="tw-text-slate-500 tw-text-sm tw-font-medium hover:tw-text-slate-700"
              >
                Decline
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
