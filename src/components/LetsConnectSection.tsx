import { motion } from 'framer-motion';
import { fadeIn } from '@/components/variants';

export default function LetsConnectSection() {
  return (
    <motion.section
      className="mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="inline-block relative">
          Let's Connect
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
        </span>
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="https://github.com/fukayatti"
          className="flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300 text-gray-200 hover:text-white"
        >
          <span className="mr-2">GitHub</span>
          <span>@fukayatti</span>
        </a>
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile"
          className="flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300 text-gray-200 hover:text-white"
        >
          <span className="mr-2">LinkedIn</span>
          <span>Connect</span>
        </a>
        <a
          href="mailto:contact@fukayatti.com"
          className="flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300 text-gray-200 hover:text-white"
        >
          <span className="mr-2">Email</span>
          <span>contact@fukayatti.com</span>
        </a>
      </div>
    </motion.section>
  );
}
