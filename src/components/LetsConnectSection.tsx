'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import {
  SiGithub,
  SiGmail,
  SiX,
  SiZap,
  SiRocket,
  SiHandshake,
} from '@icons-pack/react-simple-icons';
import { Star, MessageCircle } from 'lucide-react';

export default function LetsConnectSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  const contactMethods = [
    {
      title: 'GitHub',
      subtitle: 'Open Source Projects',
      description: 'Explore my repositories and contribute to projects',
      icon: SiGithub,
      href: 'https://github.com/fukayatti',
      color: 'primary',
      stats: '50+ repos',
      action: 'Follow',
      external: true,
    },
    {
      title: 'Email',
      subtitle: 'Direct Communication',
      description: 'Get in touch for collaboration opportunities',
      icon: SiGmail,
      href: 'mailto:contact@fukayatti.dev',
      color: 'accent',
      stats: '24h response',
      action: 'Send Email',
      external: false,
    },
    {
      title: 'Twitter/X',
      subtitle: 'Tech Updates',
      description: 'Follow my tech journey and daily insights',
      icon: SiX,
      href: 'https://twitter.com/fukayatti0',
      color: 'secondary',
      stats: 'Daily posts',
      action: 'Follow',
      external: true,
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          text: 'text-primary-300',
          bg: 'from-primary-500 to-primary-400',
          border: 'border-primary-500/30',
          glow: 'shadow-primary-500/20',
        };
      case 'accent':
        return {
          text: 'text-accent-300',
          bg: 'from-accent-500 to-accent-400',
          border: 'border-accent-500/30',
          glow: 'shadow-accent-500/20',
        };
      case 'secondary':
        return {
          text: 'text-purple-300',
          bg: 'from-purple-500 to-purple-400',
          border: 'border-purple-500/30',
          glow: 'shadow-purple-500/20',
        };
      default:
        return {
          text: 'text-primary-300',
          bg: 'from-primary-500 to-primary-400',
          border: 'border-primary-500/30',
          glow: 'shadow-primary-500/20',
        };
    }
  };

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
          <span className="gradient-text">Let's Connect</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto text-muted-foreground">
          Ready to collaborate? Let's build something amazing together
        </p>
      </motion.div>

      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {contactMethods.map((method, index) => {
          const colorClasses = getColorClasses(method.color);
          return (
            <motion.div
              key={method.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden h-full hover:shadow-glow-lg transition-all duration-300 group-hover:scale-105">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-1/2 -right-1/2 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-5 bg-gradient-to-br from-primary-400 to-accent-400" />
                </div>

                <div className="relative p-8 text-center space-y-6">
                  {/* Icon and Title */}
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-xl glass flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <method.icon
                        size={32}
                        className={`${colorClasses.text} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold ${colorClasses.text}`}
                      >
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {method.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>

                  {/* Stats */}
                  <div className="glass rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-muted-foreground">
                      Response Time
                    </div>
                    <div className={`font-semibold ${colorClasses.text}`}>
                      {method.stats}
                    </div>
                  </div>

                  {/* Action Button */}
                  <a
                    href={method.href}
                    target={method.external ? '_blank' : undefined}
                    rel={method.external ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-muted-foreground transition-all duration-300 bg-gradient-to-r ${colorClasses.bg} hover:scale-105 hover:shadow-xl ${colorClasses.glow} group/button`}
                  >
                    <span>{method.action}</span>
                    {method.external && (
                      <svg
                        className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                    {!method.external && (
                      <svg
                        className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-200"
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
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Contact Card */}
      <motion.div
        className="glass rounded-2xl border border-white/10 shadow-glass p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-muted-foreground">
              Ready to Start a Project?
            </h3>
            <p className="text-muted-foreground">
              I'm always open to discussing new opportunities, interesting
              projects, and creative ideas.
            </p>
          </div>

          {/* Contact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Response Time', value: '< 24h', IconComponent: SiZap },
              {
                label: 'Projects Completed',
                value: '25+',
                IconComponent: SiRocket,
              },
              {
                label: 'Collaboration Rate',
                value: '100%',
                IconComponent: SiHandshake,
              },
              {
                label: 'Satisfaction',
                value: '5.0★',
                IconComponent: Star,
              },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="flex justify-center">
                  <stat.IconComponent size={24} className="text-primary-400" />
                </div>
                <div className="text-lg font-bold text-primary-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="pt-4">
            <a
              href="mailto:contact@fukayatti.dev"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-muted-foreground transition-all duration-300 bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-105 hover:shadow-xl shadow-primary-500/20 group"
            >
              <MessageCircle size={20} className="text-muted-foreground" />
              <span>Let's Discuss Your Project</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
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
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
