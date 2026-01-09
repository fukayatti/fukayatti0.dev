'use client';

import { useEffect, useState } from 'react';

import ConsoleEasterEgg from '../effects/ConsoleEasterEgg';
import MatrixRain from '../effects/MatrixRain';
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
      <ConsoleEasterEgg />
      <CursorGlow />
      <Background width={windowSize.width} height={windowSize.height} />
      {isHackerMode && <MatrixRain />}
      {children}
    </>
  );
}
