import React from 'react';

interface Suggestion {id: string; title: string; description?: string; intent: string;}

interface Props{
    items: Suggestion[];
    onPick: (item: Suggestion)=> void;
}

const Suggestion=({items, onPick}: Props)=>{
    return(
    <div role="listbox" className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((it) => (
        <button
          key={it.id}
          role="option"
          onClick={() => onPick(it)}
          className="text-left p-3 bg-card border border-border rounded-lg hover:shadow-sm transition"
        >
          <div className="font-medium">{it.title}</div>
          {it.description && <div className="text-sm text-muted-foreground">{it.description}</div>}
        </button>
      ))}
    </div>
  );
}
export default Suggestion;