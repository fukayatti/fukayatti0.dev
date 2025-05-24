import CurrentFocusSection from './CurrentFocusSection';
import Goals2025Section from './Goals2025Section';
import HeaderSection from '@/components/HeaderSection';
import TechIdentitySection from '@/components/TechIdentitySection';
import TechUniverseSection from '@/components/TechUniverseSection';
import LetsConnectSection from '@/components/LetsConnectSection';
import FooterSection from '@/components/FooterSection';
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
      <HeaderSection />
      <TechIdentitySection />
      <TechUniverseSection />
      <LetsConnectSection />
      <CurrentFocusSection focusAreas={focusAreas} />
      <Goals2025Section goalCategories={goalCategories} />
      <FooterSection />
    </main>
  );
};

export default HomePageClient;
