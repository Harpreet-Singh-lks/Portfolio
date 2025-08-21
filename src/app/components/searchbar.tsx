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
            const formData = new FormData(e.currentTarget);
            const q = (formData.get("q") as string || "").trim();
            if (!q) return;
            console.log("Search:", q);
            onSubmit(q);
            }}
            role="search"
            aria-label="Site search"
            className="w-full max-w-xl"
        >
            <label htmlFor="search-input" className="sr-only">Search</label>
            <input
            id="search-input"
            aria-label="Search"
            name="q"
            type="search"
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key == "/" && value === ""){
                    e.preventDefault();
                    setValue("/");
                    openSuggestions();
                    return;
                }
                if(e.key=="Escape"){
                    closeSuggestions();
                    return ;
                }
            }}
            placeholder="Ask me anything :) | Type '/' for commands"
            
            autoComplete="off"
            size={42}
            style={{ width: "42ch" }}
            className={[
                "block mx-auto rounded-2xl px-6 py-4 outline-none shadow-lg backdrop-blur-md transition focus:shadow-xl placeholder:transition",
                dark
                ? "bg-neutral-900/80 text-gray-100 placeholder:text-gray-500 border border-neutral-700 hover:bg-neutral-900/90 focus:bg-neutral-800/90"
                : "bg-white text-black placeholder:text-gray-500 border border-black/10 shadow-md hover:bg-white/90 focus:bg-white"
            ].join(" ")}
            />
        </form>
    );
};

export default Searchbar;