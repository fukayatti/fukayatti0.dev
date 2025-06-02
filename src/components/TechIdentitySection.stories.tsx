import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import TechIdentitySection from './TechIdentitySection';

const meta = {
  title: 'Sections/TechIdentitySection',
  component: TechIdentitySection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'フロントエンドと電子工学の両方のスキルを表示するインタラクティブなセクション。タブ切り替え、アニメーション、コードプレビューを含みます。',
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
} satisfies Meta<typeof TechIdentitySection>;

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
                ライトテーマでのTech Identity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">デザインの特徴</h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• ガラスモーフィズム効果</li>
                    <li>• グラデーションタブ</li>
                    <li>• プログレスバーアニメーション</li>
                    <li>• シンタックスハイライト</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">
                    インタラクション
                  </h3>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• タブ切り替え機能</li>
                    <li>• スムーズなアニメーション</li>
                    <li>• 動的コンテンツ変更</li>
                    <li>• レスポンシブ対応</li>
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
                <li>• 縦積みレイアウト</li>
                <li>• タッチフレンドリーなタブ</li>
                <li>• 最適化されたコードビューア</li>
                <li>• スクロール可能なコンテンツ</li>
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
                <h3 className="text-lg font-semibold mb-2">レイアウト最適化</h3>
                <p className="text-sm text-foreground/70">
                  タブレットサイズに合わせた2カラムレイアウト
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-2">タッチ操作</h3>
                <p className="text-sm text-foreground/70">
                  タッチデバイス向けの操作性を考慮
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

// インタラクション機能のデモ
export const InteractionDemo: Story = {
  decorators: [
    (Story) => {
      const [activeTab, setActiveTab] = useState<'frontEnd' | 'electronic'>(
        'frontEnd'
      );

      return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="bg-background text-foreground min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  インタラクション機能デモ
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold mb-4">
                      現在のタブ:{' '}
                      {activeTab === 'frontEnd' ? 'Frontend' : 'Electronic'}
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab('frontEnd')}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                          activeTab === 'frontEnd'
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-border hover:border-primary/50'
                        }`}
                      >
                        Frontend Engineer
                      </button>
                      <button
                        onClick={() => setActiveTab('electronic')}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                          activeTab === 'electronic'
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-border hover:border-primary/50'
                        }`}
                      >
                        Electronic Engineer
                      </button>
                    </div>
                    <p className="text-sm text-foreground/60 mt-4">
                      ※ 下のコンポーネントでもタブ切り替えが可能です
                    </p>
                  </div>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold mb-4">
                      コンポーネント機能
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-sm">
                          タブ切り替えアニメーション
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">
                          プログレスバーアニメーション
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <span className="text-sm">
                          コードシンタックスハイライト
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                        <span className="text-sm">ガラスモーフィズム効果</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    🎯 操作方法
                  </h3>
                  <p className="text-blue-300/80">
                    下のコンポーネントのタブをクリックして、フロントエンドと電子工学の切り替えを体験してください。
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
                機能性は保持されています。
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
            .text-primary-400,
            .text-primary-300 {
              color: #60a5fa !important;
            }
            .gradient-text {
              background: white !important;
              -webkit-background-clip: text !important;
              -webkit-text-fill-color: transparent !important;
            }
          `}</style>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 p-6 bg-white/10 border border-white/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                高コントラストモード
              </h3>
              <p className="text-white/80">
                視覚的なコントラストを向上させ、読みやすさを向上させています。
                すべての機能は正常に動作します。
              </p>
            </div>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

// コードハイライト機能のフォーカス
export const CodeHighlightFocus: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                コードハイライト機能
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">Frontend Code</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>• TypeScript インターフェース定義</li>
                    <li>• 型安全なオブジェクト作成</li>
                    <li>• モダンな配列記法</li>
                    <li>• ES6+ 構文の活用</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-500/20 rounded border border-blue-500/30">
                    <div className="text-blue-400 font-semibold text-sm">
                      注目ポイント
                    </div>
                    <div className="text-blue-300/80 text-sm">
                      型定義とオブジェクト構造の設計
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    Electronic Code
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>• Arduino/ESP32 プログラミング</li>
                    <li>• WebServer ライブラリ活用</li>
                    <li>• IoT デバイス制御</li>
                    <li>• センサーデータ処理</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-500/20 rounded border border-green-500/30">
                    <div className="text-green-400 font-semibold text-sm">
                      注目ポイント
                    </div>
                    <div className="text-green-300/80 text-sm">
                      ハードウェア制御とAPI設計
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  💻 シンタックスハイライト
                </h3>
                <p className="text-purple-300/80">
                  react-syntax-highlighter
                  を使用して、コードの可読性を向上させています。
                  言語に応じて適切なハイライトが適用されます。
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

// スキルレベルプログレスのフォーカス
export const SkillProgressFocus: Story = {
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
                    Frontend Skills
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>React</span>
                      <span className="text-green-400 font-semibold">90%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Next.js</span>
                      <span className="text-blue-400 font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>TypeScript</span>
                      <span className="text-blue-400 font-semibold">80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>TailwindCSS</span>
                      <span className="text-green-400 font-semibold">95%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    Electronic Skills
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Circuit Design</span>
                      <span className="text-yellow-400 font-semibold">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Arduino/ESP32</span>
                      <span className="text-green-400 font-semibold">80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>PCB Design</span>
                      <span className="text-yellow-400 font-semibold">70%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>IoT Systems</span>
                      <span className="text-orange-400 font-semibold">65%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-400 mb-2">
                  📊 プログレスバーアニメーション
                </h3>
                <p className="text-primary-300/80">
                  タブを切り替えるたびに、スキルレベルが順次アニメーションで表示されます。
                  視覚的に分かりやすく、エンゲージメントを向上させます。
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
