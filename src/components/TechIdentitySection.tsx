import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';
import { useState } from 'react';

export default function TechIdentitySection() {
  const [activeTab, setActiveTab] = useState<'frontEnd' | 'electronic'>(
    'frontEnd'
  );
  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="inline-block relative text-gray-600 dark:text-white">
          Tech Identity
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
        </span>
      </h2>
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('frontEnd')}
          className={`px-4 py-2 text-lg font-medium transition border-b-2 ${
            activeTab === 'frontEnd'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-gray-400'
          }`}
        >
          As A Front End Engineer
        </button>
        <button
          onClick={() => setActiveTab('electronic')}
          className={`px-4 py-2 text-lg font-medium transition border-b-2 ${
            activeTab === 'electronic'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-gray-400'
          }`}
        >
          As A Electronic Engineer
        </button>
      </div>
      <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {activeTab === 'frontEnd' && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                  Who I Am - Front End Engineer
                </h3>
                <p className="text-gray-300 mb-6">
                  I specialize in building interactive and responsive web
                  interfaces using the latest frontend technologies. I have a
                  strong passion for designing seamless user experiences and
                  clean, maintainable code.
                </p>
                <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                  Technical Passions
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Crafting pixel-perfect UIs with React, Next.js, and
                      TailwindCSS
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>Optimizing web performance and accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Implementing modern design systems and responsive layouts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>Contributing to open-source frontend projects</span>
                  </li>
                </ul>
              </>
            )}
            {activeTab === 'electronic' && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                  Who I Am - Electronic Engineer
                </h3>
                <p className="text-gray-300 mb-6">
                  I have a deep-rooted passion for electronics and circuit
                  design. My background in electrical engineering drives my
                  innovation in developing hardware solutions that seamlessly
                  integrate with software systems.
                </p>
                <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                  Technical Passions
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Designing and prototyping electronic circuits and PCBs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Working with microcontrollers and embedded systems
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>Integrating hardware with IoT solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Exploring the intersection of electronics and software
                      innovation
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="font-mono text-sm rounded-lg bg-gray-900/80 p-4 border border-gray-700">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-300 text-xs ml-2">
                fukayatti_profile.tsx
              </span>
            </div>
            <div className="text-gray-300">
              <span className="text-blue-400">const</span>{' '}
              <span className="text-green-400">fukayatti</span>{' '}
              <span className="text-gray-400">=</span>{' '}
              <span className="text-gray-400">&#123;</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">age</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-orange-400">16</span>,<br />
              &nbsp;&nbsp;<span className="text-purple-400">location</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-green-300">"Japan 🇯🇵"</span>,<br />
              &nbsp;&nbsp;<span className="text-purple-400">education</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-green-300">
                "National Institue of Technology, Ibaraki College
                (Electrical/Electronics)"
              </span>
              ,<br />
              &nbsp;&nbsp;<span className="text-purple-400">roles</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-gray-400">[</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-300">"Full Stack Developer"</span>
              ,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-300">"OSS Contributor"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-300">"Tech Explorer"</span>
              <br />
              &nbsp;&nbsp;<span className="text-gray-400">]</span>,<br />
              &nbsp;&nbsp;<span className="text-purple-400">workingOn</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-gray-400">[</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-300">"UniquePersonCounter"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-300">"Personal Tech Blog"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-green-300">
                "Machine Learning Research"
              </span>
              <br />
              &nbsp;&nbsp;<span className="text-gray-400">]</span>,<br />
              &nbsp;&nbsp;<span className="text-purple-400">techStack</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-gray-400">&#123;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-purple-400">languages</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-gray-400">[</span>
              <span className="text-green-300">"Python"</span>,{' '}
              <span className="text-green-300">"TypeScript"</span>,{' '}
              <span className="text-green-300">"Rust"</span>,{' '}
              <span className="text-green-300">"C++"</span>
              <span className="text-gray-400">]</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-purple-400">frontend</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-gray-400">[</span>
              <span className="text-green-300">"React"</span>,{' '}
              <span className="text-green-300">"Next.js"</span>,{' '}
              <span className="text-green-300">"TailwindCSS"</span>
              <span className="text-gray-400">]</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-purple-400">other</span>
              <span className="text-gray-400">:</span>{' '}
              <span className="text-gray-400">[</span>
              <span className="text-green-300">"Docker"</span>,{' '}
              <span className="text-green-300">"GitHub Actions"</span>,{' '}
              <span className="text-green-300">"WebAssembly"</span>
              <span className="text-gray-400">]</span>
              <br />
              &nbsp;&nbsp;<span className="text-gray-400">&#125;</span>
              <br />
              <span className="text-gray-400">&#125;;</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
