'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  Clock,
  ExternalLink,
  Globe,
  Loader2,
  MessageSquare,
  Send,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

export default function ContactPageClient() {
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

  // 連絡先リンクの定義 - 軽量化
  const contactLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/fukayatti',
      description: 'コードと共に未来を創る',
    },
    {
      name: 'Email',
      href: 'mailto:contact@fukayatti0.dev',
      description: '直接メッセージをお送りください',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/fukayatti0',
      description: '最新の技術トレンドを共有',
    },
    {
      name: 'Zenn',
      href: 'https://zenn.dev/fukayatti0',
      description: '技術記事とナレッジシェア',
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
    <div className="relative min-h-screen text-foreground overflow-hidden">
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

      {/* Simplified static overlay for performance */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-12">
              <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-glass backdrop-blur-xl mb-8">
                <h1 className="text-display mb-4">
                  <span
                    className="gradient-text"
                    style={{
                      background: isDark
                        ? 'linear-gradient(90deg, #a78bfa, #f472b6, #38bdf8)'
                        : 'linear-gradient(90deg, #6366f1, #ec4899, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Let&apos;s get in touch and discuss your next project!
                  </span>
                </h1>
                <p className="text-body max-w-2xl mx-auto text-muted-foreground mb-6">
                  新しいプロジェクト、コラボレーション、技術的な相談など、お気軽にお声がけください
                </p>

                {/* Availability Status */}
                <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-success">
                    新しいプロジェクトを募集中
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl border border-white/10">
                      <MessageSquare className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-primary-300">
                        メッセージを送る
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        プロジェクトについて詳しくお聞かせください
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-muted-foreground mb-2"
                        >
                          お名前
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary-400 transition-colors"
                          placeholder="山田太郎"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-muted-foreground mb-2"
                        >
                          メールアドレス
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary-400 transition-colors"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-muted-foreground mb-2"
                      >
                        件名
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary-400 transition-colors"
                        placeholder="プロジェクトのご相談"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-muted-foreground mb-2"
                      >
                        メッセージ
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary-400 transition-colors resize-none"
                        placeholder="プロジェクトの詳細、技術要件、期間などをお聞かせください..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="フォームを送信する"
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
              </div>

              {/* Contact Links & Info */}
              <motion.div className="space-y-8">
                {/* Quick Contact - Simplified */}
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                  <h2 className="text-2xl font-semibold text-accent-300 mb-6">
                    ソーシャルメディア
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    各プラットフォームでつながりましょう
                  </p>

                  <div className="grid gap-4">
                    {contactLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group glass rounded-xl border border-white/10 p-4 hover:bg-primary-500/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`${link.name}で連絡する`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary-300 transition-colors">
                              {link.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                          <ExternalLink
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary-400 transition-colors"
                            aria-hidden="true"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact Info - Simplified */}
                <div className="glass rounded-2xl border border-white/10 shadow-glass p-8">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">
                    基本情報
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    レスポンス時間とアベイラビリティ
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock
                        className="w-5 h-5 text-primary-400"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="font-medium text-foreground">
                          レスポンス時間
                        </div>
                        <div className="text-sm text-muted-foreground">
                          通常24時間以内
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe
                        className="w-5 h-5 text-accent-400"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="font-medium text-foreground">
                          タイムゾーン
                        </div>
                        <div className="text-sm text-muted-foreground">
                          JST (UTC+9)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase
                        className="w-5 h-5 text-purple-400"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="font-medium text-foreground">
                          ステータス
                        </div>
                        <div className="text-sm text-muted-foreground">
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
