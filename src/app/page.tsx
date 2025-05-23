'use client';

// import defaultMetadata from './metadata';

import { useEffect, useState, useRef } from 'react';
import Background from '@/components/background';
import HeaderSection from '@/components/HeaderSection';
import TechIdentitySection from '@/components/TechIdentitySection';
import CurrentFocusSection from '@/components/CurrentFocusSection';
import TechUniverseSection from '@/components/TechUniverseSection';
import Goals2025Section from '@/components/Goals2025Section';
import LetsConnectSection from '@/components/LetsConnectSection';
import FooterSection from '@/components/FooterSection';

// OGP画像の内容指定constを削除（lib/og-image-presetsで一元管理するため）

// カスタムフック: useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

// カスタムフック: useParticles
function useParticles(
  width: number,
  height: number,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  useEffect(() => {
    if (!width || !height) return;
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
  }, [width, height, canvasRef]);
}

export default function AboutMePage() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useParticles(width, height, canvasRef);

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden font-sans">
      {/* 新しい大胆なグラデーション背景 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30"
        style={{
          background:
            'linear-gradient(120deg, #0f172a 0%, #312e81 40%, #7c3aed 80%, #f472b6 100%)',
          opacity: 0.9,
        }}
      />
      {/* ノイズレイヤー */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'40\' height=\'40\' fill=\'white\' fill-opacity=\'0.03\'/%3E%3C/svg%3E')",
          opacity: 0.7,
        }}
      />
      {/* パーティクル背景 */}
      <Background width={width} height={height} />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      {/* 新レイアウト: センターカラム＋左右に装飾 */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center px-2 md:px-0">
        {/* 左右に大きなグラデーション円 */}
        <div className="hidden md:block absolute left-0 top-1/3 w-96 h-96 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 opacity-30 blur-3xl rounded-full -z-10 animate-pulse" />
        <div className="hidden md:block absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-tr from-sky-400 via-indigo-400 to-purple-400 opacity-20 blur-2xl rounded-full -z-10 animate-pulse" />
        {/* メインコンテンツ */}
        <main className="w-full max-w-5xl mx-auto flex flex-col gap-32 md:gap-40 py-16 md:py-32">
          <section
            id="hero"
            className="flex flex-col items-center justify-center min-h-[80vh]"
          >
            <HeaderSection />
          </section>
          <section
            id="identity"
            className="flex flex-col md:flex-row gap-12 items-center justify-between min-h-[60vh] bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8 md:p-16 backdrop-blur-xl"
          >
            <TechIdentitySection />
          </section>
          <section
            id="focus"
            className="flex flex-col md:flex-row-reverse gap-12 items-center justify-between min-h-[60vh] bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-pink-900/40 rounded-3xl shadow-2xl border border-white/10 p-8 md:p-16 backdrop-blur-xl"
          >
            <CurrentFocusSection />
          </section>
          <section
            id="universe"
            className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-br from-purple-900/60 via-indigo-900/40 to-sky-900/30 rounded-3xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl"
          >
            <TechUniverseSection />
          </section>
          <section
            id="goals"
            className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-br from-pink-400/10 via-indigo-400/10 to-purple-400/10 rounded-3xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl"
          >
            <Goals2025Section />
          </section>
          <section
            id="connect"
            className="flex flex-col items-center justify-center min-h-[40vh] bg-white/5 rounded-3xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl"
          >
            <LetsConnectSection />
          </section>
        </main>
        <FooterSection />
      </div>
    </div>
  );
}
