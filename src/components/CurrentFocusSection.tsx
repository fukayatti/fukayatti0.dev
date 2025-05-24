'use client';

import { motion } from 'framer-motion';
import { slideIn } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function CurrentFocusSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  return (
    <motion.section
      className="w-full flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-between min-h-[50vh] rounded-2xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl bg-gradient-to-br from-indigo-800/80 via-purple-800/60 to-pink-800/40"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={slideIn}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        <span className="inline-block relative">
          Current Focus
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-transparent"></span>
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl rounded-xl p-6 border shadow-xl transition duration-300 bg-gray-800/60 border-gray-700/50 hover:shadow-indigo-500/20 hover:border-indigo-500/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
            <span className="text-2xl mr-3">🚀</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-300">
              Main Project
            </span>
          </h3>
          <h4 className="text-lg font-medium mb-2 text-indigo-200">
            UniquePersonCounter
          </h4>
          <p className="mb-4 text-gray-200">
            An AI-powered video analysis tool that detects and counts stationary
            people in footage. The project combines computer vision with
            practical applications.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-indigo-900/60 text-indigo-200 text-xs px-2 py-1 rounded-md">
              Computer Vision
            </span>
            <span className="bg-indigo-900/60 text-indigo-200 text-xs px-2 py-1 rounded-md">
              Machine Learning
            </span>
            <span className="bg-indigo-900/60 text-indigo-200 text-xs px-2 py-1 rounded-md">
              Python
            </span>
          </div>
        </div>
        <div className="backdrop-blur-xl rounded-xl p-6 border shadow-xl transition duration-300 bg-gray-800/60 border-gray-700/50 hover:shadow-indigo-500/20 hover:border-indigo-500/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
            <span className="text-2xl mr-3">🌱</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-300">
              Learning Journey
            </span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-indigo-300 mr-3">▹</span>
              <div>
                <h4 className="font-medium text-indigo-200">
                  Rust Programming
                </h4>
                <p className="text-sm text-gray-200">
                  Exploring systems programming with memory safety and
                  performance
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-300 mr-3">▹</span>
              <div>
                <h4 className="font-medium text-indigo-200">WebAssembly</h4>
                <p className="text-sm text-gray-200">
                  Building high-performance web applications with near-native
                  speed
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-300 mr-3">▹</span>
              <div>
                <h4 className="font-medium text-indigo-200">Edge Computing</h4>
                <p className="text-sm text-gray-200">
                  Developing applications that work at the edge of the network
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
