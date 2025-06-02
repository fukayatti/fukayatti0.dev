import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import BackToTopButton from '../components/BackToTopButton';

const ComponentShowcase = () => {
  const [progress1, setProgress1] = useState(75);
  const [progress2, setProgress2] = useState(45);
  const [progress3, setProgress3] = useState(90);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Storybook コンポーネントデモ
        </h1>
        <p className="text-lg text-foreground/70">
          実際のアプリケーションでのコンポーネント使用例
        </p>
      </div>

      {/* プロジェクト管理ダッシュボード */}
      <Card
        title="プロジェクト管理ダッシュボード"
        description="複数のコンポーネントを組み合わせた実用的な例"
        variant="glass"
        size="large"
        hoverable
      >
        <div className="space-y-6">
          {/* プロジェクト1 */}
          <Card title="" variant="bordered" size="medium">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-foreground">
                  Webアプリケーション開発
                </h4>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-primary/20 text-primary rounded text-sm hover:bg-primary/30 transition-colors"
                    onClick={() => setProgress1(Math.min(progress1 + 10, 100))}
                  >
                    +10%
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                    onClick={() => setProgress1(Math.max(progress1 - 10, 0))}
                  >
                    -10%
                  </button>
                </div>
              </div>
              <ProgressBar
                value={progress1}
                variant="primary"
                showLabel
                label="開発進捗"
                animated
              />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-foreground">24</div>
                  <div className="text-foreground/60">完了タスク</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">8</div>
                  <div className="text-foreground/60">進行中</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">3</div>
                  <div className="text-foreground/60">残りタスク</div>
                </div>
              </div>
            </div>
          </Card>

          {/* プロジェクト2 */}
          <Card title="" variant="elevated" size="medium">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-foreground">
                  UIコンポーネント設計
                </h4>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors"
                    onClick={() => setProgress2(Math.min(progress2 + 15, 100))}
                  >
                    +15%
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                    onClick={() => setProgress2(Math.max(progress2 - 15, 0))}
                  >
                    -15%
                  </button>
                </div>
              </div>
              <ProgressBar
                value={progress2}
                variant="warning"
                showLabel
                label="デザイン進捗"
                striped
                stripedAnimated
                animated
              />
              <div className="flex justify-between text-sm">
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">
                  設計段階
                </span>
                <span className="text-foreground/60">期限: 2週間後</span>
              </div>
            </div>
          </Card>

          {/* プロジェクト3 */}
          <Card title="" variant="default" size="medium">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-foreground">
                  テスト・デプロイ
                </h4>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors"
                    onClick={() => setProgress3(Math.min(progress3 + 5, 100))}
                  >
                    +5%
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                    onClick={() => setProgress3(Math.max(progress3 - 5, 0))}
                  >
                    -5%
                  </button>
                </div>
              </div>
              <ProgressBar
                value={progress3}
                variant="success"
                showLabel
                label="テスト実装"
                animated
              />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground/70">
                  CI/CDパイプライン実行中
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* スキル習得進捗 */}
      <Card
        title="スキル習得トラッカー"
        description="学習中の技術スタックの習得度"
        variant="glass"
        size="large"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="font-semibold text-foreground">フロントエンド</h5>
            <div className="space-y-3">
              <ProgressBar
                value={95}
                variant="gradient"
                showLabel
                label="React"
                size="small"
              />
              <ProgressBar
                value={85}
                variant="primary"
                showLabel
                label="TypeScript"
                size="small"
              />
              <ProgressBar
                value={80}
                variant="success"
                showLabel
                label="Next.js"
                size="small"
              />
              <ProgressBar
                value={70}
                variant="warning"
                showLabel
                label="Tailwind CSS"
                size="small"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="font-semibold text-foreground">
              バックエンド・その他
            </h5>
            <div className="space-y-3">
              <ProgressBar
                value={60}
                variant="primary"
                showLabel
                label="Node.js"
                size="small"
              />
              <ProgressBar
                value={40}
                variant="warning"
                showLabel
                label="Docker"
                size="small"
              />
              <ProgressBar
                value={35}
                variant="error"
                showLabel
                label="AWS"
                size="small"
              />
              <ProgressBar
                value={25}
                variant="error"
                showLabel
                label="GraphQL"
                size="small"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* アクションエリア */}
      <div className="flex justify-center">
        <BackToTopButton />
      </div>
    </div>
  );
};

const meta = {
  title: 'Examples/ComponentShowcase',
  component: ComponentShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '複数のコンポーネントを組み合わせた実用的なデモページ。プロジェクト管理やスキルトラッカーなどの実際のユースケースを示します。',
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
} satisfies Meta<typeof ComponentShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground min-h-screen p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
