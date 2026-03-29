'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="tw-fixed tw-inset-0 tw-z-[200] tw-flex tw-items-center tw-justify-center tw-bg-white"
        >
          <div className="tw-flex tw-flex-col tw-items-center">
            <Image
              src="/cargoz-logo.png"
              width={160}
              height={60}
              alt="Cargoz"
              priority
            />
            <div className="tw-mt-8 tw-w-32 tw-h-1 tw-rounded-full tw-bg-gray-100 tw-overflow-hidden">
              <motion.div
                className="tw-h-full tw-rounded-full tw-bg-purple-500"
                animate={{ scaleX: [0, 1] }}
                style={{ transformOrigin: 'left' }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
