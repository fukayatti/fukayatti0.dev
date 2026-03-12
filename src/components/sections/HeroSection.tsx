'use client';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import WasmGradientOrb from '@/components/effects/WasmGradientOrb';
import WasmParticles from '@/components/effects/WasmParticles';
import WasmRgbSplit from '@/components/effects/WasmRgbSplit';

// ── Glitch Text Effect ─────────────────────────────────────────────────────────
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

// ── Typing Effect ──────────────────────────────────────────────────────────────
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

// ── Profile with WASM RGB-split ────────────────────────────────────────────────
function ProfileSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-48 h-48 md:w-64 md:h-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* GPU-accelerated RGB-split / lens-warp shader */}
      <WasmRgbSplit
        src="/profile.png"
        alt="Profile"
        mode="profile"
        splitIntensity={0.85}
        colorStrength={isHovered ? 1 : 0}
        trackMouse
        className="w-full h-full"
      />

      {/* Corner decorations (overlaid on top of the WASM canvas) */}
      <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500 pointer-events-none z-10" />
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-500 pointer-events-none z-10" />

      {/* Status badge */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-cyan-500 text-black font-mono text-xs font-bold whitespace-nowrap z-10"
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

// ── Main Section ───────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* ── WASM: GPU-accelerated particle background ── */}
      <WasmParticles mode="cyber" className="absolute inset-0 z-0" />

      {/* ── WASM: Gradient orb – top-left cyan ── */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0">
        <WasmGradientOrb
          mode={0}
          colorA="#00ffff"
          colorB="#000000"
          glowColor="#00e5ff"
          glowStrength={0.5}
          opacity={0.22}
          morphSpeed={0.4}
        />
      </div>

      {/* ── WASM: Gradient orb – bottom-right purple ── */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none z-0">
        <WasmGradientOrb
          mode={0}
          colorA="#8b5cf6"
          colorB="#000000"
          glowColor="#a78bfa"
          glowStrength={0.5}
          opacity={0.22}
          morphSpeed={0.35}
        />
      </div>

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-20"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
        }}
      />

      {/* Main content */}
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
                    Student &amp; OSS Contributor
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

          {/* Right: WASM-powered profile image */}
          <div className="order-1 lg:order-2 flex justify-center">
            {mounted && <ProfileSection />}
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
