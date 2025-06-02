# Storybook セットアップ完了

このプロジェクトにStorybookが正常にセットアップされました。

## 🚀 起動方法

Storybookを起動するには、以下のコマンドを実行してください：

```bash
pnpm storybook
```

Storybookは `http://localhost:6006` で起動します。

## 📦 ビルド

本番用のStorybookをビルドするには：

```bash
pnpm build-storybook
```

## 📁 ファイル構成

```
.storybook/
├── main.ts          # Storybookの主要設定
└── preview.ts       # グローバルプレビュー設定

src/
├── components/
│   ├── *.stories.tsx # コンポーネントのStoryファイル
└── stories/
    ├── *.stories.tsx # サンプルStoryファイル
    └── assets/       # Storybook用のアセット
```

## ✨ 作成済みのStoryファイル

以下のコンポーネントのStoryが作成されています：

- **BackToTopButton** - ページトップに戻るボタン
- **ColorThemeSelector** - テーマ切り替えコンポーネント
- **CurrentFocusSummaryCard** - 現在の焦点サマリーカード
- **Button** - サンプルボタンコンポーネント
- **Welcome** - Storybookの紹介ページ

## 🛠️ 新しいStoryの作成

新しいコンポーネントのStoryを作成するには：

1. コンポーネントと同じディレクトリに `ComponentName.stories.tsx` ファイルを作成
2. 以下のテンプレートを使用：

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

## 🎨 テーマサポート

StorybookはNext.jsのテーマシステムと統合されており、`next-themes`を使用したコンポーネントも正常に動作します。

## 📚 より詳しい情報

- [Storybook公式ドキュメント](https://storybook.js.org/docs)
- [Next.js + Storybook](https://storybook.js.org/docs/get-started/nextjs)
