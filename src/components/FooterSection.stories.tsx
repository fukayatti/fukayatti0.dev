import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import FooterSection from './FooterSection';

const meta = {
  title: 'Sections/FooterSection',
  component: FooterSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'ウェブサイトのフッターセクション。ソーシャルリンク、クイックナビゲーション、統計情報、ニュースレター登録を含みます。',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground">
          {/* フッターの表示確認のためのコンテンツ */}
          <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl font-bold text-foreground">
                フッターセクションのデモ
              </h1>
              <div className="space-y-4 text-foreground/70">
                <p>
                  このページではFooterSectionコンポーネントの表示を確認できます。
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>ブランドセクション（プロフィール、技術スタック）</li>
                  <li>クイックリンク（ナビゲーション）</li>
                  <li>ソーシャルメディアリンク</li>
                  <li>ニュースレター登録フォーム</li>
                  <li>統計情報の表示</li>
                  <li>バックトゥトップボタン</li>
                </ul>
              </div>

              {/* スクロール確認用のダミーコンテンツ */}
              <div className="space-y-6">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-card p-6 rounded-lg border border-border"
                  >
                    <h3 className="text-xl font-semibold mb-3">
                      セクション {i + 1}
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      フッターまでスクロールして、全体の構成とバックトゥトップボタンの動作を確認してください。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background p-3 rounded border border-border">
                        <div className="font-medium text-foreground">
                          機能 {i * 3 + 1}
                        </div>
                        <div className="text-sm text-foreground/60">
                          説明テキスト
                        </div>
                      </div>
                      <div className="bg-background p-3 rounded border border-border">
                        <div className="font-medium text-foreground">
                          機能 {i * 3 + 2}
                        </div>
                        <div className="text-sm text-foreground/60">
                          説明テキスト
                        </div>
                      </div>
                      <div className="bg-background p-3 rounded border border-border">
                        <div className="font-medium text-foreground">
                          機能 {i * 3 + 3}
                        </div>
                        <div className="text-sm text-foreground/60">
                          説明テキスト
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  ↓ フッターセクション
                </h3>
                <p className="text-blue-300/80">
                  下にスクロールしてフッターの詳細を確認してください
                </p>
              </div>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なフッター（ダークテーマ）
export const Default: Story = {};

// ライトテーマでの表示
export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground">
          <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl font-bold text-foreground">
                ライトテーマのフッター
              </h1>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">
                  ライトテーマの特徴
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">デザイン要素</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• 明るい背景色</li>
                      <li>• 高いコントラスト</li>
                      <li>• 読みやすいテキスト</li>
                      <li>• 適切な境界線</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">インタラクション</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• ホバーエフェクト</li>
                      <li>• フォーカス表示</li>
                      <li>• スムーズな遷移</li>
                      <li>• アクセシビリティ対応</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  フッターコンポーネント
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">📝 FooterContent</h4>
                    <p className="text-sm text-foreground/70">
                      メインのフッターコンテンツを担当
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">⬆️ BackToTopButton</h4>
                    <p className="text-sm text-foreground/70">
                      ページトップに戻る機能
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">🎨 Styling</h4>
                    <p className="text-sm text-foreground/70">
                      レスポンシブデザインとアニメーション
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// モバイルビューでの表示
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground">
          <div className="min-h-screen p-4">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">
                モバイル表示
              </h1>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3">モバイル最適化</h3>
                <ul className="text-sm text-foreground/70 space-y-2">
                  <li>• 縦積みレイアウト</li>
                  <li>• タッチフレンドリーなボタン</li>
                  <li>• 読みやすいフォントサイズ</li>
                  <li>• 適切な余白とスペース</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">レスポンシブ機能</h3>
                <div className="space-y-3">
                  <div className="bg-card p-3 rounded border border-border">
                    <div className="font-medium">グリッドレイアウト</div>
                    <div className="text-sm text-foreground/60">
                      3カラム → 1カラムに変更
                    </div>
                  </div>
                  <div className="bg-card p-3 rounded border border-border">
                    <div className="font-medium">統計セクション</div>
                    <div className="text-sm text-foreground/60">
                      4カラム → 2カラムに変更
                    </div>
                  </div>
                  <div className="bg-card p-3 rounded border border-border">
                    <div className="font-medium">フォーム要素</div>
                    <div className="text-sm text-foreground/60">
                      モバイルに最適化
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground/60">
                下にスクロールしてモバイル版フッターを確認してください
              </p>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// タブレットビューでの表示
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground">
          <div className="min-h-screen p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">
                タブレット表示
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-2">レイアウト調整</h3>
                  <p className="text-sm text-foreground/70">
                    タブレットサイズに最適化されたレスポンシブデザイン
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-2">タッチ操作</h3>
                  <p className="text-sm text-foreground/70">
                    タッチデバイス向けのインタラクション設計
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// フッターのみの表示（コンテンツなし）
export const FooterOnly: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground">
          <div className="p-8">
            <div className="max-w-4xl mx-auto mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                フッターコンポーネント単体
              </h1>
              <p className="text-foreground/70">
                フッターコンポーネントのみの表示です。各セクションの構成を詳しく確認できます。
              </p>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// アニメーション無効化
export const ReducedMotion: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div
          className="bg-background text-foreground"
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
          <div className="min-h-screen p-8">
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
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// 高コントラストモード
export const HighContrast: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-black text-white contrast-more">
          <style>{`
            .glass {
              background: rgba(255, 255, 255, 0.1) !important;
              border-color: rgba(255, 255, 255, 0.3) !important;
            }
            .text-foreground\\/70 {
              color: rgba(255, 255, 255, 0.8) !important;
            }
            .text-primary-400,
            .text-primary-300 {
              color: #60a5fa !important;
            }
          `}</style>
          <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold text-white">
                高コントラストモード
              </h1>
              <div className="bg-white/10 border border-white/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">
                  視覚的アクセシビリティ
                </h3>
                <p className="text-white/80">
                  高いコントラスト比により、視覚に困難を抱えるユーザーでも読みやすい表示を提供します。
                </p>
              </div>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// インタラクション確認用
export const InteractionDemo: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground">
          <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl font-bold text-foreground">
                インタラクション確認
              </h1>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">確認できる機能</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">
                      ホバーエフェクト
                    </h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• ソーシャルリンクのホバー</li>
                      <li>• クイックリンクの移動効果</li>
                      <li>• ボタンのスケール変化</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">機能的な要素</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• ニュースレター登録フォーム</li>
                      <li>• 外部リンクの新しいタブ</li>
                      <li>• バックトゥトップボタン</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  💡 操作方法
                </h3>
                <p className="text-blue-300/80">
                  フッター内の各要素にマウスオーバーして、ホバーエフェクトや機能を確認してください。
                </p>
              </div>
            </div>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
