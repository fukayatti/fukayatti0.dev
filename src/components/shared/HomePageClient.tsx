import React from 'react';

import FooterSection from '@/components/layout/FooterSection';
import AboutSection from '@/components/sections/AboutSection';
import CareerSection from '@/components/sections/CareerSection';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';

interface HomePageClientProps {
  focusAreas: any[];
  goalCategories: any[];
}

const HomePageClient: React.FC<HomePageClientProps> = () => {
  return (
    <div className="relative bg-black">
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CareerSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default HomePageClient;
