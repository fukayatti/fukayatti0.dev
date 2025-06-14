'use client';

import {
  SiCplusplus,
  SiDocker,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTypescript,
  SiWebassembly,
} from '@icons-pack/react-simple-icons';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

const techUniverseItems = [
  { icon: SiPython, label: 'Python', color: '#FFD43B', category: 'language' },
  {
    icon: SiTypescript,
    label: 'TypeScript',
    color: '#3178C6',
    category: 'language',
  },
  { icon: SiRust, label: 'Rust', color: '#DEA584', category: 'language' },
  { icon: SiCplusplus, label: 'C++', color: '#00599C', category: 'language' },
  { icon: SiReact, label: 'React', color: '#61DAFB', category: 'framework' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#fff', category: 'framework' },
  {
    icon: SiTailwindcss,
    label: 'TailwindCSS',
    color: '#38BDF8',
    category: 'tool',
  },
  { icon: SiDocker, label: 'Docker', color: '#2496ED', category: 'tool' },
  {
    icon: SiWebassembly,
    label: 'WebAssembly',
    color: '#654FF0',
    category: 'technology',
  },
];

export default function TechUniverseSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  const categories = [
    { id: 'all', label: 'All Technologies', icon: '🌌' },
    { id: 'language', label: 'Languages', icon: '💻' },
    { id: 'framework', label: 'Frameworks', icon: '⚛️' },
    { id: 'tool', label: 'Tools', icon: '🛠️' },
    { id: 'technology', label: 'Technologies', icon: '🚀' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? techUniverseItems
      : techUniverseItems.filter((item) => item.category === activeCategory);

  return (
    <section className="mb-20">
      {/* Enhanced header with unified styling */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-display mb-4">
          <span className="gradient-text">Tech Universe</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto text-foreground/70">
          The technologies and tools that power my development journey
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
              ${
                activeCategory === category.id
                  ? 'text-foreground shadow-glow'
                  : 'text-foreground/80 hover:text-foreground'
              }
            `}
            aria-label={`${category.label}のテクノロジーを表示`}
            aria-pressed={activeCategory === category.id}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span aria-hidden="true">{category.icon}</span>
              {category.label}
            </span>
            {activeCategory === category.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl"
                layoutId="activeCategory"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Tech Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        layout
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="group relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            layout
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden h-full hover:shadow-glow-lg transition-all duration-300">
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute -top-1/2 -right-1/2 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: item.color }}
                />
              </div>

              <div className="relative p-6 flex flex-col items-center text-center space-y-4">
                {/* Icon Container */}
                <div className="w-16 h-16 glass rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <item.icon
                    color={item.color}
                    size={32}
                    className="group-hover:drop-shadow-lg transition-all duration-300"
                  />
                </div>

                {/* Label */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary-300 transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="text-xs text-foreground/60 capitalize">
                    {item.category}
                  </p>
                </div>

                {/* Skill Level Indicator */}
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground/60">Proficiency</span>
                    <span className="text-foreground/60">
                      {Math.floor(Math.random() * 30) + 70}%
                    </span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                      }}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.floor(Math.random() * 30) + 70}%`,
                      }}
                      transition={{
                        delay: index * 0.03 + 0.2,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Statistics Footer - simplified structure */}
      <motion.div
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        {[
          { label: 'Languages', count: '4+', icon: '💻' },
          { label: 'Frameworks', count: '6+', icon: '⚛️' },
          { label: 'Tools', count: '10+', icon: '🛠️' },
          { label: 'Years Experience', count: '3+', icon: '📈' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-xl border border-white/10 p-4 text-center"
          >
            <div className="text-2xl mb-2" aria-hidden="true">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-primary-300 mb-1">
              {stat.count}
            </div>
            <div className="text-sm text-foreground/70">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
