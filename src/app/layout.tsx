import { ThemeProvider } from '../components/provider';
import Header from '../components/header';
import './globals.css';
import ClientLayout from '../components/ClientLayout';
import { defaultMetadata } from '../lib/metadata-common';

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>
            <Header />
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
