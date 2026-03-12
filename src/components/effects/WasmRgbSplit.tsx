'use client';

/**
 * WasmRgbSplit.tsx
 *
 * GPU-accelerated image distortion / glitch effect rendered via the Rust/WebGL2
 * WASM renderer (RgbSplitRenderer from portfolio-fx).
 *
 * Three modes — chosen via the `mode` prop:
 *   "profile"  (mode 0) – mouse-tracked RGB split + lens warp on a photo
 *   "distort"  (mode 1) – stronger warp + CRT scanlines + scan beam
 *   "glitch"   (mode 2) – aggressive horizontal band-slicing on hover
 *
 * Falls back to rendering the image as a plain <img> if WASM / WebGL2 is
 * unavailable or the image has not yet loaded.
 */
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import { useWasmFx } from '@/hooks/useWasmFx';

// ── Types ──────────────────────────────────────────────────────────────────────

export type RgbSplitMode = 'profile' | 'distort' | 'glitch';

export interface WasmRgbSplitProps {
  /** Path (or URL) to the source image. */
  src: string;
  /** Accessible alt text for the fallback <img>. */
  alt: string;
  /** Effect mode. Default "profile". */
  mode?: RgbSplitMode;
  /**
   * RGB split strength [0, 1].
   * For "profile" and "distort" this is always-on; for "glitch" it scales
   * with hover intensity. Default 1.
   */
  splitIntensity?: number;
  /**
   * Colour saturation: 0 = greyscale, 1 = full colour.
   * Animate this from 0 → 1 on hover for a dramatic colour-pop. Default 1.
   */
  colorStrength?: number;
  /** Overall opacity [0, 1]. Default 1. */
  opacity?: number;
  /**
   * Glitch / hover intensity [0, 1].
   * Drive to 1.0 on mouseenter, back to 0.0 on mouseleave.
   * Only meaningful for "glitch" and "distort" modes. Default 0.
   */
  glitchAmount?: number;
  /**
   * When true the mouse-tracking distortion is enabled.
   * The component adds its own mousemove / mouseleave handlers to the canvas
   * wrapper element. Default true.
   */
  trackMouse?: boolean;
  /** Additional CSS class names applied to the outer wrapper <div>. */
  className?: string;
  /** Inline styles applied to the outer wrapper <div>. */
  style?: CSSProperties;
  /** Force the plain-<img> fallback regardless of WASM availability. */
  forceFallback?: boolean;
}

// ── Mode → numeric constant ────────────────────────────────────────────────────

const MODE_MAP: Record<RgbSplitMode, number> = {
  profile: 0,
  distort: 1,
  glitch: 2,
};

// ── Plain-image fallback ───────────────────────────────────────────────────────

function ImgFallback({
  src,
  alt,
  className,
  style,
}: Pick<WasmRgbSplitProps, 'src' | 'alt' | 'className' | 'style'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }}
    />
  );
}

// ── WASM renderer ──────────────────────────────────────────────────────────────

interface WasmRendererProps extends WasmRgbSplitProps {
  onFailed: () => void;
}

