import React, { useEffect, useMemo, useState } from 'react';

export interface CommandItem {
  id: string;
  title: string;        // e.g. "/projects"
  description?: string; // e.g. "Explore my latest projects"
  intent: string;       // e.g. "projects"
}

interface Props {
  open: boolean;
  query: string;
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onClose: () => void; 
}

export default function CommandPalette({ open, query, items, onSelect, onClose }: Props) {
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = (query || '').replace(/^\//, '').toLowerCase();
    if (!q) return items;
    return items.filter(it =>
      it.title.replace(/^\//, '').toLowerCase().includes(q) ||
      (it.description || '').toLowerCase().includes(q) ||
      it.intent.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === 'Enter') {
        const item = filtered[active];
        if (item) { e.preventDefault(); onSelect(item); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose, onSelect]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl">
        <div className="px-4 py-3 border-b border-border text-sm text-muted-foreground">
          Command Palette — type to filter, Enter to select, Esc to close
        </div>
        <ul role="listbox" className="max-h-[50vh] overflow-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">No commands</li>
          )}
          {filtered.map((it, idx) => (
            <li key={it.id}>
              <button
                role="option"
                aria-selected={idx === active}
                onMouseEnter={() => setActive(idx)}
                onClick={() => onSelect(it)}
                className={[
                  'w-full text-left px-4 py-3 transition',
                  idx === active
                    ? 'bg-blue-50 dark:bg-blue-950/30'
                    : 'hover:bg-muted'
                ].join(' ')}
              >
                <div className="font-medium">{it.title}</div>
                {it.description && (
                  <div className="text-xs text-muted-foreground mt-0.5">{it.description}</div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}