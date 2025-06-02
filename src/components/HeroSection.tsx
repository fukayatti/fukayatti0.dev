'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, slideUp } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Hand, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only using theme after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark to match expected server state

  return (
    <motion.header
      className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-h-[60vh] w-full overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 1 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20 bg-gradient-to-br from-primary-400 via-accent-400 to-primary-600" />
        <div className="absolute -bottom-1/2 -left-1/2 w-80 h-80 rounded-full blur-2xl animate-pulse opacity-15 bg-gradient-to-tr from-accent-400 via-primary-400 to-accent-600" />
      </div>

      {/* Left side: Profile image with enhanced effects */}
      <motion.div
        className="relative flex-shrink-0 flex flex-col items-center lg:items-start lg:flex-1 ml-8 lg:ml-12"
        variants={slideUp}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="relative group">
          {/* Animated ring */}
          <div
            className="absolute -inset-4 rounded-full animate-spin-slow opacity-75"
            style={{
              background:
                'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f97316, #3b82f6)',
            }}
          />

          {/* Profile image container */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-52 lg:h-52 xl:w-60 xl:h-60 rounded-full p-1 overflow-hidden bg-gray-900">
            <div className="w-full h-full rounded-full overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/gyarupi.png"
                width={256}
                height={256}
                alt="fukayatti0のプロフィール画像"
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 208px, 240px"
                quality={85}
              />
              {/* Overlay effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Floating particles around image - reduced count for performance */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-float bg-primary-400/60"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${15 + i * 20}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="mt-4 lg:mt-6 flex items-center gap-3 px-4 py-2 glass rounded-full border border-white/10"
          variants={slideUp}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-foreground/80">
            Available for collaboration
          </span>
        </motion.div>
      </motion.div>

      {/* Right side: Enhanced text content */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:pl-8">
        {/* Animated greeting */}
        <motion.div
          className="mb-4 flex items-center gap-2"
          variants={slideUp}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Hand className="w-6 h-6 text-primary animate-bounce-subtle" />
          <span className="text-lg font-medium text-foreground/80">
            Hey there, I'm
          </span>
        </motion.div>

        {/* Main title with enhanced gradient */}
        <motion.h1
          className="text-hero gradient-text mb-6 relative"
          variants={slideUp}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            background:
              'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #f97316)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-x 6s ease infinite',
          }}
        >
          fukayatti0
          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
        </motion.h1>

        {/* Enhanced description */}
        <motion.p
          className="text-body-lg mb-8 leading-relaxed max-w-xl text-foreground/70"
          variants={slideUp}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="font-semibold text-primary">
            16-year-old tech explorer
          </span>{' '}
          from{' '}
          <span className="relative inline-block">
            National Institute of Technology, Ibaraki College
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </span>{' '}
          passionate about{' '}
          <span className="font-semibold text-accent">code</span>,{' '}
          <span className="font-semibold text-primary">innovation</span>, and{' '}
          <span className="font-semibold text-accent">open source</span>.
        </motion.p>

        {/* Skill tags */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          variants={slideUp}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {['React', 'Next.js', 'TypeScript', 'Electronics', 'OSS'].map(
            (skill, index) => (
              <span
                key={skill}
                className="px-4 py-2 glass rounded-full text-sm font-medium border border-white/10 hover:scale-105 transition-all duration-300 cursor-default text-foreground"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            )
          )}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          variants={slideUp}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <button
            className="btn-primary group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="私の作品を見る"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </button>

          <button
            className="btn-secondary group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="連絡を取る"
          >
            <span className="relative z-10">Let's Connect</span>
            <ArrowRight
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>

      {/* Floating social proof */}
      <motion.div
        className="absolute top-4 right-4 lg:top-8 lg:right-8 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="glass rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gradient-to-br from-primary-400 to-accent-400"
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-medium text-foreground">50+ Projects</div>
              <div className="text-xs text-foreground/60">Open Source</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
