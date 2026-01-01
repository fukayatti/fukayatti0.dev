import React from 'react';

import FooterContent from '@/components/layout/FooterContent';
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
        <FooterContent />
      </main>
    </div>
  );
};

export default HomePageClient;
