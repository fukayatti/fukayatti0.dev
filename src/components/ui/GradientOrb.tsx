'use client';

import { motion } from 'framer-motion';

interface GradientOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  animate?: boolean;
  delay?: number;
}

const sizeClasses = {
  sm: 'w-48 h-48',
  md: 'w-72 h-72',
  lg: 'w-96 h-96',
  xl: 'w-[32rem] h-[32rem]',
};

const blurClasses = {
  sm: 'blur-2xl',
  md: 'blur-3xl',
  lg: 'blur-[100px]',
  xl: 'blur-[128px]',
};

const colorGradients = {
  primary: 'from-indigo-500 via-purple-500 to-indigo-600',
  secondary: 'from-purple-500 via-pink-500 to-purple-600',
  accent: 'from-violet-500 via-fuchsia-500 to-violet-600',
};

export default function GradientOrb({
  className = '',
  size = 'md',
  color = 'primary',
  blur = 'lg',
  opacity = 0.3,
  position,
  animate = true,
  delay = 0,
}: GradientOrbProps) {
  const orbVariants = {
    initial: { scale: 1, opacity: opacity },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [opacity, opacity * 1.2, opacity],
      x: [0, 30, -20, 0],
      y: [0, -20, 30, 0],
    },
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${colorGradients[color]} ${sizeClasses[size]} ${blurClasses[blur]} pointer-events-none ${className}`}
      style={{
        opacity,
        ...position,
      }}
      variants={animate ? orbVariants : undefined}
      initial="initial"
      animate={animate ? 'animate' : undefined}
      transition={
        animate
          ? {
              duration: 8,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: delay,
            }
          : undefined
      }
    />
  );
}

// Multi-orb background component
export function GradientOrbBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <GradientOrb
        size="xl"
        color="primary"
        position={{ top: '-20%', right: '-10%' }}
        delay={0}
        opacity={0.15}
      />
      <GradientOrb
        size="lg"
        color="secondary"
        position={{ bottom: '-15%', left: '-5%' }}
        delay={2}
        opacity={0.12}
      />
      <GradientOrb
        size="md"
        color="accent"
        position={{ top: '40%', left: '15%' }}
        delay={4}
        opacity={0.1}
      />
    </div>
  );
}
