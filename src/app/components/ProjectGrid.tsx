import { ExternalLink } from 'lucide-react';
import type { GridProject } from '@/app/lib/content';

export default function ProjectGrid({ items }: { items: GridProject[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => (
        <article key={p.title} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
          <h4 className="break-words font-display text-2xl font-bold tracking-[-0.02em] text-white">{p.title}</h4>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-ember">{p.subtitle}</p>
          <p className="mt-2 text-sm leading-[1.6] text-neutral-400">{p.description}</p>
          {p.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="border border-white/15 px-2 py-0.5 text-[11px] font-medium tracking-[0.02em] text-neutral-300">{t}</li>
              ))}
            </ul>
          )}
          {p.links.length > 0 && (
            <div className="mt-1 flex gap-4">
              {p.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 py-2 text-xs font-semibold uppercase tracking-widest text-ember hover:text-white"
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
