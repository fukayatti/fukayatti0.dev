'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

// Noise texture SVG filter
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
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-cyan-500 z-0"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translate(-2px, 0)',
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-red-500 z-0"
            style={{
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translate(2px, 0)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// Cyberpunk Grid Background
function CyberGrid() {
  // Pre-defined particle positions to avoid hydration mismatch
  const particles = [
    { left: 3, top: 12, duration: 3.2, delay: 0.4 },
    { left: 12, top: 35, duration: 4.1, delay: 1.1 },
    { left: 22, top: 58, duration: 3.8, delay: 1.9 },
    { left: 32, top: 22, duration: 4.5, delay: 0.6 },
    { left: 42, top: 78, duration: 3.5, delay: 1.3 },
    { left: 52, top: 42, duration: 4.8, delay: 2.4 },
    { left: 62, top: 68, duration: 3.3, delay: 0.2 },
    { left: 72, top: 18, duration: 4.6, delay: 1.7 },
    { left: 82, top: 52, duration: 3.6, delay: 2.0 },
    { left: 90, top: 82, duration: 4.2, delay: 0.9 },
    { left: 7, top: 48, duration: 3.9, delay: 1.5 },
    { left: 27, top: 88, duration: 4.4, delay: 2.6 },
    { left: 47, top: 28, duration: 3.4, delay: 0.1 },
    { left: 67, top: 58, duration: 4.7, delay: 1.2 },
    { left: 87, top: 38, duration: 3.7, delay: 2.3 },
    { left: 17, top: 72, duration: 4.0, delay: 0.7 },
    { left: 37, top: 15, duration: 3.1, delay: 1.8 },
    { left: 57, top: 92, duration: 4.3, delay: 2.7 },
    { left: 77, top: 32, duration: 3.0, delay: 0.5 },
    { left: 95, top: 62, duration: 4.9, delay: 1.6 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, transparent 49%, rgba(0,255,255,0.3) 50%, transparent 51%, transparent 100%),
            linear-gradient(0deg, transparent 0%, transparent 49%, rgba(0,255,255,0.3) 50%, transparent 51%, transparent 100%)
          `,
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-50%)',
          transformOrigin: 'center top',
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
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

// Morphing Blob
function MorphingBlob({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        borderRadius: [
          '60% 40% 30% 70%/60% 30% 70% 40%',
          '30% 60% 70% 40%/50% 60% 30% 60%',
          '60% 40% 30% 70%/60% 30% 70% 40%',
        ],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ASCII Art Profile
function ASCIIProfile() {
  const ascii = `
    ╔══════════════════╗
    ║  ███████████████ ║
    ║  █ FUKAYATTI0  █ ║
    ║  █    ★ ★      █ ║
    ║  █     ▽       █ ║
    ║  █    ═══      █ ║
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

// Terminal-style typing effect - now scroll-triggered
function TerminalText({ lines }: { lines: string[] }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll trigger
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

  // Typing effect - only starts when visible
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
      }, 40); // Slightly slower for more dramatic effect
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
      {/* Only show fully completed lines */}
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
      {/* Current line being typed with cursor */}
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

// Skill Pill with hover explosion
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
      {/* Explosion particles */}
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

// Stats with dramatic reveal
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

// Distortion Image Effect with enhanced scanlines
function DistortedImage({ src }: { src: string }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
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
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-square overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setMousePos({ x: 0.5, y: 0.5 });
        setIsHovered(false);
      }}
    >
      {/* Main image with distortion */}
      <motion.div
        className="absolute inset-0"
        style={{
          filter: `blur(${Math.abs(mousePos.x - 0.5) * 2}px)`,
        }}
      >
        <Image
          src={src}
          alt="Profile"
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          style={{
            transform: `scale(1.1) translate(${(mousePos.x - 0.5) * 10}px, ${(mousePos.y - 0.5) * 10}px)`,
          }}
        />
      </motion.div>

      {/* RGB Split layers on hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-60"
            initial={{ x: 0 }}
            animate={{ x: [0, 3, -3, 0] }}
            transition={{ duration: 0.15, repeat: 2 }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              style={{ filter: 'hue-rotate(90deg) saturate(200%)' }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 mix-blend-multiply opacity-60"
            initial={{ x: 0 }}
            animate={{ x: [0, -3, 3, 0] }}
            transition={{ duration: 0.15, repeat: 2 }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              style={{ filter: 'hue-rotate(-90deg) saturate(200%)' }}
            />
          </motion.div>
        </>
      )}

      {/* CRT Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
        }}
      />

      {/* Horizontal scan animation */}
      <motion.div
        className="absolute inset-x-0 h-[2px] bg-cyan-500/30 pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Corner decorations - animated */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50"
        animate={{
          borderColor: isHovered
            ? 'rgba(0, 255, 255, 1)'
            : 'rgba(0, 255, 255, 0.5)',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50"
        animate={{
          borderColor: isHovered
            ? 'rgba(0, 255, 255, 1)'
            : 'rgba(0, 255, 255, 0.5)',
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-500/30"
        animate={{
          borderColor: isHovered
            ? 'rgba(139, 92, 246, 0.8)'
            : 'rgba(139, 92, 246, 0.3)',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-purple-500/30"
        animate={{
          borderColor: isHovered
            ? 'rgba(139, 92, 246, 0.8)'
            : 'rgba(139, 92, 246, 0.3)',
        }}
      />
    </motion.div>
  );
}

// Main Component
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
      <CyberGrid />

      {/* Morphing blobs */}
      <MorphingBlob className="w-[600px] h-[600px] bg-cyan-500/10 -top-32 -left-32" />
      <MorphingBlob className="w-[400px] h-[400px] bg-purple-500/10 bottom-0 right-0" />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ filter: 'url(#noise)' }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ y, opacity }}
      >
        {/* Header - Brutalist Style */}
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

        {/* Main Content - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 mb-24">
          {/* Left Column - Profile */}
          <motion.div
            className="lg:col-span-5"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <DistortedImage src="/profile.png" />

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

          {/* Right Column - Info */}
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
                  15-year-old student developer
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

        {/* Stats - Horizontal Strip */}
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
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-600 tracking-wider">
        NODE: JP-EAST-01 — STATUS: ACTIVE
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-slate-600 tracking-wider">
        © 2025 FUKAYATTI0
      </div>
    </section>
  );
}
