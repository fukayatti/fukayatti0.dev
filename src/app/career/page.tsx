import { getCachedAwards } from '@/lib/notion-server';
import type { NotionAward } from '@/lib/notion';
import { createPageMetadata } from '@/lib/metadata-common';
import {
  Trophy,
  Calendar,
  Building2,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

// ページ固有のメタデータ設定
const PAGE_TITLE = '受賞歴・実績';
const PAGE_DESCRIPTION = 'NotionCMSで管理された受賞歴・実績を高速表示';

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/career',
  ogSubtitle: 'NotionCMSで管理された受賞歴・実績を高速表示',
  ogDescription: '競技プログラミングやコンテストでの受賞歴を紹介します',
});

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
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold text-destructive mb-4">
                データ取得エラー
              </h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <p className="text-sm text-muted-foreground">
                フォールバックデータを表示する場合は、ページを再読み込みしてください
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Simplified static overlay for performance */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-12">
              <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-glass backdrop-blur-xl mb-8">
                <h1 className="text-display mb-4">
                  <span
                    className="gradient-text"
                    style={{
                      background:
                        'linear-gradient(90deg, #6366f1, #ec4899, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    受賞歴・実績
                  </span>
                </h1>
                <p className="text-body max-w-2xl mx-auto text-muted-foreground mb-6">
                  NotionCMSで管理された実績・受賞歴をISRで高速表示
                </p>

                {/* Status Indicators */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-primary-300">
                      ISR（10分間隔更新）
                    </span>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-success">
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
                  <p className="text-sm text-muted-foreground">
                    競技プログラミング・コンテストでの実績（Static Generated）
                  </p>
                </div>
              </div>

              {awards.length === 0 ? (
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl glass flex items-center justify-center text-3xl border border-white/10">
                    <Trophy className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    受賞歴がありません
                  </h3>
                  <p className="text-muted-foreground">
                    新しい実績が追加されると、ここに表示されます。
                  </p>
                </div>
              ) : (
                <div className="grid gap-8">
                  {awards.map((award, index) => (
                    <div key={award.id}>
                      <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden">
                        <div className="relative md:flex">
                          {/* Image - optimized for performance */}
                          {award.imageUrl && (
                            <div className="md:w-1/3">
                              <img
                                src={award.imageUrl}
                                alt={`${award.title}の受賞画像`}
                                className="w-full h-48 md:h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                style={{
                                  maxWidth: '400px',
                                  height: 'auto',
                                }}
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
                              <h3 className="text-xl font-bold text-muted-foreground mb-3">
                                {award.title}
                              </h3>

                              {/* Organizer */}
                              <div className="flex items-center gap-2 mb-4">
                                <Building2 className="w-4 h-4 text-accent-400" />
                                <p className="text-muted-foreground">
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
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    aria-label={`${award.title}の詳細を見る`}
                                  >
                                    <span>詳細を見る</span>
                                    <ExternalLink
                                      className="w-4 h-4"
                                      aria-hidden="true"
                                    />
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

            {/* Performance Information - Simplified */}
            <div className="glass rounded-2xl border border-white/10 shadow-glass p-8 mb-8">
              <h3 className="text-xl font-semibold text-primary-300 mb-4">
                技術仕様概要
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary-300 mb-2">
                    ISRパフォーマンス
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    静的生成による高速表示、10分間隔で自動更新、効率的なAPI利用でレート制限対策を実装
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-accent-300 mb-2">
                    Notion CMS連携
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Notionデータベースからの自動データ取得、API連携によるリアルタイム同期、Next.js
                    ISRで最適化配信
                  </p>
                </div>
              </div>
            </div>

            {/* Simplified Statistics */}
            <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
              <h3 className="text-xl font-semibold text-primary-300 mb-6 text-center">
                技術統計
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-300 mb-1">
                    10 min
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ISR更新間隔
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-300 mb-1">
                    {awards.length}
                  </div>
                  <div className="text-sm text-muted-foreground">受賞数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-300 mb-1">
                    Static
                  </div>
                  <div className="text-sm text-muted-foreground">生成方式</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
