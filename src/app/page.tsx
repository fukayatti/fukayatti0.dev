'use client';

import { useEffect, useState, useRef } from 'react';
import Background from '@/components/background';
import HeaderSection from '@/components/HeaderSection';
import TechIdentitySection from '@/components/TechIdentitySection';
import CurrentFocusSection from '@/components/CurrentFocusSection';
import TechUniverseSection from '@/components/TechUniverseSection';
import Goals2025Section from '@/components/Goals2025Section';
import LetsConnectSection from '@/components/LetsConnectSection';
import FooterSection from '@/components/FooterSection';

// Custom hook: useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

// Custom hook: useParticles
function useParticles(
  width: number,
  height: number,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  useEffect(() => {
    if (!width || !height) return;
    let ctx: CanvasRenderingContext2D | null;
    let particles: {
      x: number;
      y: number;
      radius: number;
      hue: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    let frame: number;
    const particleCount = 60;
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas resize function
    const resizeCanvas = () => {
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();

    // Initialize particles with enhanced properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        hue: 220 + Math.random() * 60, // Store hue separately for easy manipulation
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    // Enhanced animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles with glow effect
      particles.forEach((particle) => {
        // Create glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        );

        // Use proper RGBA format for gradient colors
        const glowColor = `rgba(${Math.sin(particle.hue * 0.01) * 127 + 128}, ${Math.sin((particle.hue + 120) * 0.01) * 127 + 128}, ${Math.sin((particle.hue + 240) * 0.01) * 127 + 128}, ${particle.opacity})`;

        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw main particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        // Use proper RGBA format for main particle
        const mainColor = `rgba(${Math.sin(particle.hue * 0.01) * 127 + 128}, ${Math.sin((particle.hue + 120) * 0.01) * 127 + 128}, ${Math.sin((particle.hue + 240) * 0.01) * 127 + 128}, ${Math.min(1, particle.opacity + 0.4)})`;
        ctx.fillStyle = mainColor;
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Pulse opacity
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
      });

      // Draw connection lines with enhanced styling
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              otherParticle.x,
              otherParticle.y
            );
            gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 1.2})`);
            gradient.addColorStop(1, `rgba(219, 39, 119, ${opacity})`);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [width, height, canvasRef]);
}

export default function AboutMePage() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useParticles(width, height, canvasRef);

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden">
      {/* Enhanced background with modern mesh gradient */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #581c87 75%, #7c2d12 100%)
          `,
        }}
      />

      {/* Animated mesh overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          animation: 'gradient-xy 20s ease infinite',
        }}
      />

      {/* Enhanced particle background */}
      <Background width={width} height={height} />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-80"
      />

      {/* Main content with improved layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating orbs decoration */}
        <div className="fixed inset-0 -z-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-blob" />
          <div
            className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-accent-400/15 to-primary-400/15 rounded-full blur-2xl animate-blob"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-primary-300/25 to-accent-300/25 rounded-full blur-lg animate-blob"
            style={{ animationDelay: '4s' }}
          />
        </div>

        {/* Hero section with enhanced glass effect */}
        <section
          id="hero"
          className="flex flex-col items-center justify-center min-h-screen px-4 relative"
        >
          <div className="glass rounded-3xl p-8 md:p-12 max-w-6xl w-full backdrop-blur-xl border border-white/10 shadow-glass">
            <HeaderSection />
          </div>
        </section>

        {/* Content sections with improved spacing and effects */}
        <main className="w-full max-w-7xl mx-auto flex flex-col gap-24 md:gap-32 px-4 md:px-8 py-16 md:py-24">
          <section id="identity" className="group relative">
            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-glass hover:shadow-glow-lg transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 md:p-12 backdrop-blur-xl">
                <TechIdentitySection />
              </div>
            </div>
          </section>

          <section id="focus" className="group relative">
            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-glass hover:shadow-glow-lg transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 md:p-12 backdrop-blur-xl">
                <CurrentFocusSection />
              </div>
            </div>
          </section>

          <section id="universe" className="group relative">
            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-glass hover:shadow-glow-lg transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 via-accent-400/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 md:p-12 backdrop-blur-xl">
                <TechUniverseSection />
              </div>
            </div>
          </section>

          <section id="goals" className="group relative">
            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-glass hover:shadow-glow-lg transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 via-primary-400/5 to-accent-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 md:p-12 backdrop-blur-xl">
                <Goals2025Section />
              </div>
            </div>
          </section>

          <section id="connect" className="group relative">
            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-glass hover:shadow-glow-lg transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 md:p-12 backdrop-blur-xl">
                <LetsConnectSection />
              </div>
            </div>
          </section>
        </main>

        {/* Footer with glass effect */}
        <div className="mt-16 px-4 md:px-8">
          <div className="glass rounded-3xl border border-white/10 shadow-glass backdrop-blur-xl">
            <FooterSection />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm font-mono">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
