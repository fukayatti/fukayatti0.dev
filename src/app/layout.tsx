'use client';
import { ThemeProvider } from '../components/provider';
import Header from '../components/header';
import './globals.css';
import Background from '../components/Background';
import { useState, useEffect } from 'react';

// クライアントコンポーネントでMetadataを直接exportできないため
// メタデータはmetadata.tsから生成されます

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

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
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Background width={windowSize.width} height={windowSize.height} />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
