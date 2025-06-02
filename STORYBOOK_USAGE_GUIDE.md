# Storybook 実用ガイド

## 🎯 作成したコンポーネントとStory

### 1. Card コンポーネント

**場所**: `src/components/Card.tsx`  
**Story**: `src/components/Card.stories.tsx`

**特徴**:

- 再利用可能なカードレイアウト
- 4つのバリアント (default, glass, bordered, elevated)
- 3つのサイズ (small, medium, large)
- ホバー効果とアニメーション対応
- 完全なTypeScript型サポート

**Storybookでの活用**:

```bash
# Storybookを起動
pnpm storybook

# Components > Card を選択
# Controls タブでプロパティをリアルタイム変更
# - title: カードのタイトル
# - description: 説明文
# - variant: 外観スタイル
# - size: サイズ
# - hoverable: ホバー効果
# - animated: アニメーション
```

### 2. ProgressBar コンポーネント

**場所**: `src/components/ProgressBar.tsx`  
**Story**: `src/components/ProgressBar.stories.tsx`

**特徴**:

- アニメーション付きプログレスバー
- 5つのカラーバリアント
- ストライプ効果対応
- 動的な値更新
- アクセシビリティ対応

**Storybookでの活用**:

```bash
# Components > ProgressBar を選択
# Controls タブで以下を調整:
# - value: 0-100の進捗値をスライダーで調整
# - variant: 色を選択
# - striped: ストライプパターンON/OFF
# - animated: アニメーション効果
```

### 3. Goals2025ProgressCard コンポーネント

**場所**: `src/components/Goals2025ProgressCard.tsx`  
**Story**: `src/components/Goals2025ProgressCard.stories.tsx`

**特徴**:

- 目標管理システム用カード
- 統計データの可視化
- モックデータでの表示テスト
- 様々なデータパターン対応

**Storybookでの活用**:

```bash
# Components > Goals2025ProgressCard を選択
# 以下のストーリーでテスト:
# - Default: 標準データ
# - HighProgress: 高進捗データ
# - EmptyData: 空データ
# - ManyGoals: 大量データ
```

### 4. ComponentShowcase デモ

**場所**: `src/stories/ComponentShowcase.stories.tsx`

**特徴**:

- 複数コンポーネントの組み合わせ例
- インタラクティブなデモ
- 実際のアプリケーション風UI
- プロジェクト管理ダッシュボード

## 🛠️ Storybookの実用的な使い方

### デザインシステムの構築

1. **一貫性の確保**: 全コンポーネントを同じ環境で確認
2. **プロパティの検証**: Controlsタブでリアルタイム調整
3. **レスポンシブ確認**: Viewportタブでデバイス切り替え
4. **アクセシビリティ**: a11yアドオンでアクセシビリティチェック

### 開発ワークフロー

```bash
# 1. コンポーネント開発
# src/components/NewComponent.tsx を作成

# 2. Storyファイル作成
# src/components/NewComponent.stories.tsx を作成

# 3. Storybookで確認
pnpm storybook

# 4. 様々なバリエーションをテスト
# - 異なるプロパティ値
# - エラーケース
# - エッジケース
```

### チーム協働

1. **デザイナーとの連携**: ビジュアルレビューと仕様確認
2. **QAとの連携**: 各ストーリーでのテストケース共有
3. **ドキュメント化**: autodocsでプロパティ仕様の自動生成

### テスト活用

```typescript
// Story を使ったテスト例
import { composeStories } from '@storybook/react';
import * as CardStories from './Card.stories';

const { Default, Interactive } = composeStories(CardStories);

test('Default Card renders correctly', () => {
  render(<Default />);
  // テストロジック
});
```

## 📊 作成したストーリーの種類

### 基本ストーリー

- **Default**: 標準的な使用例
- **Variants**: 各バリアントの比較
- **Sizes**: サイズ比較

### インタラクティブストーリー

- **Interactive**: クリック可能な要素
- **AnimatedProgress**: 動的データ更新
- **Dashboard**: 複合コンポーネント例

### テーマ・アクセシビリティ

- **LightTheme**: ライトテーマでの表示
- **HighContrast**: 高コントラストモード
- **ReducedMotion**: アニメーション無効化

### エッジケース

- **EmptyData**: 空データでの動作
- **EdgeCases**: 境界値での動作
- **ManyGoals**: 大量データでのパフォーマンス

## 🚀 次のステップ

### 1. より多くのコンポーネントを追加

- NavigationHeader
- HeroSection
- TechIdentitySection

### 2. アドオンの活用

```bash
# インストール例
pnpm add -D @storybook/addon-a11y
pnpm add -D @storybook/addon-viewport
pnpm add -D @storybook/addon-backgrounds
```

### 3. ビジュアルリグレッションテスト

```bash
# Chromatic でのビジュアルテスト
pnpm add -D chromatic
npx chromatic --project-token=<token>
```

### 4. 本番デプロイ

```bash
# 静的ビルド
pnpm build-storybook

# GitHub Pages や Netlify へデプロイ
```

## 📈 メリット

1. **開発効率向上**: 独立した環境でのコンポーネント開発
2. **品質向上**: 様々なケースでのテスト
3. **コミュニケーション改善**: ビジュアルな仕様共有
4. **保守性向上**: ドキュメント化されたコンポーネント
5. **再利用促進**: 一覧できるコンポーネントライブラリ

Storybookを活用することで、より堅牢で再利用可能なコンポーネントを効率的に開発できます！
