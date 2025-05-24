'use client';

import { motion } from 'framer-motion';
import { slideIn } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Goals2025Section() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  return (
    <motion.section
      className="w-full flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-between min-h-[40vh] rounded-2xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl bg-gradient-to-br from-pink-400/10 via-indigo-400/10 to-purple-400/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={slideIn}
      transition={{ duration: 0.8 }}
    >
      {/* 左: 技術・コンテンツ・プロジェクト目標 */}
      <div className="flex-1 space-y-8">
        <h3 className="text-2xl font-bold mb-4 text-pink-300">2025 Goals</h3>
        <ul className="space-y-3 text-lg text-white/90">
          <li className="flex items-start">
            <span className="text-pink-400 mr-2">▹</span>
            Master Backend Development with modern architectures
          </li>
          <li className="flex items-start">
            <span className="text-pink-400 mr-2">▹</span>
            Build mobile applications with Expo
          </li>
          <li className="flex items-start">
            <span className="text-pink-400 mr-2">▹</span>
            Create IoT projects with Raspberry Pi
          </li>
          <li className="flex items-start">
            <span className="text-pink-400 mr-2">▹</span>
            Develop scalable API services
          </li>
        </ul>
      </div>
      <div className="flex-1 space-y-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-300">
          Content Creation
        </h3>
        <ul className="space-y-3 text-lg text-white/90">
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">▹</span>
            Write technical articles regularly
          </li>
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">▹</span>
            Create tutorials for backend development
          </li>
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">▹</span>
            Share IoT project experiences
          </li>
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">▹</span>
            Document mobile app development journey
          </li>
        </ul>
      </div>
      <div className="flex-1 space-y-8">
        <h3 className="text-2xl font-bold mb-4 text-purple-300">
          Project Goals
        </h3>
        <ul className="space-y-3 text-lg text-white/90">
          <li className="flex items-start">
            <span className="text-purple-400 mr-2">▹</span>
            Build home automation system with Raspberry Pi
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-2">▹</span>
            Release mobile app for UniquePersonCounter
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-2">▹</span>
            Develop robust backend services
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-2">▹</span>
            Contribute to open-source projects
          </li>
        </ul>
      </div>
    </motion.section>
  );
}
