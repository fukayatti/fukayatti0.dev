'use client';

/**
 * FightingCommandSystem.tsx
 *
 * 格ゲー風隠しコマンドシステム。
 * - 画面右下にインプット履歴HUDを表示（格ゲーのトレモ練習モード風）
 * - 特定のキーシーケンスを入力すると全画面サイバーパンクエフェクト発動
 * - コナミコード発動（ハッカーモード）にも連動してド派手な演出を追加
 */

import { AnimatePresence, motion } from 'framer-motion';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useHackerMode } from '@/components/providers/HackerModeProvider';

// ── キー → 表示アイコン マッピング ───────────────────────────────────────────

const KEY_ICON: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  KeyZ: 'Ｚ',
  KeyX: 'Ｘ',
  KeyC: 'Ｃ',
  KeyV: 'Ｖ',
  KeyA: 'Ａ',
  KeyB: 'Ｂ',
};

const TRACKED_KEYS = new Set(Object.keys(KEY_ICON));

// ── コマンド定義 ──────────────────────────────────────────────────────────────

interface Command {
  id: string;
  name: string;           // 画面に出るコマンド名
  subtitle: string;       // サブテキスト
  sequence: string[];     // キーコードのシーケンス
  windowMs: number;       // 入力受付ウィンドウ（ms）
  color: string;          // メインカラー（CSS color）
  glowColor: string;      // グロー色
  symbol: string;         // アイコン絵文字/文字
  flashCount: number;     // フラッシュ回数
}

const COMMANDS: Command[] = [
  {
    id: 'hadouken',
    name: 'CYBER HADOUKEN',
    subtitle: '波動拳 — QUANTUM SURGE',
    sequence: ['ArrowDown', 'ArrowRight', 'KeyZ'],
    windowMs: 900,
    color: '#00ffff',
    glowColor: 'rgba(0,255,255,0.6)',
    symbol: '波',
    flashCount: 3,
  },
  {
    id: 'shoryuken',
    name: 'NEURAL OVERRIDE',
    subtitle: '昇龍拳 — SYSTEM BREACH',
    sequence: ['ArrowRight', 'ArrowDown', 'ArrowRight', 'KeyX'],
    windowMs: 1100,
    color: '#ff3366',
    glowColor: 'rgba(255,51,102,0.6)',
    symbol: '龍',
    flashCount: 4,
  },
  {
    id: 'sonicboom',
    name: 'SONIC COLLAPSE',
    subtitle: 'ソニックブーム — DATA PURGE',
    sequence: ['ArrowLeft', 'ArrowLeft', 'ArrowRight', 'KeyC'],
    windowMs: 1200,
    color: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.6)',
    symbol: '音',
    flashCount: 2,
  },
  {
    id: 'fatality',
    name: 'MEMORY FATALITY',
    subtitle: 'フィニッシュヒム — NULL POINTER',
    sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'KeyV'],
    windowMs: 1500,
    color: '#ff6600',
    glowColor: 'rgba(255,102,0,0.6)',
    symbol: '死',
    flashCount: 5,
  },
];

// コナミコードアクティベーション（HackerModeProviderと連動）
const KONAMI_COMMAND: Omit<Command, 'sequence' | 'windowMs'> = {
  id: 'konami',
  name: 'HACKER MODE',
  subtitle: 'コナミコード — MATRIX ENGAGED',
  color: '#00ff44',
  glowColor: 'rgba(0,255,68,0.7)',
  symbol: '⬆',
  flashCount: 6,
};

// ── 入力アイテム ──────────────────────────────────────────────────────────────

interface InputItem {
  id: number;
  key: string;
  ts: number;
}

// ── インプットHUD ─────────────────────────────────────────────────────────────

