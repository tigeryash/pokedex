import { useState } from "react";

export const GenSelector = () => {
  const [activeGen, setActiveGen] = useState('Gen 1');
  const generations = ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5', 'Gen 6', 'Gen 7', 'Gen 8', 'Gen 9'];

  return (
    <div
        className="flex gap-1 bg-white/5 p-1 rounded-sm border border-white/5"
  >
      {generations.map(gen => (
        <button
          key={gen}
          onClick={() => setActiveGen(gen)}
          className={`py-1 px-3 text-[.75rem] rounded-sm pointer transition-all duration-200 
             ${activeGen === gen ? 'bg-white/10 text-white' : 'text-[#71717a] hover:bg-white/10 bg-transparent hover:text-white'}`}
        >
          {gen}
        </button>
      ))}
    </div>
  );
};