'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  SiInstagram,
  SiX,
  SiZenn,
  SiGithub,
  SiQiita,
  SiGmail,
} from '@icons-pack/react-simple-icons';
import {
  MessageSquare,
  Rocket,
  MapPin,
  Clock,
  Globe,
  Briefcase,
  Send,
  Loader2,
} from 'lucide-react';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent styling until mounted
  const isDark = mounted ? resolvedTheme === 'dark' : true; // Default to dark for SSR

  // 連絡先リンクの定義
  const contactLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/fukayatti',
      icon: SiGithub,
      color: '#6366f1',
      description: 'コードと共に未来を創る',
    },
    {
      name: 'Email',
      href: 'mailto:contact@fukayatti.dev',
      icon: SiGmail,
      color: '#ec4899',
      description: '直接メッセージをお送りください',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/fukayatti0',
      icon: SiX,
      color: '#8b5cf6',
      description: '最新の技術トレンドを共有',
    },
    {
      name: 'Zenn',
      href: 'https://zenn.dev/fukayatti0',
      icon: SiZenn,
      color: '#06b6d4',
      description: '技術記事とナレッジシェア',
    },
    {
      name: 'Qiita',
      href: 'https://qiita.com/fukayatti0',
      icon: SiQiita,
      color: '#10b981',
      description: 'プログラミングTips & Tricks',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/fukayatti0',
      icon: SiInstagram,
      color: '#f59e0b',
      description: '日常とテックライフを発信',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);

    // Show success message (you can implement this with a toast library)
    alert('メッセージが送信されました！');
  };

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden">
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

      {/* Floating orbs decoration */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-blob" />
        <div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-accent-400/15 to-primary-400/15 rounded-full blur-2xl animate-blob"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-primary-300/25 to-accent-300/25 rounded-full blur-lg animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-glass backdrop-blur-xl mb-8">
                <h1 className="text-display mb-4">
                  <span className="gradient-text">Let's Connect</span>
                </h1>
                <p className="text-body max-w-2xl mx-auto text-gray-400 mb-6">
                  新しいプロジェクト、コラボレーション、技術的な相談など、お気軽にお声がけください
                </p>

                {/* Availability Status */}
                <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-300">
                    新しいプロジェクトを募集中
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                      <MessageSquare className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-primary-300">
                        メッセージを送る
                      </h2>
                      <p className="text-sm text-gray-400">
                        プロジェクトについて詳しくお聞かせください
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          お名前
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                          placeholder="山田太郎"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          メールアドレス
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        件名
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
                        placeholder="プロジェクトのご相談"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        メッセージ
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                        placeholder="プロジェクトの詳細、技術要件、期間などをお聞かせください..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>送信中...</span>
                        </>
                      ) : (
                        <>
                          <span>メッセージを送信</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Links & Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Quick Contact */}
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                      <Rocket className="w-6 h-6 text-accent-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-accent-300">
                        ソーシャルメディア
                      </h2>
                      <p className="text-sm text-gray-400">
                        各プラットフォームでつながりましょう
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {contactLinks.map((link, index) => {
                      const IconComponent = link.icon;
                      return (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group glass rounded-xl border border-white/10 p-4 hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.6,
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl glass flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundColor: `${link.color}20` }}
                            >
                              <IconComponent color={link.color} size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
                                {link.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {link.description}
                              </p>
                            </div>
                            <svg
                              className="w-5 h-5 text-gray-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-300">
                        基本情報
                      </h3>
                      <p className="text-sm text-gray-400">
                        レスポンス時間とアベイラビリティ
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary-400" />
                      <div>
                        <div className="font-medium text-white">
                          レスポンス時間
                        </div>
                        <div className="text-sm text-gray-400">
                          通常24時間以内
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-accent-400" />
                      <div>
                        <div className="font-medium text-white">
                          タイムゾーン
                        </div>
                        <div className="text-sm text-gray-400">JST (UTC+9)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-medium text-white">ステータス</div>
                        <div className="text-sm text-gray-400">
                          新規プロジェクト受付中
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
