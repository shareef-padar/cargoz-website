'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Hero } from './Hero';
import { HowItWorksVideo } from './HowItWorksVideo';

export function HeroVideoStackScene() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  // 0.0–0.5 = hold phase (hero visible, no transforms)
  // 0.5–1.0 = transition phase (hero softens, video rises)
  const stackProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  // Hero: flat during hold, gently recedes during transition
  const heroScale = useTransform(stackProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(stackProgress, [0, 1], [1, 0.75]);
  const heroY = useTransform(stackProgress, [0, 1], [0, -20]);

  // Video: stays off-screen during hold, rises late in transition
  // No visible overlap until scrollYProgress > 0.625
  const videoY = useTransform(scrollYProgress, [0.5, 0.625, 1], ['100%', '100%', '0%']);

  // After mount: if reduced motion is preferred, fall back to sequential layout
  if (mounted && reduceMotion) {
    return (
      <>
        <Hero />
        <HowItWorksVideo />
      </>
    );
  }

  // SSR default + motion-enabled client: stacked scene
  // At scroll progress 0, hero is at full state (scale:1, opacity:1, y:0)
  // and video is off-screen — visually identical to sequential layout
  return (
    <div
      ref={sceneRef}
      className="tw-relative tw-h-[170vh] md:tw-h-[200vh]"
    >
      {/* Sticky viewport — pins below the fixed header */}
      <div className="tw-sticky tw-top-24 md:tw-top-28 tw-h-[calc(100vh-6rem)] md:tw-h-[calc(100vh-7rem)] tw-overflow-x-hidden">
        <div className="tw-relative tw-h-full">
          {/* Layer 1: Hero — fills sticky viewport, recedes on scroll */}
          <motion.div
            className="tw-relative tw-z-10 tw-h-full [&>section]:tw-min-h-full"
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY,
              transformOrigin: 'top center',
            }}
          >
            <Hero />
          </motion.div>

          {/* Layer 2: Video — absolutely positioned, rises from below */}
          <motion.div
            className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-z-20"
            style={{ y: videoY }}
          >
            <HowItWorksVideo />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
