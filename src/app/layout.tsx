import { Analytics } from '@vercel/analytics/next';

import { Inter, Orbitron } from 'next/font/google';

import ClientLayout from '../components/layout/ClientLayout';
import NavigationHeader from '../components/layout/NavigationHeader';
import { HackerModeProvider } from '../components/providers/HackerModeProvider';
import { defaultMetadata } from '../lib/metadata-common';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <head>
        <link rel="preconnect" href="https://api.lanyard.rest" />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} bg-black text-white antialiased`}
      >
        <Analytics />
        <a href="#main-content" className="skip-link">
          メインコンテンツにスキップ
        </a>
        <HackerModeProvider>
          <ClientLayout>
            <NavigationHeader />
            <main id="main-content">{children}</main>
          </ClientLayout>
        </HackerModeProvider>
      </body>
    </html>
  );
}
