'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function LetsConnectSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  return (
    <motion.section
      className="w-full flex flex-col items-center justify-center min-h-[30vh] rounded-2xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl bg-gradient-to-br from-white/10 via-pink-400/10 to-indigo-400/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        <span className="inline-block relative">
          Let's Connect
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-indigo-400"></span>
        </span>
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <a
          href="https://github.com/fukayatti"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border shadow-lg text-lg font-semibold transition duration-300 bg-gradient-to-r from-indigo-500/80 to-pink-400/80 border-white/20 text-white hover:scale-105 hover:shadow-pink-400/30"
        >
          <span>GitHub</span>
          <span className="opacity-70">Connect</span>
        </a>
        <a
          href="mailto:contact@fukayatti.com"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border shadow-lg text-lg font-semibold transition duration-300 bg-gradient-to-r from-indigo-400/80 to-pink-400/80 border-white/20 text-white hover:scale-105 hover:shadow-pink-400/30"
        >
          <span>Email</span>
          <span className="opacity-70">contact@fukayatti.dev</span>
        </a>
      </div>
    </motion.section>
  );
}
