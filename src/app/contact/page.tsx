import type { Metadata } from 'next';
import { defaultMetadata } from '../../lib/metadata-common';
import ContactPageClient from './contact-page-client';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fukayatti0.dev';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Contact',
  description: "Let's build something amazing together",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Contact',
    description: "Let's build something amazing together",
    url: `${baseUrl}/contact`,
    images: [
      `${baseUrl}/api/og?title=Contact&subtitle=お問い合わせ&description=新しいプロジェクト、コラボレーション、技術的な相談など、お気軽にお声がけください`,
    ],
  },
  twitter: {
    ...defaultMetadata.twitter,
    card: 'summary_large_image',
    title: 'Contact',
    description: "Let's build something amazing together",
    images: [
      `${baseUrl}/api/og?title=Contact&subtitle=お問い合わせ&description=新しいプロジェクト、コラボレーション、技術的な相談など、お気軽にお声がけください`,
    ],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
