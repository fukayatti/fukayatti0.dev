'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Instagram,
  Mail,
  Send,
  Twitter,
} from 'lucide-react';

import { useEffect, useState } from 'react';

const contactMethods = [
  {
    icon: Mail,
    title: 'EMAIL',
    contact: 'contact@fukayatti.dev',
    href: 'mailto:contact@fukayatti.dev',
  },
  {
    icon: Instagram,
    title: 'INSTAGRAM',
    contact: '@fukayatti0',
    href: 'https://instagram.com/fukayatti0',
  },
  {
    icon: Github,
    title: 'GITHUB',
    contact: '@fukayatti',
    href: 'https://github.com/fukayatti',
  },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/fukayatti', icon: Github },
  {
    name: 'X',
    href: 'https://twitter.com/fukayatti',
    icon: Twitter,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/fukayatti0',
    icon: Instagram,
  },
];

// External links for Qiita and Zenn (no lucide icons)
const externalLinks = [
  { name: 'Qiita', href: 'https://qiita.com/fukayatti' },
  { name: 'Zenn', href: 'https://zenn.dev/fukayatti' },
  { name: 'Instagram', href: 'https://instagram.com/fukayatti0' },
];

// Matrix-style falling characters
function MatrixRain() {
  const [columns, setColumns] = useState<
    { chars: string[]; speed: number; x: number }[]
  >([]);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const newColumns = Array.from({ length: 20 }, (_, i) => ({
      chars: Array.from(
        { length: 15 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ),
      speed: 2 + Math.random() * 3,
      x: (i / 20) * 100,
    }));
    setColumns(newColumns);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
      {columns.map((col, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-cyan-500 whitespace-pre leading-4"
          style={{ left: `${col.x}%` }}
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.1,
          }}
        >
          {col.chars.join('\n')}
        </motion.div>
      ))}
    </div>
  );
}

// Terminal-style input
function TerminalInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = `w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-slate-600 ${multiline ? 'resize-none min-h-[120px]' : ''}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-mono text-cyan-500 uppercase tracking-wider"
      >
        {'{'} {label} {'}'}
      </label>
      <div
        className={`relative p-4 bg-slate-900/50 border transition-colors duration-300 ${isFocused ? 'border-cyan-500' : 'border-slate-700'}`}
      >
        <div className="flex items-start gap-3">
          <span className="text-cyan-500 font-mono select-none">{'>'}</span>
          {multiline ? (
            <textarea
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={inputClasses}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          ) : (
            <input
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={inputClasses}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </div>

        {/* Cursor blink effect */}
        {isFocused && !value && (
          <motion.span
            className="absolute bottom-4 left-[38px] w-2 h-5 bg-cyan-500"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

// Orbital social links
function OrbitalLinks() {
  return (
    <div className="relative w-48 h-48">
      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border border-cyan-500/30 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-3 h-3 bg-cyan-500 rounded-full" />
        </motion.div>
      </div>

      {/* Orbiting icons */}
      {socialLinks.map((social, i) => {
        const angle = (i / socialLinks.length) * 360;
        return (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute w-10 h-10 border border-slate-600 hover:border-cyan-500 bg-slate-900 flex items-center justify-center transition-colors duration-300 group"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateY(-70px) rotate(-${angle}deg)`,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <social.icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </motion.a>
        );
      })}

      {/* Orbit ring */}
      <div
        className="absolute inset-0 border border-slate-700/30 rounded-full"
        style={{ transform: 'scale(1.4)' }}
      />
    </div>
  );
}

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 bg-black overflow-hidden">
      <MatrixRain />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] mb-4">
            ◈ SECTION_005 // CONTACT
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
            GET IN
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              TOUCH
            </span>
          </h2>

          <p className="text-slate-400 max-w-xl font-mono text-sm">
            Have a project in mind? Let&apos;s build something extraordinary
            together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    method.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-700 hover:border-cyan-500 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <div className="w-12 h-12 border border-slate-600 group-hover:border-cyan-500 flex items-center justify-center transition-colors duration-300">
                    <method.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {method.title}
                    </div>
                    <div className="text-white font-mono">{method.contact}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            {/* Availability status */}
            <motion.div
              className="p-6 bg-slate-900/50 border border-cyan-500/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </motion.span>
                <span className="font-mono text-sm text-green-400 uppercase tracking-wider">
                  System Online
                </span>
              </div>
              <p className="text-slate-400 text-sm font-mono">
                Currently accepting new projects and collaborations. Response
                time: ~24h
              </p>
            </motion.div>

            {/* Orbital social links - hidden on mobile */}
            <div className="hidden lg:flex justify-center pt-8">
              <OrbitalLinks />
            </div>

            {/* Mobile social links */}
            <div className="flex flex-wrap gap-3 lg:hidden">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-slate-700 hover:border-cyan-500 flex items-center justify-center transition-colors duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
              {externalLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-4 border border-slate-700 hover:border-cyan-500 flex items-center justify-center transition-colors duration-300 group font-mono text-xs text-slate-400 hover:text-cyan-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 bg-slate-900/30 border border-slate-700 backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-slate-500 font-mono">
                  contact.sh — zsh
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TerminalInput
                    label="NAME"
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <TerminalInput
                    label="EMAIL"
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>

                <TerminalInput
                  label="SUBJECT"
                  id="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  placeholder="Project Inquiry"
                />

                <TerminalInput
                  label="MESSAGE"
                  id="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  multiline
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-500 font-mono text-sm uppercase tracking-widest overflow-hidden disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-black transition-colors duration-300">
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          ⟳
                        </motion.span>
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND MESSAGE
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-cyan-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-600 tracking-wider">
        TRANSMISSION READY
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-slate-600 tracking-wider">
        © 2025 FUKAYATTI0
      </div>
    </section>
  );
}
