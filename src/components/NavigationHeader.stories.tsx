import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import NavigationHeader from './NavigationHeader';

const meta = {
  title: 'Components/NavigationHeader',
  component: NavigationHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'アプリケーションのメインナビゲーションヘッダー。レスポンシブデザイン、テーマ切り替え、モバイルメニューを含みます。',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen">
          <Story />
          {/* ヘッダーの動作確認のためのコンテンツ */}
          <div className="pt-20 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl font-bold text-foreground">
                ナビゲーションヘッダーのデモ
              </h1>
              <div className="space-y-4 text-foreground/70">
                <p>
                  このページではNavigationHeaderコンポーネントの動作を確認できます。
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>レスポンシブ対応（デスクトップ・モバイル）</li>
                  <li>テーマ切り替え機能</li>
                  <li>ナビゲーションリンク</li>
                  <li>モバイルメニューの開閉</li>
                  <li>アニメーション効果</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    デスクトップ表示
                  </h3>
                  <p className="text-foreground/70">
                    大画面では全てのナビゲーションリンクが表示されます
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">モバイル表示</h3>
                  <p className="text-foreground/70">
                    小画面ではハンバーガーメニューが表示されます
                  </p>
                </div>
              </div>
              {/* スクロール確認用のダミーコンテンツ */}
              <div className="space-y-8">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-card p-6 rounded-lg border border-border"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      セクション {i + 1}
                    </h3>
                    <p className="text-foreground/70">
                      スクロール時のヘッダーの固定動作を確認するためのダミーコンテンツです。
                      ヘッダーは画面上部に固定され、スクロールしても常に表示されます。
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof NavigationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なヘッダー（ダークテーマ）
export const Default: Story = {};

// ライトテーマでの表示
export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground min-h-screen">
          <Story />
          <div className="pt-20 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl font-bold text-foreground">
                ライトテーマのナビゲーション
              </h1>
              <p className="text-foreground/70">
                ライトテーマでのヘッダーの表示を確認できます。背景の透明度やカラーが調整されています。
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-card p-4 rounded border border-border">
                  <div className="font-semibold">背景効果</div>
                  <div className="text-foreground/60">ブラーエフェクト付き</div>
                </div>
                <div className="bg-card p-4 rounded border border-border">
                  <div className="font-semibold">テーマ切り替え</div>
                  <div className="text-foreground/60">
                    右上のアイコンで切り替え
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// モバイルビューポートでの表示
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen">
          <Story />
          <div className="pt-20 p-4">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">
                モバイル表示
              </h1>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-2">モバイル機能</h3>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>• ハンバーガーメニュー</li>
                  <li>• タップでメニュー開閉</li>
                  <li>• 外部クリックで自動閉じる</li>
                  <li>• タッチフレンドリーなボタンサイズ</li>
                </ul>
              </div>
              <p className="text-sm text-foreground/60">
                右上のメニューボタンをタップしてモバイルメニューを開いてください。
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// タブレットビューポートでの表示
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen">
          <Story />
          <div className="pt-20 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">
                タブレット表示
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-2">
                    レスポンシブ対応
                  </h3>
                  <p className="text-sm text-foreground/70">
                    画面サイズに応じて適切にレイアウトが調整されます
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-2">タッチ対応</h3>
                  <p className="text-sm text-foreground/70">
                    タッチデバイスでも使いやすいインターフェース
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// アニメーション無効化（アクセシビリティ）
export const ReducedMotion: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div
          className="bg-background text-foreground min-h-screen"
          style={
            {
              '--motion-duration': '0s',
            } as React.CSSProperties
          }
        >
          <style>{`
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          `}</style>
          <Story />
          <div className="pt-20 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold text-foreground">
                アニメーション無効化
              </h1>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                  アクセシビリティ対応
                </h3>
                <p className="text-yellow-300/80">
                  アニメーションが無効化されており、動きに敏感なユーザーでも快適に利用できます。
                </p>
              </div>
              <p className="text-foreground/70">
                prefers-reduced-motion
                設定を尊重し、必要な場合はアニメーションを無効化できます。
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// ナビゲーションの機能確認用
export const NavigationDemo: Story = {
  decorators: [
    (Story) => {
      const [currentPage, setCurrentPage] = useState('Home');

      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="bg-background text-foreground min-h-screen">
            <Story />
            <div className="pt-20 p-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-foreground">
                  ナビゲーション機能デモ
                </h1>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    現在のページ: {currentPage}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['Home', 'About', 'Career', 'Works', 'Contact'].map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            currentPage === page
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background border-border hover:border-primary/50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>
                  <p className="text-sm text-foreground/60 mt-4">
                    ※ 実際のナビゲーションリンクは Next.js の Link
                    コンポーネントを使用しています
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">ナビゲーション機能</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">🏠 ホームページ</h4>
                      <p className="text-sm text-foreground/70">
                        ポートフォリオのメインページ
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">👤 About</h4>
                      <p className="text-sm text-foreground/70">
                        プロフィールと自己紹介
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">🏆 Career</h4>
                      <p className="text-sm text-foreground/70">
                        経歴とスキル情報
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">💼 Works</h4>
                      <p className="text-sm text-foreground/70">
                        プロジェクトとポートフォリオ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
};

// 高コントラストモード
export const HighContrast: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-black text-white min-h-screen contrast-more">
          <style>{`
            .backdrop-blur-sm {
              background: rgba(255, 255, 255, 0.9) !important;
            }
            .dark .backdrop-blur-sm {
              background: rgba(0, 0, 0, 0.9) !important;
            }
            .text-foreground\\/80 {
              color: white !important;
            }
          `}</style>
          <Story />
          <div className="pt-20 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold text-white">
                高コントラストモード
              </h1>
              <div className="bg-white/10 border border-white/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">
                  アクセシビリティ機能
                </h3>
                <p className="text-white/80">
                  視覚的なコントラストを向上させ、より読みやすい表示を提供します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};
