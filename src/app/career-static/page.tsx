import { getCachedAwards } from '@/lib/notion-server';
import type { NotionAward } from '@/lib/notion';
import {
  Trophy,
  Calendar,
  Building2,
  ExternalLink,
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

interface CareerStaticPageProps {}

export default async function CareerStaticPage({}: CareerStaticPageProps) {
  let awards: NotionAward[] = [];
  let error: string | null = null;

  try {
    awards = await getCachedAwards();
  } catch (err) {
    error = err instanceof Error ? err.message : 'データの取得に失敗しました';
    console.error('Error fetching awards:', err);
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
                フォールバックデータを表示する場合は、ページを再読み込みしてください
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
            {/* Enhanced Header */}
            <div className="text-center mb-12">
              <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-glass backdrop-blur-xl mb-8">
                <h1 className="text-display mb-4">
                  <span className="gradient-text">
                    キャリア・受賞歴 (Static)
                  </span>
                </h1>
                <p className="text-body max-w-2xl mx-auto text-gray-400 mb-6">
                  NotionCMSで管理された実績・受賞歴をISRで高速表示
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

            {/* Awards Section */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary-300">
                    受賞歴
                  </h2>
                  <p className="text-sm text-gray-400">
                    競技プログラミング・コンテストでの実績（Static Generated）
                  </p>
                </div>
              </div>

              {awards.length === 0 ? (
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl glass flex items-center justify-center text-3xl border border-white/10">
                    <Trophy className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    受賞歴がありません
                  </h3>
                  <p className="text-gray-400">
                    新しい実績が追加されると、ここに表示されます。
                  </p>
                </div>
              ) : (
                <div className="grid gap-8">
                  {awards.map((award, index) => (
                    <div key={award.id} className="group relative">
                      <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden hover:shadow-glow-lg transition-all duration-300">
                        {/* Background decoration */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <div className="absolute -top-1/2 -right-1/2 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-5 bg-gradient-to-br from-primary-400 to-accent-400" />
                        </div>

                        <div className="relative md:flex">
                          {/* Image */}
                          {award.imageUrl && (
                            <div className="md:w-1/3">
                              <img
                                src={award.imageUrl}
                                alt={award.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div
                            className={`p-8 ${award.imageUrl ? 'md:w-2/3' : 'w-full'}`}
                          >
                            <div className="flex flex-col h-full">
                              {/* Date Badge */}
                              <div className="mb-4">
                                <span className="inline-flex items-center px-3 py-1 glass rounded-full text-sm font-medium border border-white/10 text-primary-300">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {new Date(award.date).toLocaleDateString(
                                    'ja-JP',
                                    {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    }
                                  )}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-white mb-3">
                                {award.title}
                              </h3>

                              {/* Organizer */}
                              <div className="flex items-center gap-2 mb-4">
                                <Building2 className="w-4 h-4 text-accent-400" />
                                <p className="text-gray-300">
                                  主催: {award.organizer}
                                </p>
                              </div>

                              {/* Details Link */}
                              {award.details && (
                                <div className="mt-auto">
                                  <a
                                    href={award.details}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-200 group/button"
                                  >
                                    <span>詳細を見る</span>
                                    <ExternalLink className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-200" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

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
                      <div className="font-medium text-white">API連携</div>
                      <div className="text-sm text-gray-400">
                        リアルタイム同期
                      </div>
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
            <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
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
                      <span>Notion API: 最大10分に1回</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>キャッシュ効率化</span>
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
                      label: 'Total Awards',
                      value: awards.length.toString(),
                      icon: Trophy,
                    },
                    { label: 'Generation', value: 'Static', icon: Zap },
                    { label: 'Data Source', value: 'Notion', icon: Database },
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
          </div>
        </div>
      </div>
    </div>
  );
}
