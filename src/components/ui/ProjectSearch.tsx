'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Command, Cpu, Loader2, Search } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

interface ProjectSearchProps {
  onSearch: (query: string) => void;
  status: 'idle' | 'loading' | 'ready' | 'error';
  progress: number;
  isSearching: boolean;
  onFocus: () => void;
}

export default function ProjectSearch({
  onSearch,
  status,
  progress,
  isSearching,
  onFocus,
}: ProjectSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-16 relative z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Label */}
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/80">
          <Command className="w-3 h-3" />
          <span>SEMANTIC_SEARCH_MODULE_V1.0</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500">
          {status === 'idle'
            ? 'WAITING_FOR_INPUT...'
            : status === 'loading'
              ? `INITIALIZING_NEURAL_ENGINE... ${progress}%`
              : status === 'ready'
                ? 'SYSTEM_READY'
                : 'SYSTEM_ERROR'}
        </div>
      </div>

      {/* Input container */}
      <div className="relative group">
        {/* Animated border */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg opacity-30 blur transition duration-500 group-hover:opacity-60 ${
            isFocused ? 'opacity-80' : ''
          }`}
        />

        <div className="relative bg-slate-900 border border-slate-700/50 rounded-lg overflow-hidden flex items-center">
          {/* Icon area */}
          <div className="pl-4 flex-shrink-0 text-slate-400">
            {isSearching ? (
              <Cpu className="w-5 h-5 animate-pulse text-cyan-400" />
            ) : status === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
            ) : (
              <Search className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
            )}
          </div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
            placeholder="Search with natural language (e.g., 'Track bus schedule')" // e.g., 'Track bus schedule'
            className="w-full bg-transparent border-none px-4 py-4 text-slate-200 placeholder-slate-500 font-mono text-sm focus:ring-0 focus:outline-none"
          />

          {/* Right status indicator */}
          <div className="pr-4 hidden sm:flex items-center gap-2">
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="text-[10px] uppercase font-mono text-slate-500 hover:text-slate-300 bg-slate-800 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
            <div className="h-4 w-[1px] bg-slate-700 mx-2" />
            <div
              className={`w-2 h-2 rounded-full ${
                status === 'ready' ? 'bg-green-500' : 'bg-slate-600'
              } ${status === 'loading' ? 'animate-pulse bg-yellow-500' : ''}`}
            />
          </div>
        </div>

        {/* Loading progress bar (bottom) */}
        {status === 'loading' && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-800">
            <motion.div
              className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        )}
      </div>

      {/* Status message or hints */}
      <AnimatePresence>
        {isFocused && status === 'idle' && !query && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-xs font-mono text-slate-500 pl-2 overflow-hidden"
          >
            <span className="text-cyan-500/70">{'>'}</span> TRY: &quot;Discord
            bot&quot;, &quot;Library tools&quot;, &quot;Real-time app&quot;
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
