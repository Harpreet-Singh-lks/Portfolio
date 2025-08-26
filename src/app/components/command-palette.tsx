import React, { useEffect, useMemo, useState } from "react";

export interface CommandItem {
  id: string;
  title: string; // e.g. "/projects"
  description?: string; // e.g. "Explore my latest projects"
  intent: string; // e.g. "projects"
}

interface Props {
  open: boolean;
  query: string;
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onClose: () => void;
  searchBarRef?: React.RefObject<HTMLElement | null>;
  mode?: "overlay" | "inline" | "below";
}

export default function CommandPalette({
  open,
  query,
  items,
  onSelect,
  onClose,
  searchBarRef,
  mode = "overlay",
}: Props) {
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = (query || "").replace(/^\//, "").toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.title.replace(/^\//, "").toLowerCase().includes(q) ||
        (it.description || "").toLowerCase().includes(q) ||
        it.intent.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter") {
        const item = filtered[active];
        if (item) {
          e.preventDefault();
          onSelect(item);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose, onSelect]);

  useEffect(() => {
    setActive(0);
  }, [filtered]);

  if (!open || filtered.length === 0) return null;

  const suggestionList = (
    <div
      role="listbox"
      className="overflow-auto max-h-72 font-mono text-[15px]"
    >
      {filtered.map((item, idx) => (
        <button
          key={item.id}
          role="option"
          aria-selected={idx === active}
          onMouseEnter={() => setActive(idx)}
          onClick={() => onSelect(item)}
          className={`w-full flex items-center justify-between px-4 py-2 transition-colors
            ${
              idx === active
                ? "bg-zinc-800 text-amber-400"
                : "text-zinc-300 hover:bg-zinc-800/50"
            }`}
        >
          <span
            className={`${
              idx === active ? "text-amber-400" : "text-zinc-200"
            }`}
          >
            {item.title}
          </span>
          {item.description && (
            <span
              className={`ml-4 text-sm ${
                idx === active ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              {item.description}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {mode === "overlay" && (
        <div className="fixed inset-0 z-40" onClick={onClose} />
      )}

      <div
        className={`z-50 rounded-xl border border-zinc-700/50 bg-zinc-900 shadow-lg overflow-hidden animate-fadeIn`}
        style={{ width: "100%" }}
      >
        {suggestionList}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </>
  );
}
