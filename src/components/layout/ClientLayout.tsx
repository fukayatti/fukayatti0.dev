'use client';

import { useEffect, useState } from 'react';

import ConsoleEasterEgg from '../effects/ConsoleEasterEgg';
import FightingCommandSystem from '../effects/FightingCommandSystem';
import WasmLoadingScreen from '../effects/WasmLoadingScreen';
import WasmMatrixRain from '../effects/WasmMatrixRain';
import { useHackerMode } from '../providers/HackerModeProvider';
import Background from '../shared/background';
import CursorGlow from '../shared/CursorGlow';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { isHackerMode } = useHackerMode();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <>
      {/* WASM ブート画面 — モジュールロード完了まで表示 */}
      <WasmLoadingScreen />

      {/* 格ゲー風隠しコマンドシステム */}
      <FightingCommandSystem />

      <ConsoleEasterEgg />
      <CursorGlow />
      <Background width={windowSize.width} height={windowSize.height} />
      {isHackerMode && <WasmMatrixRain />}
      {children}
    </>
  );
}
