'use client';

import { ChevronUp } from 'lucide-react';

export default function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/10 text-foreground/70 hover:text-primary transition-all duration-200 hover:scale-105 group"
    >
      <span className="text-sm">Back to top</span>
      <ChevronUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-200" />
    </button>
  );
}
