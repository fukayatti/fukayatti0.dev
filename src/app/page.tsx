'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Image from 'next/image';
import {
  SiPython,
  SiTypescript,
  SiRust,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiWebassembly,
} from '@icons-pack/react-simple-icons';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

// Tech Universe の項目を定義する定数配列
const techUniverseItems = [
  { icon: SiPython, label: 'Python' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiRust, label: 'Rust' },
  { icon: SiCplusplus, label: 'C++' },
  { icon: SiReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiTailwindcss, label: 'TailwindCSS' },
  { icon: SiDocker, label: 'Docker' },
  { icon: SiWebassembly, label: 'WebAssembly' },
];

export default function AboutMePage() {
  // ブラウザサイズを管理するステート
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // マウント時とウィンドウリサイズ時に width/height を更新
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // 初回
    handleResize();
    // リスナー登録
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ctx: CanvasRenderingContext2D | null;
    let particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
    }[] = [];
    let frame: number;
    const particleCount = 50;
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスリサイズ用の関数
    const resizeCanvas = () => {
      canvas.width = width;
      canvas.height = height;
    };

    // width, height が変化するたびにキャンバスをリサイズ
    resizeCanvas();

    // パーティクルの初期化
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.25})`,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      });
    }

    // アニメーションループ
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // パーティクル描画と移動
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });

      // パーティクル間の接続線描画
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    // クリーンアップ処理
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [width, height]);

  return (
    <div className="min-h-screen text-gray-100 relative overflow-hidden">
      {/* width と height を useState から受け取る */}
      <Background width={width} height={height} />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* ヘッダーセクション */}
        <motion.header
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 rounded-full border-4 border-indigo-500 overflow-hidden shadow-lg shadow-indigo-500/30 relative">
              <Image
                src="/gyarupi.png"
                width={160}
                height={160}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <motion.h1
            className="text-5xl font-bold mb-4"
            variants={slideUp}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              fukayatti0
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-indigo-300 dark:text-indigo-200 max-w-2xl mx-auto"
            variants={slideUp}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            16-year-old tech explorer from National Institue of
            Technology,Ibaraki College passionate about code, innovation, and
            open source.
          </motion.p>
        </motion.header>

        {/* Tech Identity セクション */}
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
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                  Who I Am
                </h3>
                <p className="text-gray-300 mb-6">
                  I'm a student at National Institue of Technology, Ibaraki
                  College in the Department of Industrial Enginerring, focusing
                  on Electrical/Electronics. Beyond academics, I'm an
                  enthusiastic technologist who loves exploring the cutting edge
                  of software development.
                </p>
                <h3 className="text-xl font-semibold mb-4 text-indigo-300">
                  Technical Passions
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Building high-performance applications with{' '}
                      <span className="text-indigo-300">Rust</span> and{' '}
                      <span className="text-indigo-300">WebAssembly</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Developing full-stack web applications with modern
                      frameworks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Contributing to Open Source Software and tech communities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 mr-2">▹</span>
                    <span>
                      Exploring Machine Learning and Computer Vision
                      applications
                    </span>
                  </li>
                </ul>
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

        {/* Current Focus セクション */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideIn}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="inline-block relative">
              Current Focus
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-3">🚀</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                  Main Project
                </span>
              </h3>
              <h4 className="text-lg font-medium text-indigo-300 mb-2">
                UniquePersonCounter
              </h4>
              <p className="text-gray-300 mb-4">
                An AI-powered video analysis tool that detects and counts
                stationary people in footage. The project combines computer
                vision with practical applications.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-indigo-900/60 text-indigo-300 text-xs px-2 py-1 rounded-md">
                  Computer Vision
                </span>
                <span className="bg-indigo-900/60 text-indigo-300 text-xs px-2 py-1 rounded-md">
                  Machine Learning
                </span>
                <span className="bg-indigo-900/60 text-indigo-300 text-xs px-2 py-1 rounded-md">
                  Python
                </span>
              </div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-3">🌱</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                  Learning Journey
                </span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-indigo-400 mr-3">▹</span>
                  <div>
                    <h4 className="font-medium text-indigo-300">
                      Rust Programming
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Exploring systems programming with memory safety and
                      performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-indigo-400 mr-3">▹</span>
                  <div>
                    <h4 className="font-medium text-indigo-300">WebAssembly</h4>
                    <p className="text-gray-300 text-sm">
                      Building high-performance web applications with
                      near-native speed
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-indigo-400 mr-3">▹</span>
                  <div>
                    <h4 className="font-medium text-indigo-300">
                      Edge Computing
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Developing applications that work at the edge of the
                      network
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Universe セクション（定数配列でマッピング） */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="inline-block relative">
              Tech Universe
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {techUniverseItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/60 backdrop-blur-xl rounded-lg p-4 flex flex-col items-center justify-center border border-gray-700/50 hover:border-indigo-500/50 hover:shadow-md hover:shadow-indigo-500/20 transition duration-300"
              >
                <item.icon color="white" size={32} />
                <div className="text-center">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 2025 Goals セクション */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={slideIn}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="inline-block relative">
              2025 Goals
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-3">🔧</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                  Technical Growth
                </span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>
                    Master Backend Development with modern architectures
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Build mobile applications with Expo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Create IoT projects with Raspberry Pi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Develop scalable API services</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-3">📝</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                  Content Creation
                </span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Write technical articles regularly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Create tutorials for backend development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Share IoT project experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Document mobile app development journey</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-3">🛠️</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                  Project Goals
                </span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Build home automation system with Raspberry Pi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Release mobile app for UniquePersonCounter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Develop robust backend services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">▹</span>
                  <span>Contribute to open-source projects</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Let's Connect セクション */}
        <motion.section
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="inline-block relative">
              Let's Connect
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/fukayatti"
              className="flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300 text-gray-200 hover:text-white"
            >
              <span className="mr-2">GitHub</span>
              <span>@fukayatti</span>
            </a>
            <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              className="flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300 text-gray-200 hover:text-white"
            >
              <span className="mr-2">LinkedIn</span>
              <span>Connect</span>
            </a>
            <a
              href="mailto:contact@fukayatti.com"
              className="flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300 text-gray-200 hover:text-white"
            >
              <span className="mr-2">Email</span>
              <span>contact@fukayatti.com</span>
            </a>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} fukayatti. All rights reserved.
          </div>
          <div className="mt-2">Made with Next.js, React, and ❤️</div>
        </footer>
      </div>
    </div>
  );
}
