import React from "react";
import { useTheme } from "next-themes";

interface Props {
  value: string;
  setValue: (v: string) => void;
  onSubmit: (q: string) => void;
  openSuggestions: () => void;
  closeSuggestions: () => void;
}

const Searchbar: React.FC<Props> = ({ value, setValue, onSubmit, openSuggestions, closeSuggestions }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        if (!q) return;
        onSubmit(q);
      }}
      role="search"
      aria-label="Site search"
      className="w-full max-w-xl"
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
        placeholder="Ask me anything • Type '/' for commands"
        autoComplete="off"
        className={[
          "block mx-auto rounded-2xl px-6 py-4 outline-none shadow-lg backdrop-blur-md transition focus:shadow-xl placeholder:transition w-full",
          dark
            ? "bg-neutral-900/80 text-gray-100 placeholder:text-gray-500 border border-neutral-700 hover:bg-neutral-900/90 focus:bg-neutral-800/90"
            : "bg-white text-black placeholder:text-gray-500 border border-black/10 shadow-md hover:bg-white/90 focus:bg-white"
        ].join(" ")}
      />
    </form>
  );
};

export default Searchbar;