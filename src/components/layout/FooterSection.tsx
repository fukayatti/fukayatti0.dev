import BackToTopButton from '../ui/BackToTopButton';
import FooterContent from './FooterContent';

export default function FooterSection() {
  return (
    <footer className="relative">
      {/* Gradient separator */}
      <div className="absolute left-1/2 -top-1 w-2/3 h-1 -translate-x-1/2 bg-gradient-to-r rounded-full blur-sm from-primary-400 via-accent-400 to-purple-500 opacity-60" />

      <div className="pt-16 pb-8 space-y-8">
        <FooterContent />

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-foreground/70 font-semibold tracking-wide">
              &copy; {new Date().getFullYear()} fukayatti0. All rights reserved.
            </span>
          </div>

          {/* Built With */}
          <div className="flex items-center gap-3 text-foreground/70">
            <span>Built with</span>
            <div className="flex items-center gap-2">
              <span className="text-red-400">♥</span>
              <span>Next.js, React & TypeScript</span>
            </div>
          </div>

          {/* Back to Top */}
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
