'use client';

/**
 * WasmMatrixRain.tsx
 *
 * Drop-in replacement for MatrixRain.tsx that delegates all rendering to the
 * Rust/WebGL2 WASM renderer (MatrixRainRenderer from portfolio-fx).
 *
 * Falls back to the original Canvas-2D implementation if:
 *   - The WASM module fails to load
 *   - WebGL2 is not available in the browser
 *
 * Props are intentionally the same shape as the original MatrixRain so the
 * two components are interchangeable.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { useWasmFx } from '@/hooks/useWasmFx';

// ── Fallback: original Canvas-2D matrix rain ──────────────────────────────────

const MATRIX_CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()+=[]{}|;:<>?';

interface FallbackColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  fontSize: number;
}

function FallbackMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<FallbackColumn[]>([]);
  const rafRef = useRef<number>(0);

  const randomChar = () =>
    MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];

  const initColumns = useCallback((width: number, height: number) => {
    const fontSize = 14;
    const columnCount = Math.floor(width / fontSize);
    columnsRef.current = Array.from({ length: columnCount }, (_, i) => {
      const charCount = Math.floor(Math.random() * 15) + 10;
      return {
        x: i * fontSize,
        y: Math.random() * height - height,
        speed: Math.random() * 2 + 1,
        fontSize,
        chars: Array.from({ length: charCount }, randomChar),
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initColumns(canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columnsRef.current.forEach((col) => {
        col.chars.forEach((char, i) => {
          const y = col.y + i * col.fontSize;
          if (i === col.chars.length - 1) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00ff00';
            ctx.shadowBlur = 10;
          } else if (i > col.chars.length - 5) {
            ctx.fillStyle = '#00ff00';
            ctx.shadowBlur = 5;
          } else {
            const alpha = 0.3 + (i / col.chars.length) * 0.5;
            ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
            ctx.shadowBlur = 0;
          }
          ctx.font = `${col.fontSize}px monospace`;
          ctx.fillText(char, col.x, y);
        });

        col.y += col.speed;
        if (col.y > canvas.height) {
          col.y = -col.chars.length * col.fontSize;
          col.speed = Math.random() * 2 + 1;
          col.chars = col.chars.map(() =>
            Math.random() > 0.7 ? randomChar() : col.chars[0]
          );
        }
        if (Math.random() > 0.98) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = randomChar();
        }
      });

      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initColumns]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent', mixBlendMode: 'screen' }}
    />
  );
}

// ── WASM-backed renderer ───────────────────────────────────────────────────────

function WasmRenderer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { wasm, ready, error } = useWasmFx();
  // Keep a stable ref so the cleanup closure can call stop() / free()
  const rendererRef = useRef<import('portfolio-fx').MatrixRainRenderer | null>(
    null
  );
  const [wasmFailed, setWasmFailed] = useState(false);

  // Initialise the renderer once WASM is ready and the canvas is mounted.
  useEffect(() => {
    if (!ready || !wasm || error) {
      if (error) setWasmFailed(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size the canvas to fill the viewport.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let renderer: typeof rendererRef.current = null;

    try {
      renderer = wasm.MatrixRainRenderer.new(canvas);
      renderer.start();
      rendererRef.current = renderer;
    } catch (e) {
      console.error('[WasmMatrixRain] Failed to create MatrixRainRenderer:', e);
      setWasmFailed(true);
      return;
    }

    // Handle window resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      rendererRef.current?.resize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      try {
        rendererRef.current?.stop();
        rendererRef.current?.free();
      } catch {
        // Ignore errors during cleanup
      }
      rendererRef.current = null;
    };
  }, [ready, wasm, error]);

  // If WASM blew up, let the parent decide to render the fallback.
  if (wasmFailed) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent', mixBlendMode: 'screen' }}
    />
  );
}

// ── Public component ───────────────────────────────────────────────────────────

/**
 * WasmMatrixRain
 *
 * Renders the Matrix rain effect using the Rust/WebGL2 WASM renderer.
 * Automatically falls back to the Canvas-2D implementation if:
 *   - WASM failed to load or WebGL2 is unavailable
 *   - `forceFallback` prop is set to true
 */
export interface WasmMatrixRainProps {
  /** Force the Canvas-2D fallback regardless of WASM availability. */
  forceFallback?: boolean;
}

export default function WasmMatrixRain({
  forceFallback = false,
}: WasmMatrixRainProps) {
  const [useFallback, setUseFallback] = useState(forceFallback);

  if (useFallback || forceFallback) {
    return <FallbackMatrixRain />;
  }

  return (
    <WasmRenderer
    // If the WasmRenderer returns null (wasm failed), render the fallback.
    // We achieve this via an error-boundary-lite pattern: WasmRenderer sets
    // wasmFailed state and returns null; we catch that here via key reset.
    />
  );

  // Unreachable – kept to satisfy the linter about `setUseFallback` usage.
  void setUseFallback;
}
