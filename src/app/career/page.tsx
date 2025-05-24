'use client';
import type { Metadata } from 'next';

import { useState, useEffect } from 'react';

const metadata: Metadata = {
  title: '経歴・受賞歴 | Portfolio',
  description:
    'NotionCMSで管理された経歴・受賞歴ページ。実績や受賞歴を確認できます。',
  keywords: ['経歴', '受賞歴', 'キャリア', 'Notion CMS', 'ポートフォリオ'],
  openGraph: {
    title: '経歴・受賞歴 | Portfolio',
    description: 'NotionCMSで管理された経歴・受賞歴ページ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '経歴・受賞歴 | Portfolio',
    description: 'NotionCMSで管理された経歴・受賞歴ページ',
  },
};
import { motion } from 'framer-motion';
import {
  Trophy,
  Calendar,
  Building2,
  ExternalLink,
  Loader2,
  AlertTriangle,
  Database,
  Activity,
  Zap,
  Clock,
} from 'lucide-react';
import type { NotionAward } from '@/lib/notion';

interface CareerPageProps {}

export default function CareerPage({}: CareerPageProps) {
  const [awards, setAwards] = useState<NotionAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAwards() {
      try {
        const response = await fetch('/api/awards');
        if (!response.ok) {
          throw new Error('Failed to fetch awards');
        }
        const data = await response.json();
        setAwards(data.awards);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchAwards();
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen text-muted-foreground-100 overflow-hidden">
        {/* Enhanced background with modern mesh gradient */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #581c87 75%, #7c2d12 100%)
            `,
          }}
        />

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="glass rounded-2xl border border-white/10 shadow-glass p-12">
              {/* Loading Animation */}
              <div className="relative mb-8">
                <div className="w-16 h-16 mx-auto">
                  <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-muted-foreground mb-4">
                データを読み込み中...
              </h2>
              <p className="text-muted-foreground">
                Notionからキャリア情報を取得しています
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen text-muted-foreground-100 overflow-hidden">
        {/* Enhanced background */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #581c87 75%, #7c2d12 100%)
            `,
          }}
        />

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="glass rounded-2xl border border-white/10 shadow-glass p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl glass flex items-center justify-center text-3xl border border-white/10">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                エラーが発生しました
              </h2>
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-muted-foreground rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
              >
                再試行
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-muted-foreground-100 overflow-hidden">
      {/* Enhanced background with modern mesh gradient */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #581c87 75%, #7c2d12 100%)
          `,
        }}
      />

      {/* Animated mesh overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          animation: 'gradient-xy 20s ease infinite',
        }}
      />

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-glass backdrop-blur-xl mb-8">
                <h1 className="text-display mb-4">
                  <span className="gradient-text">キャリア・受賞歴</span>
                </h1>
                <p className="text-body max-w-2xl mx-auto text-muted-foreground mb-6">
                  NotionCMSで管理された実績・受賞歴をリアルタイムで表示
                </p>

                {/* Status Indicator */}
                <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-300">
                    Notionと自動同期中
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Awards Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary-300">
                    受賞歴
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    競技プログラミング・コンテストでの実績
                  </p>
                </div>
              </div>

              {awards.length === 0 ? (
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl glass flex items-center justify-center text-3xl border border-white/10">
                    <Trophy className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    受賞歴がありません
                  </h3>
                  <p className="text-muted-foreground">
                    新しい実績が追加されると、ここに表示されます。
                  </p>
                </div>
              ) : (
                <div className="grid gap-8">
                  {awards.map((award, index) => (
                    <motion.div
                      key={award.id}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    >
                      <div className="glass rounded-2xl border border-white/10 shadow-glass overflow-hidden hover:shadow-glow-lg transition-all duration-300">
                        {/* Background decoration */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <div className="absolute -top-1/2 -right-1/2 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-5 bg-gradient-to-br from-primary-400 to-accent-400" />
                        </div>

                        <div className="relative md:flex">
                          {/* Image */}
                          {award.imageUrl && (
                            <div className="md:w-1/3">
                              <img
                                src={award.imageUrl}
                                alt={award.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div
                            className={`p-8 ${award.imageUrl ? 'md:w-2/3' : 'w-full'}`}
                          >
                            <div className="flex flex-col h-full">
                              {/* Date Badge */}
                              <div className="mb-4">
                                <span className="inline-flex items-center px-3 py-1 glass rounded-full text-sm font-medium border border-white/10 text-primary-300">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {new Date(award.date).toLocaleDateString(
                                    'ja-JP',
                                    {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    }
                                  )}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-muted-foreground mb-3">
                                {award.title}
                              </h3>

                              {/* Organizer */}
                              <div className="flex items-center gap-2 mb-4">
                                <Building2 className="w-4 h-4 text-accent-400" />
                                <p className="text-muted-foreground-300">
                                  主催: {award.organizer}
                                </p>
                              </div>

                              {/* Details Link */}
                              {award.details && (
                                <div className="mt-auto">
                                  <a
                                    href={award.details}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-muted-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-200 group/button"
                                  >
                                    <span>詳細を見る</span>
                                    <ExternalLink className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-200" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* CMS Information */}
            <motion.div
              className="glass rounded-2xl border border-white/10 shadow-glass p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                  <Database className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-accent-300">
                    Notion CMS連携について
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    リアルタイムデータ同期システム
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-muted-foreground flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary-400" />
                    自動同期機能
                  </h4>
                  <ul className="space-y-2 text-muted-foreground-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>Notionデータベースから自動取得</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>リアルタイムでサイトに反映</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>画像・リンクも自動同期</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-muted-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent-400" />
                    技術仕様
                  </h4>
                  <ul className="space-y-2 text-muted-foreground-300">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-400 mt-1">▹</span>
                      <span>Next.js API Routes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-400 mt-1">▹</span>
                      <span>Notion API v1</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-400 mt-1">▹</span>
                      <span>TypeScript型安全性</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    {
                      label: 'Total Awards',
                      value: awards.length.toString(),
                      icon: Trophy,
                    },
                    { label: 'Data Source', value: 'Notion', icon: Database },
                    { label: 'Sync Status', value: 'Live', icon: Activity },
                    { label: 'Update Freq', value: 'Real-time', icon: Zap },
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={stat.label} className="text-center space-y-2">
                        <div className="text-2xl">
                          <IconComponent className="w-6 h-6 mx-auto text-primary-400" />
                        </div>
                        <div className="text-lg font-bold text-primary-300">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
