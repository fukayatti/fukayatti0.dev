'use client';

import dynamic from 'next/dynamic';

// 遅延読み込み用のローディングコンポーネント
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// 重いコンポーネントを遅延読み込みで最適化
export const LazyTechUniverseSection = dynamic(
  () => import('./TechUniverseSection'),
  {
    loading: LoadingSpinner,
    ssr: true,
  }
);

export const LazyCurrentFocusSection = dynamic(
  () => import('./CurrentFocusSection'),
  {
    loading: LoadingSpinner,
    ssr: true,
  }
);

export const LazyGoals2025Section = dynamic(
  () => import('./Goals2025Section'),
  {
    loading: LoadingSpinner,
    ssr: true,
  }
);

// 画面下部のコンポーネントは遅延読み込み
export const LazyFooterSection = dynamic(() => import('./FooterSection'), {
  loading: LoadingSpinner,
  ssr: false, // フッターはSSRしない
});
