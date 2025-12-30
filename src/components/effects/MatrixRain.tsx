'use client';

import { useCallback, useEffect, useRef } from 'react';

// マトリックス風の文字セット（カタカナ、数字、記号）
const MATRIX_CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()+=[]{}|;:<>?';

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  fontSize: number;
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<Column[]>([]);
  const animationRef = useRef<number>(0);

  const getRandomChar = useCallback(() => {
    return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
  }, []);

  const initColumns = useCallback(
    (width: number, height: number) => {
      const fontSize = 14;
      const columnCount = Math.floor(width / fontSize);
      const maxChars = Math.floor(height / fontSize) + 10;

      columnsRef.current = Array.from({ length: columnCount }, (_, i) => {
        const charCount = Math.floor(Math.random() * 15) + 10;
        return {
          x: i * fontSize,
          y: Math.random() * height - height,
          speed: Math.random() * 2 + 1,
          fontSize,
          chars: Array.from({ length: charCount }, () => getRandomChar()),
        };
      });
    },
    [getRandomChar]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initColumns(canvas.width, canvas.height);
    };

    const animate = () => {
      // 半透明の黒で塗りつぶして残像効果を生む
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columnsRef.current.forEach((column) => {
        column.chars.forEach((char, i) => {
          const y = column.y + i * column.fontSize;

          // 先頭文字は明るい白緑
          if (i === column.chars.length - 1) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00ff00';
            ctx.shadowBlur = 10;
          } else if (i > column.chars.length - 5) {
            // 先頭付近は明るい緑
            ctx.fillStyle = '#00ff00';
            ctx.shadowBlur = 5;
          } else {
            // それ以外は暗めの緑（フェードアウト効果）
            const alpha = 0.3 + (i / column.chars.length) * 0.5;
            ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.font = `${column.fontSize}px monospace`;
          ctx.fillText(char, column.x, y);
        });

        // 列を下に移動
        column.y += column.speed;

        // 画面外に出たらリセット
        if (column.y > canvas.height) {
          column.y = -column.chars.length * column.fontSize;
          column.speed = Math.random() * 2 + 1;
          // ランダムに文字を更新
          column.chars = column.chars.map(() =>
            Math.random() > 0.7 ? getRandomChar() : column.chars[0]
          );
        }

        // たまに文字をランダムに変更（ちらつき効果）
        if (Math.random() > 0.98) {
          const randomIndex = Math.floor(Math.random() * column.chars.length);
          column.chars[randomIndex] = getRandomChar();
        }
      });

      ctx.shadowBlur = 0;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initColumns, getRandomChar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen',
      }}
    />
  );
}
