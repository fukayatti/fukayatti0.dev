# メタデータテンプレート使用方法

## 概要

[`createPageMetadata()`](src/lib/metadata-common.ts:13) 関数を使用して、最小限のコードでページのメタデータを自動生成できます。

## 基本的な使用方法

```typescript
import { createPageMetadata } from '@/lib/metadata-common';

// ページ固有のメタデータ設定
const PAGE_TITLE = 'ページタイトル';
const PAGE_DESCRIPTION = 'ページの説明';

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/your-page-path',
});
```

## オプション

| パラメータ      | 必須 | 説明                                  | 例                     |
| --------------- | ---- | ------------------------------------- | ---------------------- |
| `title`         | ✅   | ページタイトル                        | `'About'`              |
| `description`   | ✅   | ページ説明                            | `'私たちについて'`     |
| `path`          | ❌   | ページパス（OG URLで使用）            | `'/about'`             |
| `ogTitle`       | ❌   | OG専用タイトル（デフォルト: title）   | `'About Us'`           |
| `ogDescription` | ❌   | OG専用説明（デフォルト: description） | `'詳細な説明'`         |
| `ogSubtitle`    | ❌   | OG画像のサブタイトル                  | `'会社概要'`           |
| `keywords`      | ❌   | SEOキーワード配列                     | `['React', 'Next.js']` |

## 自動生成される内容

- ✅ Open Graph メタデータ
- ✅ Twitter Card メタデータ
- ✅ 動的OG画像URL生成
- ✅ 完全なURL構築

## 実装例

### 基本例

```typescript
// src/app/blog/page.tsx
const PAGE_TITLE = 'Blog';
const PAGE_DESCRIPTION = '技術ブログと開発に関する記事';

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/blog',
});
```

### 詳細設定例

```typescript
// src/app/projects/page.tsx
const PAGE_TITLE = 'Projects';
const PAGE_DESCRIPTION = '開発したプロジェクトの紹介';

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/projects',
  ogSubtitle: 'ポートフォリオ',
  ogDescription: 'Next.js、React、TypeScriptで開発したプロジェクト集',
  keywords: ['Projects', 'Portfolio', 'React', 'Next.js', 'TypeScript'],
});
```

## メリット

1. **コード量削減**: 従来の50行以上 → 5-10行
2. **一貫性**: 全ページで統一されたメタデータ形式
3. **保守性**: 中央集約された設定で変更が容易
4. **自動化**: OG画像URLの自動生成
5. **型安全**: TypeScriptによる型チェック

## 新しいページを追加する場合

1. ページファイルを作成
2. [`createPageMetadata()`](src/lib/metadata-common.ts:13) をインポート
3. `PAGE_TITLE` と `PAGE_DESCRIPTION` を定数で定義
4. [`metadata`](src/app/about/page.tsx:12) をエクスポート

```typescript
import { createPageMetadata } from '@/lib/metadata-common';

const PAGE_TITLE = 'New Page';
const PAGE_DESCRIPTION = 'New page description';

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/new-page',
});

export default function NewPage() {
  return <div>{PAGE_TITLE}</div>;
}
```
