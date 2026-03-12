'use client';

/**
 * WasmLoadingScreen.tsx
 *
 * サイバーパンク風ブート画面。WASMモジュールがロード完了するまで表示する。
 * WASM未ロード状態で動かす必要があるため、描画は Canvas 2D のみ使用。
 */
import { AnimatePresence, motion } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

import { useWasmFx } from '@/hooks/useWasmFx';

// ── ASCII アート（テンプレートリテラル外に定義）────────────────────────────────
const ASCII_ART = [
  '  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗      ███████╗██╗  ██╗',
  '  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗     ██╔════╝╚██╗██╔╝',
  '  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║     █████╗   ╚███╔╝ ',
  '  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║     ██╔══╝   ██╔██╗ ',
  '  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝     ██║     ██╔╝ ██╗',
  '  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝     ╚═╝     ╚═╝  ╚═╝',
].join('\n');

// ── ブートフェーズ定義 ─────────────────────────────────────────────────────────
const BOOT_PHASES = [
  { text: 'INITIALIZING WASM RUNTIME...', duration: 500, color: '#00ffaa' },
  { text: 'LOADING WEBGL2 CONTEXT...', duration: 400, color: '#00e5ff' },
  { text: 'COMPILING SHADER CACHE...', duration: 500, color: '#00e5ff' },
  { text: 'MOUNTING GPU EFFECT MODULES...', duration: 400, color: '#a78bfa' },
  { text: 'LINKING RUST/WASM BINDINGS...', duration: 400, color: '#a78bfa' },
  { text: 'SYSTEM READY.', duration: 0, color: '#00ff88' },
] as const;

// ── Canvas 2D ミニマトリックスレイン ──────────────────────────────────────────
function MiniMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CHARS =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF@#$%';
    const FONT_SIZE = 13;
    const drops: number[] = [];
    let cols = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops.length = 0;
      for (let i = 0; i < cols; i++) {
        drops[i] = Math.random() * -canvas.height;
      }
    };

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const alpha = 0.12 + Math.random() * 0.22;
        ctx.fillStyle = `rgba(0,255,180,${alpha})`;
        ctx.fillText(char, i * FONT_SIZE, drops[i]);
        drops[i] += FONT_SIZE * (0.4 + Math.random() * 0.3);
        if (drops[i] > canvas.height) {
          drops[i] = Math.random() * -200;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-25"
    />
  );
}

// ── グリッチする HEX カウンター ────────────────────────────────────────────────
function HexCounter() {
  const [hex, setHex] = useState('0x00000000');

  useEffect(() => {
    const iv = setInterval(() => {
      const n = Math.floor(Math.random() * 0xffffffff);
      setHex('0x' + n.toString(16).toUpperCase().padStart(8, '0'));
    }, 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <span className="font-mono text-[10px] text-cyan-500/40 tabular-nums">
      {hex}
    </span>
  );
}

// ── プログレスバー ─────────────────────────────────────────────────────────────
function ProgressBar({ value }: { value: number }) {
  const BAR_WIDTH = 32;
  const filled = Math.round((value / 100) * BAR_WIDTH);
  const empty = BAR_WIDTH - filled;
  const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(empty);

  return (
    <div className="font-mono text-sm">
      <span className="text-cyan-400/60">[</span>
      <span className="text-cyan-400">{bar}</span>
      <span className="text-cyan-400/60">]</span>
      <span className="text-cyan-300 ml-2 tabular-nums">
        {String(Math.round(value)).padStart(3, ' ')}%
      </span>
    </div>
  );
}

// ── 点滅カーソル ───────────────────────────────────────────────────────────────
function Cursor() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setOn((v) => !v), 500);
    return () => clearInterval(iv);
  }, []);

  return (
    <span
      className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle"
      style={{ opacity: on ? 1 : 0, transition: 'opacity 0.05s' }}
    />
  );
}

