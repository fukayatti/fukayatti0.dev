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
    <div className="min-h-screen text-gray-100 relative overflow-hidden">
      <Background width={width} height={height} />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <HeaderSection />
        <TechIdentitySection />
        <CurrentFocusSection />
        <TechUniverseSection />
        <Goals2025Section />
        <LetsConnectSection />
        <FooterSection />
      </div>
    </div>
  );
}
