import {
  getCachedCurrentFocusAreas,
  getCachedGoals2025ByCategory,
} from '@/lib/notion-content';
import type { CurrentFocusArea } from '@/lib/notion-content';
import CurrentFocusStaticSection from '@/components/CurrentFocusStaticSection';
import Goals2025StaticSection from '@/components/Goals2025StaticSection';
import HeaderSection from '@/components/HeaderSection';
import LetsConnectSection from '@/components/LetsConnectSection';
import FooterSection from '@/components/FooterSection';
import {
  AlertTriangle,
  Database,
  Activity,
  Zap,
  Clock,
  BarChart3,
  Settings,
  Rocket,
} from 'lucide-react';

// ISRで10分間隔で再生成
export const revalidate = 600; // 10分

interface HomeStaticPageProps {}

export default async function HomeStaticPage({}: HomeStaticPageProps) {
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
      <div className="relative min-h-screen text-gray-100 overflow-hidden">
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
              <p className="text-gray-400 mb-4">{error}</p>
              <p className="text-sm text-gray-500">
                ISRによる自動復旧を待つか、ページを再読み込みしてください
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden">
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

      {/* Animated mesh overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          animation: 'gradient-xy 20s ease infinite',
        }}
      />

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header with ISR indicator */}
            <div className="text-center mb-12">
              <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-glass backdrop-blur-xl mb-8">
                <h1 className="text-display mb-4">
                  <span className="gradient-text">fukayatti0.dev (ISR)</span>
                </h1>
                <p className="text-body max-w-2xl mx-auto text-gray-400 mb-6">
                  High-performance static site with 10-minute ISR updates
                </p>

                {/* Status Indicators */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-blue-300">
                      ISR（10分間隔更新）
                    </span>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-medium text-green-300">
                      Notionと自動同期
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Header Section */}
            <HeaderSection />

            {/* Current Focus Section */}
            <CurrentFocusStaticSection focusAreas={focusAreas} />

            {/* Goals 2025 Section */}
            <Goals2025StaticSection goalCategories={goalCategories} />

            {/* Performance Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* ISR Performance */}
              <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                    <BarChart3 className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-300">
                      ISRパフォーマンス
                    </h3>
                    <p className="text-sm text-gray-400">
                      高速表示と自動更新を両立
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary-400" />
                    <div>
                      <div className="font-medium text-white">静的生成</div>
                      <div className="text-sm text-gray-400">
                        高速なページ表示
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-accent-400" />
                    <div>
                      <div className="font-medium text-white">自動更新</div>
                      <div className="text-sm text-gray-400">
                        10分間隔で再生成
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium text-white">
                        レート制限対策
                      </div>
                      <div className="text-sm text-gray-400">
                        効率的なAPI利用
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CMS Information */}
              <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                    <Database className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-accent-300">
                      Notion CMS連携
                    </h3>
                    <p className="text-sm text-gray-400">
                      コンテンツ管理システム
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-primary-400" />
                    <div>
                      <div className="font-medium text-white">
                        Notionデータベース
                      </div>
                      <div className="text-sm text-gray-400">
                        自動データ取得
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-accent-400" />
                    <div>
                      <div className="font-medium text-white">
                        キャッシュ管理
                      </div>
                      <div className="text-sm text-gray-400">効率的な同期</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium text-white">Next.js ISR</div>
                      <div className="text-sm text-gray-400">
                        最適化された配信
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="glass rounded-2xl border border-white/10 shadow-glass p-8 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    技術仕様
                  </h3>
                  <p className="text-sm text-gray-400">
                    ISRとNotion APIの技術詳細
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary-300 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    更新頻度
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>ISR revalidate: 600秒</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>Notion API: キャッシュ管理</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>自動回復機能</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-accent-300 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    パフォーマンス
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-400 mt-1">▹</span>
                      <span>静的生成による高速表示</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-400 mt-1">▹</span>
                      <span>CDN配信最適化</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-400 mt-1">▹</span>
                      <span>レート制限回避</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    テクノロジー
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>Next.js 14 ISR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>Notion API v1</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>TypeScript</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Revalidate', value: '10 min', icon: Clock },
                    {
                      label: 'Focus Areas',
                      value: focusAreas.length.toString(),
                      icon: BarChart3,
                    },
                    {
                      label: 'Goals',
                      value: goalCategories
                        .reduce((acc, cat) => acc + cat.goals.length, 0)
                        .toString(),
                      icon: Database,
                    },
                    { label: 'Generation', value: 'Static', icon: Zap },
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={stat.label} className="text-center space-y-2">
                        <div className="text-2xl">
                          <IconComponent className="w-6 h-6 mx-auto text-primary-400" />
                        </div>
                        <div className="text-lg font-bold text-primary-300">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Let's Connect Section */}
            <LetsConnectSection />

            {/* Footer Section */}
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
}
