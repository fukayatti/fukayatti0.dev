'use client';

import { motion } from 'framer-motion';
import { slideIn } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { getGoals2025ByCategory, type Goal2025 } from '@/lib/notion-content';

export default function Goals2025Section() {
  const [mounted, setMounted] = useState(false);
  const [goalCategories, setGoalCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    // Fetch goals from Notion
    const fetchGoals = async () => {
      try {
        const categories = await getGoals2025ByCategory();
        setGoalCategories(categories);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
        // Fallback to empty data if Notion fails
        setGoalCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'low':
        return 'text-green-400 bg-green-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary-300 border-primary-500/30';
      case 'accent':
        return 'text-accent-300 border-accent-500/30';
      case 'secondary':
        return 'text-purple-300 border-purple-500/30';
      default:
        return 'text-primary-300 border-primary-500/30';
    }
  };

  if (loading) {
    return (
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-display mb-4">
            <span className="gradient-text">Goals 2025</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto text-gray-400">
            Loading...
          </p>
        </div>
      </section>
    );
  }

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
          <span className="gradient-text">Goals 2025</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto text-gray-400">
          Ambitious objectives and milestones for continuous growth and
          innovation
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {goalCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          >
            <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden h-full">
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-5 bg-gradient-to-br from-primary-400 to-accent-400" />
              </div>

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                    {category.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold ${getColorClasses(category.color).split(' ')[0]}`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-400">{category.subtitle}</p>
                  </div>
                </div>

                {/* Goals List */}
                <div className="space-y-6">
                  {category.goals.map((goal: Goal2025, goalIndex: number) => (
                    <motion.div
                      key={goal.id}
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: categoryIndex * 0.2 + goalIndex * 0.1 + 0.3,
                        duration: 0.4,
                      }}
                    >
                      {/* Goal Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white">
                              {goal.title}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}
                            >
                              {goal.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {goal.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span
                            className={
                              getColorClasses(category.color).split(' ')[0]
                            }
                          >
                            {goal.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              category.color === 'primary'
                                ? 'bg-gradient-to-r from-primary-500 to-primary-400'
                                : category.color === 'accent'
                                  ? 'bg-gradient-to-r from-accent-500 to-accent-400'
                                  : 'bg-gradient-to-r from-purple-500 to-purple-400'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress}%` }}
                            transition={{
                              delay:
                                categoryIndex * 0.2 + goalIndex * 0.1 + 0.5,
                              duration: 0.8,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Summary */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {category.goals.length} objectives
                    </span>
                    <span
                      className={getColorClasses(category.color).split(' ')[0]}
                    >
                      {Math.round(
                        category.goals.reduce(
                          (acc: number, goal: Goal2025) => acc + goal.progress,
                          0
                        ) / category.goals.length
                      )}
                      % avg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall Progress Summary */}
      <motion.div
        className="mt-12 glass rounded-2xl border border-white/10 shadow-glass p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">
            2025 Progress Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: 'Total Goals',
                value: goalCategories.reduce(
                  (acc, cat) => acc + cat.goals.length,
                  0
                ),
                icon: '🎯',
              },
              {
                label: 'High Priority',
                value: goalCategories.reduce(
                  (acc, cat) =>
                    acc +
                    cat.goals.filter((g: Goal2025) => g.priority === 'high')
                      .length,
                  0
                ),
                icon: '🔥',
              },
              {
                label: 'In Progress',
                value: goalCategories.reduce(
                  (acc, cat) =>
                    acc +
                    cat.goals.filter((g: Goal2025) => g.progress > 0).length,
                  0
                ),
                icon: '⚡',
              },
              {
                label: 'Avg Progress',
                value:
                  goalCategories.length > 0
                    ? `${Math.round(goalCategories.reduce((acc, cat) => acc + cat.goals.reduce((sum: number, goal: Goal2025) => sum + goal.progress, 0), 0) / goalCategories.reduce((acc, cat) => acc + cat.goals.length, 0))}%`
                    : '0%',
                icon: '📈',
              },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="text-2xl">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
