'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Background from '../shared/background';
import CursorGlow from '../shared/CursorGlow';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [windowSize]);

  return (
    <>
      <CursorGlow />
      <Background width={windowSize.width} height={windowSize.height} />
      <div ref={headerRef}>
        {/* ここにHeaderコンポーネントを配置 */}
        {/* <Header /> */}
      </div>
      <div style={{ marginTop: headerHeight }}>{children}</div>
    </>
  );
}
