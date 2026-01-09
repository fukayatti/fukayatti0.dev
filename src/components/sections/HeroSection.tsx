'use client';

import { motion } from 'framer-motion';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

// Glitch Text Effect
function GlitchText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-cyan-500"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translate(-3px, 0)',
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-red-500"
            style={{
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translate(3px, 0)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// Cyber Grid Background
function CyberGrid() {
  // Pre-defined particle positions to avoid hydration mismatch
  const particles = [
    { left: 5, top: 10, duration: 4.2, delay: 0.5 },
    { left: 15, top: 30, duration: 5.1, delay: 1.2 },
    { left: 25, top: 60, duration: 4.8, delay: 2.0 },
    { left: 35, top: 20, duration: 5.5, delay: 0.8 },
    { left: 45, top: 80, duration: 4.0, delay: 1.5 },
    { left: 55, top: 40, duration: 6.0, delay: 2.5 },
    { left: 65, top: 70, duration: 4.5, delay: 0.3 },
    { left: 75, top: 15, duration: 5.8, delay: 1.8 },
    { left: 85, top: 50, duration: 4.3, delay: 2.2 },
    { left: 92, top: 85, duration: 5.2, delay: 0.7 },
    { left: 8, top: 45, duration: 4.6, delay: 1.0 },
    { left: 28, top: 90, duration: 5.4, delay: 2.8 },
    { left: 48, top: 25, duration: 4.1, delay: 0.2 },
    { left: 68, top: 55, duration: 5.7, delay: 1.4 },
    { left: 88, top: 35, duration: 4.9, delay: 2.1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, transparent 49%, rgba(0,255,255,0.4) 50%, transparent 51%, transparent 100%),
            linear-gradient(0deg, transparent 0%, transparent 49%, rgba(0,255,255,0.4) 50%, transparent 51%, transparent 100%)
          `,
          backgroundSize: '100px 100px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          height: '200%',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

// Distorted Profile Image with RGB Split
function DistortedProfile() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-48 h-48 md:w-64 md:h-64"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
    >
      {/* RGB Split layers */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * 8}px, ${(mousePos.y - 0.5) * 8}px)`,
        }}
      >
        <Image
          src="/profile.png"
          alt=""
          fill
          className="object-cover grayscale"
          style={{ filter: 'sepia(100%) hue-rotate(180deg)' }}
          sizes="(max-width: 768px) 192px, 256px"
          priority
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * -8}px, ${(mousePos.y - 0.5) * -8}px)`,
        }}
      >
        <Image
          src="/profile.png"
          alt=""
          fill
          className="object-cover grayscale"
          style={{ filter: 'sepia(100%) hue-rotate(-60deg)' }}
          sizes="(max-width: 768px) 192px, 256px"
          priority
        />
      </motion.div>

      {/* Main image */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src="/profile.png"
          alt="Profile"
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          priority
          sizes="(max-width: 768px) 192px, 256px"
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500" />
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-500" />

      {/* Status badge */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-cyan-500 text-black font-mono text-xs font-bold whitespace-nowrap"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <span className="relative flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
          ONLINE
        </span>
      </motion.div>
    </div>
  );
}

// Typing effect
function TypedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [displayed, text, started]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <motion.span
          className="inline-block w-3 h-6 bg-cyan-400 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <CyberGrid />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-20"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
        }}
      />

      {/* Gradient blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 255, 255, 0.3), transparent 60%)',
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 60%)',
        }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Terminal-style greeting */}
            <motion.div
              className="text-xs font-mono text-cyan-500 mb-6 tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {'>'} INITIALIZING...
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="block text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                <GlitchText>FUKAYATTI</GlitchText>
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 mt-2 tracking-wider">
                .DEVELOPER
              </span>
            </motion.h1>

            {/* Bio */}
            <motion.div
              className="max-w-lg mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-slate-400 text-lg leading-relaxed font-mono min-h-14">
                <TypedText
                  text="Student developer passionate about Rust, WebAssembly & Open Source."
                  delay={1}
                />
              </p>
            </motion.div>

            {/* Terminal info */}
            <motion.div
              className="font-mono text-sm mb-10 p-4 bg-slate-900/50 border border-slate-700 rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <span className="text-cyan-500">$</span> cat info.txt
              </div>
              <div className="space-y-1 text-slate-300">
                <div>
                  <span className="text-purple-400">education:</span> NIT
                  Ibaraki College
                </div>
                <div>
                  <span className="text-purple-400">role:</span>{' '}
                  <span className="text-green-400">
                    Student & OSS Contributor
                  </span>
                </div>
                <div>
                  <span className="text-purple-400">focus:</span> Rust,
                  WebAssembly, ML
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-500 font-mono text-sm uppercase tracking-widest overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  View Projects
                </span>
                <motion.div
                  className="absolute inset-0 bg-cyan-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative px-8 py-4 bg-transparent border-2 border-white/30 text-white/70 font-mono text-sm uppercase tracking-widest overflow-hidden hover:border-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch →
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <DistortedProfile />
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-600 tracking-wider z-10">
        v1.0.0 — 5
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-slate-600 tracking-wider z-10">
        SESSION://0x7F3A9C2D
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-cyan-500 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
