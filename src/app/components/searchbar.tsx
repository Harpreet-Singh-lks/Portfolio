import React, { forwardRef } from "react";
import { useTheme } from "next-themes";

interface Props {
  value: string;
  setValue: (v: string) => void;
  onSubmit: (q: string) => void;
  openSuggestions: () => void;
  closeSuggestions: () => void;
}

const Searchbar = forwardRef<HTMLDivElement, Props>(({ 
  value, 
  setValue, 
  onSubmit, 
  openSuggestions, 
  closeSuggestions 
}, ref) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div ref={ref} className="w-full"> {/* Removed max-w-xl */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = value.trim();
          if (!q) return;
          onSubmit(q);
        }}
        role="search"
        aria-label="Site search"
        className="w-full"
      >
        <label htmlFor="search-input" className="sr-only">Search</label>
        <input
          id="search-input"
          name="q"
          type="search"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            setValue(v);
            if (v.startsWith("/")) openSuggestions();
            else if (v === "") closeSuggestions();
          }}
          onKeyDown={(e) => {
            if (e.key === "/" && value === "") {
              e.preventDefault();
              setValue("/");
              openSuggestions();
            }
            if (e.key === "Escape") {
              closeSuggestions();
            }
          }}
          onFocus={() => {
            if (value.startsWith("/")) {
              openSuggestions();
            }
          }}
          onBlur={(e) => {
            // Only close if not clicking on the command palette
            setTimeout(() => {
              if (!document.activeElement?.closest('[role="listbox"]')) {
                closeSuggestions();
              }
            }, 150);
          }}
          placeholder="Ask me anything • Type '/' for commands"
          autoComplete="off"
          className={[
            "block mx-auto rounded-2xl px-8 py-5 outline-none shadow-lg backdrop-blur-md transition focus:shadow-xl placeholder:transition w-full font-['JetBrains_Mono'] text-[18px]", // Increased padding and font size
            dark
              ? "bg-neutral-900/80 text-gray-100 placeholder:text-gray-500 border border-neutral-700 hover:bg-neutral-900/90 focus:bg-neutral-800/90"
              : "bg-white text-black placeholder:text-gray-500 border border-black/10 shadow-md hover:bg-white/90 focus:bg-white"
          ].join(" ")}
        />
      </form>
    </div>
  );
});

Searchbar.displayName = 'Searchbar';

export default Searchbar;