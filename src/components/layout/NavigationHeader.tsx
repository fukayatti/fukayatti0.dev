'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'HOME', code: '01' },
  { href: '#about', label: 'ABOUT', code: '02' },
  { href: '#projects', label: 'PROJECTS', code: '03' },
  { href: '#career', label: 'CAREER', code: '04' },
  { href: '#contact', label: 'CONTACT', code: '05' },
];

// Glitch effect for logo
function GlitchLogo() {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsGlitching(true)}
      onHoverEnd={() => setIsGlitching(false)}
    >
      <span className="font-bold text-lg text-white font-display">
        FUKAYATTI0
      </span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-cyan-500 font-display font-bold text-lg"
            animate={{ x: [0, 2, -2, 0] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            FUKAYATTI0
          </motion.span>
          <motion.span
            className="absolute inset-0 text-red-500 font-display font-bold text-lg"
            animate={{ x: [0, -2, 2, 0] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            FUKAYATTI0
          </motion.span>
        </>
      )}
    </motion.div>
  );
}

// Nav link with terminal style
function NavLink({
  href,
  label,
  code,
  onClick,
}: {
  href: string;
  label: string;
  code: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative px-4 py-2 font-mono text-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-slate-500 mr-1 text-xs">[{code}]</span>
      <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-200">
        {label}
      </span>

      {/* Underline animation */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-px bg-cyan-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Glow effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-cyan-500/5 rounded-sm" />
      )}
    </Link>
  );
}

const NavigationHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative w-10 h-10 border border-cyan-500/50 p-[2px] group-hover:border-cyan-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full overflow-hidden bg-slate-900">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-cyan-500" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-cyan-500" />
              </motion.div>

              <GlitchLogo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="w-10 h-10 border border-slate-700 hover:border-cyan-500 flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-cyan-500" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-400" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Decorative scan line */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-linear-to-r from-transparent via-cyan-500 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              className="relative h-full flex flex-col items-center justify-center gap-6"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
                closed: {},
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-4 font-mono text-2xl"
                  >
                    <span className="text-cyan-500/50 text-sm">
                      [{link.code}]
                    </span>
                    <span className="text-white group-hover:text-cyan-400 transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-20 text-[10px] font-mono text-slate-600"
                variants={{
                  open: { opacity: 1 },
                  closed: { opacity: 0 },
                }}
              >
                NAVIGATION SYSTEM v1.0
              </motion.div>
            </motion.div>

            {/* Grid background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationHeader;
