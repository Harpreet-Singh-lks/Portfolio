import React, { forwardRef } from "react";
import { useTheme } from "next-themes";

interface Props {
  value: string;
  setValue: (v: string) => void;
  onSubmit: (q: string) => void;
  openSuggestions: () => void;
  closeSuggestions: () => void;
}

const Searchbar = forwardRef<HTMLDivElement, Props>(
  ({ value, setValue, onSubmit, openSuggestions, closeSuggestions }, ref) => {
    const { theme } = useTheme();
    const dark = theme === "dark";

    return (
      <div ref={ref} className="w-full">
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
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
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
              setTimeout(() => {
                if (!document.activeElement?.closest("[role='listbox']")) {
                  closeSuggestions();
                }
              }, 150);
            }}
            placeholder="Ask me anything • Type '/' for commands"
            autoComplete="off"
            className={[
              "block mx-auto w-full rounded-2xl px-8 py-5 outline-none transition",
              "font-['JetBrains_Mono'] text-[18px]",
              // Dark
              "dark:bg-neutral-900 dark:text-gray-100 dark:border dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:border-blue-500",
              // Light
              "bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100 focus:border-blue-500",
              "placeholder:font-sans placeholder:italic placeholder:text-gray-400 placeholder:text-[16px]"
            ].join(" ")}
            
          />
        </form>
      </div>
    );
  }
);

Searchbar.displayName = "Searchbar";

export default Searchbar;
