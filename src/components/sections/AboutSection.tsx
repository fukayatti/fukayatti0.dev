'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

import WasmGradientOrb from '@/components/effects/WasmGradientOrb';
import WasmParticles from '@/components/effects/WasmParticles';
import WasmRgbSplit from '@/components/effects/WasmRgbSplit';

// ── Noise texture SVG filter ───────────────────────────────────────────────────
const NoiseFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);

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
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);
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
              clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)',
              transform: 'translate(-4px, 0)',
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-red-500"
            style={{
              clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
              transform: 'translate(4px, 0)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// ── ASCII Art Profile ──────────────────────────────────────────────────────────
function ASCIIProfile() {
  const ascii = `
    ╔══════════════════╗
    ║  ███████████████ ║
    ║  █ FUKAYATTI0  █ ║
    ║  █    ★ ★    █ ║
    ║  █      ▽      █ ║
    ║  █     ═══     █ ║
    ║  ███████████████ ║
    ╚══════════════════╝
  `;

  return (
    <motion.pre
      className="text-[8px] md:text-[10px] font-mono text-cyan-400/80 leading-none whitespace-pre select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {ascii}
    </motion.pre>
  );
}

// ── Terminal-style typing effect (scroll-triggered) ────────────────────────────
function TerminalText({ lines }: { lines: string[] }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = line.slice(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, isVisible]);

  return (
    <div ref={containerRef} className="font-mono text-sm space-y-2">
      {displayedLines.slice(0, currentLine).map((line, i) => (
        <motion.div
          key={i}
          className="flex items-start gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-cyan-500 select-none">❯</span>
          <span
            className={`${line.startsWith('$') ? 'text-green-400' : 'text-slate-300'}`}
          >
            {line}
          </span>
        </motion.div>
      ))}
      {currentLine < lines.length && isVisible && (
        <div className="flex items-start gap-2">
          <span className="text-cyan-500 select-none">❯</span>
          <span
            className={`${lines[currentLine]?.startsWith('$') ? 'text-green-400' : 'text-slate-300'}`}
          >
            {displayedLines[currentLine] || ''}
          </span>
          <motion.span
            className="w-2 h-5 bg-cyan-400 inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
}

// ── Skill Pill with hover explosion ───────────────────────────────────────────
function SkillPill({ name, delay }: { name: string; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {isHovered &&
        [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{ left: '50%', top: '50%' }}
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: Math.cos((i * 45 * Math.PI) / 180) * 30,
              y: Math.sin((i * 45 * Math.PI) / 180) * 30,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.4 }}
          />
        ))}

      <motion.div
        className="relative px-4 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-sm text-cyan-400 text-sm font-mono cursor-default overflow-hidden group"
        whileHover={{
          scale: 1.1,
          borderColor: 'rgba(0, 255, 255, 1)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        }}
      >
        <span className="relative z-10">{name}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Stats with dramatic reveal ─────────────────────────────────────────────────
function DramaticStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative text-center py-8 border-l border-cyan-500/20 first:border-l-0"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ delay }}
    >
      <motion.div
        className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500"
        initial={{ y: 50, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: delay + 0.2, type: 'spring' }}
      >
        {value}
      </motion.div>
      <motion.div
        className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500 font-mono"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.4 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// ── Profile image with WASM distortion ────────────────────────────────────────
function DistortedImageWasm({ src }: { src: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-square"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* GPU-accelerated distort + CRT scanline shader */}
      <WasmRgbSplit
        src={src}
        alt="Profile"
        mode="distort"
        splitIntensity={0.7}
        colorStrength={isHovered ? 0.8 : 0}
        glitchAmount={isHovered ? 0.3 : 0}
        trackMouse
        className="w-full h-full"
      />

      {/* Corner decorations overlaid on top of the WASM canvas */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50 pointer-events-none z-10"
        animate={{
          borderColor: isHovered
            ? 'rgba(0, 255, 255, 1)'
            : 'rgba(0, 255, 255, 0.5)',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50 pointer-events-none z-10"
        animate={{
          borderColor: isHovered
            ? 'rgba(0, 255, 255, 1)'
            : 'rgba(0, 255, 255, 0.5)',
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-500/30 pointer-events-none z-10"
        animate={{
          borderColor: isHovered
            ? 'rgba(139, 92, 246, 0.8)'
            : 'rgba(139, 92, 246, 0.3)',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-purple-500/30 pointer-events-none z-10"
        animate={{
          borderColor: isHovered
            ? 'rgba(139, 92, 246, 0.8)'
            : 'rgba(139, 92, 246, 0.3)',
        }}
      />
    </div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    'RUST',
    'TYPESCRIPT',
    'PYTHON',
    'REACT',
    'NEXT.JS',
    'ASTRO',
    'TAILWIND',
    'WASM',
    'DOCKER',
    'LINUX',
    'GIT',
    'VERCEL',
  ];

  const terminalLines = [
    '$ whoami',
    'fukayatti0 — student & oss contributor',
    '$ cat skills.txt',
    'rust × wasm × full-stack × ml',
    '$ echo $EDUCATION',
    'NIT Ibaraki College',
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-32 bg-black overflow-hidden"
    >
      <NoiseFilter />

      {/* ── WASM: GPU-accelerated particle background ── */}
      <WasmParticles mode="cyber" className="absolute inset-0 z-0" />

      {/* ── WASM: Morphing orb – top-left cyan ── */}
      <div className="absolute w-[600px] h-[600px] -top-32 -left-32 pointer-events-none z-0">
        <WasmGradientOrb
          mode={1}
          colorA="#00ffff"
          colorB="#000000"
          glowColor="#00e5ff"
          glowStrength={0.3}
          opacity={0.1}
          morphSpeed={0.8}
          shapeScale={0.9}
        />
      </div>

      {/* ── WASM: Morphing orb – bottom-right purple ── */}
      <div className="absolute w-[400px] h-[400px] bottom-0 right-0 pointer-events-none z-0">
        <WasmGradientOrb
          mode={1}
          colorA="#8b5cf6"
          colorB="#000000"
          glowColor="#a78bfa"
          glowStrength={0.3}
          opacity={0.1}
          morphSpeed={0.6}
          shapeScale={0.85}
        />
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ filter: 'url(#noise)' }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ y, opacity }}
      >
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-[8px] font-mono text-cyan-500 tracking-[0.5em] mb-4"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            ◈ SECTION_002 // ABOUT
          </motion.div>

          <h2 className="relative">
            <motion.span
              className="block text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-none tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <GlitchText>CREATIVE</GlitchText>
            </motion.span>
            <motion.span
              className="block text-6xl md:text-8xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 leading-none tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 20, delay: 0.1 }}
            >
              DEVELOPER
            </motion.span>
          </h2>
        </motion.div>

        {/* Main Content – Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 mb-24">
          {/* Left Column – WASM-powered profile image */}
          <motion.div
            className="lg:col-span-5"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <DistortedImageWasm src="/profile.png" />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-cyan-500 text-black font-mono text-xs font-bold"
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                whileHover={{ rotate: 0, scale: 1.1 }}
              >
                AVAILABLE FOR HIRE
              </motion.div>
            </div>

            {/* ASCII Art */}
            <div className="mt-8 hidden lg:block">
              <ASCIIProfile />
            </div>
          </motion.div>

          {/* Right Column – Info */}
          <motion.div
            className="lg:col-span-7 lg:pl-12"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Terminal */}
            <div className="p-6 bg-slate-900/80 border border-slate-700 rounded-sm mb-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-slate-500 font-mono">
                  terminal — zsh
                </span>
              </div>
              <TerminalText lines={terminalLines} />
            </div>

            {/* Bio Text */}
            <motion.div
              className="space-y-6 text-slate-400 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p>
                <span className="text-white font-semibold">
                  16-year-old student developer
                </span>{' '}
                at National Institute of Technology, passionate about open
                source and cutting-edge technologies.
              </p>
              <p>
                Currently learning <span className="text-cyan-400">Rust</span>,
                <span className="text-cyan-400"> WebAssembly</span>, and
                <span className="text-cyan-400"> Machine Learning</span>. Active
                in tech communities and always exploring IoT, AI, and
                cloud-native technologies.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <div className="mt-12">
              <div className="text-xs font-mono text-slate-500 mb-4 tracking-wider">
                // TECH_STACK
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <SkillPill key={skill} name={skill} delay={i * 0.05} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats – Horizontal Strip */}
        <motion.div
          className="grid grid-cols-3 border-t border-b border-cyan-500/20 py-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <DramaticStat
            value={`${Math.max(
              0,
              new Date().getFullYear() - 2024 + (new Date().getMonth() - 8) / 12
            ).toFixed(1)}+`}
            label="Years Experience"
            delay={0}
          />
          <DramaticStat value="15+" label="Projects" delay={0.1} />
          <DramaticStat value="∞" label="Curiosity" delay={0.2} />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative px-12 py-5 bg-transparent border-2 border-white text-white font-mono text-sm uppercase tracking-widest overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-4">
              <span>Download CV</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span className="absolute inset-0 flex items-center justify-center text-black font-mono text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <span className="flex items-center gap-4">
                <span>Download CV</span>
                <span>→</span>
              </span>
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-600 tracking-wider z-10">
        NODE: JP-EAST-01 — STATUS: ACTIVE
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-slate-600 tracking-wider z-10">
        © 2025 FUKAYATTI0
      </div>
    </section>
  );
}
