'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { profile, sections } from '@/app/lib/content';

export default function LeftRail() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-1/3 border-r-2 border-ember bg-gradient-to-r from-ink to-[#1a0f0b] md:block">
        <div className="flex h-full flex-col justify-center px-10 lg:px-16">
          <Link href="/" className="font-display text-4xl text-ember lg:text-5xl">
            Portfolio
          </Link>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            {profile.fullName}
          </p>
          <nav aria-label="Other pages" className="mt-10 flex flex-col gap-2 text-xs uppercase tracking-widest">
            <Link href="/chat" className="text-neutral-400 transition-colors hover:text-ember">
              Ask me →
            </Link>
            <Link href="/blog" className="text-neutral-400 transition-colors hover:text-ember">
              Blog →
            </Link>
          </nav>
        </div>
        <nav aria-label="Sections" className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-3">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={jump(s.id)}
              aria-label={s.label}
              aria-current={active === s.id ? 'true' : undefined}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                active === s.id ? 'bg-ember' : 'bg-neutral-600 hover:bg-neutral-400'
              }`}
            />
          ))}
        </nav>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-ink/90 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="font-display text-2xl text-ember">
          Portfolio
        </Link>
        <nav aria-label="Other pages" className="flex gap-4 text-xs uppercase tracking-widest text-neutral-400">
          <Link href="/chat">Ask me</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </header>
    </>
  );
}
