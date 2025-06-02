import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import TechUniverseSection from './TechUniverseSection';

const meta = {
  title: 'Sections/TechUniverseSection',
  component: TechUniverseSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '技術スタックを表示するインタラクティブなセクション。カテゴリフィルタリング、グリッドレイアウト、スキルレベル表示を含みます。',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof TechUniverseSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な表示
export const Default: Story = {};

// ライトテーマでの表示
export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-card rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                ライトテーマでのTech Universe
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">フィルタリング</h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• カテゴリ別表示</li>
                    <li>• アニメーション切り替え</li>
                    <li>• レスポンシブ対応</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">
                    グリッドレイアウト
                  </h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• 適応的カラム数</li>
                    <li>• ホバーエフェクト</li>
                    <li>• カード形式表示</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">スキル表示</h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• プロフィシェンシー表示</li>
                    <li>• アイコン統合</li>
                    <li>• 統計情報</li>
                  </ul>
                </div>
              </div>
            </div>
            <Story />
          </div>
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
        <div className="bg-background text-foreground min-h-screen p-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              モバイル表示
            </h2>
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-2">レスポンシブ機能</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• 2カラムグリッド</li>
                <li>• タッチフレンドリーなフィルタ</li>
                <li>• 最適化されたカードサイズ</li>
                <li>• スクロール可能なレイアウト</li>
              </ul>
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
        <div className="bg-background text-foreground min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              タブレット表示
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-2">グリッド調整</h3>
                <p className="text-sm text-foreground/70">
                  タブレットサイズに最適化された3-4カラムレイアウト
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-2">タッチ操作</h3>
                <p className="text-sm text-foreground/70">
                  フィルタボタンとカードのタッチ操作性を向上
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

// フィルタリング機能のデモ
export const FilteringDemo: Story = {
  decorators: [
    (Story) => {
      const [selectedCategory, setSelectedCategory] = useState('all');

      const categories = [
        { id: 'all', label: 'All Technologies', icon: '🌌', count: 9 },
        { id: 'language', label: 'Languages', icon: '💻', count: 4 },
        { id: 'framework', label: 'Frameworks', icon: '⚛️', count: 2 },
        { id: 'tool', label: 'Tools', icon: '🛠️', count: 2 },
        { id: 'technology', label: 'Technologies', icon: '🚀', count: 1 },
      ];

      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="bg-background text-foreground min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  フィルタリング機能デモ
                </h2>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    現在のカテゴリ:{' '}
                    {categories.find((c) => c.id === selectedCategory)?.label}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{category.icon}</div>
                          <div className="text-sm font-medium">
                            {category.label}
                          </div>
                          <div className="text-xs opacity-70">
                            {category.count} items
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-foreground/60 mt-4">
                    ※ 下のコンポーネントでもフィルタリングが可能です
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold mb-4">
                      フィルタリング機能
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        スムーズなアニメーション切り替え
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        レイアウトアニメーション対応
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        アクセシビリティ配慮
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        レスポンシブデザイン
                      </li>
                    </ul>
                  </div>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold mb-4">
                      表示される技術
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="font-medium text-primary mb-1">
                          Languages
                        </div>
                        <ul className="text-foreground/70 space-y-1">
                          <li>• Python</li>
                          <li>• TypeScript</li>
                          <li>• Rust</li>
                          <li>• C++</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-primary mb-1">
                          Tools & More
                        </div>
                        <ul className="text-foreground/70 space-y-1">
                          <li>• React</li>
                          <li>• Next.js</li>
                          <li>• TailwindCSS</li>
                          <li>• Docker</li>
                          <li>• WebAssembly</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    🎯 操作方法
                  </h3>
                  <p className="text-blue-300/80">
                    下のコンポーネントのフィルタボタンをクリックして、カテゴリ別の技術を確認してください。
                  </p>
                </div>
              </div>

              <Story />
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
};

// スキルレベル表示のフォーカス
export const SkillLevelFocus: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                スキルレベル表示システム
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    プロフィシェンシー表示
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>React</span>
                        <span className="text-blue-400 font-semibold">95%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-[95%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>TypeScript</span>
                        <span className="text-blue-400 font-semibold">90%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-[90%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rust</span>
                        <span className="text-orange-400 font-semibold">
                          75%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full w-[75%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    アニメーション特徴
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">順次表示</div>
                        <div className="text-sm text-foreground/70">
                          各カードが0.03秒間隔で順番にアニメーション
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">プログレスバー</div>
                        <div className="text-sm text-foreground/70">
                          スキルレベルに応じた進捗アニメーション
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">ホバーエフェクト</div>
                        <div className="text-sm text-foreground/70">
                          マウスオーバー時の3D変形とグロー効果
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-2">
                  📊 ランダム性の活用
                </h3>
                <p className="text-primary-300/80">
                  各技術のプロフィシェンシーは70-100%の範囲でランダム生成され、
                  リロードするたびに異なる値が表示されます。
                </p>
              </div>
            </div>

            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// 統計情報フォーカス
export const StatisticsFocus: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                技術統計ダッシュボード
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl mb-2">💻</div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    4+
                  </div>
                  <div className="text-sm text-foreground/70">Languages</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl mb-2">⚛️</div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    6+
                  </div>
                  <div className="text-sm text-foreground/70">Frameworks</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl mb-2">🛠️</div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    10+
                  </div>
                  <div className="text-sm text-foreground/70">Tools</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    3+
                  </div>
                  <div className="text-sm text-foreground/70">
                    Years Experience
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4">統計機能の詳細</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">表示項目</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• プログラミング言語数</li>
                      <li>• フレームワーク・ライブラリ数</li>
                      <li>• 開発ツール数</li>
                      <li>• 経験年数</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">デザイン特徴</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• ガラスモーフィズム効果</li>
                      <li>• アイコンによる視覚的識別</li>
                      <li>• カラーコード化された数値</li>
                      <li>• レスポンシブグリッド</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  📈 成長の可視化
                </h3>
                <p className="text-green-300/80">
                  技術統計セクションは開発者の成長とスキルセットの幅を効果的に伝えます。
                </p>
              </div>
            </div>

            <Story />
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
          className="bg-background text-foreground min-h-screen p-8"
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
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                アクセシビリティ: アニメーション無効化
              </h3>
              <p className="text-yellow-300/80">
                アニメーションが無効化されており、動きに敏感なユーザーでも快適に利用できます。
                フィルタリング機能は正常に動作します。
              </p>
            </div>
            <Story />
          </div>
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
        <div className="bg-black text-white min-h-screen p-8 contrast-more">
          <style>{`
            .glass {
              background: rgba(255, 255, 255, 0.1) !important;
              border-color: rgba(255, 255, 255, 0.3) !important;
            }
            .text-foreground\\/70,
            .text-foreground\\/60 {
              color: rgba(255, 255, 255, 0.8) !important;
            }
            .text-primary-300 {
              color: #60a5fa !important;
            }
            .gradient-text {
              background: white !important;
              -webkit-background-clip: text !important;
              -webkit-text-fill-color: transparent !important;
            }
            .bg-muted {
              background: rgba(255, 255, 255, 0.2) !important;
            }
          `}</style>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-white/10 border border-white/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                高コントラストモード
              </h3>
              <p className="text-white/80">
                視覚的なコントラストを向上させ、読みやすさを向上させています。
                技術アイコンの色は保持され、識別しやすくなっています。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};
