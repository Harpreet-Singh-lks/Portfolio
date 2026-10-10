# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page with a close clone of the reference design (left rail + scrolling sections, dark + rust-orange), driven by placeholder content in `content.ts`.

**Architecture:** A new single-page `/` composed of small presentational components reading typed data from `src/app/lib/content.ts`. A fixed `LeftRail` (client, tracks active section) sits beside a scrolling content column. `/chat` and `/blog` keep their routes and the existing `Navbar`.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind 3 (`tailwind.config.js`), framer-motion, lucide-react, `next/font/google` (Cormorant Garamond, DM Sans).

**Spec:** `docs/superpowers/specs/2026-10-10-portfolio-redesign-design.md`

**Deviation from spec:** `chat/page.tsx` and `blog/page.tsx` import `Navbar`, so `navbar.tsx` is **kept** (spec said it may be removed). It is simply no longer used on `/`.

## Global Constraints

- Fidelity: close clone of reference `~/Downloads/design for portfolio .png`.
- Content lives only in `src/app/lib/content.ts`; every placeholder is marked `// TODO`.
- Keep real facts already in repo: IIT Roorkee 4th-year B.Tech EE; stack TypeScript/Rust/Go/Python/Node/PostgreSQL/Docker/Kafka/React/Next.js/Solidity; email `preetsinghlks@gmail.com`.
- Fonts: Cormorant Garamond (display serif), DM Sans (body) via `next/font/google`.
- Accent colors: card rust `#8f3d2e`, text accent `#e8663d`, background `#0a0a0a`.
- `/chat`, `/blog`, `/api/ask` keep working; "Ask me" link in the rail points to `/chat`.
- Responsive: rail hidden below `md`, replaced by a sticky top bar; no horizontal scroll at 390px.
- **The working tree has the user's uncommitted edits** (`package.json`, `chat/page.tsx`, `ExperienceTimeline.tsx`, `ProjectCard.tsx`, `about.tsx`, `command-palette.tsx`, `contact.tsx`, `skills.tsx`). Never `git add -A` / `git add .`; stage only the files a task names. Do not edit those files except where a task says so.
- No test runner exists in the repo; verification = `npx tsc --noEmit`, `npm run build`, `npm run lint`, and Playwright screenshots. Do not add a test framework.

## Review Focus

- Content arrays empty (no featured projects, no grid projects, a project with no tags or no links): sections must render without empty cards or crashes.
- A social entry without an `href`: it is skipped, not rendered as a dead icon.
- Very long project title or tag list at 390px: wraps, no horizontal page scroll.
- Hero button / dot-nav targets a section id that doesn't exist: no throw.
- `IntersectionObserver` unavailable or no section intersecting yet: rail still renders with the first dot active.

---

### Task 1: Foundation — fonts, tokens, content data

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.js`
- Modify: `src/app/globals.css` (append only)
- Create: `src/app/lib/content.ts`
- Create: `src/app/components/ScrollFadeIn.tsx`

**Interfaces:**
- Produces (`content.ts`): types `Profile`, `FeaturedProject`, `GridProject`, `SkillGroup`, `Social`, `SectionLink`; exports `profile`, `sections`, `about`, `featuredProjects`, `projects`, `skillGroups`, `socials`.
- Produces: `ScrollFadeIn` default-less named export `{ ScrollFadeIn }` with props `{ children, delay?, className? }`.
- Produces: Tailwind classes `bg-ink`, `bg-rust`, `text-ember`, `border-ember`, `font-display`, `font-sans`, `bg-grid`.

- [ ] **Step 1: Baseline build**

Run: `cd /Users/harpreetsingh/Documents/Projects/Portfolio && npm run build`
Expected: note whether it passes before any change. If it fails for pre-existing reasons, record the error and continue; later "build passes" means "no new errors".

- [ ] **Step 2: Write `src/app/lib/content.ts`**

```ts
export type SectionLink = { id: string; label: string };

export type Profile = {
  name: string;
  fullName: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
};

export type Link = { label: string; href: string };

export type FeaturedProject = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: Link[];
  variant: 'dark' | 'accent';
};

export type GridProject = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: Link[];
};

export type SkillGroup = { label: string; items: string[] };
export type Social = { label: string; href?: string; icon: 'github' | 'linkedin' | 'twitter' | 'mail' };

export const sections: SectionLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'connect', label: 'Connect' },
];

