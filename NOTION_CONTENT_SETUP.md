# Notion Content Management Setup

このドキュメントでは、トップページの動的コンテンツをNotionで管理するためのセットアップ方法を説明します。

## 概要

以下のコンテンツがNotionデータベースで管理されています：

1. **Current Focus Areas** - 現在の技術的な焦点領域
2. **Goals 2025** - 2025年の目標

## 必要な環境変数

`.env.local` ファイルに以下の環境変数を設定してください：

```
NOTION_TOKEN=your_notion_token_here
```

## Notionデータベース

### 1. Current Focus Areas Database

- **Database ID**: `1fd3dbb2-f059-8102-b403-ffd658d0423e`
- **Parent Page**: fukayatti0.dev (`1fd3dbb2-f059-80e7-be83-efb2b3bb7948`)

#### プロパティ:

- **Title** (title): フォーカスエリアのタイトル
- **Subtitle** (rich_text): サブタイトル
- **Description** (rich_text): 詳細説明
- **Progress** (number, percent): 進捗率 (0-100)
- **Status** (select): Active, Learning, Exploring, Competing
- **Stats** (rich_text): 統計情報 (例: "12 projects")
- **Technologies** (multi_select): 使用技術
- **Color** (select): UIテーマカラー (primary, accent, secondary, warning)
- **Icon** (select): アイコン名 (Code2, Smartphone, Cpu, Trophy)
- **Display Order** (number): 表示順序
- **Active** (checkbox): アクティブかどうか

### 2. Goals 2025 Database

- **Database ID**: `1fd3dbb2-f059-81de-9487-ffe50e290bec`
- **Parent Page**: fukayatti0.dev (`1fd3dbb2-f059-80e7-be83-efb2b3bb7948`)

#### プロパティ:

- **Title** (title): 目標のタイトル
- **Description** (rich_text): 詳細説明
- **Progress** (number, percent): 進捗率 (0-100)
- **Priority** (select): high, medium, low
- **Category** (select): Technical Objectives, Knowledge Sharing, Innovation & Impact
- **Category Icon** (select): 🎯, ✍️, 🚀
- **Category Color** (select): primary, accent, secondary
- **Display Order** (number): 表示順序
- **Active** (checkbox): アクティブかどうか

## 使用方法

### データの更新

Notionでデータベースのレコードを編集するだけで、Webサイトに反映されます。

### 新しいフォーカスエリアの追加

1. Current Focus Areas データベースに新しいページを作成
2. 必要なプロパティを設定
3. `Active` チェックボックスをオンにする
4. `Display Order` で表示順序を設定

### 新しい目標の追加

1. Goals 2025 データベースに新しいページを作成
2. 必要なプロパティを設定
3. `Active` チェックボックスをオンにする
4. `Display Order` で表示順序を設定

## API関数

`src/lib/notion-content.ts` に以下の関数が含まれています：

- `getCurrentFocusAreas()`: アクティブなフォーカスエリアを取得
- `getGoals2025()`: アクティブな目標を取得
- `getGoals2025ByCategory()`: カテゴリ別に整理された目標を取得

## コンポーネント

- `src/components/CurrentFocusSection.tsx`: Current Focus Areasの表示
- `src/components/Goals2025Section.tsx`: Goals 2025の表示

## フォールバック

Notion APIが利用できない場合、コンポーネントは空のデータまたはエラーメッセージを表示します。

## トラブルシューティング

### データが表示されない場合

1. `NOTION_TOKEN` が正しく設定されているか確認
2. データベースの `Active` フィールドがオンになっているか確認
3. ブラウザのコンソールでエラーメッセージを確認

### 新しい技術タグを追加したい場合

1. Current Focus Areas データベースを開く
2. Technologies プロパティの設定を編集
3. 新しいオプションを追加

## セキュリティ

- Notion Tokenは環境変数として安全に管理されています
- データベースは読み取り専用でアクセスされます
- 公開されるデータのみがフェッチされます
