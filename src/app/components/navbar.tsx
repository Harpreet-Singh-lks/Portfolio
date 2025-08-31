'use client';

import React, { useEffect } from 'react';
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
  
];

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const pathname = usePathname();

  // Ensure dark theme is always applied
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0a0a0a';
  }, []);

  // Sync active tab with current pathname
  useEffect(() => {
    const match = tabs.find(t => t.href === pathname);
    if (match && activeTab !== match.id) {
      setActiveTab(match.id);
    }
  }, [pathname, activeTab, setActiveTab]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between 
                 w-[90%] sm:w-[70%] md:w-[60%] max-w-2xl
                 bg-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 
                 shadow-2xl shadow-black/20 rounded-2xl px-6 py-3
                 transition-all duration-300 hover:shadow-3xl hover:shadow-black/30"
    >
      {/* Brand Logo */}
      <div className="flex items-center">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 
                        text-white rounded-xl grid place-items-center 
                        font-bold text-lg shadow-lg shadow-blue-500/20
                        transition-transform duration-200 hover:scale-105">
          H
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`font-medium text-sm tracking-wide transition-all duration-300 
                         relative group py-2 px-1
                         ${isActive
                           ? 'text-blue-400' 
                           : 'text-neutral-400 hover:text-white'
                         }`}
            >
              /{tab.label}
              {/* Active indicator */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 
                               transition-all duration-300 rounded-full
                               ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          );
        })}
      </div>

      {/* Optional: Settings or user menu placeholder */}
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Menu"
          className="h-10 w-10 bg-neutral-800/50 hover:bg-neutral-700/50 
                     text-neutral-400 hover:text-white rounded-xl
                     transition-all duration-200 hover:scale-105
                     grid place-items-center group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;