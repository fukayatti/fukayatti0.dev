import { Analytics } from '@vercel/analytics/next';

import ClientLayout from '../components/layout/ClientLayout';
import NavigationHeader from '../components/layout/NavigationHeader';
import { ThemeProvider } from '../components/shared/provider';
import { defaultMetadata } from '../lib/metadata-common';
import './globals.css';

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Analytics />
        <a href="#main-content" className="skip-link">
          メインコンテンツにスキップ
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>
            <NavigationHeader />
            <main id="main-content">{children}</main>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