export const profile: Profile = {
  name: 'Harpreet',
  fullName: 'Harpreet Singh',
  role: 'Full-Stack Developer',
  tagline: 'Backend · Web3 · DeFi', // TODO: confirm tagline
  bio: 'IIT Roorkee engineer building backend systems, DeFi protocols and full-stack apps. If it needs a server, a chain, or a socket, I can ship it.', // TODO: refine
  email: 'preetsinghlks@gmail.com',
};

export const about = {
  paragraphs: [
    "I'm a 4th-year B.Tech Electrical Engineering student at IIT Roorkee who likes building things end to end — backend systems, DeFi protocols, and full-stack apps.",
    'I work mostly in TypeScript, Rust, Go and Python, with Docker, Next.js and Solidity in the toolbox.', // TODO: add hackathons / achievements
    'I enjoy the blockchain space and experimenting across the stack, from smart contracts to infrastructure.', // TODO
  ],
  quote: 'Build it, test it, ship it.', // TODO: your own line
};

export const featuredProjects: FeaturedProject[] = [
  {
    badge: 'FEATURED · TODO ACHIEVEMENT', // TODO
    title: 'Project One', // TODO
    subtitle: 'CHAIN · CATEGORY', // TODO
    description: 'TODO: one or two sentences about what this project does and why it matters.',
    tags: ['TypeScript', 'Solidity', 'Next.js'], // TODO
    links: [
      { label: 'Live', href: 'https://example.com' }, // TODO
      { label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }, // TODO
    ],
    variant: 'dark',
  },
  {
    badge: 'FEATURED · TODO ACHIEVEMENT', // TODO
    title: 'Project Two', // TODO
    subtitle: 'STACK · CATEGORY', // TODO
    description: 'TODO: one or two sentences about what this project does and why it matters.',
    tags: ['Go', 'PostgreSQL', 'Kafka'], // TODO
    links: [
      { label: 'Live', href: 'https://example.com' }, // TODO
      { label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }, // TODO
    ],
    variant: 'accent',
  },
];

