import React from 'react';

interface Suggestion {id: string; title: string; description?: string; intent: string;}

interface Props{
    items: Suggestion[];
    onPick: (item: Suggestion)=> void;
}

const Suggestion=({items, onPick}: Props)=>{
    return(
    <div>
        
    </div>
  );
}
export default Suggestion;