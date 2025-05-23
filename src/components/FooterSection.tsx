import { useTheme } from 'next-themes';

export default function FooterSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  return (
    <footer
      className={`py-10 text-center border-t mt-16 relative bg-gradient-to-t
      ${
        isDark
          ? 'text-gray-300 border-white/10 from-indigo-900/40 via-purple-900/20 to-transparent'
          : 'text-gray-700 border-gray-200 from-indigo-100/40 via-purple-100/20 to-transparent'
      }`}
    >
      {/* グラデーションライン装飾 */}
      <div
        className={`absolute left-1/2 -top-1 w-2/3 h-1 -translate-x-1/2 bg-gradient-to-r rounded-full blur-sm
        ${isDark ? 'from-pink-400 via-indigo-400 to-purple-500 opacity-60' : 'from-pink-200 via-indigo-300 to-purple-300 opacity-40'}`}
      />
      <div className="text-lg font-semibold tracking-wide">
        &copy; {new Date().getFullYear()} fukayatti. All rights reserved.
      </div>
      <div
        className={`mt-2 flex justify-center items-center gap-2 text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
      >
        <span>Made with</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="inline-block align-middle"
        >
          <circle cx="10" cy="10" r="10" fill="#6366f1" />
          <path
            d="M6.5 9.5C6.5 7.84315 7.84315 6.5 9.5 6.5C10.3284 6.5 11.0784 6.82843 11.5858 7.41421C12.0931 6.82843 12.8431 6.5 13.6716 6.5C15.3284 6.5 16.6716 7.84315 16.6716 9.5C16.6716 12.5 11.5858 15.5 11.5858 15.5C11.0784 15.5 6.5 12.5 6.5 9.5Z"
            fill="#fff"
          />
        </svg>
        <span>Next.js, React, and ❤️</span>
      </div>
    </footer>
  );
}
