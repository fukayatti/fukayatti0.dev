'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, Home, Mail, User } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { useTheme } from 'next-themes';
import { Orbitron } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import ThemeSwitcher from '../ui/ThemeSwitcher';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/career', label: 'Career', icon: Award },
  { href: '/works', label: 'Works', icon: Briefcase },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const NavigationHeader = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [randomValue, setRandomValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setRandomValue(Math.random());
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? theme === 'dark' : true; // Default to dark for SSR

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${orbitron.className}`}
    >
      <nav className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex justify-between items-center h-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-lg p-2">
              <Link href="/">
                <div
                  className={`p-[2px] rounded-full ${
                    randomValue < 0.33
                      ? 'bg-gradient-to-tr from-green-400 via-green-500 to-green-600'
                      : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-gray-900">
                    <Image
                      src="/profile.png"
                      alt="fukayatti0のプロフィール画像"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      sizes="40px"
                      quality={75}
                    />
                  </div>
                </div>
              </Link>
              <Link href="/" className="text-foreground font-bold text-lg">
                fukayatti0.dev
              </Link>
            </div>

            <div className="flex items-center gap-6 backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-lg p-2">
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg px-2 py-1"
                  >
                    <Icon className="mr-1 w-5 h-5" aria-hidden="true" />
                    {label}
                  </Link>
                ))}
              </div>
              <ThemeSwitcher />
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="outline-none mobile-menu-button focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg p-2"
                  aria-label="メニューを開く"
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  <svg
                    className="w-6 h-6 text-foreground/80 hover:text-primary transition-colors duration-150"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`md:hidden absolute top-16 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-md shadow-md p-4 ${
              isOpen ? 'block' : 'hidden'
            }`}
            ref={menuRef}
            role="menu"
            aria-labelledby="mobile-menu-button"
          >
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="py-2 px-4 text-base text-foreground hover:text-primary flex items-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="mr-1 w-4 h-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default NavigationHeader;
