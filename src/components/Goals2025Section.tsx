import { motion } from 'framer-motion';
import { slideIn } from '@/components/variants';

export default function Goals2025Section() {
  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={slideIn}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="inline-block relative">
          2025 Goals
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-3">🔧</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Technical Growth
            </span>
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Master Backend Development with modern architectures</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Build mobile applications with Expo</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Create IoT projects with Raspberry Pi</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Develop scalable API services</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-3">📝</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Content Creation
            </span>
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Write technical articles regularly</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Create tutorials for backend development</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Share IoT project experiences</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Document mobile app development journey</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-3">🛠️</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Project Goals
            </span>
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Build home automation system with Raspberry Pi</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Release mobile app for UniquePersonCounter</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Develop robust backend services</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">▹</span>
              <span>Contribute to open-source projects</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
