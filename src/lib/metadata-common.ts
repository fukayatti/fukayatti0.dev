import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ポートフォリオ',
    template: '%s | ポートフォリオ',
  },
  description: 'クリエイティブ開発者のためのウェブサイト',
  keywords: [
    'ポートフォリオ',
    'デベロッパー',
    'エンジニア',
    'デザイン',
    'WebGL',
    'React',
    'Next.js',
  ],
  authors: [{ name: 'あなたの名前' }],
  creator: 'あなたの名前',
  publisher: 'あなたの名前',
  applicationName: 'ポートフォリオ',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ポートフォリオ',
    title: 'ポートフォリオ',
    description: 'クリエイティブ開発者のためのウェブサイト',
    url: baseUrl,
    images: [`${baseUrl}/opengraph-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ポートフォリオ',
    description: 'クリエイティブ開発者のためのウェブサイト',
    creator: '@あなたのTwitterアカウント',
    images: [`${baseUrl}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};
