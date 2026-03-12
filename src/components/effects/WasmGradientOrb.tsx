'use client';

/**
 * WasmGradientOrb.tsx
 *
 * GPU-accelerated gradient orb / morphing blob rendered via the Rust/WebGL2
 * WASM renderer (GradientOrbRenderer from portfolio-fx).
 *
 * Mode 0 → simple animated radial gradient circle  (GradientOrb)
 * Mode 1 → organic SDF blob with smooth-union shape (MorphingBlob)
 *
 * Falls back gracefully to a pure-CSS animated blob if WASM/WebGL2 is
 * unavailable.
 */
import { useEffect, useRef, useState } from 'react';

import { useWasmFx } from '@/hooks/useWasmFx';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface WasmGradientOrbProps {
  /** 0 = GradientOrb (default), 1 = MorphingBlob */
  mode?: 0 | 1;
  /** Inner / centre colour as CSS hex string, e.g. "#00ffff" */
  colorA?: string;
  /** Outer / edge colour as CSS hex string */
  colorB?: string;
  /** Glow halo colour as CSS hex string */
  glowColor?: string;
  /** Glow halo strength [0, 2]. Default 0.6 */
  glowStrength?: number;
  /** Overall opacity [0, 1]. Default 1 */
  opacity?: number;
  /** Morphing speed multiplier. Default 1 */
  morphSpeed?: number;
  /** Shape scale relative to canvas. Default 1 */
  shapeScale?: number;
  /** Edge softness (larger = softer contour). Default 0.06 */
  edgeSoftness?: number;
  /** Additional CSS class names applied to the wrapping <div> */
  className?: string;
  /** Force the CSS fallback regardless of WASM availability */
  forceFallback?: boolean;
}

// ── CSS fallback ───────────────────────────────────────────────────────────────

function CssFallback({
  colorA = '#00ffff',
  colorB = '#001b30',
  opacity = 1,
  className = '',
}: Pick<WasmGradientOrbProps, 'colorA' | 'colorB' | 'opacity' | 'className'>) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: `radial-gradient(circle at 50% 50%, ${colorA}, ${colorB})`,
        opacity,
        filter: 'blur(40px)',
        animation: 'pulse 6s ease-in-out infinite',
      }}
    />
  );
}

// ── WASM renderer ──────────────────────────────────────────────────────────────

function WasmOrbRenderer({
  mode = 0,
  colorA,
  colorB,
  glowColor,
  glowStrength,
  opacity,
  morphSpeed,
  shapeScale,
  edgeSoftness,
  className = '',
  onFailed,
}: WasmGradientOrbProps & { onFailed: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { wasm, ready, error } = useWasmFx();
  const rendererRef = useRef<import('portfolio-fx').GradientOrbRenderer | null>(
    null
  );

  // ── Initialise once WASM is ready ──────────────────────────────────────────
  useEffect(() => {
    if (error) {
      onFailed();
      return;
    }
    if (!ready || !wasm) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size the canvas to its CSS-rendered size
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width));
    canvas.height = Math.max(1, Math.round(rect.height));

    let renderer: typeof rendererRef.current = null;

    try {
      renderer = wasm.GradientOrbRenderer.new(canvas, mode);
      rendererRef.current = renderer;
    } catch (e) {
      console.error('[WasmGradientOrb] GradientOrbRenderer.new failed:', e);
      onFailed();
      return;
    }

    // Apply initial parameters
    if (colorA) renderer.set_color_a(colorA);
    if (colorB) renderer.set_color_b(colorB);
    if (glowColor) renderer.set_glow_color(glowColor);
    if (glowStrength !== undefined) renderer.set_glow_strength(glowStrength);
    if (opacity !== undefined) renderer.set_opacity(opacity);
    if (morphSpeed !== undefined) renderer.set_morph_speed(morphSpeed);
    if (shapeScale !== undefined) renderer.set_shape_scale(shapeScale);
    if (edgeSoftness !== undefined) renderer.set_edge_softness(edgeSoftness);

    renderer.start();

    // Resize observer – keeps canvas pixel size in sync with CSS layout
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
    // We intentionally run this only when wasm/ready/error change.
    // Parameter updates are handled in the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, wasm, error, mode]);

  // ── Live parameter updates (no need to rebuild the renderer) ───────────────
  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    if (colorA) r.set_color_a(colorA);
  }, [colorA]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    if (colorB) r.set_color_b(colorB);
  }, [colorB]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    if (glowColor) r.set_glow_color(glowColor);
  }, [glowColor]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r || glowStrength === undefined) return;
    r.set_glow_strength(glowStrength);
  }, [glowStrength]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r || opacity === undefined) return;
    r.set_opacity(opacity);
  }, [opacity]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r || morphSpeed === undefined) return;
    r.set_morph_speed(morphSpeed);
  }, [morphSpeed]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r || shapeScale === undefined) return;
    r.set_shape_scale(shapeScale);
  }, [shapeScale]);

  useEffect(() => {
    const r = rendererRef.current;
    if (!r || edgeSoftness === undefined) return;
    r.set_edge_softness(edgeSoftness);
  }, [edgeSoftness]);

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
 * WasmGradientOrb
 *
 * Renders a GPU-accelerated SDF gradient orb or morphing blob using the
 * Rust/WebGL2 WASM renderer.  Automatically falls back to a CSS
 * `radial-gradient` if WASM or WebGL2 is unavailable.
 *
 * @example
 * // Simple cyan ambient blob – replaces the CSS blob in HeroSection
 * <WasmGradientOrb
 *   mode={0}
 *   colorA="#00ffff"
 *   colorB="#001830"
 *   glowColor="#00e5ff"
 *   glowStrength={0.5}
 *   opacity={0.25}
 *   className="absolute inset-0 w-full h-full"
 * />
 *
 * @example
 * // Organic morphing blob in AboutSection
 * <WasmGradientOrb
 *   mode={1}
 *   colorA="#8b5cf6"
 *   colorB="#ec4899"
 *   glowColor="#a78bfa"
 *   glowStrength={0.7}
 *   opacity={0.4}
 *   morphSpeed={0.8}
 *   shapeScale={0.85}
 *   className="absolute inset-0 w-full h-full"
 * />
 */
export default function WasmGradientOrb(props: WasmGradientOrbProps) {
  const {
    forceFallback = false,
    colorA = '#00ffff',
    colorB = '#001830',
    opacity = 1,
    className = '',
  } = props;

  const [useFallback, setUseFallback] = useState(forceFallback);

  if (useFallback || forceFallback) {
    return (
      <CssFallback
        colorA={colorA}
        colorB={colorB}
        opacity={opacity}
        className={className}
      />
    );
  }

  return <WasmOrbRenderer {...props} onFailed={() => setUseFallback(true)} />;
}
