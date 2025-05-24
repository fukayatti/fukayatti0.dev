import CurrentFocusSection from './CurrentFocusSection';
import Goals2025Section from './Goals2025Section';
import type { CurrentFocusArea } from '@/lib/notion-content';
import React from 'react';

interface HomePageClientProps {
  focusAreas: CurrentFocusArea[];
  goalCategories: any[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({
  focusAreas,
  goalCategories,
}) => {
  return (
    <main className="space-y-12">
      <CurrentFocusSection focusAreas={focusAreas} />
      <Goals2025Section goalCategories={goalCategories} />
    </main>
  );
};

export default HomePageClient;
