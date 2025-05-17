import { Metadata } from 'next';
import defaultMetadata from '../metadata';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

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

export default metadata; 