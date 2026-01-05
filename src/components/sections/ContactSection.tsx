'use client';

import {
  SiGithub,
  SiInstagram,
  SiQiita,
  SiX,
  SiZenn,
} from '@icons-pack/react-simple-icons';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, Send } from 'lucide-react';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useLanyard } from '@/hooks/useLanyard';

const contactMethods = [
  {
    icon: Mail,
    title: 'EMAIL',
    contact: 'contact@fukayatti0.dev',
    href: 'mailto:contact@fukayatti0.dev',
  },
  {
    icon: SiX,
    title: 'X (TWITTER)',
    contact: '@fukayatti',
    href: 'https://twitter.com/fukayatti',
  },
  {
    icon: SiInstagram,
    title: 'INSTAGRAM',
    contact: '@fukayatti0',
    href: 'https://instagram.com/fukayatti0',
  },
  {
    icon: SiGithub,
    title: 'GITHUB',
    contact: '@fukayatti',
    href: 'https://github.com/fukayatti',
  },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/fukayatti', icon: SiGithub },
  {
    name: 'X',
    href: 'https://twitter.com/fukayatti',
    icon: SiX,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/fukayatti0',
    icon: SiInstagram,
  },
  { name: 'Qiita', href: 'https://qiita.com/fukayatti', icon: SiQiita },
  { name: 'Zenn', href: 'https://zenn.dev/fukayatti', icon: SiZenn },
];

// Matrix-style falling characters
function MatrixRain() {
  const [columns, setColumns] = useState<
    { chars: string[]; speed: number; x: number }[]
  >([]);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const newColumns = Array.from({ length: 20 }, (_, i) => ({
      chars: Array.from(
        { length: 15 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ),
      speed: 2 + Math.random() * 3,
      x: (i / 20) * 100,
    }));
    setColumns(newColumns);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
      {columns.map((col, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-cyan-500 whitespace-pre leading-4"
          style={{ left: `${col.x}%` }}
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.1,
          }}
        >
          {col.chars.join('\n')}
        </motion.div>
      ))}
    </div>
  );
}