function InputHUD({
  inputs,
  matchedIds,
}: {
  inputs: InputItem[];
  matchedIds: Set<number>;
}) {
  // 直近8個のみ表示
  const visible = inputs.slice(-8);

  return (
    <div className="flex flex-col-reverse gap-0.5 items-end">
      {visible.map((item) => {
        const icon = KEY_ICON[item.key] ?? item.key;
        const isMatched = matchedIds.has(item.id);
        const isArrow = item.key.startsWith('Arrow');

        return (
          <motion.div
            key={item.id}
            className="flex items-center justify-center rounded-sm font-mono text-xs font-bold select-none"
            style={{
              width: isArrow ? 26 : 28,
              height: isArrow ? 26 : 28,
              border: `1px solid ${isMatched ? '#00ffff' : 'rgba(0,255,255,0.25)'}`,
              background: isMatched
                ? 'rgba(0,255,255,0.15)'
                : 'rgba(0,0,0,0.6)',
              color: isMatched ? '#00ffff' : 'rgba(0,255,255,0.5)',
              boxShadow: isMatched ? '0 0 8px rgba(0,255,255,0.5)' : 'none',
              fontSize: isArrow ? 14 : 11,
              transition: 'all 0.1s ease',
            }}
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            transition={{ duration: 0.12 }}
          >
            {icon}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── コマンド発動オーバーレイ ──────────────────────────────────────────────────

interface ActivationOverlayProps {
  command: Command | typeof KONAMI_COMMAND;
  onDone: () => void;
}

function ActivationOverlay({ command, onDone }: ActivationOverlayProps) {
  const [flashIdx, setFlashIdx] = useState(0);

  // フラッシュシーケンス
  useEffect(() => {
    if (flashIdx < command.flashCount) {
      const t = setTimeout(() => setFlashIdx((i) => i + 1), 120);
      return () => clearTimeout(t);
    }
  }, [flashIdx, command.flashCount]);

  // 自動終了
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  const flashVisible = flashIdx % 2 === 0 && flashIdx < command.flashCount;

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* 背景ダークオーバーレイ */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.82)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* フラッシュ */}
      {flashVisible && (
        <div
          className="absolute inset-0"
          style={{
            background: command.glowColor,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* スキャンライン */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,1) 2px,rgba(0,0,0,1) 4px)',
        }}
      />

      {/* 横スキャンビーム */}
      <motion.div
        className="absolute inset-x-0 h-[2px] pointer-events-none"
        style={{ background: `linear-gradient(90deg,transparent,${command.color},transparent)` }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
        {/* シンボル文字 */}
        <motion.div
          className="font-mono font-black select-none"
          style={{
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            color: command.color,
            textShadow: `0 0 40px ${command.glowColor}, 0 0 80px ${command.glowColor}`,
            lineHeight: 1,
          }}
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: [0, 1.3, 1], rotate: ['-15deg', '3deg', '0deg'] }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {command.symbol}
        </motion.div>

        {/* コマンド名 */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <div
            className="font-mono font-black tracking-[0.2em] uppercase"
            style={{
              fontSize: 'clamp(1.2rem, 5vw, 2.8rem)',
              color: command.color,
              textShadow: `0 0 20px ${command.glowColor}`,
            }}
          >
            {command.name}
          </div>
          <div
            className="font-mono text-sm tracking-[0.4em] uppercase opacity-70"
            style={{ color: command.color }}
          >
            {command.subtitle}
          </div>
        </motion.div>

        {/* COMMAND INPUT! テキスト */}
        <motion.div
          className="font-mono text-xs tracking-[0.6em] uppercase border px-6 py-2"
          style={{
            color: command.color,
            borderColor: command.color,
            opacity: 0.6,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          COMMAND INPUT ACCEPTED
        </motion.div>
      </div>

      {/* コーナー装飾 */}
      {[
        'top-4 left-4 border-l-2 border-t-2',
        'top-4 right-4 border-r-2 border-t-2',
        'bottom-4 left-4 border-l-2 border-b-2',
        'bottom-4 right-4 border-r-2 border-b-2',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 ${cls}`}
          style={{ borderColor: command.color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.05 }}
        />
      ))}

      {/* グリッチライン */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-x-0 pointer-events-none"
          style={{
            height: 1 + Math.random(),
            top: `${20 + i * 18}%`,
            background: `linear-gradient(90deg,transparent,${command.color},transparent)`,
            opacity: 0.3,
          }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.4, 0] }}
          transition={{
            delay: 0.1 + i * 0.08,
            duration: 0.4,
            repeat: 2,
            repeatDelay: 0.3,
          }}
        />
      ))}
    </motion.div>
  );
}

// ── メインコンポーネント ───────────────────────────────────────────────────────

export default function FightingCommandSystem() {
  const { isHackerMode } = useHackerMode();
  const prevHackerMode = useRef(false);

  // インプット履歴
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const inputIdRef = useRef(0);
  // HUD表示フラグ（最後の入力から3秒間表示）
  const [hudVisible, setHudVisible] = useState(false);
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // マッチしたインプットのID（ハイライト用）
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());

  // アクティベート中のコマンド
  const [activeCommand, setActiveCommand] = useState<
    Command | typeof KONAMI_COMMAND | null
  >(null);

  // ── HUD自動非表示タイマー ────────────────────────────────────────────────
  const resetHudTimer = useCallback(() => {
    setHudVisible(true);
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => setHudVisible(false), 3000);
  }, []);

  // ── キー入力ハンドラ ─────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!TRACKED_KEYS.has(e.code)) return;
      // テキスト入力フォーカス中は無視
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const now = Date.now();
      const id = inputIdRef.current++;

      setInputs((prev) => {
        const next = [...prev, { id, key: e.code, ts: now }];
        // 古い入力は最大20個まで保持
        return next.slice(-20);
      });

      resetHudTimer();
    },
    [resetHudTimer]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ── コマンド検出 ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeCommand) return; // 発動中は検出しない

    const now = Date.now();

    for (const cmd of COMMANDS) {
      const seq = cmd.sequence;
      const seqLen = seq.length;

      // 入力履歴の末尾からシーケンス長分を切り出す
      const recent = inputs.slice(-seqLen);
      if (recent.length < seqLen) continue;

      // シーケンス一致チェック
      const matches = recent.every((inp, i) => inp.key === seq[i]);
      if (!matches) continue;

      // タイムウィンドウチェック（最初の入力から最後の入力まで）
      const elapsed = recent[seqLen - 1].ts - recent[0].ts;
      if (elapsed > cmd.windowMs) continue;

      // すべての制約をパス → コマンド発動！
      const matchedSet = new Set(recent.map((r) => r.id));
      setMatchedIds(matchedSet);
      setActiveCommand(cmd);
      // ハイライトを少し遅れてクリア
      setTimeout(() => setMatchedIds(new Set()), 1000);
      // 入力バッファをリセット
      setInputs([]);
      break;
    }
  }, [inputs, activeCommand]);

  // ── コナミコード連動（HackerModeProvider側で検出済み）────────────────────
  useEffect(() => {
    // isHackerMode が false→true になった瞬間に演出
    if (isHackerMode && !prevHackerMode.current) {
      setActiveCommand(KONAMI_COMMAND);
      setInputs([]);
    }
    prevHackerMode.current = isHackerMode;
  }, [isHackerMode]);

  // ── オーバーレイ終了 ──────────────────────────────────────────────────────
  const handleOverlayDone = useCallback(() => {
    setActiveCommand(null);
  }, []);

  // ── レンダリング ──────────────────────────────────────────────────────────
  return (
    <>
      {/* ─ コマンド発動オーバーレイ ─ */}
      <AnimatePresence>
        {activeCommand && (
          <ActivationOverlay
            key={activeCommand.id + Date.now()}
            command={activeCommand}
            onDone={handleOverlayDone}
          />
        )}
      </AnimatePresence>

      {/* ─ インプット履歴HUD（右下固定） ─ */}
      <AnimatePresence>
        {hudVisible && inputs.length > 0 && (
          <motion.div
            className="fixed bottom-6 right-6 z-[8000] flex flex-col items-end gap-2 pointer-events-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* ラベル */}
            <div className="font-mono text-[9px] tracking-[0.4em] text-cyan-500/30 uppercase">
              INPUT
            </div>

            {/* インプットアイコン群 */}
            <AnimatePresence mode="popLayout">
              <InputHUD inputs={inputs} matchedIds={matchedIds} />
            </AnimatePresence>

            {/* コマンドヒント */}
            <div className="mt-1 font-mono text-[8px] text-cyan-500/20 tracking-wider text-right leading-relaxed">
              ↓→Z HADOUKEN<br />
              →↓→X OVERRIDE<br />
              ←←→C SONIC
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
