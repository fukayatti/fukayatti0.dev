'use client';

import { motion } from 'framer-motion';

import { ReactNode, useCallback, useRef } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
  as = href ? 'a' : 'button',
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      positionRef.current = {
        x: distanceX * strength,
        y: distanceY * strength,
      };

      button.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    button.style.transform = 'translate(0px, 0px)';
    button.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }, []);

  const handleMouseEnter = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    button.style.transition = 'none';
  }, []);

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <motion.div
      ref={buttonRef}
      className="inline-block will-change-transform"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Component
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`relative overflow-hidden ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated gradient background on hover */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full"
          initial={false}
          whileHover={{
            translateX: '200%',
            transition: { duration: 0.6, ease: 'easeInOut' },
          }}
        />
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </Component>
    </motion.div>
  );
}
