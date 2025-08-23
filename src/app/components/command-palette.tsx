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
  searchBarRef?: React.RefObject<HTMLElement>; // Reference to search bar element
}

export default function CommandPalette({ 
  open, 
  query, 
  items, 
  onSelect, 
  onClose, 
  searchBarRef
}: Props) {
  const [active, setActive] = useState(0);
  const [paletteStyle, setPaletteStyle] = useState<React.CSSProperties>({});
  const [position, setPosition] = useState<'above' | 'below'>('below');

  const filtered = useMemo(() => {
    const q = (query || '').replace(/^\//, '').toLowerCase();
    if (!q) return items;
    return items.filter(it =>
      it.title.replace(/^\//, '').toLowerCase().includes(q) ||
      (it.description || '').toLowerCase().includes(q) ||
      it.intent.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Enhanced auto-positioning logic
  useEffect(() => {
    if (!open || !searchBarRef?.current) {
      setPaletteStyle({});
      return;
    }

    const updatePosition = () => {
      const searchBar = searchBarRef.current;
      if (!searchBar) return;

      const rect = searchBar.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const itemHeight = 60; // Height per command item
      const padding = 16; // Internal padding
      const minItems = Math.min(filtered.length, 1); // At least show 1 item
      const maxItems = Math.min(filtered.length, 6); // Max 6 items before scroll
      
      const minPaletteHeight = minItems * itemHeight + padding;
      const maxPaletteHeight = maxItems * itemHeight + padding;
      
      // Calculate available space
      const spaceAbove = rect.top - 16; // 16px margin from top
      const spaceBelow = viewportHeight - rect.bottom - 16; // 16px margin from bottom

      // Determine position based on available space
      let finalPosition: 'above' | 'below';
      let actualHeight: number;

      if (spaceBelow >= minPaletteHeight) {
        // Prefer below if there's enough space
        finalPosition = 'below';
        actualHeight = Math.min(maxPaletteHeight, spaceBelow);
      } else if (spaceAbove >= minPaletteHeight) {
        // Use above if below doesn't have space but above does
        finalPosition = 'above';
        actualHeight = Math.min(maxPaletteHeight, spaceAbove);
      } else {
        // Use the side with more space
        if (spaceBelow >= spaceAbove) {
          finalPosition = 'below';
          actualHeight = Math.max(spaceBelow, 100); // Minimum 100px
        } else {
          finalPosition = 'above';
          actualHeight = Math.max(spaceAbove, 100); // Minimum 100px
        }
      }

      setPosition(finalPosition);

      let top: number;
      if (finalPosition === 'above') {
        top = rect.top - actualHeight - 8; // 8px gap
      } else {
        top = rect.bottom + 8; // 8px gap
      }

      setPaletteStyle({
        position: 'fixed',
        top: `${Math.max(8, top)}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${actualHeight}px`,
        zIndex: 1000,
      });
    };

    updatePosition();
    
    // Update on scroll and resize
    const handleUpdate = () => {
      requestAnimationFrame(updatePosition);
    };
    
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
    };
  }, [open, searchBarRef, filtered.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { 
        e.preventDefault(); 
        onClose(); 
      }
      if (e.key === 'ArrowDown') { 
        e.preventDefault(); 
        setActive(a => Math.min(a + 1, filtered.length - 1)); 
      }
      if (e.key === 'ArrowUp') { 
        e.preventDefault(); 
        setActive(a => Math.max(a - 1, 0)); 
      }
      if (e.key === 'Enter') {
        const item = filtered[active];
        if (item) { 
          e.preventDefault(); 
          onSelect(item); 
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose, onSelect]);

  // Reset active when filtered items change
  useEffect(() => {
    setActive(0);
  }, [filtered]);

  if (!open || filtered.length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-30" 
        onClick={onClose} 
      />
      
      {/* Command palette */}
      <div 
        style={paletteStyle}
        className={`
          rounded-lg border border-zinc-800/50 bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden
          ${position === 'above' ? 'animate-slide-up' : 'animate-slide-down'}
        `}
      >
        <div 
          role="listbox"
          className="overflow-auto font-['JetBrains_Mono'] h-full scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              role="option"
              aria-selected={idx === active}
              onMouseEnter={() => setActive(idx)}
              onClick={() => onSelect(item)}
              className={`
                w-full text-left px-4 py-3 transition-all duration-150 text-[17px] flex items-center justify-between group
                ${idx === active
                  ? 'bg-amber-400/10 text-amber-300 border-l-2 border-amber-400' 
                  : 'hover:bg-zinc-800/50 text-gray-300 hover:text-gray-200 border-l-2 border-transparent'
                }
                ${idx === 0 ? 'rounded-t-lg' : ''}
                ${idx === filtered.length - 1 ? 'rounded-b-lg' : ''}
              `}
            >
              <div className="flex-1">
                <div className="font-medium tracking-wide">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-sm text-zinc-400 mt-0.5 group-hover:text-zinc-300 transition-colors">
                    {item.description}
                  </div>
                )}
              </div>
              
              {/* Enter icon hint for active item */}
              {idx === active && (
                <div className="text-xs text-amber-400/70 font-mono px-1.5 py-0.5 bg-amber-400/5 rounded border border-amber-400/20">
                  ↵
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Custom animations and scrollbar styles */}
      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.15s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.15s ease-out;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-zinc-700::-webkit-scrollbar-thumb {
          background-color: rgb(63 63 70);
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </>
  );
}

