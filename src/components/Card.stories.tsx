import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import Card from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '再利用可能なCardコンポーネント。様々なスタイルやサイズ、インタラクション機能を提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'カードのサイズを選択',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'glass', 'bordered', 'elevated'],
      description: 'カードの外観バリアント',
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'ホバー時のスケールエフェクトを有効化',
    },
    animated: {
      control: { type: 'boolean' },
      description: 'フェードイン・アニメーションを有効化',
    },
    onClick: {
      description: 'カードクリック時のイベント',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="bg-background text-foreground p-8 min-h-[400px]">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なカード
export const Default: Story = {
  args: {
    title: 'デフォルトカード',
    description:
      'これは基本的なカードコンポーネントです。シンプルで汎用的なデザインになっています。',
  },
};

// インタラクティブなカード
export const Interactive: Story = {
  args: {
    title: 'インタラクティブカード',
    description: 'このカードはクリック可能で、ホバーエフェクトも付いています。',
    hoverable: true,
    onClick: () => alert('カードがクリックされました！'),
  },
};

// ガラス効果のカード
export const Glass: Story = {
  args: {
    title: 'ガラス効果カード',
    description:
      'ガラスモーフィズム効果を使用したモダンなデザインのカードです。',
    variant: 'glass',
    hoverable: true,
  },
};

// 大きなサイズのカード
export const Large: Story = {
  args: {
    title: '大型カード',
    description:
      'より多くのコンテンツを含むことができる大きなカードです。パディングも広くなっています。',
    size: 'large',
    variant: 'elevated',
    hoverable: true,
  },
};

// 子要素を含むカード
export const WithChildren: Story = {
  args: {
    title: 'コンテンツ付きカード',
    description: 'このカードには追加のコンテンツが含まれています。',
    variant: 'bordered',
    children: (
      <div className="space-y-4">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
            React
          </span>
          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
            TypeScript
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-foreground/60">進捗: 75%</span>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    ),
    hoverable: true,
  },
};

// 小さなサイズのカード
export const Small: Story = {
  args: {
    title: 'コンパクトカード',
    description: '限られたスペースに適した小さなカードです。',
    size: 'small',
    variant: 'glass',
  },
};

// アニメーション無効のカード
export const NoAnimation: Story = {
  args: {
    title: 'アニメーション無効',
    description:
      'アニメーションを無効にしたカードです。アクセシビリティの観点で重要です。',
    animated: false,
    variant: 'elevated',
  },
};

// カードのグリッド表示例
export const CardGrid: Story = {
  args: {
    title: 'グリッド表示',
    description: 'カードのグリッド表示例です。',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card
        title="プロジェクト 1"
        description="最初のプロジェクトの説明です。"
        variant="default"
        hoverable
      />
      <Card
        title="プロジェクト 2"
        description="二番目のプロジェクトの説明です。"
        variant="glass"
        hoverable
      />
      <Card
        title="プロジェクト 3"
        description="三番目のプロジェクトの説明です。"
        variant="bordered"
        hoverable
      />
      <Card
        title="プロジェクト 4"
        description="四番目のプロジェクトの説明です。"
        variant="elevated"
        hoverable
      />
      <Card
        title="プロジェクト 5"
        description="五番目のプロジェクトの説明です。"
        variant="glass"
        hoverable
      />
      <Card
        title="プロジェクト 6"
        description="六番目のプロジェクトの説明です。"
        variant="default"
        hoverable
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// ライトテーマでのカード
export const LightTheme: Story = {
  args: {
    title: 'ライトテーマカード',
    description: 'ライトテーマでの表示例です。',
    variant: 'elevated',
    hoverable: true,
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background text-foreground p-8 min-h-[400px]">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
