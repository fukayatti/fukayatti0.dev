'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import {
  SiPython,
  SiTypescript,
  SiRust,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiWebassembly,
} from '@icons-pack/react-simple-icons';

const techUniverseItems = [
  { icon: SiPython, label: 'Python', color: '#FFD43B' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: SiRust, label: 'Rust', color: '#DEA584' },
  { icon: SiCplusplus, label: 'C++', color: '#00599C' },
  { icon: SiReact, label: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#fff' },
  { icon: SiTailwindcss, label: 'TailwindCSS', color: '#38BDF8' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { icon: SiWebassembly, label: 'WebAssembly', color: '#654FF0' },
];

export default function TechUniverseSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  return (
    <motion.section
      className="w-full flex flex-col items-center justify-center min-h-[40vh] rounded-2xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-sky-900/40"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        <span className="inline-block relative">
          Tech Universe
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-indigo-400"></span>
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-9 gap-6 w-full">
        {techUniverseItems.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-xl p-6 flex flex-col items-center justify-center border transition duration-300 bg-white/10 border-white/10 hover:scale-105 hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
          >
            <item.icon color={item.color} size={38} />
            <div className="text-center mt-2 text-sm font-semibold tracking-wide text-white/90">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
