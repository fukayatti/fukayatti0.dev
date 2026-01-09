'use client';

import { motion } from 'framer-motion';
import { Github, Instagram, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/fukayatti', icon: Github },
  {
    name: 'Twitter',
    href: 'https://twitter.com/fukayatti0_dev',
    icon: Twitter,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/fukayatti0',
    icon: Instagram,
  },
];

const quickLinks = [
  { name: 'HOME', href: '/', code: '01' },
  { name: 'ABOUT', href: '#about', code: '02' },
  { name: 'PROJECTS', href: '#projects', code: '03' },
  { name: 'CAREER', href: '#career', code: '04' },
  { name: 'CONTACT', href: '#contact', code: '05' },
];

// ASCII art decoration
const asciiArt = `
   ╔═══════════════════════════════════╗
   ║  F U K A Y A T T I 0 . D E V     ║
   ╚═══════════════════════════════════╝
`;

export default function FooterContent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-slate-800">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* ASCII Art */}
            <pre className="text-[15px] font-mono text-cyan-500/50 leading-none hidden md:block">
              {asciiArt}
            </pre>

            <p className="text-slate-500 text-sm font-mono leading-relaxed max-w-xs">
              Building digital experiences with code and creativity. Always
              learning, always creating.
            </p>

            {/* Status */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-500">SYSTEM OPERATIONAL</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-wider">
              // NAVIGATION
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-sm"
                >
                  <span className="text-slate-600 text-xs">[{link.code}]</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-wider">
              // CONNECT
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 border border-slate-700 hover:border-cyan-500 flex items-center justify-center transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* System Info */}
            <div className="text-[10px] font-mono text-slate-600 space-y-1 pt-4">
              <div>NODE: CYBERSPACE</div>
              <div>PING: 12ms</div>
              <div>TZ: UTC+9 (JST)</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs font-mono text-slate-600">
            © {currentYear} FUKAYATTI0 — ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono text-slate-600">
            <span>v1.0.0</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>NEXT.JS 15</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>REACT 19</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative scan line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </footer>
  );
}
