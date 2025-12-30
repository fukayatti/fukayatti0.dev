'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { useKonamiCode } from '@/lib/hooks/useKonamiCode';

interface HackerModeContextType {
  isHackerMode: boolean;
  toggleHackerMode: () => void;
}

const HackerModeContext = createContext<HackerModeContextType>({
  isHackerMode: false,
  toggleHackerMode: () => {},
});

export function useHackerMode() {
  return useContext(HackerModeContext);
}

export function HackerModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHackerMode, setIsHackerMode] = useState(false);

  // コナミコマンドでトグル
  const konamiActivated = useKonamiCode(() => {
    // コールバックは発動時のエフェクト用（将来的にサウンドなど）
    console.log('🎮 Konami Code Activated! Welcome to the Matrix...');
  });

  // コナミコードの状態をhackerModeに同期
  useEffect(() => {
    setIsHackerMode(konamiActivated);
  }, [konamiActivated]);

  // bodyにクラスを追加/削除
  useEffect(() => {
    if (isHackerMode) {
      document.body.classList.add('hacker-mode');
    } else {
      document.body.classList.remove('hacker-mode');
    }

    return () => {
      document.body.classList.remove('hacker-mode');
    };
  }, [isHackerMode]);

  const toggleHackerMode = () => {
    setIsHackerMode((prev) => !prev);
  };

  return (
    <HackerModeContext.Provider value={{ isHackerMode, toggleHackerMode }}>
      {children}
    </HackerModeContext.Provider>
  );
}
