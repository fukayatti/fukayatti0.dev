import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '経歴・受賞歴 | Portfolio',
  description:
    'NotionCMSで管理された経歴・受賞歴ページ。実績や受賞歴を確認できます。',
  keywords: ['経歴', '受賞歴', 'キャリア', 'Notion CMS', 'ポートフォリオ'],
  openGraph: {
    title: '経歴・受賞歴 | Portfolio',
    description: 'NotionCMSで管理された経歴・受賞歴ページ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '経歴・受賞歴 | Portfolio',
    description: 'NotionCMSで管理された経歴・受賞歴ページ',
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
