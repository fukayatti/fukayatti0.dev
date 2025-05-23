'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import ThemeSwitcher from './ThemeSwitcher';
import { Home, User, Briefcase, Mail } from 'lucide-react'; // Import icons

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

const navLinks = [
  { href: '/', label: 'Home', icon: Home }, // Add icon
  { href: '/about', label: 'About', icon: User }, // Add icon
  { href: '/works', label: 'Works', icon: Briefcase }, // Add icon
  { href: '/contact', label: 'Contact', icon: Mail }, // Add icon
];

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [randomValue, setRandomValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setRandomValue(Math.random());
  }, []);

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
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </Link>
              <Link href="/" className="text-gray-800 dark:text-white">
                fukayatti0.dev
              </Link>
            </div>

            <div className="flex items-center gap-6 backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-lg p-2">
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map(
                  (
                    { href, label, icon: Icon } // Use Icon
                  ) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center" // Added flex
                    >
                      <Icon className="mr-1 w-5 h-5" /> {/* Render Icon */}
                      {label}
                    </Link>
                  )
                )}
              </div>
              <ThemeSwitcher />
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="outline-none mobile-menu-button"
                >
                  <svg
                    className="w-6 h-6 text-gray-500 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-16 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-md shadow-md p-4 ${
              isOpen ? 'block' : 'hidden'
            }`}
            ref={menuRef}
          >
            {navLinks.map(
              (
                { href, label, icon: Icon } // Use Icon
              ) => (
                <Link
                  key={href}
                  href={href}
                  className="py-2 px-4 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center" // Added flex
                >
                  <Icon className="mr-1 w-4 h-4" /> {/* Render Icon */}
                  {label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
