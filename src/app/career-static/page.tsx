import { getCachedAwards } from '@/lib/notion-server';
import type { NotionAward } from '@/lib/notion';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">エラー: {error}</p>
          <p className="text-sm text-gray-500 mt-2">
            フォールバックデータを表示する場合は、ページを再読み込みしてください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              経歴・受賞歴 (Static)
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              NotionCMSで管理された実績・受賞歴（ISR版）
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                ISR（10分間隔更新）
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Notionと自動同期
              </div>
            </div>
          </div>

          {/* 受賞歴セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              受賞歴
            </h2>

            {awards.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-300">
                  受賞歴がありません。
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="md:flex">
                      {/* 画像 */}
                      {award.imageUrl && (
                        <div className="md:w-1/3">
                          <img
                            src={award.imageUrl}
                            alt={award.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}

                      {/* コンテンツ */}
                      <div
                        className={`p-6 ${award.imageUrl ? 'md:w-2/3' : 'w-full'}`}
                      >
                        <div className="flex flex-col h-full">
                          {/* 日付 */}
                          <div className="mb-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
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

                          {/* タイトル */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {award.title}
                          </h3>

                          {/* 主催者 */}
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            主催: {award.organizer}
                          </p>

                          {/* 詳細リンク */}
                          {award.details && (
                            <div className="mt-auto">
                              <a
                                href={award.details}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                              >
                                詳細を見る
                                <svg
                                  className="ml-1 w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* フェッチ頻度情報 */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📊 フェッチ頻度とパフォーマンス
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <strong>ISR（Incremental Static Regeneration）</strong>:
                10分間隔で自動更新
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <strong>実際のNotion API呼び出し</strong>: 最大10分に1回
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <strong>ユーザー体験</strong>: 高速表示（静的生成）
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <strong>レート制限対策</strong>: 複数ユーザーアクセスでも安全
              </li>
            </ul>
          </div>

          {/* CMS情報 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              🎯 Notion CMS連携について
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                このページの内容はNotionデータベースから自動的に取得されます
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Notionでデータを更新すると、最大10分で自動反映されます
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                静的生成により高速なページ表示を実現
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
