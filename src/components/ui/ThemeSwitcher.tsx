'use client';

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

const ColorThemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, themes, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="glass rounded-xl border border-white/10 p-2">
        <div className="size-6"></div>
      </div>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="カラーテーマを選択する"
          className="glass rounded-xl border border-white/10 p-2 text-foreground transition-all duration-200 hover:scale-105 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          type="button"
        >
          {resolvedTheme === 'light' ? (
            <SunIcon className="size-6 text-amber-500" />
          ) : (
            <MoonIcon className="size-6 text-blue-400" />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="glass overflow-hidden rounded-xl border border-white/10 shadow-glass backdrop-blur-xl"
          sideOffset={8}
          style={{ zIndex: 50 }}
        >
          <DropdownMenu.Group className="flex flex-col p-1">
            {themes.map((item) => (
              <DropdownMenu.Item
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-white/10 focus:bg-white/10 focus:outline-none ${
                  item === theme
                    ? 'bg-primary/20 text-primary-foreground'
                    : 'text-foreground'
                }`}
                key={item}
                onClick={() => setTheme(item)}
              >
                {item === 'light' ? (
                  <SunIcon className="size-5 text-amber-500" />
                ) : item === 'system' ? (
                  <ComputerDesktopIcon className="size-5 text-foreground/70" />
                ) : item === 'dark' ? (
                  <MoonIcon className="size-5 text-blue-400" />
                ) : null}
                <span className="capitalize">
                  {item === 'system'
                    ? 'システム'
                    : item === 'light'
                      ? 'ライト'
                      : 'ダーク'}
                </span>
                {item === theme && (
                  <div className="ml-auto size-2 rounded-full bg-primary" />
                )}
                {item === theme && <span className="sr-only">（選択中）</span>}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ColorThemeSelector;
