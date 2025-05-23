import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, slideUp } from '@/components/variants';

export default function HeaderSection() {
  return (
    <motion.header
      className="text-center mb-16"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-center mb-6">
        <div className="w-40 h-40 rounded-full border-4 border-indigo-500 overflow-hidden shadow-lg shadow-indigo-500/30 relative">
          <Image
            src="/gyarupi.png"
            width={160}
            height={160}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <motion.h1
        className="text-5xl font-bold mb-4"
        variants={slideUp}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          fukayatti0
        </span>
      </motion.h1>
      <motion.p
        className="text-xl text-indigo-300 dark:text-indigo-200 max-w-2xl mx-auto"
        variants={slideUp}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        16-year-old tech explorer from National Institue of Technology,Ibaraki
        College passionate about code, innovation, and open source.
      </motion.p>
    </motion.header>
  );
}
