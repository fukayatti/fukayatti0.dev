'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Calendar, ExternalLink, Trophy } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

interface Award {
  id: string;
  title: string;
  date: string;
  organizer: string;
  details?: string;
  imageUrl?: string;
}

// 全ての外部画像をプロキシ経由で取得するためのloader
// これにより、どんなドメインの画像でもremotePatterns追加なしで表示可能
const imageLoader = ({ src }: { src: string }) => {
  // 相対パスやdata URIはそのまま返す
  if (!src || src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }
  // すでにプロキシ経由の場合は二重にしない
  if (src.startsWith('/api/image-proxy')) {
    return src;
  }
  // 外部URL（http/https）は全てプロキシ経由で取得
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return `/api/image-proxy?url=${encodeURIComponent(src)}`;
  }
  return src;
};

// Award Card with cyberpunk styling
function AwardCard({ award, index }: { award: Award; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Glowing border on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)',
        }}
      />

      <div className="relative md:flex">
        {/* Image section */}
        {award.imageUrl && (
          <div className="md:w-1/3 relative overflow-hidden">
            <div className="relative h-48 md:h-full min-h-[200px]">
              <Image
                src={award.imageUrl}
                alt={award.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loader={imageLoader}
                unoptimized
              />
              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                }}
              />
              {/* Scan animation */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-cyan-500/40 pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        )}

        {/* Content section */}
        <div className={`p-6 ${award.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
          {/* Index number */}
          <div className="absolute top-4 right-4 font-mono text-xs text-cyan-500/60">
            #{String(index + 1).padStart(3, '0')}
          </div>

          {/* Date badge */}
          <motion.div
            className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-cyan-500/30 text-cyan-400 font-mono text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            <Calendar className="w-3 h-3" />
            {new Date(award.date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'short',
            })}
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 font-mono">
            {award.title}
          </h3>

          {/* Organizer */}
          <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span className="font-mono">{award.organizer}</span>
          </div>

          {/* Details link */}
          {award.details && (
            <motion.a
              href={award.details}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/50 text-cyan-500 font-mono text-xs hover:bg-cyan-500 hover:text-black transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>DETAILS</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[16px] border-l-transparent border-b-[16px] border-b-cyan-500/20 group-hover:border-b-cyan-500/60 transition-colors duration-300" />
    </motion.div>
  );
}

// Loading skeleton
function AwardSkeleton() {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 p-6 animate-pulse">
      <div className="h-4 w-24 bg-slate-700 rounded mb-4" />
      <div className="h-6 w-3/4 bg-slate-700 rounded mb-3" />
      <div className="h-4 w-1/2 bg-slate-700 rounded" />
    </div>
  );
}

export default function CareerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Fetch awards from API
  useEffect(() => {
    async function fetchAwards() {
      try {
        const res = await fetch('/api/awards');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        // APIは { awards: [...], timestamp, cached } を返す
        setAwards(Array.isArray(data) ? data : data.awards || []);
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAwards();
  }, []);

  return (
    <section
      id="career"
      ref={containerRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <motion.div
        className="max-w-6xl mx-auto px-6 relative z-10"
        style={{ y }}
      >
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] mb-4">
            ◈ SECTION_004 // ACHIEVEMENTS
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
            <span className="block">CAREER</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-500">
              & AWARDS
            </span>
          </h2>

          <p className="text-slate-400 max-w-xl font-mono text-sm">
            競技プログラミング・コンテストでの受賞歴と実績
          </p>
        </motion.div>

        {/* Trophy icon decoration */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-12 border border-yellow-500/30 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="font-mono text-sm text-slate-500">
            // TOTAL_AWARDS: {loading ? '...' : awards.length}
          </div>
        </motion.div>

        {/* Awards list */}
        <div className="space-y-6">
          {loading ? (
            <>
              <AwardSkeleton />
              <AwardSkeleton />
              <AwardSkeleton />
            </>
          ) : error ? (
            <motion.div
              className="p-8 bg-slate-900/50 border border-red-500/30 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-red-400 font-mono text-sm">{error}</p>
            </motion.div>
          ) : awards.length === 0 ? (
            <motion.div
              className="p-12 bg-slate-900/50 border border-slate-700/50 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 font-mono text-sm">
                受賞歴がまだありません
              </p>
            </motion.div>
          ) : (
            awards.map((award, index) => (
              <AwardCard key={award.id} award={award} index={index} />
            ))
          )}
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-600 tracking-wider">
        DATA_SOURCE: NOTION_CMS
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-slate-600 tracking-wider">
        © 2025 FUKAYATTI0
      </div>
    </section>
  );
}
