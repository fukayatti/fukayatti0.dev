import HomePageClient from '@/components/shared/HomePageClient';
import { createPageMetadata } from '@/lib/metadata-common';

// ISRで10分間隔で再生成
export const revalidate = 600; // 10分

// Page metadata
const PAGE_TITLE = 'Fukayatti - Full-Stack Developer';
const PAGE_DESCRIPTION =
  'Full-stack developer specializing in React, Next.js, and TypeScript. Creating modern, scalable web applications with exceptional user experiences.';

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/',
  ogSubtitle: 'Full-Stack Developer',
  ogDescription:
    'Building modern web applications with React, Next.js, and TypeScript.',
});

export default async function HomePage() {
  return <HomePageClient focusAreas={[]} goalCategories={[]} />;
}
