import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fukayatti0.dev';

// メタデータテンプレート生成関数のオプション型
interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSubtitle?: string;
  keywords?: string[];
}

// メタデータテンプレート生成関数
export function createPageMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    path = '',
    ogTitle = title,
    ogDescription = description,
    ogSubtitle,
    keywords = [],
  } = options;

  const fullUrl = `${baseUrl}${path}`;

  // OG画像URLの生成
  const ogImageParams = new URLSearchParams({
    title: ogTitle,
    description: ogDescription,
    ...(ogSubtitle && { subtitle: ogSubtitle }),
  });
  const ogImageUrl = `${baseUrl}/api/og?${ogImageParams.toString()}`;

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: fullUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      type: 'website',
      locale: 'ja_JP',
      siteName: 'fukayatti0 Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      creator: '@fukayatti0',
      images: [
        {
          url: ogImageUrl,
          alt: ogTitle,
        },
      ],
    },
    ...(keywords.length > 0 && { keywords }),
  };
}

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
    locale: 'ja_JP',
    siteName: 'fukayatti0 Portfolio',
    title: 'fukayatti0 - Tech Explorer & Engineer',
    description:
      '16-year-old tech explorer from National Institute of Technology, Ibaraki College passionate about code, innovation, and open source.',
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'fukayatti0 Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fukayatti0 - Tech Explorer & Engineer',
    description:
      '16-year-old tech explorer from National Institute of Technology, Ibaraki College passionate about code, innovation, and open source.',
    creator: '@fukayatti0',
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        alt: 'fukayatti0 Portfolio',
      },
    ],
  },
  manifest: '/manifest.json',
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
