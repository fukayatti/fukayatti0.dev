'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, slideUp } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function HeaderSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only using theme after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark to match expected server state

  return (
    <motion.header
      className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[60vh] w-full overflow-hidden"
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
        className="relative flex-shrink-0 flex flex-col items-center lg:items-start"
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
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-1 overflow-hidden bg-gray-900">
            <div className="w-full h-full rounded-full overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/gyarupi.png"
                width={256}
                height={256}
                alt="Profile"
                className="w-full h-full object-cover"
                priority
              />
              {/* Overlay effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Floating particles around image */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-float bg-primary-400/60"
                style={{
                  top: `${15 + i * 10}%`,
                  left: `${10 + i * 12}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="mt-6 flex items-center gap-3 px-4 py-2 glass rounded-full border border-white/10"
          variants={slideUp}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-gray-300">
            Available for collaboration
          </span>
        </motion.div>
      </motion.div>

      {/* Right side: Enhanced text content */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
        {/* Animated greeting */}
        <motion.div
          className="mb-4 flex items-center gap-2"
          variants={slideUp}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="text-2xl animate-bounce-subtle">👋</span>
          <span className="text-lg font-medium text-gray-400">
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
          className="text-body-lg mb-8 leading-relaxed max-w-xl text-gray-300"
          variants={slideUp}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="font-semibold text-primary-400">
            16-year-old tech explorer
          </span>{' '}
          from{' '}
          <span className="relative inline-block">
            National Institute of Technology, Ibaraki College
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent-400 to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </span>{' '}
          passionate about{' '}
          <span className="font-semibold text-accent-400">code</span>,{' '}
          <span className="font-semibold text-primary-400">innovation</span>,
          and <span className="font-semibold text-accent-400">open source</span>
          .
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
                className="px-4 py-2 glass rounded-full text-sm font-medium border border-white/10 hover:scale-105 transition-all duration-300 cursor-default text-gray-300"
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
          <button className="btn-primary group">
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </button>

          <button className="btn-secondary group">
            <span className="relative z-10">Let's Connect</span>
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Floating social proof */}
      <motion.div
        className="absolute top-8 right-8 hidden lg:block"
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
              <div className="font-medium text-gray-300">50+ Projects</div>
              <div className="text-xs text-gray-500">Open Source</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
