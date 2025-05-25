import {
  getCachedCurrentFocusAreas,
  getCachedGoals2025ByCategory,
} from '@/lib/notion-content';
import type { CurrentFocusArea } from '@/lib/notion-content';
import { AlertTriangle } from 'lucide-react';
import HomePageClient from '@/components/HomePageClient';
import type { Metadata } from 'next';

// ISRで10分間隔で再生成
export const revalidate = 600; // 10分

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/api/og?title=Fukayatti0%20Portfolio&subtitle=フロントエンド開発者&description=Next.js、React、TypeScriptで現代的なWebアプリケーションを構築',
        width: 1200,
        height: 630,
        alt: 'Fukayatti0 Portfolio - フロントエンド開発者',
      },
    ],
  },
  twitter: {
    images: [
      '/api/og?title=Fukayatti0%20Portfolio&subtitle=フロントエンド開発者&description=Next.js、React、TypeScriptで現代的なWebアプリケーションを構築',
    ],
  },
};

interface HomePageProps {}

export default async function HomePage({}: HomePageProps) {
  let focusAreas: CurrentFocusArea[] = [];
  let goalCategories: any[] = [];
  let error: string | null = null;

  try {
    // Fetch data in parallel
    const [focusData, goalsData] = await Promise.all([
      getCachedCurrentFocusAreas(),
      getCachedGoals2025ByCategory(),
    ]);

    focusAreas = focusData;
    goalCategories = goalsData;
  } catch (err) {
    error = err instanceof Error ? err.message : 'データの取得に失敗しました';
    console.error('Error fetching home page data:', err);
  }

  if (error) {
    return (
      <div className="relative min-h-screen text-foreground overflow-hidden">
        {/* Enhanced background with modern mesh gradient */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #581c87 75%, #7c2d12 100%)
            `,
          }}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="glass rounded-2xl border border-white/10 shadow-glass p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl glass flex items-center justify-center text-3xl border border-white/10">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                データ取得エラー
              </h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <p className="text-sm text-muted-foreground">
                ISRによる自動復旧を待つか、ページを再読み込みしてください
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HomePageClient focusAreas={focusAreas} goalCategories={goalCategories} />
  );
}
