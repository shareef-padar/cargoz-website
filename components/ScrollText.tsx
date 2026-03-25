'use client';

import { motion, useReducedMotion, type MotionProps } from 'framer-motion';
import { motionViewportInView } from '@/lib/motionViewport';

type Props = {
  text: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
  className?: string;
  split?: 'words' | 'lines';
  delay?: number;
  amount?: number;
} & Pick<MotionProps, 'transition'>;

function renderStatic(
  as: NonNullable<Props['as']>,
  className: string | undefined,
  text: string,
) {
  const Static =
    as === 'h1'
      ? 'h1'
      : as === 'h2'
        ? 'h2'
        : as === 'h3'
          ? 'h3'
          : as === 'div'
            ? 'div'
            : as === 'span'
              ? 'span'
              : 'p';
  return (
    <Static className={className}>
      {text}
    </Static>
  );
}

/**
 * Blurred word/line reveal. `hidden` uses opacity:1 + blur so the page never ships invisible text.
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
  const Comp =
    as === 'h1'
      ? motion.h1
      : as === 'h2'
        ? motion.h2
        : as === 'h3'
          ? motion.h3
          : as === 'div'
            ? motion.div
            : as === 'span'
              ? motion.span
              : motion.p;

  if (reduceMotion === true) {
    return renderStatic(as, className, text);
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ ...motionViewportInView, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: split === 'words' ? 0.045 : 0.0, delayChildren: delay } },
      }}
    >
      {tokens.map((t, i) => (
        <motion.span
          key={`${t}-${i}`}
          className={split === 'words' ? 'tw-inline-block tw-whitespace-pre' : undefined}
          variants={{
            hidden: { opacity: 1, y: 14, filter: 'blur(6px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={transition ?? { duration: 0.9, ease: [0.21, 0.72, 0.22, 1] }}
        >
          {t}
          {split === 'words' ? ' ' : null}
        </motion.span>
      ))}
    </Comp>
  );
}
