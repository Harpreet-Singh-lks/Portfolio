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
