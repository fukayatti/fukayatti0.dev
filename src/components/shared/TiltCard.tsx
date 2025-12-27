'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import React, { useRef } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  tiltStrength = 10,
  glareEnabled = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [0, 1], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(xSpring, [0, 1], [-tiltStrength, tiltStrength]);

  // Glare position based on mouse
  const glareX = useTransform(xSpring, [0, 1], ['-50%', '150%']);
  const glareY = useTransform(ySpring, [0, 1], ['-50%', '150%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {children}

      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25), transparent 60%)`,
          }}
        >
          <motion.div
            className="absolute w-[200%] h-[200%]"
            style={{
              x: glareX,
              y: glareY,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
