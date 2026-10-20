'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { featuredProjects, profile, projects, sections } from '@/app/lib/content';

const projectCount = featuredProjects.length + projects.length;
// Blog link hidden until the placeholder posts are replaced with real writing.
const showBlog = false;

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

  const current = sections.find((s) => s.id === active) ?? sections[0];
  const caption = current.id === 'hero' ? profile.fullName.toUpperCase() : current.caption;
  const subtitle = current.id === 'projects' ? `${projectCount} projects` : current.subtitle;

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
        <nav aria-label="Sections" className="absolute left-6 top-1/2 flex -translate-y-1/2 flex-col gap-3.5">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={jump(s.id)}
              aria-label={s.label}
              aria-current={active === s.id ? 'true' : undefined}
              className={`block rounded-full transition-all ${
                active === s.id
                  ? 'h-3 w-3 bg-ember ring-4 ring-ember/25'
                  : 'h-2 w-2 bg-neutral-600 hover:bg-neutral-400'
              }`}
            />
          ))}
        </nav>

        <div className="flex h-full flex-col justify-center px-16 lg:px-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-5xl font-light !leading-[0.95] tracking-[-0.03em] text-ember lg:text-7xl xl:text-[80px]">{current.title}</h2>
              {caption && (
                <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{caption}</p>
              )}
              {subtitle && <p className="mt-2 font-display text-base italic text-neutral-500">{subtitle}</p>}
            </motion.div>
          </AnimatePresence>
        </div>

        {showBlog && (
          <nav
            aria-label="Other pages"
            className="absolute bottom-10 left-16 flex gap-6 text-sm uppercase tracking-widest lg:left-24"
          >
            <Link href="/blog" className="text-neutral-500 transition-colors hover:text-ember">Blog →</Link>
          </nav>
        )}
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-ink/90 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="font-display text-2xl text-ember">
          Portfolio
        </Link>
        {showBlog && (
          <nav aria-label="Other pages" className="flex gap-4 text-sm uppercase tracking-widest text-neutral-400">
            <Link href="/blog" className="py-2">Blog</Link>
          </nav>
        )}
      </header>
    </>
  );
}
