import { Analytics } from '@vercel/analytics/next';

import ClientLayout from '../components/layout/ClientLayout';
import NavigationHeader from '../components/layout/NavigationHeader';
import { HackerModeProvider } from '../components/providers/HackerModeProvider';
import { defaultMetadata } from '../lib/metadata-common';
import './globals.css';

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className="bg-black text-white">
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
