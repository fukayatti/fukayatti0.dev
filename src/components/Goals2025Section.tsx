import { motion } from 'framer-motion';
import { slideIn } from '@/components/variants';
import { useTheme } from 'next-themes';

export default function Goals2025Section() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.section
      className={`w-full flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-between min-h-[40vh] rounded-2xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl
        ${
          isDark
            ? 'bg-gradient-to-br from-pink-400/10 via-indigo-400/10 to-purple-400/10'
            : 'bg-gradient-to-br from-pink-50/10 via-indigo-50/10 to-purple-50/10'
        }
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={slideIn}
      transition={{ duration: 0.8 }}
    >
      {/* 左: 技術・コンテンツ・プロジェクト目標 */}
      <div className="flex-1 space-y-8">
        <h3
          className={`text-2xl font-bold mb-4 ${isDark ? 'text-pink-300' : 'text-pink-600'}`}
        >
          2025 Goals
        </h3>
        <ul
          className={`space-y-3 text-lg ${isDark ? 'text-white/90' : 'text-gray-800/90'}`}
        >
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-pink-400' : 'text-pink-500'} mr-2`}
            >
              ▹
            </span>
            Master Backend Development with modern architectures
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-pink-400' : 'text-pink-500'} mr-2`}
            >
              ▹
            </span>
            Build mobile applications with Expo
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-pink-400' : 'text-pink-500'} mr-2`}
            >
              ▹
            </span>
            Create IoT projects with Raspberry Pi
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-pink-400' : 'text-pink-500'} mr-2`}
            >
              ▹
            </span>
            Develop scalable API services
          </li>
        </ul>
      </div>
      <div className="flex-1 space-y-8">
        <h3
          className={`text-2xl font-bold mb-4 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}
        >
          Content Creation
        </h3>
        <ul
          className={`space-y-3 text-lg ${isDark ? 'text-white/90' : 'text-gray-800/90'}`}
        >
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-indigo-400' : 'text-indigo-500'} mr-2`}
            >
              ▹
            </span>
            Write technical articles regularly
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-indigo-400' : 'text-indigo-500'} mr-2`}
            >
              ▹
            </span>
            Create tutorials for backend development
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-indigo-400' : 'text-indigo-500'} mr-2`}
            >
              ▹
            </span>
            Share IoT project experiences
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-indigo-400' : 'text-indigo-500'} mr-2`}
            >
              ▹
            </span>
            Document mobile app development journey
          </li>
        </ul>
      </div>
      <div className="flex-1 space-y-8">
        <h3
          className={`text-2xl font-bold mb-4 ${isDark ? 'text-purple-300' : 'text-purple-600'}`}
        >
          Project Goals
        </h3>
        <ul
          className={`space-y-3 text-lg ${isDark ? 'text-white/90' : 'text-gray-800/90'}`}
        >
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-purple-400' : 'text-purple-500'} mr-2`}
            >
              ▹
            </span>
            Build home automation system with Raspberry Pi
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-purple-400' : 'text-purple-500'} mr-2`}
            >
              ▹
            </span>
            Release mobile app for UniquePersonCounter
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-purple-400' : 'text-purple-500'} mr-2`}
            >
              ▹
            </span>
            Develop robust backend services
          </li>
          <li className="flex items-start">
            <span
              className={`${isDark ? 'text-purple-400' : 'text-purple-500'} mr-2`}
            >
              ▹
            </span>
            Contribute to open-source projects
          </li>
        </ul>
      </div>
    </motion.section>
  );
}
