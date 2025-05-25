'use client';

import type { Goal2025 } from '@/lib/notion-content';
import { motion } from 'framer-motion';

interface Goals2025ProgressCardProps {
  goalCategories: any[];
}

export default function Goals2025ProgressCard({
  goalCategories,
}: Goals2025ProgressCardProps) {
  return (
    <motion.div className="mt-12 glass rounded-2xl border border-white/10 shadow-glass p-8">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
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
              <div className="text-sm text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
