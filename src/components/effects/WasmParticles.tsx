'use client';

/**
 * WasmParticles.tsx
 *
 * GPU-accelerated particle system rendered via the Rust/WebGL2 WASM renderer
 * (ParticleRenderer from portfolio-fx).
 *
 * Two modes — chosen via the `mode` prop:
 *   "cyber"   (mode 0) – CyberGrid: upward-drifting glowing dots on a grid
 *   "network" (mode 1) – Network: mouse-attracted particles connected by lines
 *
 * Falls back to a lightweight Canvas-2D implementation if WASM / WebGL2 is
 * unavailable.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { useWasmFx } from '@/hooks/useWasmFx';

// ── Types ──────────────────────────────────────────────────────────────────────

export type ParticleMode = 'cyber' | 'network';

export interface WasmParticlesProps {
  /** Particle mode. Default "cyber". */
  mode?: ParticleMode;
  /** Additional CSS class names applied to the canvas / wrapper element. */
  className?: string;
  /** Force the Canvas-2D fallback regardless of WASM availability. */
  forceFallback?: boolean;
}

// ── Mode → numeric constant ────────────────────────────────────────────────────

const MODE_MAP: Record<ParticleMode, number> = {
  cyber: 0,
  network: 1,
};

// ── Canvas-2D fallback ─────────────────────────────────────────────────────────
// A minimal dot-grid animation that approximates CyberGrid, used when WASM
// is unavailable.

interface FallbackDot {
  x: number;
  y: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

const FALLBACK_COLORS = ['#00ffff', '#00e5ff', '#0080ff', '#00ff88'];

function initFallbackDots(width: number, height: number): FallbackDot[] {
  const cols = Math.floor(width / 40);
  const rows = Math.floor(height / 40);
  const dots: FallbackDot[] = [];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (Math.random() > 0.3) continue; // sparse
      dots.push({
        x: c * 40 + Math.random() * 20 - 10,
        y: r * 40 + Math.random() * height,
        vy: -(Math.random() * 0.6 + 0.2),
        alpha: Math.random() * 0.6 + 0.1,
        size: Math.random() * 2 + 1,
        color:
          FALLBACK_COLORS[Math.floor(Math.random() * FALLBACK_COLORS.length)],
      });
    }
  }
  return dots;
}

function FallbackParticles({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<FallbackDot[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
      dotsRef.current = initFallbackDots(canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const dot of dotsRef.current) {
        dot.y += dot.vy;
        // Wrap around top
        if (dot.y < -10) {
          dot.y = canvas.height + 10;
          dot.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = dot.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}

// ── WASM renderer ──────────────────────────────────────────────────────────────

interface WasmRendererProps extends WasmParticlesProps {
  onFailed: () => void;
}

function WasmRenderer({
  mode = 'cyber',
  className = '',
  onFailed,
}: WasmRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { wasm, ready, error } = useWasmFx();
  const rendererRef = useRef<import('portfolio-fx').ParticleRenderer | null>(
    null
  );

  // ── Initialise once WASM is ready ─────────────────────────────────────────
  useEffect(() => {
    if (error) {
      onFailed();
      return;
    }
    if (!ready || !wasm) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size the canvas to its CSS layout dimensions
    canvas.width = Math.max(1, canvas.offsetWidth || window.innerWidth);
    canvas.height = Math.max(1, canvas.offsetHeight || window.innerHeight);

    let renderer: typeof rendererRef.current = null;

    try {
      renderer = wasm.ParticleRenderer.new(canvas, MODE_MAP[mode]);
      renderer.start();
      rendererRef.current = renderer;
    } catch (e) {
      console.error('[WasmParticles] ParticleRenderer.new failed:', e);
      onFailed();
      return;
    }

    // Keep canvas pixel size in sync with CSS layout
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(1, Math.round(entry.contentRect.width));
        const h = Math.max(1, Math.round(entry.contentRect.height));
        canvas.width = w;
        canvas.height = h;
        rendererRef.current?.resize(w, h);
      }
    });
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      try {
        rendererRef.current?.stop();
        rendererRef.current?.free();
      } catch {
        // ignore cleanup errors
      }
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, wasm, error, mode]);

  // ── Mouse tracking for Network mode ───────────────────────────────────────
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (mode !== 'network') return;
      const canvas = canvasRef.current;
      if (!canvas || !rendererRef.current) return;
      const rect = canvas.getBoundingClientRect();
      rendererRef.current.set_mouse(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
    },
    [mode]
  );

  useEffect(() => {
    if (mode !== 'network') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Attach to the window so mouse movement anywhere on the page is tracked
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [mode, onMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}

// ── Public component ───────────────────────────────────────────────────────────

/**
 * WasmParticles
 *
 * Renders a GPU-accelerated particle system using the Rust/WebGL2 WASM module.
 * Automatically falls back to a Canvas-2D dot animation if WASM or WebGL2 is
 * unavailable.
 *
 * @example
 * // Full-viewport CyberGrid background (fixed overlay)
 * <WasmParticles
 *   mode="cyber"
 *   className="fixed inset-0 z-0"
 * />
 *
 * @example
 * // Network particle background for a section
 * <WasmParticles
 *   mode="network"
 *   className="absolute inset-0"
 * />
 */
export default function WasmParticles({
  mode = 'cyber',
  className = '',
  forceFallback = false,
}: WasmParticlesProps) {
  const [useFallback, setUseFallback] = useState(forceFallback);

  if (useFallback || forceFallback) {
    return <FallbackParticles className={className} />;
  }

  return (
    <WasmRenderer
      mode={mode}
      className={className}
      onFailed={() => setUseFallback(true)}
    />
  );
}
