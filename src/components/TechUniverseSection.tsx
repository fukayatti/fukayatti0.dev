import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';
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
  { icon: SiPython, label: 'Python' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiRust, label: 'Rust' },
  { icon: SiCplusplus, label: 'C++' },
  { icon: SiReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiTailwindcss, label: 'TailwindCSS' },
  { icon: SiDocker, label: 'Docker' },
  { icon: SiWebassembly, label: 'WebAssembly' },
];

export default function TechUniverseSection() {
  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="inline-block relative">
          Tech Universe
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {techUniverseItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800/60 backdrop-blur-xl rounded-lg p-4 flex flex-col items-center justify-center border border-gray-700/50 hover:border-indigo-500/50 hover:shadow-md hover:shadow-indigo-500/20 transition duration-300"
          >
            <item.icon color="white" size={32} />
            <div className="text-center">{item.label}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
