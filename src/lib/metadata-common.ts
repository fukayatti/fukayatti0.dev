import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fukayatti0.dev';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'fukayatti0 - Tech Explorer & Engineer',
    template: '%s | fukayatti0',
  },
  description:
    '16-year-old tech explorer from National Institute of Technology, Ibaraki College passionate about code, innovation, and open source.',
  keywords: [
    'fukayatti0',
    'Developer',
    'Engineer',
    'Frontend',
    'Electronics',
    'Python',
    'TypeScript',
    'React',
    'Next.js',
    'Rust',
    'WebAssembly',
    'Computer Vision',
    'Machine Learning',
    'Open Source',
  ],
  authors: [{ name: 'fukayatti0' }],
  creator: 'fukayatti0',
  publisher: 'fukayatti0',
  applicationName: 'fukayatti0 Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'fukayatti0 Portfolio',
    title: 'fukayatti0 - Tech Explorer & Engineer',
    description:
      '16-year-old tech explorer from National Institute of Technology, Ibaraki College passionate about code, innovation, and open source.',
    url: baseUrl,
    images: [`${baseUrl}/opengraph-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fukayatti0 - Tech Explorer & Engineer',
    description:
      '16-year-old tech explorer from National Institute of Technology, Ibaraki College passionate about code, innovation, and open source.',
    creator: '@fukayatti0',
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
