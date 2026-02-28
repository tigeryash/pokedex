'use client'

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TOCNav from "./toc-nav";

 

const TableOfContents = ({ id }: { id: string }) => {
 

  return (
    <nav className="fixed left-1/2 top-[90px] z-2 flex -translate-x-1/2 items-center gap-2 md:gap-4 xl:gap-4">
      
      <NavigationButton id={parseInt(id)} direction="previous" />

      <TOCNav   />

      <NavigationButton id={parseInt(id)} direction="next" />
    </nav>
  );
};

export default TableOfContents;

const NavigationButton = ({ id, direction }: { id: number, direction: 'previous' | 'next' }) => {
  const router = useRouter();
  const handleNavigateToPokemon = (pokemonId: number) => {
    router.push(`/${pokemonId}`);
  };
  const imageId = direction === 'previous' ? id - 1 : id + 1;
  return (
    <button onClick={() => handleNavigateToPokemon(imageId)} 
    className={`flex  cursor-pointer items-center justify-center gap-1 rounded-full border
      border-white/10 bg-white dark:bg-[rgba(10,10,10,0.95)] px-2 lg:px-5 py-1 lg:py-1.5  shadow-[0_5px_10px_rgba(0,0,0,0.2)]
       backdrop-blur-[20px] ${id === 1 ? ' hidden' : ''} ${direction === 'previous' ? '' : 'flex-row-reverse '}`}>
        
      <ChevronLeft className={`lg:w-8 lg:h-8 w-6 h-6 ${direction === 'previous' ? '' : 'rotate-180 '}`} />
       
      <div className="flex items-center gap-2 text-sm font-medium">
        <span>#{imageId}</span>
        <Image 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageId}.png`} 
          alt="Previous Pokemon" width={36} height={36} 
          className="lg:w-10 lg:h-10  shrink-0"
        />
      </div>
    </button>
  );
}
