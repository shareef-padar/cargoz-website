'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="tw-fixed tw-top-0 tw-inset-x-0 tw-z-[100] tw-h-[2.5px] tw-bg-gradient-to-r tw-from-purple-500 tw-via-violet-400 tw-to-teal-400 tw-pointer-events-none"
      aria-hidden
    />
  );
}