// ── メインコンポーネント ───────────────────────────────────────────────────────
export default function WasmLoadingScreen() {
  // WASM ロード状態（このhookを呼ぶことでロードも開始される）
  const { ready } = useWasmFx();

  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logLines, setLogLines] = useState<(typeof BOOT_PHASES)[number][]>([]);
  const [minTimeDone, setMinTimeDone] = useState(false);

  // ブートフェーズを順番に表示
  useEffect(() => {
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_PHASES.forEach((phase, i) => {
      const t = setTimeout(() => {
        setLogLines((prev) => [...prev, phase]);
      }, elapsed);
      timers.push(t);
      // 最後のフェーズは duration=0 なのでそのまま
      elapsed += i < BOOT_PHASES.length - 1 ? phase.duration : 0;
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // プログレスを 0 → 88% まで疑似的に進める
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) return p;
        return Math.min(88, p + Math.random() * 6 + 1);
      });
    }, 130);
    return () => clearInterval(iv);
  }, []);

  // 最低表示時間 1.6s（速い回線でも演出が見えるように）
  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  // WASM 完了 + 最低時間経過 → 100% にして 700ms 後にフェードアウト
  useEffect(() => {
    if (ready && minTimeDone) {
      setProgress(100);
      const t = setTimeout(() => setVisible(false), 700);
      return () => clearTimeout(t);
    }
  }, [ready, minTimeDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* Canvas 2D マトリックスレイン */}
          <MiniMatrixRain />

          {/* スキャンライン */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
            style={{
              background:
                'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.6) 2px,rgba(0,0,0,0.6) 4px)',
            }}
          />

          {/* CRT ビネット */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.78) 100%)',
            }}
          />

          {/* ターミナルウィンドウ本体 */}
          <motion.div
            className="relative z-20 w-full max-w-2xl px-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* ウィンドウ枠 */}
            <div className="border border-cyan-500/30 bg-black/85 backdrop-blur-sm">
              {/* タイトルバー */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-cyan-500/20 bg-cyan-950/20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-[11px] text-cyan-500/60 tracking-widest uppercase">
                  portfolio-fx — boot terminal
                </span>
                <span className="ml-auto">
                  <HexCounter />
                </span>
              </div>

              {/* ターミナル本文 */}
              <div className="px-5 py-5 min-h-[200px]">
                {/* ASCII ヘッダー */}
                <div className="mb-5 overflow-x-auto">
                  <pre className="font-mono text-[7.5px] leading-tight text-cyan-400/40 select-none whitespace-pre">
                    {ASCII_ART}
                  </pre>
                  <div className="font-mono text-[10px] text-cyan-500/35 tracking-[0.5em] mt-2">
                    PORTFOLIO-FX v0.1.0 — RUST/WASM RUNTIME
                  </div>
                </div>

                {/* ブートログ */}
                <div className="space-y-1.5">
                  {logLines.map((line, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 font-mono text-xs"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <span className="text-cyan-500/40 shrink-0">❯</span>
                      <span style={{ color: line.color }}>{line.text}</span>
                      {i === logLines.length - 1 &&
                        i < BOOT_PHASES.length - 1 && <Cursor />}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* プログレスバー */}
              <div className="px-5 pb-5 pt-4 border-t border-cyan-500/10 space-y-3">
                <ProgressBar value={progress} />

                <div className="flex items-center justify-between">
                  <motion.span
                    className="font-mono text-[11px] tracking-[0.3em] text-cyan-400/70 uppercase"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    {progress >= 100 ? 'SYSTEM READY' : 'NOW LOADING'}
                  </motion.span>
                  <span className="font-mono text-[10px] text-cyan-500/25">
                    FUKAYATTI0.DEV
                  </span>
                </div>
              </div>
            </div>

            {/* コーナーアクセント */}
            <div className="absolute -top-px -left-px w-5 h-5 border-l border-t border-cyan-400/50 pointer-events-none" />
            <div className="absolute -top-px -right-px w-5 h-5 border-r border-t border-cyan-400/50 pointer-events-none" />
            <div className="absolute -bottom-px -left-px w-5 h-5 border-l border-b border-cyan-400/50 pointer-events-none" />
            <div className="absolute -bottom-px -right-px w-5 h-5 border-r border-b border-cyan-400/50 pointer-events-none" />
          </motion.div>

          {/* 下部ヒント */}
          <motion.div
            className="absolute bottom-5 font-mono text-[10px] text-cyan-500/20 tracking-widest z-20 text-center"
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            ↑↑↓↓←→←→BA &nbsp;·&nbsp; TRY THE KONAMI CODE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