// Terminal-style input
function TerminalInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = `w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-slate-600 ${multiline ? 'resize-none min-h-[120px]' : ''}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-mono text-cyan-500 uppercase tracking-wider"
      >
        {'{'} {label} {'}'}
      </label>
      <div
        className={`relative p-4 bg-slate-900/50 border transition-colors duration-300 ${isFocused ? 'border-cyan-500' : 'border-slate-700'}`}
      >
        <div className="flex items-start gap-3">
          <span className="text-cyan-500 font-mono select-none">{'>'}</span>
          {multiline ? (
            <textarea
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={inputClasses}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          ) : (
            <input
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={inputClasses}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </div>

        {/* Cursor blink effect */}
        {isFocused && !value && (
          <motion.span
            className="absolute bottom-4 left-[38px] w-2 h-5 bg-cyan-500"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

// Discord Status Component - Detailed Activity Display
function DiscordStatus() {
  const { data: lanyard } = useLanyard();

  // Get all activities (not Custom Status)
  const activities =
    lanyard?.activities.filter((a) => a.name !== 'Custom Status') || [];

  // Helper function to calculate elapsed time
  const formatElapsed = (startTime?: number) => {
    if (!startTime) return null;
    const now = Date.now();
    const diff = now - startTime;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Force re-render every second to update elapsed times
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!lanyard) return null;

  const statusColors: Record<
    string,
    { bg: string; text: string; glow: string }
  > = {
    online: {
      bg: 'bg-green-500',
      text: 'text-green-400',
      glow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
    },
    idle: {
      bg: 'bg-yellow-500',
      text: 'text-yellow-400',
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.5)]',
    },
    dnd: {
      bg: 'bg-red-500',
      text: 'text-red-400',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    },
    offline: {
      bg: 'bg-gray-500',
      text: 'text-gray-400',
      glow: 'shadow-[0_0_15px_rgba(107,114,128,0.5)]',
    },
  };

  const status = statusColors[lanyard.discord_status] || statusColors.offline;
  const statusLabel =
    {
      online: 'ONLINE',
      idle: 'IDLE',
      dnd: 'DO NOT DISTURB',
      offline: 'OFFLINE',
    }[lanyard.discord_status] || 'OFFLINE';

  // Get activity image URL - now takes activity as parameter
  const getAssetUrl = (
    assetId: string | undefined,
    applicationId: string | undefined
  ) => {
    if (!assetId) return null;
    if (assetId.startsWith('mp:external/')) {
      // External image (e.g., from PreMiD)
      const externalUrl = assetId.replace('mp:external/', '');
      return `https://media.discordapp.net/external/${externalUrl}`;
    }
    if (applicationId) {
      return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;
    }
    return null;
  };

  return (
    <motion.div
      className="relative w-full font-mono text-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Terminal Container */}
      <div className="bg-black/90 border border-cyan-500/30 rounded-lg overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border-b border-cyan-500/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-cyan-500/70 text-xs ml-2">
            discord_presence.sh
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${status.bg}`}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`text-xs ${status.text}`}>{statusLabel}</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 space-y-2">
          {/* User Info Line */}
          <div className="flex items-center gap-3">
            <span className="text-green-400">$</span>
            <span className="text-slate-500">whoami</span>
          </div>
          <div className="flex items-center gap-3 pl-4">
            {/* Avatar */}
            <div className="relative w-16 h-16 shrink-0 group">
              {lanyard.discord_user.avatar ? (
                <>
                  <Image
                    src={`https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.png`}
                    alt="Discord Avatar"
                    fill
                    className="rounded object-cover brightness-110 contrast-110 saturate-50 hue-rotate-140"
                  />
                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 rounded pointer-events-none opacity-30"
                    style={{
                      background:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                    }}
                  />
                  <div className="absolute inset-0 rounded pointer-events-none bg-cyan-500/10" />
                </>
              ) : (
                <div className="w-full h-full bg-slate-800 rounded flex items-center justify-center">
                  <span className="text-xs text-slate-500">?</span>
                </div>
              )}
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${status.bg}`}
              />
            </div>
            <div className="space-y-0.5">
              <p className="text-white">
                {lanyard.discord_user.display_name ||
                  lanyard.discord_user.global_name}
              </p>
              <p className="text-slate-500 text-xs">
                @{lanyard.discord_user.username}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 my-3" />

          {/* Activities Section */}
          {activities.length > 0 && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-green-400">$</span>
                <span className="text-slate-500">get_activities</span>
                <span className="text-slate-700">
                  // {activities.length} active
                </span>
              </div>
              {activities.map((act, index) => {
                const largeImg = getAssetUrl(
                  act.assets?.large_image,
                  act.application_id
                );
                const smallImg = getAssetUrl(
                  act.assets?.small_image,
                  act.application_id
                );
                const elapsedTime = formatElapsed(act.timestamps?.start);

                return (
                  <div
                    key={act.id || index}
                    className="pl-4 flex items-start gap-4 mt-2"
                  >
                    {/* Activity Image */}
                    {largeImg && (
                      <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden border border-cyan-500/30">
                        <Image
                          src={largeImg}
                          alt={act.assets?.large_text || act.name}
                          fill
                          className="object-cover brightness-110 contrast-110 saturate-50 hue-rotate-140"
                        />
                        {/* Scanline overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-30"
                          style={{
                            background:
                              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                          }}
                        />
                        <div className="absolute inset-0 pointer-events-none bg-cyan-500/10" />
                        {smallImg && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black overflow-hidden">
                            <Image
                              src={smallImg}
                              alt={act.assets?.small_text || ''}
                              fill
                              className="object-cover brightness-110 contrast-110 saturate-50 hue-rotate-140"
                            />
                            <div className="absolute inset-0 bg-cyan-500/10" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Activity Details */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 text-xs uppercase">
                          {act.type === 0
                            ? '▶ PLAYING'
                            : act.type === 2
                              ? '♫ LISTENING'
                              : '● ACTIVITY'}
                        </span>
                      </div>
                      <p className="text-cyan-400 font-bold">{act.name}</p>
                      {act.details && (
                        <p className="text-slate-400 text-xs">
                          <span className="text-slate-600">→</span>{' '}
                          {act.details}
                        </p>
                      )}
                      {act.state && (
                        <p className="text-slate-500 text-xs">
                          <span className="text-slate-600">→</span> {act.state}
                        </p>
                      )}
                      {elapsedTime && (
                        <p className="text-xs">
                          <span className="text-slate-600">time:</span>{' '}
                          <span className="text-green-400">{elapsedTime}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Spotify Section */}
          {lanyard.spotify && activities.length === 0 && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-green-400">$</span>
                <span className="text-slate-500">now_playing</span>
              </div>
              <div className="pl-4 flex items-start gap-4">
                <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden border border-green-500/30">
                  <Image
                    src={lanyard.spotify.album_art_url}
                    alt={lanyard.spotify.album}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 text-xs">♫ SPOTIFY</span>
                  </div>
                  <p className="text-white font-bold">{lanyard.spotify.song}</p>
                  <p className="text-slate-400 text-xs">
                    <span className="text-slate-600">artist:</span>{' '}
                    {lanyard.spotify.artist}
                  </p>
                  <p className="text-slate-500 text-xs">
                    <span className="text-slate-600">album:</span>{' '}
                    {lanyard.spotify.album}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* No Activity */}
          {activities.length === 0 && !lanyard.spotify && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-green-400">$</span>
                <span className="text-slate-500">get_activities</span>
              </div>
              <div className="pl-4">
                <span className="text-slate-600">null</span>
                <span className="text-slate-700 ml-2">
                  // no active session
                </span>
              </div>
            </>
          )}

          {/* Blinking cursor */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-green-400">$</span>
            <motion.span
              className="w-2 h-4 bg-cyan-500"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactSection() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-black overflow-hidden">
      <MatrixRain />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] mb-4">
            ◈ SECTION_005 // CONTACT
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-6">
            GET IN
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              TOUCH
            </span>
          </h2>

          <p className="text-slate-400 max-w-xl font-mono text-sm">
            Have a project in mind? Let&apos;s build something extraordinary
            together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    method.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-700 hover:border-cyan-500 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <div className="w-12 h-12 border border-slate-600 group-hover:border-cyan-500 flex items-center justify-center transition-colors duration-300">
                    <method.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {method.title}
                    </div>
                    <div className="text-white font-mono">{method.contact}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            {/* Availability status */}
            <motion.div
              className="p-6 bg-slate-900/50 border border-cyan-500/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </motion.span>
                <span className="font-mono text-sm text-green-400 uppercase tracking-wider">
                  System Online
                </span>
              </div>
              <p className="text-slate-400 text-sm font-mono">
                Currently accepting new projects and collaborations. Response
                time: ~24h
              </p>
            </motion.div>

            {/* Mobile social links */}
            <div className="flex flex-wrap gap-3 lg:hidden">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-slate-700 hover:border-cyan-500 flex items-center justify-center transition-colors duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 bg-slate-900/30 border border-slate-700 backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-slate-500 font-mono">
                  contact.sh — zsh
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TerminalInput
                    label="NAME"
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <TerminalInput
                    label="EMAIL"
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>

                <TerminalInput
                  label="SUBJECT"
                  id="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  placeholder="Project Inquiry"
                />

                <TerminalInput
                  label="MESSAGE"
                  id="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  multiline
                />

                <motion.button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="group relative w-full px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-500 font-mono text-sm uppercase tracking-widest overflow-hidden disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-black transition-colors duration-300">
                    {status === 'submitting' ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          ⟳
                        </motion.span>
                        TRANSMITTING...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <Send className="w-4 h-4" />
                        SENT SUCCESSFULLY
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND MESSAGE
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-cyan-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Discord Activity Section - Centered below */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <DiscordStatus />
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-600 tracking-wider">
        TRANSMISSION READY
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-slate-600 tracking-wider">
        © 2025 FUKAYATTI0
      </div>
    </section>
  );
}
