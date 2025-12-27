'use client';

import { animate, motion, useInView, useMotionValue } from 'framer-motion';

import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: 'easeOut',
      });

      return controls.stop;
    }
  }, [isInView, motionValue, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
    >
      <motion.span>{motionValue.get().toFixed(0)}</motion.span>
      {suffix}
    </motion.span>
  );
}

// Separate component that uses useMotionTemplate for rendering
export function Counter({
  value,
  suffix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest) + suffix;
          }
        },
      });

      return controls.stop;
    }
  }, [isInView, count, value, duration, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
    >
      0{suffix}
    </motion.span>
  );
}
