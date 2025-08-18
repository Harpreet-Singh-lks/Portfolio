'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'home', href: '/' },
  { id: 'chat', label: 'chat', href: '/chat' },
  { id: 'blog', label: 'blog', href: '/blog' },
  { id: 'resume', label: 'resume', href: '/resume' }
];

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme: localStorage > system preference
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enableDark = stored ? stored === 'dark' : systemDark;
    setIsDark(enableDark);
    document.documentElement.classList.toggle('dark', enableDark);
  }, []);

  // Sync active tab from pathname if not provided manually
  useEffect(() => {
    const match = tabs.find(t => t.href === pathname);
    if (match && activeTab !== match.id) setActiveTab(match.id);
  }, [pathname, activeTab, setActiveTab]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <nav
      role="navigation"
      aria-label="Main"
      className="fixed flex items-center top-4 left-1/2 -translate-x-1/2 h-9 gap-4 bg-background/60 dark:bg-card/60 backdrop-blur-md border shadow-sm rounded-xl z-50 px-0"
    >
      {/* Logo / Initial */}
      <div className="h-9 w-9 bg-secondary/20 dark:bg-secondary/60 text-primary rounded-l-xl grid place-items-center font-bold select-none">
        H
      </div>

      {/* Links */}
      <div className="flex flex-row items-baseline gap-8 px-1">
        {tabs.map(tab => {
          const active = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setActiveTab(tab.id)}
                aria-current={active ? 'page' : undefined}
                className={`font-mono tracking-tight text-sm transition-colors duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded ${
                  active
                    ? 'text-primary underline underline-offset-4 font-medium decoration-secondary/70 dark:decoration-secondary-foreground/50 decoration-wavy'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                /{tab.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary/50 rounded"
                  />
                )}
              </Link>
            );
        })}
      </div>

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="bg-secondary/20 dark:bg-secondary/60 text-primary rounded-r-xl p-2 h-9 w-9 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {/* Sun (light mode icon shows when dark is off) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${isDark ? 'hidden' : 'block'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        {/* Moon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${isDark ? 'block' : 'hidden'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;