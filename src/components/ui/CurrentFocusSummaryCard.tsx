'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Code2, Cpu, Trophy } from 'lucide-react';

export default function CurrentFocusSummaryCard() {
  return (
    <motion.div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Learning Journey Overview
          </h3>
          <p className="text-foreground/70">
            Continuously expanding my skillset across multiple domains
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Projects', value: '26+', icon: Code2 },
            { label: 'Technologies', value: '15+', icon: Cpu },
            { label: 'Problems Solved', value: '150+', icon: Trophy },
            { label: 'Learning Hours', value: '500+', icon: Clock },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl glass flex items-center justify-center text-primary-400 border border-white/10">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-lg font-bold text-primary-300">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="pt-4">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-200 group">
            <Code2 className="w-5 h-5" />
            <span>Explore All Projects</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
