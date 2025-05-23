'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/background';
import {
  SiInstagram,
  SiX,
  SiZenn,
  SiGithub,
  SiQiita,
  SiGmail,
} from '@icons-pack/react-simple-icons';

// コンテナ・子要素のアニメーションバリアント
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

export default function ContactPage() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ウィンドウサイズの取得
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 豪華で近未来的なパーティクルアニメーション
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
    const particleCount = 60;
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();

    // パーティクルの初期化
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1.5,
        color: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3})`,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 各パーティクルの描画＋輝き効果
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      // パーティクル間の接続線（輝くエフェクト）
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });
      });

      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [width, height]);

  // 連絡先リンクの定義（必要に応じてリンク先を変更）
  const contactLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/fukayatti0',
      icon: SiInstagram,
    },
    {
      name: 'X',
      href: 'https://x.com/fukayatti0',
      icon: SiX,
    },
    {
      name: 'Zenn',
      href: 'https://zenn.dev/fukayatti0',
      icon: SiZenn,
    },
    {
      name: 'Github',
      href: 'https://github.com/fukayatti',
      icon: SiGithub,
    },
    {
      name: 'Qiita',
      href: 'https://qiita.com/fukayatti0',
      icon: SiQiita,
    },
    {
      name: 'Email',
      href: 'mailto:contact@yourdomain.com',
      icon: SiGmail,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background width={width} height={height} />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* ヘッダー */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Futuristic Contact
          </motion.h1>
          <motion.p
            className="text-xl text-indigo-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
          >
            最先端の技術と未来的なデザインで、あなたとの繋がりを実現します
          </motion.p>
        </motion.header>

        {/* 連絡先リンク */}
        <motion.section
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {contactLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: '0 0 15px rgba(99,102,241,0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4 bg-gray-800/70 backdrop-blur-lg rounded-xl border border-gray-700 hover:border-indigo-500 transition duration-300 text-gray-200"
              >
                <IconComponent size={28} />
                <span className="font-semibold">{link.name}</span>
              </motion.a>
            );
          })}
        </motion.section>

        {/* フッター */}
        <footer className="py-6 text-center text-gray-500 mt-16">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
