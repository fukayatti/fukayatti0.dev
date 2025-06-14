'use client';

import {
  SiArduino,
  SiCircuitverse,
  SiCodeproject,
  SiInternetcomputer,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useEffect, useRef, useState } from 'react';

import { useTheme } from 'next-themes';

import '@/app/code-block-theme.css';

export default function TechIdentitySection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Enhanced state management
  const [activeSection, setActiveSection] = useState<'frontEnd' | 'electronic'>(
    'frontEnd'
  );
  const [isScrolling, setIsScrolling] = useState(false);

  // Refs for scroll snap functionality
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const frontEndRef = useRef<HTMLLIElement>(null);
  const electronicRef = useRef<HTMLLIElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark

  // Enhanced IntersectionObserver setup
  useEffect(() => {
    const container = scrollContainerRef.current;
    const frontEndEl = frontEndRef.current;
    const electronicEl = electronicRef.current;

    if (!container || !frontEndEl || !electronicEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return; // Prevent state changes during programmatic scrolling

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            if (entry.target === frontEndEl) {
              setActiveSection('frontEnd');
            } else if (entry.target === electronicEl) {
              setActiveSection('electronic');
            }
          }
        });
      },
      {
        root: container,
        threshold: [0, 0.3, 0.6, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    observer.observe(frontEndEl);
    observer.observe(electronicEl);

    return () => observer.disconnect();
  }, [isScrolling]);

  // Navigation function for section switching
  const navigateToSection = (section: 'frontEnd' | 'electronic') => {
    if (section === activeSection) return;

    setIsScrolling(true);
    setActiveSection(section);

    const targetRef = section === 'frontEnd' ? frontEndRef : electronicRef;
    const container = scrollContainerRef.current;

    if (targetRef.current && container) {
      const targetElement = targetRef.current;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const scrollOffset =
        targetRect.top -
        containerRect.top +
        container.scrollTop -
        containerRect.height / 2 +
        targetRect.height / 2;

      container.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });

      // Reset scrolling flag after animation
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  const skills = {
    frontEnd: [
      { name: 'React', level: 90, icon: SiReact },
      { name: 'Next.js', level: 85, icon: SiNextdotjs },
      { name: 'TypeScript', level: 80, icon: SiTypescript },
      { name: 'TailwindCSS', level: 95, icon: SiTailwindcss },
    ],
    electronic: [
      { name: 'Circuit Design', level: 75, icon: SiCircuitverse },
      { name: 'Arduino/ESP32', level: 80, icon: SiArduino },
      { name: 'PCB Design', level: 70, icon: SiCodeproject },
      { name: 'IoT Systems', level: 65, icon: SiInternetcomputer },
    ],
  };

  return (
    <section className="mb-20">
      {/* Enhanced header with animated underline */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-display mb-4">
          <span className="gradient-text">Tech Identity</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto text-foreground/70">
          Bridging the gap between digital interfaces and physical electronics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side: Enhanced interactive navigation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab navigation */}
          <div className="flex gap-2 mb-6">
            {(['frontEnd', 'electronic'] as const).map((section) => (
              <button
                key={section}
                onClick={() => navigateToSection(section)}
                className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex-1
                  ${
                    activeSection === section
                      ? 'text-white dark:text-white text-gray-900 shadow-glow'
                      : 'text-foreground/80 hover:text-foreground'
                  }
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {section === 'frontEnd' ? (
                    <>
                      <SiReact size={16} />
                      Frontend Engineer
                    </>
                  ) : (
                    <>
                      <SiArduino size={16} />
                      Electronic Engineer
                    </>
                  )}
                </span>
                {activeSection === section && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content container with glass morphism */}
          <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden">
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Section title and description */}
                  <div>
                    <h3 className="text-headline mb-3 text-primary-400 dark:text-primary-300">
                      {activeSection === 'frontEnd'
                        ? 'Frontend Engineering'
                        : 'Electronic Engineering'}
                    </h3>
                    <p className="text-body text-foreground/70">
                      {activeSection === 'frontEnd'
                        ? 'Crafting pixel-perfect, responsive web interfaces with modern technologies and design principles.'
                        : 'Designing and prototyping electronic circuits that bridge the physical and digital worlds.'}
                    </p>
                  </div>

                  {/* Skills with animated progress bars */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">
                      Core Skills
                    </h4>
                    {skills[activeSection].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 font-medium text-foreground">
                            <skill.icon
                              size={18}
                              className="text-primary-400"
                            />
                            {skill.name}
                          </span>
                          <span className="text-sm text-foreground/60">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              delay: index * 0.1 + 0.2,
                              duration: 0.8,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Passion points */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">
                      Current Focus
                    </h4>
                    <ul className="space-y-2">
                      {(activeSection === 'frontEnd'
                        ? [
                            'Building scalable React applications with Next.js',
                            'Implementing modern design systems',
                            'Optimizing web performance and accessibility',
                            'Contributing to open-source projects',
                          ]
                        : [
                            'IoT device development and integration',
                            'PCB design and prototyping',
                            'Embedded systems programming',
                            'Hardware-software integration projects',
                          ]
                      ).map((point, index) => (
                        <motion.li
                          key={point}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.05 + 0.3,
                            duration: 0.3,
                          }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-primary-400 mt-1">▹</span>
                          <span className="text-sm text-foreground">
                            {point}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Right side: Enhanced code preview with terminal styling */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-mono text-foreground">
                  {activeSection === 'frontEnd'
                    ? 'profile.tsx'
                    : 'embedded.ino'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-foreground/60">Live</span>
              </div>
            </div>

            {/* Code content */}
            <div className="p-6 font-mono text-sm">
              {mounted && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SyntaxHighlighter
                      language={
                        activeSection === 'frontEnd' ? 'typescript' : 'cpp'
                      }
                      style={atomDark}
                      customStyle={{
                        backgroundColor: '#0d1117',
                        border: 'none',
                        borderRadius: '0',
                        margin: 0,
                        padding: 0,
                        fontSize: '13px',
                        lineHeight: '1.6',
                      }}
                      showLineNumbers={true}
                      wrapLines={true}
                      lineNumberStyle={{
                        color: '#6e7681',
                        fontSize: '12px',
                        paddingRight: '16px',
                        backgroundColor: '#0d1117',
                        borderRight: '1px solid #30363d',
                        minWidth: '40px',
                        textAlign: 'right',
                      }}
                    >
                      {activeSection === 'frontEnd'
                        ? `interface Developer {
  name: string;
  age: number;
  location: string;
  education: string;
  expertise: TechStack;
}

type TechStack = {
  frontend: string[];
  languages: string[];
  tools: string[];
}

const fukayatti: Developer = {
  name: "fukayatti0",
  age: 16,
  location: "Japan",
  education: "NITIC",
  expertise: {
    frontend: [
      "React", "Next.js", 
      "TailwindCSS", "Framer Motion"
    ],
    languages: [
      "TypeScript", "JavaScript"
    ],
    tools: [
      "Git", "VS Code", "Figma"
    ]
  }
};

export default fukayatti;`
                        : `#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

struct Engineer {
  String name = "fukayatti0";
  int age = 16;
  String location = "Japan";
  String education = "NITIC";
  String specialties[4] = {
    "Circuit Design",
    "IoT Development", 
    "Embedded Systems",
    "PCB Prototyping"
  };
};

Engineer fukayatti;
WebServer server(80);

void setup() {
  Serial.begin(115200);
  
  // Initialize hardware
  initializePins();
  connectToWiFi();
  
  // Setup web server endpoints
  server.on("/profile", handleProfile);
  server.on("/skills", handleSkills);
  
  server.begin();
  Serial.println("IoT Profile Server Started!");
}

void loop() {
  server.handleClient();
  updateSensorData();
  delay(100);
}`}
                    </SyntaxHighlighter>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Stats footer */}
            <div className="px-6 py-4 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-foreground/70">
                    <span className="w-2 h-2 rounded-full bg-primary-400" />
                    {activeSection === 'frontEnd' ? '3+ years' : '2+ years'}
                  </span>
                  <span className="flex items-center gap-2 text-foreground/70">
                    <span className="w-2 h-2 rounded-full bg-accent-400" />
                    {activeSection === 'frontEnd'
                      ? '25+ projects'
                      : '15+ circuits'}
                  </span>
                </div>
                <span className="text-foreground/70">
                  Lines: {activeSection === 'frontEnd' ? '1.2K+' : '850+'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
