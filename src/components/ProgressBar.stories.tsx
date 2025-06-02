import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'カスタマイズ可能なプログレスバーコンポーネント。アニメーション、ストライプ、様々なサイズとバリアントをサポートします。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '進捗値 (0-100)',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'プログレスバーのサイズ',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'gradient'],
      description: '色のバリアント',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'ラベルと進捗パーセントを表示',
    },
    label: {
      control: { type: 'text' },
      description: 'カスタムラベルテキスト',
    },
    animated: {
      control: { type: 'boolean' },
      description: 'アニメーション効果を有効化',
    },
    striped: {
      control: { type: 'boolean' },
      description: 'ストライプパターンを表示',
    },
    stripedAnimated: {
      control: { type: 'boolean' },
      description: 'ストライプアニメーションを有効化',
    },
    rounded: {
      control: { type: 'boolean' },
      description: '角の丸みを有効化',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground p-8 w-96">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なプログレスバー
export const Default: Story = {
  args: {
    value: 65,
    showLabel: true,
    label: 'プロジェクト進捗',
  },
};

// 各サイズの比較
export const Sizes: Story = {
  args: { value: 0 },
  render: () => (
    <div className="space-y-6">
      <ProgressBar value={75} size="small" showLabel label="Small (2px)" />
      <ProgressBar value={75} size="medium" showLabel label="Medium (3px)" />
      <ProgressBar value={75} size="large" showLabel label="Large (4px)" />
    </div>
  ),
};

// 各バリアントの比較
export const Variants: Story = {
  args: { value: 0 },
  render: () => (
    <div className="space-y-4">
      <ProgressBar value={60} variant="primary" showLabel label="Primary" />
      <ProgressBar value={85} variant="success" showLabel label="Success" />
      <ProgressBar value={45} variant="warning" showLabel label="Warning" />
      <ProgressBar value={25} variant="error" showLabel label="Error" />
      <ProgressBar value={70} variant="gradient" showLabel label="Gradient" />
    </div>
  ),
};

// ストライプ効果
export const Striped: Story = {
  args: { value: 0 },
  render: () => (
    <div className="space-y-4">
      <ProgressBar
        value={60}
        striped
        showLabel
        label="静的ストライプ"
        variant="primary"
      />
      <ProgressBar
        value={75}
        striped
        stripedAnimated
        showLabel
        label="アニメーションストライプ"
        variant="success"
      />
    </div>
  ),
};

// 動的プログレスのデモ
export const AnimatedProgress: Story = {
  args: { value: 0 },
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="space-y-4">
        <ProgressBar
          value={progress}
          showLabel
          label="自動進捗"
          variant="gradient"
          animated
        />
        <p className="text-sm text-foreground/70 text-center">
          自動的に進捗が更新されます
        </p>
      </div>
    );
  },
};

// 複数のプログレスバーを使った dashboard スタイル
export const Dashboard: Story = {
  args: { value: 0 },
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        プロジェクトダッシュボード
      </h3>

      <div className="space-y-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <ProgressBar
            value={90}
            variant="success"
            showLabel
            label="フロントエンド開発"
            size="medium"
          />
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <ProgressBar
            value={65}
            variant="primary"
            showLabel
            label="バックエンド実装"
            size="medium"
          />
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <ProgressBar
            value={30}
            variant="warning"
            showLabel
            label="テスト作成"
            size="medium"
          />
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <ProgressBar
            value={10}
            variant="error"
            showLabel
            label="ドキュメント作成"
            size="medium"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// 学習進捗トラッカー
export const LearningTracker: Story = {
  args: { value: 0 },
  render: () => (
    <div className="space-y-6 w-full max-w-lg">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        スキル習得進捗
      </h3>

      <div className="space-y-4">
        {[
          { skill: 'React', progress: 95, variant: 'gradient' as const },
          { skill: 'TypeScript', progress: 85, variant: 'primary' as const },
          { skill: 'Next.js', progress: 80, variant: 'success' as const },
          { skill: 'GraphQL', progress: 60, variant: 'warning' as const },
          { skill: 'Docker', progress: 40, variant: 'error' as const },
        ].map((item) => (
          <div key={item.skill} className="flex items-center space-x-4">
            <div className="w-24 text-sm font-medium text-foreground">
              {item.skill}
            </div>
            <div className="flex-1">
              <ProgressBar
                value={item.progress}
                variant={item.variant}
                showLabel={false}
                size="medium"
                animated
              />
            </div>
            <div className="w-12 text-sm text-foreground/70 text-right">
              {item.progress}%
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// ライトテーマ
export const LightTheme: Story = {
  args: {
    value: 75,
    showLabel: true,
    label: 'ライトテーマ',
    variant: 'gradient',
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground p-8 w-96">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

// 最小と最大値
export const EdgeCases: Story = {
  args: { value: 0 },
  render: () => (
    <div className="space-y-4">
      <ProgressBar value={0} showLabel label="0% - 開始前" variant="error" />
      <ProgressBar
        value={100}
        showLabel
        label="100% - 完了"
        variant="success"
      />
      <ProgressBar
        value={-10}
        showLabel
        label="負の値 (-10)"
        variant="warning"
      />
      <ProgressBar
        value={120}
        showLabel
        label="100以上 (120)"
        variant="primary"
      />
    </div>
  ),
};