function WasmRenderer({
  src,
  alt,
  mode = 'profile',
  splitIntensity = 1,
  colorStrength = 1,
  opacity = 1,
  glitchAmount = 0,
  trackMouse = true,
  className = '',
  style,
  onFailed,
}: WasmRendererProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { wasm, ready, error } = useWasmFx();

  // Keep a ref to the renderer so we can call setters without rebuilding.
  const rendererRef = useRef<import('portfolio-fx').RgbSplitRenderer | null>(
    null
  );

  // Track whether the renderer was successfully initialised.
  const [initialized, setInitialized] = useState(false);

  // ── Load image, then initialise renderer ─────────────────────────────────
  useEffect(() => {
    if (error) {
      onFailed();
      return;
    }
    if (!ready || !wasm) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size the canvas to its CSS layout size.
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width));
    canvas.height = Math.max(1, Math.round(rect.height));

    // Load the source image (may already be cached by the browser).
    const img = new Image();
    img.crossOrigin = 'anonymous';
    imgRef.current = img;

    const onLoad = () => {
      if (!rendererRef.current) {
        try {
          const renderer = wasm.RgbSplitRenderer.new(
            canvas,
            img,
            MODE_MAP[mode]
          );
          renderer.set_split_intensity(splitIntensity);
          renderer.set_color_strength(colorStrength);
          renderer.set_opacity(opacity);
          renderer.set_glitch_amount(glitchAmount);
          renderer.start();
          rendererRef.current = renderer;
          setInitialized(true);
        } catch (e) {
          console.error('[WasmRgbSplit] RgbSplitRenderer.new failed:', e);
          onFailed();
        }
      }
    };

    const onError = () => {
      console.error('[WasmRgbSplit] Failed to load image:', src);
      onFailed();
    };

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    img.src = src;

    // Handle canvas resize via ResizeObserver.
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
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
      ro.disconnect();
      try {
        rendererRef.current?.stop();
        rendererRef.current?.free();
      } catch {
        // ignore cleanup errors
      }
      rendererRef.current = null;
      setInitialized(false);
    };
    // Rebuild only when core dependencies change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, wasm, error, src, mode]);

  // ── Live parameter updates ────────────────────────────────────────────────
  useEffect(() => {
    rendererRef.current?.set_split_intensity(splitIntensity);
  }, [splitIntensity]);

  useEffect(() => {
    rendererRef.current?.set_color_strength(colorStrength);
  }, [colorStrength]);

  useEffect(() => {
    rendererRef.current?.set_opacity(opacity);
  }, [opacity]);

  useEffect(() => {
    rendererRef.current?.set_glitch_amount(glitchAmount);
  }, [glitchAmount]);

  // ── Mouse tracking ────────────────────────────────────────────────────────
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackMouse || !initialized) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const u = (e.clientX - rect.left) / rect.width;
      const v = (e.clientY - rect.top) / rect.height;
      rendererRef.current?.set_mouse_uv(
        Math.max(0, Math.min(1, u)),
        Math.max(0, Math.min(1, v))
      );
    },
    [trackMouse, initialized]
  );

  const onMouseLeave = useCallback(() => {
    if (!trackMouse || !initialized) return;
    rendererRef.current?.reset_mouse();
  }, [trackMouse, initialized]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={alt}
      role="img"
    >
      {/* Accessible hidden img (SEO / screen readers) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        aria-hidden="true"
        style={{
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />

      {/* WebGL2 canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          // Fade in once the renderer is up
          opacity: initialized ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Placeholder shown while the renderer is starting */}
      {!initialized && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
}

// ── Public component ───────────────────────────────────────────────────────────

/**
 * WasmRgbSplit
 *
 * Renders an image with a GPU-accelerated RGB-split / distortion / glitch
 * shader via the Rust/WebGL2 WASM module.
 *
 * @example
 * // Hero profile photo with mouse-tracked chromatic aberration
 * <WasmRgbSplit
 *   src="/profile.png"
 *   alt="Profile photo"
 *   mode="profile"
 *   splitIntensity={1}
 *   colorStrength={colorStrength} // animate 0→1 on hover
 *   className="w-64 h-64 rounded-full"
 * />
 *
 * @example
 * // Project card image with glitch effect on hover
 * <WasmRgbSplit
 *   src={project.imageUrl}
 *   alt={project.title}
 *   mode="glitch"
 *   glitchAmount={isHovered ? 1 : 0}
 *   colorStrength={isHovered ? 1 : 0.2}
 *   className="w-full h-48"
 * />
 */
export default function WasmRgbSplit(props: WasmRgbSplitProps) {
  const { forceFallback = false, src, alt, className, style } = props;
  const [useFallback, setUseFallback] = useState(forceFallback);

  if (useFallback || forceFallback) {
    return (
      <ImgFallback src={src} alt={alt} className={className} style={style} />
    );
  }

  return <WasmRenderer {...props} onFailed={() => setUseFallback(true)} />;
}
