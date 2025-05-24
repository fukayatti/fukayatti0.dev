# Notion CMS 設定手順

このドキュメントでは、Notion APIを使用して経歴ページのCMSを設定する手順を説明します。

## 1. Notion Integration の作成

1. [Notion Developers](https://www.notion.so/my-integrations) にアクセス
2. 「New integration」をクリック
3. Integration の名前を入力（例：Portfolio CMS）
4. Associated workspaceを選択
5. 「Submit」をクリック
6. 「Internal Integration Token」をコピーして保存

## 2. データベースとIntegrationの共有

1. Notionで受賞歴データベースのページを開く
2. 右上の「Share」ボタンをクリック
3. 「Invite」で作成したIntegrationを選択
4. 「Invite」をクリック

## 3. 環境変数の設定

`.env.local` ファイルを編集して以下の値を設定：

```env
# Notion API Configuration
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=1fd3dbb2f059814290a3c3def00ad5f0
```

### NOTION_TOKEN

- 手順1で取得したInternal Integration Token
- `secret_` で始まる長い文字列

### NOTION_DATABASE_ID

- 既に設定済み：`1fd3dbb2f059814290a3c3def00ad5f0`
- 変更する場合は、NotionデータベースのURLから取得可能

## 4. データベースの構造

Notionデータベースには以下のプロパティが必要です：

| プロパティ名 | タイプ        | 説明               |
| ------------ | ------------- | ------------------ |
| 受賞名       | Title         | 受賞の名前（必須） |
| 受賞日       | Date          | 受賞した日付       |
| 主催者       | Rich text     | 主催団体名         |
| 詳細         | Rich text     | 詳細情報のURL      |
| 画像         | Files & media | 受賞時の画像       |

## 5. 動作確認

1. 開発サーバーを起動：`pnpm dev`
2. `http://localhost:3000/career` にアクセス
3. Notionデータベースの内容が表示されることを確認

## トラブルシューティング

### エラー：Unauthorized

- NOTION_TOKENが正しく設定されているか確認
- Integrationがデータベースと共有されているか確認

### エラー：Object not found

- NOTION_DATABASE_IDが正しく設定されているか確認
- データベースのURLからIDを再確認

### データが表示されない

- Notionデータベースにデータが存在するか確認
- プロパティ名が正しく設定されているか確認（日本語文字に注意）

## キャッシュについて

- データは5分間キャッシュされます
- 即座に更新を反映したい場合は、サーバーを再起動してください
- 本番環境では `revalidate = 0` によりキャッシュが無効化されます
