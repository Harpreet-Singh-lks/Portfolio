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
        <span className="inline-block border border-amber-400/40 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-amber-300">
          {project.badge}
        </span>
      )}
      <h3 className="mt-3 break-words font-display text-5xl font-bold leading-none tracking-[-0.02em] text-white xl:text-7xl">{project.title}</h3>
      <p className={`mt-2 text-sm font-semibold uppercase tracking-[0.08em] ${accent ? 'text-white' : 'text-ember'}`}>{project.subtitle}</p>
      <p className={`mt-4 max-w-xl text-[17px] leading-[1.7] ${accent ? 'ml-auto text-white/85' : 'text-neutral-400'}`}>
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul className={`mt-4 flex flex-wrap gap-2 ${accent ? 'justify-end' : ''}`}>
          {project.tags.map((t) => (
            <li key={t} className="border border-white/15 px-2.5 py-1 text-[13px] font-medium tracking-[0.02em] text-neutral-300">{t}</li>
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
              className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-white hover:text-ember"
            >
              <ExternalLink className="h-3.5 w-3.5" /> {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
