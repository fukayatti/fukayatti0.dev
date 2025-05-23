import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, slideUp } from '@/components/variants';
import { useTheme } from 'next-themes';

export default function HeaderSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.header
      className={`relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 min-h-[70vh] px-4 md:px-12 py-12 md:py-24 rounded-3xl shadow-2xl border border-white/10 overflow-hidden
        ${
          isDark
            ? 'bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-pink-900/40'
            : 'bg-gradient-to-br from-indigo-100/80 via-purple-100/60 to-pink-100/40'
        }
      `}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 1 }}
    >
      {/* 左側: プロフィール画像＋グロー */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <div
          className={`w-48 h-48 md:w-56 md:h-56 rounded-full border-4 overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20
          ${isDark ? 'border-pink-400/60 shadow-pink-400/20' : 'border-pink-300/60 shadow-pink-200/20'}`}
        >
          <Image
            src="/gyarupi.png"
            width={224}
            height={224}
            alt="Profile"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div
          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-60 h-16 bg-gradient-to-r blur-2xl rounded-full opacity-60
          ${isDark ? 'from-pink-400/40 via-purple-400/30 to-indigo-400/40' : 'from-pink-200/40 via-purple-200/30 to-indigo-200/40'}`}
        />
      </div>
      {/* 右側: テキスト */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.h1
          className={`text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x
            ${isDark ? 'from-pink-400 via-indigo-400 to-purple-500' : 'from-pink-300 via-indigo-400 to-purple-400'}`}
          variants={slideUp}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          fukayatti0
        </motion.h1>
        <motion.p
          className={`text-xl md:text-2xl max-w-2xl font-light mt-4 ${isDark ? 'text-indigo-100/90' : 'text-indigo-900/90'}`}
          variants={slideUp}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          16-year-old tech explorer from National Institute of Technology,
          Ibaraki College passionate about code, innovation, and open source.
        </motion.p>
      </div>
      {/* 装飾: 流れるグラデーション円 */}
      <motion.div
        className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl animate-spin-slow
          ${isDark ? 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 opacity-30' : 'bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 opacity-20'}`}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: isDark ? 0.3 : 0.2 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        aria-hidden
      />
    </motion.header>
  );
}
