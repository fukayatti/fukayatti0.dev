# フェッチ頻度の推奨設定

## 本番環境での推奨構成

### Option A: ISRページを採用 ⭐️ 推奨

```
/career → /career-static にリダイレクト
export const revalidate = 600; // 10分間隔
```

**メリット:**

- 高速表示（静的生成）
- レート制限に強い
- Vercel等でも安定動作
- SEO最適化

### Option B: 両方のページを提供

```
/career → 手動リフレッシュ機能付き（開発者向け）
/career-static → 一般ユーザー向け（高速）
```

## 具体的なフェッチ頻度

### ISR版 (`/career-static`)

- **Notion API呼び出し**: 10分に1回まで
- **ユーザーアクセス**: 即座表示（キャッシュから）
- **更新反映**: 最大10分遅延

### API版 (`/career`)

- **Notion API呼び出し**: 5分に1回まで
- **ユーザーアクセス**: API経由でフェッチ
- **手動リフレッシュ**: `/api/awards?clearCache=true`

## 環境別推奨設定

### 開発環境

```typescript
export const revalidate = 60; // 1分間隔（テスト用）
const CACHE_DURATION = 30 * 1000; // 30秒
```

### 本番環境

```typescript
export const revalidate = 600; // 10分間隔
const CACHE_DURATION = 15 * 60 * 1000; // 15分
```

## Notion APIレート制限対策

### 現在の制限

- **3リクエスト/秒**
- **過度なアクセスでエラーリスク**

### 対策

1. **ISR使用** → APIコール回数を最小化
2. **キャッシュ延長** → 15-30分に設定
3. **エラーハンドリング** → フォールバックデータ提供

## 監視とメンテナンス

### ログ確認ポイント

```
- "Fetching awards from Notion database" → 実際のAPI呼び出し
- "Returning cached awards" → キャッシュからの返却
- "Cache cleared via API request" → 手動リフレッシュ
```

### パフォーマンス指標

- **TTFB**: < 200ms (ISR)
- **API呼び出し頻度**: 1時間あたり6回以下
- **エラー率**: < 1%
