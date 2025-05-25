import { createPageMetadata } from '@/lib/metadata-common';

// ページ固有のメタデータ設定
const PAGE_TITLE = 'About';
const PAGE_DESCRIPTION =
  'テクノロジーへの情熱と創造性を持つ16歳の開発者について';

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/about',
  ogSubtitle: '私について',
  ogDescription:
    'Next.js、React、TypeScriptを使った開発経験とプロジェクトについて詳しく紹介',
  keywords: ['About', 'Developer', 'Profile', 'Experience', 'Skills'],
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{PAGE_TITLE}</h1>
      <p className="text-lg text-muted-foreground">{PAGE_DESCRIPTION}</p>
      {/* ページのコンテンツをここに追加 */}
    </div>
  );
}
