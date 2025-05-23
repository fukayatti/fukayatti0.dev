import { motion } from 'framer-motion';
import { slideIn } from '@/components/variants';

export default function CurrentFocusSection() {
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
          Current Focus
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-3">🚀</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Main Project
            </span>
          </h3>
          <h4 className="text-lg font-medium text-indigo-300 mb-2">
            UniquePersonCounter
          </h4>
          <p className="text-gray-300 mb-4">
            An AI-powered video analysis tool that detects and counts stationary
            people in footage. The project combines computer vision with
            practical applications.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-indigo-900/60 text-indigo-300 text-xs px-2 py-1 rounded-md">
              Computer Vision
            </span>
            <span className="bg-indigo-900/60 text-indigo-300 text-xs px-2 py-1 rounded-md">
              Machine Learning
            </span>
            <span className="bg-indigo-900/60 text-indigo-300 text-xs px-2 py-1 rounded-md">
              Python
            </span>
          </div>
        </div>
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition duration-300">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-3">🌱</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              Learning Journey
            </span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-indigo-400 mr-3">▹</span>
              <div>
                <h4 className="font-medium text-indigo-300">
                  Rust Programming
                </h4>
                <p className="text-gray-300 text-sm">
                  Exploring systems programming with memory safety and
                  performance
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-400 mr-3">▹</span>
              <div>
                <h4 className="font-medium text-indigo-300">WebAssembly</h4>
                <p className="text-gray-300 text-sm">
                  Building high-performance web applications with near-native
                  speed
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-400 mr-3">▹</span>
              <div>
                <h4 className="font-medium text-indigo-300">Edge Computing</h4>
                <p className="text-gray-300 text-sm">
                  Developing applications that work at the edge of the network
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
