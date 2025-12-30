'use client';

import { useCallback, useEffect, useState } from 'react';

// コナミコマンド: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useKonamiCode(onActivate?: () => void): boolean {
  const [isActivated, setIsActivated] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.code;

      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);

        // コマンドが完成したかチェック
        if (newSequence.length === KONAMI_CODE.length) {
          const isMatch = newSequence.every((k, i) => k === KONAMI_CODE[i]);

          if (isMatch) {
            setIsActivated((prevActivated) => {
              const newState = !prevActivated;
              if (newState && onActivate) {
                onActivate();
              }
              return newState;
            });
            return []; // リセット
          }
        }

        return newSequence;
      });
    },
    [onActivate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return isActivated;
}
