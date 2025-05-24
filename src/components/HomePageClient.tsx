import CurrentFocusSection from './CurrentFocusSection';
import Goals2025Section from './Goals2025Section';
import HeroSection from '@/components/HeroSection';
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
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-7xl">
      <main className="space-y-12">
        <HeroSection />
        <TechIdentitySection />
        <TechUniverseSection />
        <LetsConnectSection />
        <CurrentFocusSection focusAreas={focusAreas} />
        <Goals2025Section goalCategories={goalCategories} />
        <FooterSection />
      </main>
    </div>
  );
};

export default HomePageClient;
