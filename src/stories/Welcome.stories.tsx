import type { Meta, StoryObj } from '@storybook/react';

const Welcome = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-foreground">
        Welcome to My Portfolio Storybook
      </h1>
      <div className="prose prose-lg text-foreground/80">
        <p className="mb-4">
          このStorybookでは、ポートフォリオサイトで使用されているコンポーネントを確認できます。
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          利用可能なコンポーネント:
        </h2>
        <ul className="space-y-2">
          <li>• BackToTopButton - ページトップに戻るボタン</li>
          <li>• ColorThemeSelector - テーマ切り替え機能</li>
          <li>• CurrentFocusSummaryCard - 現在の焦点をまとめたカード</li>
          <li>• その他のUIコンポーネント</li>
        </ul>
        <p className="mt-6">
          左側のサイドバーからコンポーネントを選択して、それぞれの使用例とプロパティを確認してください。
        </p>
      </div>
    </div>
  );
};

const meta = {
  title: 'Welcome',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
