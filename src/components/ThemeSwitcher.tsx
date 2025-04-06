'use client';

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ColorThemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, themes, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded border p-2 dark:border-gray-500">
        <div className="size-6"></div>
      </div>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="カラーテーマを選択する"
          className="rounded border p-2 text-black  dark:text-slate-300"
          type="button"
        >
          {resolvedTheme === 'light' ? (
            <SunIcon className="size-6 text-yellow-500" />
          ) : (
            <MoonIcon className="size-6 text-blue-300" />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="overflow-hidden rounded border bg-white shadow-sm dark:border-gray-500 dark:bg-gray-950"
          sideOffset={8}
          style={{ zIndex: 50 }}
        >
          <DropdownMenu.Group className="flex flex-col">
            {themes.map((item) => (
              <DropdownMenu.Item
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-gray-800 ${item === theme ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                key={item}
                onClick={() => setTheme(item)}
              >
                {item === 'light' ? (
                  <SunIcon className="size-5 text-yellow-500" />
                ) : item === 'system' ? (
                  <ComputerDesktopIcon className="size-5" />
                ) : item === 'dark' ? (
                  <MoonIcon className="size-5 text-blue-300" />
                ) : null}
                <span className="capitalize">{item}</span>
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
