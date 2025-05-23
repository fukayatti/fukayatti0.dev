import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';
import { useTheme } from 'next-themes';

export default function LetsConnectSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.section
      className={`w-full flex flex-col items-center justify-center min-h-[30vh] rounded-2xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl
        ${
          isDark
            ? 'bg-gradient-to-br from-white/10 via-pink-400/10 to-indigo-400/10'
            : 'bg-gradient-to-br from-white/80 via-pink-100/20 to-indigo-100/20'
        }
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <h2
        className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        <span className="inline-block relative">
          Let's Connect
          <span
            className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${isDark ? 'from-pink-400' : 'from-pink-300'} to-indigo-400`}
          ></span>
        </span>
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <a
          href="https://github.com/fukayatti"
          className={`flex items-center gap-2 px-6 py-3 rounded-xl border shadow-lg text-lg font-semibold transition duration-300
            ${
              isDark
                ? 'bg-gradient-to-r from-indigo-500/80 to-pink-400/80 border-white/20 text-white hover:scale-105 hover:shadow-pink-400/30'
                : 'bg-gradient-to-r from-indigo-200/80 to-pink-100/80 border-gray-200 text-gray-900 hover:scale-105 hover:shadow-indigo-200/40'
            }
          `}
        >
          <span>GitHub</span>
          <span className="opacity-70">@fukayatti</span>
        </a>
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile"
          className={`flex items-center gap-2 px-6 py-3 rounded-xl border shadow-lg text-lg font-semibold transition duration-300
            ${
              isDark
                ? 'bg-gradient-to-r from-pink-400/80 to-indigo-500/80 border-white/20 text-white hover:scale-105 hover:shadow-indigo-400/30'
                : 'bg-gradient-to-r from-pink-100/80 to-indigo-200/80 border-gray-200 text-gray-900 hover:scale-105 hover:shadow-pink-200/40'
            }
          `}
        >
          <span>LinkedIn</span>
          <span className="opacity-70">Connect</span>
        </a>
        <a
          href="mailto:contact@fukayatti.com"
          className={`flex items-center gap-2 px-6 py-3 rounded-xl border shadow-lg text-lg font-semibold transition duration-300
            ${
              isDark
                ? 'bg-gradient-to-r from-indigo-400/80 to-pink-400/80 border-white/20 text-white hover:scale-105 hover:shadow-pink-400/30'
                : 'bg-gradient-to-r from-indigo-100/80 to-pink-100/80 border-gray-200 text-gray-900 hover:scale-105 hover:shadow-indigo-200/40'
            }
          `}
        >
          <span>Email</span>
          <span className="opacity-70">contact@fukayatti.com</span>
        </a>
      </div>
    </motion.section>
  );
}
