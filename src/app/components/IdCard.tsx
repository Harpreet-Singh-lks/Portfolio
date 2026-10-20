'use client';

import { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Boxes,
  Braces,
  Briefcase,
  Bot,
  Compass,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  RotateCw,
  Server,
  Terminal,
  Twitter,
} from 'lucide-react';
import { profile, socials } from '@/app/lib/content';

const stack = [
  { name: 'TypeScript', Icon: Braces },
  { name: 'NestJS', Icon: Server },
  { name: 'Python', Icon: Terminal },
  { name: 'PostgreSQL', Icon: Database },
  { name: 'LangGraph', Icon: Bot },
  { name: 'Solidity', Icon: Boxes },
];
const explored = 'AI agents, RAG, distributed systems, Web3 and backend infra';
const idNumber = 'HS-0057-IITR';
const socialIcons = { github: Github, linkedin: Linkedin, twitter: Twitter, mail: Mail };

// Deterministic Code-128-looking barcode so server and client render the same bars.
const bars = Array.from({ length: 30 }, (_, i) => ({
  w: [1, 2, 1, 3, 2, 1, 2][(i * 7 + 3) % 7],
  gap: [1, 2, 1, 1, 2][(i * 5 + 1) % 5],
}));

const face =
  'absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#121110] text-white [backface-visibility:hidden] ' +
  'shadow-[0_30px_70px_-15px_rgba(232,102,61,0.28),0_0_0_1px_rgba(255,255,255,0.04)_inset] ' +
  'bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]';

const label = 'flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ember';

function Avatar() {
  // Landscape source art; cover-fit the square frame and bias toward the face.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/saitama.png"
      alt="Saitama avatar"
      className="h-full w-full object-cover object-[50%_20%]"
      draggable={false}
    />
  );
}

export default function IdCard() {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, sx: 50, sy: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * 10, y: (px - 0.5) * 12, sx: px * 100, sy: py * 100 });
  };

  return (
    <div className="flex flex-col items-center">
      {/* lanyard strap */}
      <div className="relative h-24 w-8 bg-gradient-to-r from-rust via-ember to-rust shadow-[0_0_0_1px_rgba(0,0,0,0.4)] xl:h-40">
        <span
          className="absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-ink/80 [writing-mode:vertical-rl]"
          aria-hidden
        >
          {profile.fullName} ✦ {profile.fullName}
        </span>
      </div>
      {/* metal clip */}
      <div className="relative z-10 -mb-3 h-7 w-11 rounded-md bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-500 shadow-md" aria-hidden>
        <div className="absolute left-1/2 top-2 h-3 w-5 -translate-x-1/2 rounded-sm bg-neutral-700/60" />
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0, sx: 50, sy: 50 })}
        className="origin-top [perspective:1400px] motion-safe:animate-[card-swing_6s_ease-in-out_infinite]"
      >
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label="Flip ID card"
          aria-pressed={flipped}
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (flipped ? 180 : 0)}deg)` }}
          className="relative block h-[560px] w-[min(320px,calc(100vw-48px))] text-left transition-transform duration-500 ease-out [transform-style:preserve-3d] md:h-[560px] md:w-[360px] xl:h-[620px] xl:w-[400px]"
        >
          {/* front */}
          <div className={face}>
            <div className="relative flex items-center justify-between bg-ember px-5 pb-3 pt-10 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink md:px-6 md:text-[11px] md:tracking-[0.22em]">
              <div className="absolute left-1/2 top-4 h-3 w-20 -translate-x-1/2 rounded-full bg-ink shadow-[inset_0_2px_3px_rgba(0,0,0,0.9)]" aria-hidden />
              <span>Access Pass</span>
              <span>Eng · Backend/AI</span>
            </div>
            <div className="h-1 bg-rust" />

            <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-5 md:gap-5 md:px-6 md:pt-6">
              <div className="flex items-center gap-5">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-ember/70 shadow-[0_0_0_4px_rgba(232,102,61,0.15)] xl:h-28 xl:w-28">
                  <Avatar />
                </div>
                <div>
                  <p className={label}>Name</p>
                  <p className="font-display text-[30px] font-bold leading-[1.05] tracking-tight xl:text-[34px]">
                    Harpreet
                    <br />
                    Singh
                  </p>
                  <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                    <MapPin className="h-3 w-3" /> India
                  </p>
                </div>
              </div>

              <div className="border-t border-dashed border-white/15 pt-4">
                <p className={label}>
                  <Briefcase className="h-3 w-3" /> Role
                </p>
                <p className="mt-1 text-[15px] font-medium text-neutral-100">{profile.role}</p>
              </div>

              <div>
                <p className={label}>
                  <Terminal className="h-3 w-3" /> Stack
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {stack.map(({ name, Icon }) => (
                    <li
                      key={name}
                      className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
                    >
                      <Icon className="h-3 w-3 text-ember" /> {name}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={label}>
                  <Compass className="h-3 w-3" /> Explored
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">{explored}</p>
              </div>

              <div className="mt-auto flex items-end justify-between">
                <div>
                  <div className="flex h-10 items-stretch" aria-hidden>
                    {bars.map((b, i) => (
                      <span key={i} className="bg-neutral-200" style={{ width: b.w * 1.6, marginRight: b.gap * 1.2 }} />
                    ))}
                  </div>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-neutral-500">{idNumber}</p>
                </div>
                <p className="flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  <span className="hidden md:inline">tap to</span> flip <RotateCw className="h-3 w-3 text-ember" />
                </p>
              </div>
            </div>

            {/* gloss that follows the cursor */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background: `radial-gradient(circle at ${tilt.sx}% ${tilt.sy}%, rgba(255,255,255,0.35), transparent 55%)`,
              }}
            />
          </div>

          {/* back */}
          <div className={`${face} [transform:rotateY(180deg)]`}>
            <div className="relative bg-ember px-5 pb-3 pt-10 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink md:px-6 md:text-[11px] md:tracking-[0.22em]">
              <div className="absolute left-1/2 top-4 h-3 w-20 -translate-x-1/2 rounded-full bg-ink shadow-[inset_0_2px_3px_rgba(0,0,0,0.9)]" aria-hidden />
              Contact · Links
            </div>
            <div className="h-1 bg-rust" />
            <div className="flex flex-1 flex-col gap-1 px-6 pb-5 pt-6">
              {socials
                .filter((s) => s.href)
                .map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.icon === 'mail' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group flex items-center gap-3 border-b border-dashed border-white/15 py-4 text-lg font-medium text-neutral-200 transition-colors hover:text-ember"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-neutral-400 transition-colors group-hover:border-ember group-hover:text-ember">
                        <Icon className="h-4 w-4" />
                      </span>
                      {s.label}
                      <ArrowUpRight className="ml-auto h-4 w-4 text-neutral-500 group-hover:text-ember" />
                    </a>
                  );
                })}
              <p className="mt-auto text-[11px] leading-relaxed text-neutral-500">
                If found, please return to the nearest backend. Property of {profile.fullName}.
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-neutral-600">{idNumber}</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
