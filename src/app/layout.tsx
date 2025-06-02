import { ThemeProvider } from '../components/provider';
import NavigationHeader from '../components/NavigationHeader';
import './globals.css';
import ClientLayout from '../components/ClientLayout';
import { defaultMetadata } from '../lib/metadata-common';
import { Analytics } from '@vercel/analytics/next';

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