export const projects: GridProject[] = [
  {
    title: 'Project Three', // TODO
    subtitle: 'CATEGORY',
    description: 'TODO: short description.',
    tags: ['Rust', 'Docker'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }],
  },
  {
    title: 'Project Four', // TODO
    subtitle: 'CATEGORY',
    description: 'TODO: short description.',
    tags: ['React', 'Node.js'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }],
  },
  {
    title: 'Project Five', // TODO
    subtitle: 'CATEGORY',
    description: 'TODO: short description.',
    tags: ['Python'],
    links: [],
  },
];

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['TypeScript', 'Rust', 'Go', 'Python', 'C/C++', 'Solidity'] },
  { label: 'Frameworks', items: ['Next.js', 'React', 'Node.js', 'Remix', 'Tailwind'] },
  { label: 'Backend & Infra', items: ['PostgreSQL', 'Docker', 'Kafka'] },
  { label: 'Web3', items: ['EVM', 'Ethers.js', 'Hardhat'] },
];

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks', icon: 'github' },
  { label: 'LinkedIn', href: undefined, icon: 'linkedin' }, // TODO: add URL
  { label: 'Twitter', href: undefined, icon: 'twitter' }, // TODO: add URL
  { label: 'Email', href: 'mailto:preetsinghlks@gmail.com', icon: 'mail' },
];
```

- [ ] **Step 3: Write `src/app/components/ScrollFadeIn.tsx`**

```tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScrollFadeIn = ({ children, delay = 0, className = '' }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

- [ ] **Step 4: Replace `src/app/layout.tsx`**

```tsx
import './globals.css';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Harpreet Singh — Portfolio',
  description: 'Full-stack developer building backend systems, DeFi and web apps.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="bg-ink font-sans text-neutral-300 antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Extend `tailwind.config.js`** — inside `theme.extend` add (keep existing `colors` entries, add alongside them):

```js
colors: {
  // ...existing border/background/foreground/primary/secondary/muted/card...
  ink: '#0a0a0a',
  rust: '#8f3d2e',
  ember: '#e8663d',
},
fontFamily: {
  display: ['var(--font-display)', 'Georgia', 'serif'],
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
},
```

- [ ] **Step 6: Append to `src/app/globals.css`**

```css
/* Subtle grid texture used by the portfolio home */
.bg-grid {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 7: Typecheck and commit**

Run: `npx tsc --noEmit`
Expected: no errors from the new/edited files.

```bash
git add src/app/layout.tsx tailwind.config.js src/app/globals.css src/app/lib/content.ts src/app/components/ScrollFadeIn.tsx
git commit -m "feat: add design tokens, fonts and placeholder content for redesign

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: LeftRail and Hero

**Files:**
- Create: `src/app/components/LeftRail.tsx`
- Create: `src/app/components/Hero.tsx`

**Interfaces:**
- Consumes: `profile`, `sections` from `@/app/lib/content`.
- Produces: `LeftRail` (default export, no props); `Hero` (default export, no props, renders `<section id="hero">`).

- [ ] **Step 1: Write `LeftRail.tsx`**

```tsx
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
```

- [ ] **Step 2: Write `Hero.tsx`**

```tsx
import { profile } from '@/app/lib/content';

const btn =
  'border border-ember/60 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ember transition-colors hover:bg-ember hover:text-ink';

export default function Hero() {
  return (
    <section id="hero" className="flex min-h-screen items-center px-6 md:px-12 lg:px-16">
      <div className="max-w-xl">
        <h1 className="font-display text-5xl font-semibold leading-tight text-white md:text-6xl">
          I&apos;m {profile.name}.
        </h1>
        <p className="mt-3 text-xs text-neutral-400">
          {profile.role} <span className="mx-2 text-neutral-600">·</span> {profile.tagline}
        </p>
        <div className="my-5 h-px w-16 bg-ember" />
        <p className="max-w-md text-sm leading-relaxed text-neutral-500">{profile.bio}</p>
        <div className="mt-6 flex gap-3">
          <a href="#projects" className={btn}>View Work →</a>
          <a href="#connect" className={btn}>Get in Touch →</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Typecheck and commit**

Run: `npx tsc --noEmit` — Expected: no errors.

```bash
git add src/app/components/LeftRail.tsx src/app/components/Hero.tsx
git commit -m "feat: add LeftRail and Hero components

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: About card and Projects

**Files:**
- Create: `src/app/components/AboutCard.tsx`
- Create: `src/app/components/FeaturedProject.tsx`
- Create: `src/app/components/ProjectGrid.tsx`
- Create: `src/app/components/ProjectsBlock.tsx`

**Interfaces:**
- Consumes: `about`, `featuredProjects`, `projects`, types `FeaturedProject as FeaturedProjectData`, `GridProject`, `Link as ProjectLink` from `@/app/lib/content`; `ScrollFadeIn` from `./ScrollFadeIn`.
- Produces: `AboutCard` (renders `<section id="about">`), `ProjectsBlock` (renders `<section id="projects">`, composes `FeaturedProject` + `ProjectGrid`).

- [ ] **Step 1: `AboutCard.tsx`**

```tsx
import { about } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function AboutCard() {
  return (
    <section id="about" className="px-6 py-24 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <div className="flex min-h-[420px] flex-col justify-center rounded-md bg-rust p-8 md:p-12">
          <div className="max-w-md space-y-4 text-sm leading-relaxed text-white/90">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {about.quote && (
              <blockquote className="pt-2 font-display text-lg italic text-white/80">
                <span className="mr-2 text-2xl text-ember">&ldquo;</span>
                {about.quote}
              </blockquote>
            )}
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
```

- [ ] **Step 2: `FeaturedProject.tsx`**

```tsx
import { ExternalLink } from 'lucide-react';
import type { FeaturedProject as Data } from '@/app/lib/content';

export default function FeaturedProject({ project }: { project: Data }) {
  const accent = project.variant === 'accent';
  return (
    <article
      className={`rounded-md p-6 md:p-8 ${
        accent ? 'bg-rust text-right' : 'border border-white/10 bg-white/[0.03]'
      }`}
    >
      {project.badge && (
        <span className="inline-block border border-amber-400/40 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-amber-300">
          {project.badge}
        </span>
      )}
      <h3 className="mt-3 break-words font-display text-4xl text-white md:text-5xl">{project.title}</h3>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ember">{project.subtitle}</p>
      <p className={`mt-3 max-w-lg text-sm leading-relaxed text-neutral-400 ${accent ? 'ml-auto' : ''}`}>
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul className={`mt-4 flex flex-wrap gap-2 ${accent ? 'justify-end' : ''}`}>
          {project.tags.map((t) => (
            <li key={t} className="border border-white/15 px-2 py-0.5 text-[10px] text-neutral-300">{t}</li>
          ))}
        </ul>
      )}
      {project.links.length > 0 && (
        <div className={`mt-4 flex flex-wrap gap-4 ${accent ? 'justify-end' : ''}`}>
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-white hover:text-ember"
            >
              <ExternalLink className="h-3 w-3" /> {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
```

- [ ] **Step 3: `ProjectGrid.tsx`**

```tsx
import { ExternalLink } from 'lucide-react';
import type { GridProject } from '@/app/lib/content';

export default function ProjectGrid({ items }: { items: GridProject[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => (
        <article key={p.title} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
          <h4 className="break-words font-display text-xl text-white">{p.title}</h4>
          <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-ember">{p.subtitle}</p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">{p.description}</p>
          {p.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="border border-white/15 px-1.5 py-0.5 text-[9px] text-neutral-300">{t}</li>
              ))}
            </ul>
          )}
          {p.links.length > 0 && (
            <div className="mt-3 flex gap-3">
              {p.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-ember hover:text-white"
                >
                  <ExternalLink className="h-3 w-3" /> {l.label}
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: `ProjectsBlock.tsx`**

```tsx
import { featuredProjects, projects } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';
import FeaturedProject from './FeaturedProject';
import ProjectGrid from './ProjectGrid';

export default function ProjectsBlock() {
  return (
    <section id="projects" className="px-6 py-24 md:px-12 lg:px-16">
      <div className="space-y-6">
        {featuredProjects.map((p, i) => (
          <ScrollFadeIn key={p.title} delay={i * 0.1}>
            <FeaturedProject project={p} />
          </ScrollFadeIn>
        ))}
      </div>
      {projects.length > 0 && (
        <ScrollFadeIn className="mt-12">
          <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-neutral-600">More Projects</p>
          <ProjectGrid items={projects} />
        </ScrollFadeIn>
      )}
    </section>
  );
}
```

- [ ] **Step 5: Typecheck and commit**

Run: `npx tsc --noEmit` — Expected: no errors.

```bash
git add src/app/components/AboutCard.tsx src/app/components/FeaturedProject.tsx src/app/components/ProjectGrid.tsx src/app/components/ProjectsBlock.tsx
git commit -m "feat: add About card and project components

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Skills and Connect

**Files:**
- Create: `src/app/components/SkillGroups.tsx`
- Create: `src/app/components/Connect.tsx`

**Interfaces:**
- Consumes: `skillGroups`, `socials`, `profile` from `@/app/lib/content`; `ScrollFadeIn`.
- Produces: `SkillGroups` (renders `<section id="skills">`), `Connect` (renders `<section id="connect">`).

- [ ] **Step 1: `SkillGroups.tsx`**

```tsx
import { skillGroups } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function SkillGroups() {
  return (
    <section id="skills" className="px-6 py-24 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <h2 className="font-display text-3xl text-white">Skills</h2>
        <div className="mt-8 space-y-6">
          {skillGroups
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <div key={g.label}>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-ember">{g.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[10px] text-neutral-300">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </ScrollFadeIn>
    </section>
  );
}
```

- [ ] **Step 2: `Connect.tsx`**

```tsx
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { profile, socials } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, mail: Mail };

export default function Connect() {
  return (
    <section id="connect" className="px-6 pb-16 pt-24 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <h2 className="font-display text-3xl text-white">Let&apos;s Connect</h2>
        <a href={`mailto:${profile.email}`} className="mt-4 block break-all text-lg text-white hover:text-ember">
          {profile.email}
        </a>
        <div className="mt-5 flex gap-3">
          {socials
            .filter((s) => s.href)
            .map((s) => {
              const Icon = icons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href!.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-neutral-400 transition-colors hover:border-ember hover:text-ember"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
        </div>
        <p className="mt-10 text-[10px] text-neutral-600">
          © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
        </p>
      </ScrollFadeIn>
    </section>
  );
}
```

- [ ] **Step 3: Typecheck and commit**

Run: `npx tsc --noEmit` — Expected: no errors.

```bash
git add src/app/components/SkillGroups.tsx src/app/components/Connect.tsx
git commit -m "feat: add Skills and Connect sections

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Wire the home page and verify

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/app/Dashboard/page.tsx`

**Interfaces:**
- Consumes: `LeftRail`, `Hero`, `AboutCard`, `ProjectsBlock`, `SkillGroups`, `Connect` (all default exports).
- Produces: the final `/` page.

- [ ] **Step 1: Confirm Dashboard is only used by `page.tsx`**

Run: `grep -rn "Dashboard" src --include="*.tsx" --include="*.ts"`
Expected: only `src/app/page.tsx` imports it (plus the Dashboard file itself).

- [ ] **Step 2: Replace `src/app/page.tsx`**

```tsx
import LeftRail from './components/LeftRail';
import Hero from './components/Hero';
import AboutCard from './components/AboutCard';
import ProjectsBlock from './components/ProjectsBlock';
import SkillGroups from './components/SkillGroups';
import Connect from './components/Connect';

export default function Home() {
  return (
    <div className="min-h-screen bg-ink bg-grid">
      <LeftRail />
      <main className="md:ml-[33.3333%]">
        <Hero />
        <AboutCard />
        <ProjectsBlock />
        <SkillGroups />
        <Connect />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Delete the old dashboard**

```bash
git rm src/app/Dashboard/page.tsx
```

- [ ] **Step 4: Build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds (or only the pre-existing errors recorded in Task 1 Step 1); `/` listed as a route.

- [ ] **Step 5: Visual check with Playwright**

Run `npm run dev` (port 3001) in the background. With Playwright MCP: navigate to `http://localhost:3001`, screenshot full page at 1440×900 and at 390×844. Compare to `~/Downloads/design for portfolio .png`: left rail + orange divider, hero, orange About card, dark + orange featured cards right-aligned for accent, 3-col grid, skill pills, Connect footer. At 390px: top bar visible, rail hidden, no horizontal scroll (`document.documentElement.scrollWidth <= window.innerWidth`).

- [ ] **Step 6: Check Review Focus cases**

Temporarily edit `content.ts` (revert after): set `featuredProjects = []`, `projects = []`, one `skillGroups[0].items = []`, and give one featured project `tags: []`, `links: []` and a 60-character title. Reload at 390px.
Expected: no crash, no empty cards or headings left behind, long title wraps, no horizontal scroll. Then set `socials[0].href = undefined`: that icon disappears. In the browser console run `document.getElementById('projects').remove()` then click "View Work →": nothing throws. Revert all temporary edits (`git diff src/app/lib/content.ts` must be empty).

- [ ] **Step 7: Check dot nav and links**

Scroll the page: the active dot follows the section. Click each dot: smooth scroll to that section. Click "Ask me →" and "Blog →": `/chat` and `/blog` load.

- [ ] **Step 8: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: switch home page to redesigned portfolio layout

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

(`git rm` in Step 3 is already staged and goes into this commit.)

---

### Task 6: Cleanup and chat/blog polish

**Files:**
- Modify: `src/app/components/navbar.tsx` (accent only)
- Delete (only if grep shows zero importers): `src/app/components/sections.tsx`, `src/app/components/ProjectsSection.tsx`, `src/app/components/footer.tsx`

**Interfaces:**
- Consumes: nothing new. `Navbar` stays for `/chat` and `/blog`.
- Do **not** delete or edit: `about.tsx`, `skills.tsx`, `ExperienceTimeline.tsx`, `ProjectCard.tsx`, `contact.tsx`, `command-palette.tsx`, `searchbar.tsx`, `MessageBubble.tsx` — they carry the user's uncommitted edits and `/chat` renders several of them via `MessageBubble`. Leave them.

- [ ] **Step 1: Find importers**

Run:
```bash
grep -rnE "components/(sections|ProjectsSection|footer)|from './(sections|ProjectsSection|footer)'" src
```
Expected: only `ProjectsSection.tsx` imports `./sections`; nothing else imports these three files.

- [ ] **Step 2: Delete the dead files**

```bash
git rm src/app/components/sections.tsx src/app/components/ProjectsSection.tsx src/app/components/footer.tsx
```

- [ ] **Step 3: Align Navbar accent with the new palette**

In `src/app/components/navbar.tsx`, change the logo block classes `bg-gradient-to-br from-orange-500 to-orange-600` and `shadow-orange-500/20` to `bg-ember` and `shadow-ember/20`; change `text-orange-400` (active link) to `text-ember`; change `bg-orange-500` (underline) to `bg-ember`.

- [ ] **Step 4: Build, lint, smoke test**

Run: `npm run build && npm run lint`
Expected: passes (or only pre-existing errors). In the dev server, load `/`, `/chat` (send a message such as `/about`), and `/blog`; each renders with the dark theme and no console errors attributable to this work.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/navbar.tsx
git commit -m "chore: remove dead components and align navbar accent

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```
