'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

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
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enableDark = stored ? stored === 'dark' : systemDark;
    setIsDark(enableDark);
    document.documentElement.classList.toggle('dark', enableDark);
  }, []);

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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between 
                 w-[60%] max-w-xl bg-neutral-900/80 dark:bg-neutral-950/80 
                 backdrop-blur-md border border-neutral-800 shadow-md 
                 rounded-2xl px-4"
    >
      {/* Brand */}
      <div className="h-12 w-12 bg-blue-500/20 text-blue-400 
                      dark:bg-blue-400/20 dark:text-blue-300
                      rounded-lg grid place-items-center font-bold select-none text-lg">
        H
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-row items-center gap-6">
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => setActiveTab(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`font-Molde tracking-tight text-base transition-colors duration-300 relative 
                ${active
                  ? 'text-blue-400 font-semibold underline underline-offset-4 decoration-blue-500/50'
                  : 'text-gray-400 hover:text-blue-400'
                }`}
            >
              /{tab.label}
            </Link>
          );
        })}
      </div>

      {/* Theme + Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          
          aria-label="Toggle theme"
          className="bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-800 
                     text-gray-300 hover:text-blue-400 rounded-lg p-2 
                     h-12 w-12 grid place-items-center transition-colors"
        >
          {/* Sun Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isDark ? 'hidden' : 'block'}`}
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
          {/* Moon Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isDark ? 'block' : 'hidden'}`}
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

        {/* Hamburger Menu (mobile only) */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 
                     text-gray-300 hover:text-blue-400 transition-colors"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-neutral-900 dark:bg-neutral-950 
                        border-t border-neutral-800 shadow-md rounded-b-2xl 
                        md:hidden flex flex-col py-3">
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 font-mono text-base transition-colors 
                  ${active
                    ? 'text-blue-400 font-semibold bg-neutral-800'
                    : 'text-gray-400 hover:text-blue-400'
                  }`}
              >
                /{tab.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
