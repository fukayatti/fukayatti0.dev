'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Github,
  Mail,
  Rocket,
  Settings,
  Smartphone,
  TrendingUp,
  Twitter,
  Zap,
} from 'lucide-react';

export default function FooterContent() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/fukayatti',
      icon: Github,
      color: 'hover:text-primary-400',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/fukayatti0',
      icon: Twitter,
      color: 'hover:text-accent-400',
    },
    {
      name: 'Email',
      href: 'mailto:contact@fukayatti.dev',
      icon: Mail,
      color: 'hover:text-purple-400',
    },
  ];

  const quickLinks = [
    { name: 'About', href: '#identity' },
    { name: 'Projects', href: '#focus' },
    { name: 'Skills', href: '#universe' },
    { name: 'Goals', href: '#goals' },
    { name: 'Contact', href: '#connect' },
  ];

  return (
    <>
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10">
              <Rocket className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                fukayatti0
              </h3>
              <p className="text-sm text-foreground/70">Tech Explorer</p>
            </div>
          </div>
          <p className="text-foreground/70 leading-relaxed">
            Building the future through code, innovation, and open-source
            collaboration. Always learning, always creating.
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'React', icon: Code2 },
              { name: 'Next.js', icon: Smartphone },
              { name: 'TypeScript', icon: Code2 },
              { name: 'Electronics', icon: Zap },
            ].map((tech) => (
              <span
                key={tech.name}
                className="flex items-center gap-1 px-3 py-1 glass rounded-full text-xs font-medium border border-white/10 text-primary-300"
              >
                <tech.icon className="w-3 h-3" />
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
          <nav className="space-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
              >
                <span className="flex items-center gap-2">
                  <span className="text-primary-400">▹</span>
                  {link.name}
                </span>
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Connect Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold text-foreground">
            Let's Connect
          </h4>
          <div className="flex flex-col space-y-3">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-foreground/70 ${social.color} transition-all duration-200 hover:translate-x-1 transform group`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{social.name}</span>
                  <svg
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200"
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
                </a>
              );
            })}
          </div>

          {/* Newsletter Signup */}
          <div className="pt-4">
            <p className="text-sm text-foreground/70 mb-3">
              Stay updated with my latest projects
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 glass rounded-lg border border-white/10 bg-transparent text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary-400"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium text-sm hover:scale-105 transition-transform duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="border-t border-white/10 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Projects', value: '25+', icon: Rocket },
            { label: 'Commits', value: '1.2K+', icon: Code2 },
            { label: 'Technologies', value: '15+', icon: Settings },
            { label: 'Experience', value: '3+ years', icon: TrendingUp },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl glass flex items-center justify-center text-primary-400 border border-white/10">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-xl font-bold text-primary-300">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
