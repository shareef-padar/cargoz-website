'use client';

import { motion, useReducedMotion, type MotionProps } from 'framer-motion';
import { motionViewportInView } from '@/lib/motionViewport';

type As = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';

type Props = {
  text: string;
  as?: As;
  className?: string;
  split?: 'words' | 'lines';
  delay?: number;
  amount?: number;
} & Pick<MotionProps, 'transition'>;

const MOTION_COMP = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  div: motion.div,
  span: motion.span,
  p: motion.p,
} as const;

/**
 * Clipped word/line reveal. Each token slides up from behind a clip mask —
 * no blur, no fade, just a clean editorial gate effect.
 */
export function ScrollText({
  text,
  as = 'p',
  className,
  split = 'words',
  delay = 0,
  amount = 0.2,
  transition,
}: Props) {
  const reduceMotion = useReducedMotion();
  const tokens = split === 'words' ? text.split(/\s+/).filter(Boolean) : [text];

  if (reduceMotion === true) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const Comp = MOTION_COMP[as];

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ ...motionViewportInView, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: split === 'words' ? 0.055 : 0.0, delayChildren: delay } },
      }}
    >
      {tokens.map((t, i) => (
        /* Clip container — overflow:hidden acts as the gate; vertical-align:bottom anchors the clip to baseline */
        <span
          key={`${t}-${i}`}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            variants={{
              hidden: { y: '100%' },
              show: { y: '0%' },
            }}
            transition={transition ?? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {t}
            {split === 'words' ? ' ' : null}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
