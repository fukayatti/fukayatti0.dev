import React from 'react';

import FooterSection from '@/components/layout/FooterSection';
import CurrentFocusSection from '@/components/sections/CurrentFocusSection';
import Goals2025Section from '@/components/sections/Goals2025Section';
import HeroSection from '@/components/sections/HeroSection';
import LetsConnectSection from '@/components/sections/LetsConnectSection';
import TechIdentitySection from '@/components/sections/TechIdentitySection';
import TechUniverseSection from '@/components/sections/TechUniverseSection';
import type { CurrentFocusArea } from '@/lib/notion-content';

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
