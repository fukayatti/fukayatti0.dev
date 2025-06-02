import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import HeroSection from './HeroSection';

// Framer Motion のバリアントをモックアップ
const meta = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen bg-background text-foreground p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのダークテーマ
export const Default: Story = {};

// ライトテーマバージョン
export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-background text-foreground p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: { default: 'light' },
  },
};

// モバイルビューポート
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
    backgrounds: { default: 'dark' },
  },
};

// タブレットビューポート
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    backgrounds: { default: 'dark' },
  },
};

// アニメーション無効化（アクセシビリティ対応）
export const ReducedMotion: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div
          className="min-h-screen bg-background text-foreground p-8"
          style={
            {
              // アニメーションを無効化
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
        <div className="min-h-screen bg-black text-white p-8 contrast-more">
          <style>{`
            .gradient-text {
              background: white !important;
              -webkit-background-clip: text !important;
              -webkit-text-fill-color: transparent !important;
            }
            .glass {
              background: rgba(255, 255, 255, 0.1) !important;
              border-color: rgba(255, 255, 255, 0.3) !important;
            }
          `}</style>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// デモ用：コンポーネントの説明
export const ComponentBreakdown: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen bg-background text-foreground p-8">
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">
              HeroSection コンポーネントの構成要素
            </h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>
                • <strong>プロフィール画像</strong>:
                アニメーション付きの回転リング
              </li>
              <li>
                • <strong>グラデーションテキスト</strong>:
                動的なカラーアニメーション
              </li>
              <li>
                • <strong>ステータスインジケーター</strong>:
                リアルタイムの活動状況
              </li>
              <li>
                • <strong>スキルタグ</strong>:
                インタラクティブなホバーエフェクト
              </li>
              <li>
                • <strong>CTAボタン</strong>: プライマリ・セカンダリアクション
              </li>
              <li>
                • <strong>背景エフェクト</strong>:
                浮遊パーティクルとグラデーション
              </li>
            </ul>
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
