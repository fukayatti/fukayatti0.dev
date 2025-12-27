'use client';

import * as THREE from 'three';

import { useEffect, useRef, useState } from 'react';

interface Props {
  width: number;
  height: number;
}

const Background: React.FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ダークモード設定（ライトモードは削除済み）
    renderer.setClearColor('#0a0a0a', 0);

    // パーティクルの作成
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    // ダークモード用のスタイル設定
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.012,
      color: '#3b82f6',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // 追加の視覚効果：グラデーション球体
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: '#8b5cf6',
      transparent: true,
      opacity: 0.1,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(2, 1, -1);
    scene.add(sphere);

    camera.position.z = 3;

    let animationId: number;

    // アニメーション
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // パーティクルの回転
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // 球体の浮遊アニメーション
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      sphere.position.y = Math.sin(Date.now() * 0.001) * 0.5 + 1;

      renderer.render(scene, camera);
    };

    animate();

    // クリーンアップ
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, [width, height, mounted]);

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #000000 100%)',
        }}
      />
    );
  }

  return (
    <>
      {/* CSS背景のフォールバック */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background:
            'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #000000 100%)',
        }}
      />

      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};

export default Background;
