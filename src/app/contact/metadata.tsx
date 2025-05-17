import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

// 基本のメタデータを定義
const defaultMetadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ポートフォリオ',
    template: '%s | ポートフォリオ',
  },
  description: 'クリエイティブ開発者のためのウェブサイト',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ポートフォリオ',
    title: 'ポートフォリオ',
    description: 'クリエイティブ開発者のためのウェブサイト',
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ポートフォリオ',
    description: 'クリエイティブ開発者のためのウェブサイト',
  },
};

// お問い合わせページ用のメタデータ
export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'お問い合わせ',
  description: 'ご質問やお仕事のご依頼はこちらからお気軽にどうぞ',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'お問い合わせ',
    description: 'ご質問やお仕事のご依頼はこちらからお気軽にどうぞ',
    url: `${baseUrl}/contact`,
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: 'お問い合わせ',
    description: 'ご質問やお仕事のご依頼はこちらからお気軽にどうぞ',
  },
}; 