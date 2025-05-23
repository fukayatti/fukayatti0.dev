import { defaultMetadata } from '../../lib/metadata-common';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export const metadata = {
  ...defaultMetadata,
  title: 'お問い合わせ',
  description: 'ご質問やお仕事のご依頼はこちらからお気軽にどうぞ',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'お問い合わせ',
    description: 'ご質問やお仕事のご依頼はこちらからお気軽にどうぞ',
    url: `${baseUrl}/contact`,
    images: [`${baseUrl}/opengraph-image.png`],
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: 'お問い合わせ',
    description: 'ご質問やお仕事のご依頼はこちらからお気軽にどうぞ',
    images: [`${baseUrl}/opengraph-image.png`],
  },
};
