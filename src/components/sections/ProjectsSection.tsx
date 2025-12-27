'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

// Projects data
interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  featured?: boolean;
}

// Helper to get GitHub OGP image from repo URL
function getGitHubOGP(repoUrl: string): string {
  // Convert https://github.com/user/repo to https://opengraph.githubassets.com/1/user/repo
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) {
    return `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}`;
  }
  return '/placeholder.webp';
}

const projects: Project[] = [
  {
    title: 'NITIC Calendar Bot',
    description:
      'A Discord bot that notifies users of the annual event schedule at Ibaraki National College of Technology (NITIC).',
    tags: ['Discord.js', 'Google Calendar', 'Node.js'],
    repoUrl: 'https://github.com/fukayatti/NITIC-Calendar-BOT',
    featured: true,
  },
  {
    title: 'KOSEN-OPAC-Checker',
    description:
      'A Chrome extension that displays book availability from KOSEN (National Institute of Technology) libraries nationwide on Amazon and Rakuten Books pages.',
    image:
      'https://github.com/fukayatti/KOSEN-OPAC-Checker/raw/main/assets/logo.png',
    tags: ['JavaScript', 'Web Scraping', 'Chrome Extension'],
    repoUrl: 'https://github.com/fukayatti/KOSEN-OPAC-Checker',
    featured: true,
  },
  {
    title: 'Bus-Vision',
    description:
      'A macOS menu bar application for real-time monitoring of bus arrival information between Ibaraki KOSEN and Katsuta Station.',
    image:
      'https://github.com/fukayatti/Bus-Vision/raw/main/assets/Screenshot.png',
    tags: ['SwiftUI', 'Web Scraping', 'macOS'],
    repoUrl: 'https://github.com/fukayatti/Bus-Vision',
    featured: true,
  },
  // {
  //   title: 'DIY Particle Detector App',
  //   description:
  //     'Interactive weather dashboard with forecasts and data visualizations.',
  //   tags: ['JavaScript', 'Chart.js', 'API'],
  //   repoUrl: 'https://github.com/fukayatti/diy-particle-detector-app',
  // },
  // {
  //   title: 'Portfolio Website',
  //   description: "This portfolio you're viewing, built with cutting-edge tech.",
  //   tags: ['Next.js 15', 'React 19', 'Framer'],
  //   liveUrl: 'https://fukayatti0.dev',
  //   repoUrl: 'https://github.com/fukayatti0/my-portfolio',
  // },
  // {
  //   title: 'Blog Platform',
  //   description: 'Markdown-based blog with syntax highlighting and SEO.',
  //   tags: ['Next.js', 'MDX', 'Prisma'],
  //   repoUrl: 'https://github.com/fukayatti/md-blog-platform',
  // },
];

// Glitch effect for images with enhanced CRT effect
function GlitchImage({ src, alt }: { src: string; alt: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 ${isGlitching ? 'grayscale-0 scale-110' : 'grayscale'}`}
      />

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            animate={{ x: [0, 5, -5, 0] }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              style={{ filter: 'hue-rotate(90deg) saturate(150%)' }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 mix-blend-multiply opacity-50"
            animate={{ x: [0, -3, 3, 0] }}
            transition={{ duration: 0.15, repeat: 3 }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              style={{ filter: 'hue-rotate(-90deg) saturate(150%)' }}
            />
          </motion.div>
        </>
      )}

      {/* CRT Scanlines - stronger effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
        }}
      />

      {/* Horizontal scan animation */}
      <motion.div
        className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Corner accents on hover */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cyan-400"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </>
      )}
    </div>
  );
}

// Project Card
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const projectNumber = String(index + 1).padStart(3, '0');

  return (
    <motion.div
      ref={ref}
      className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(400px circle at ${spotlightX.get()}px ${spotlightY.get()}px, rgba(0, 255, 255, 0.1), transparent 40%)`,
        }}
      />

      {/* Project number */}
      <div className="absolute top-4 right-4 z-20 font-mono text-xs text-cyan-500/60">
        #{projectNumber}
      </div>

      {/* Image container */}
      <div className="relative h-56">
        <GlitchImage
          src={project.image || getGitHubOGP(project.repoUrl)}
          alt={project.title}
        />

        {/* Hover overlay with links */}
        <motion.div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500 text-cyan-500 font-mono text-sm hover:bg-cyan-500 hover:text-black transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              LIVE
            </motion.a>
          )}
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-white/50 text-white/70 font-mono text-sm hover:bg-white hover:text-black transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
            CODE
          </motion.a>
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 text-black font-mono text-[10px] font-bold uppercase tracking-wider z-20">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 border-t border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 font-mono">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-800 border border-slate-600/50 text-slate-400 text-xs font-mono hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-cyan-500/20 group-hover:border-b-cyan-500/60 transition-colors duration-300" />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="projects" className="relative py-32 bg-black overflow-hidden">
      {/* Background grid */}
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

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] mb-4">
            ◈ SECTION_003 // WORK
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
            SELECTED
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              PROJECTS
            </span>
          </h2>

          <p className="text-slate-400 max-w-xl font-mono text-sm">
            A curated collection of work showcasing technical expertise and
            creative problem-solving.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500 mb-8 font-mono text-sm">
            Interested in collaboration?
          </p>
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 border-2 border-white text-white font-mono text-sm uppercase tracking-widest overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Let&apos;s Work Together
            </span>
            <motion.span
              className="relative z-10 group-hover:text-black transition-colors duration-300"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-600 tracking-wider">
        {projects.length} PROJECTS
      </div>
    </section>
  );
}
