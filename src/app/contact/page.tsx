import { createPageMetadata } from '@/lib/metadata-common';

import ContactPageClient from './contact-page-client';

// ページ固有のメタデータ設定
const PAGE_TITLE = 'Contact';
const PAGE_DESCRIPTION = "Let's build something amazing together";

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/contact',
  ogSubtitle: 'お問い合わせ',
  ogDescription:
    '新しいプロジェクト、コラボレーション、技術的な相談など、お気軽にお声がけください',
});

export default function ContactPage() {
  return <ContactPageClient />;
}
