import { defaultMetadata } from '../../lib/metadata-common';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fukayatti0.dev';

export const metadata = {
  ...defaultMetadata,
  title: 'Contact',
  description: "Let's build something amazing together",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Contact',
    description: "Let's build something amazing together",
    url: `${baseUrl}/contact`,
    images: [`${baseUrl}/contact/opengraph-image.png`],
  },
  twitter: {
    ...defaultMetadata.twitter,
    card: 'summary_large_image',
    title: 'Contact',
    description: "Let's build something amazing together",
    images: [`${baseUrl}/contact/opengraph-image.png`],
  },
};
