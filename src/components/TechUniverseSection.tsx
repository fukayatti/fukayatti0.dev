import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';
import { useTheme } from 'next-themes';
import {
  SiPython,
  SiTypescript,
  SiRust,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiWebassembly,
} from '@icons-pack/react-simple-icons';

const techUniverseItems = [
  { icon: SiPython, label: 'Python', color: '#FFD43B' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: SiRust, label: 'Rust', color: '#DEA584' },
  { icon: SiCplusplus, label: 'C++', color: '#00599C' },
  { icon: SiReact, label: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#fff' },
  { icon: SiTailwindcss, label: 'TailwindCSS', color: '#38BDF8' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { icon: SiWebassembly, label: 'WebAssembly', color: '#654FF0' },
];

export default function TechUniverseSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.section
      className={`w-full flex flex-col items-center justify-center min-h-[40vh] rounded-2xl shadow-xl border border-white/10 p-8 md:p-16 backdrop-blur-xl
        ${
          isDark
            ? 'bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-sky-900/40'
            : 'bg-gradient-to-br from-indigo-50/80 via-purple-100/60 to-sky-50/40'
        }
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <h2
        className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}
      >
        <span className="inline-block relative">
          Tech Universe
          <span
            className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${isDark ? 'from-pink-400' : 'from-pink-300'} to-indigo-400`}
          ></span>
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-9 gap-6 w-full">
        {techUniverseItems.map((item, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-6 flex flex-col items-center justify-center border transition duration-300
              ${
                isDark
                  ? 'bg-white/10 border-white/10 hover:scale-105 hover:shadow-xl'
                  : 'bg-white/90 border-gray-200 hover:scale-105 hover:shadow-indigo-200/40'
              }
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
          >
            <item.icon color={item.color} size={38} />
            <div
              className={`text-center mt-2 text-sm font-semibold tracking-wide ${isDark ? 'text-white/90' : 'text-gray-800/90'}`}
            >
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
