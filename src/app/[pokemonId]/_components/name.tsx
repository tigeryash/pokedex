"use client"

import { Volume2Icon } from '@/components/animate-ui/icons/volume-2';
import { Volume2 } from 'lucide-react'
import { useState } from 'react';

type PokemonNameProps = {
  name: string;
  sound: string;
};

const PokemonName = ({ name, sound }: PokemonNameProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = () => {
    if(isPlaying) {
      return;
    }
    setIsPlaying(true);
    const audio = new Audio(sound);
    audio.play();
    audio.onended = () => {
      setIsPlaying(false);
    };
  }
  return (
    <div className="flex items-center gap-4 mb-3 overflow-visible ">
        <h1 className="m-0 text-6xl font-bold tracking-tight bg-linear-to-b from-zinc-800 
        to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent pb-2">
        {name}
        </h1>
        <button onClick={handleClick} className=" border border-black/10 rounded-full w-10 h-10 flex items-center justify-center text-(--text-secondary) cursor-pointer
        hover:bg-white/10 transition-colors bg-zinc-300/20">
            {isPlaying ? <Volume2Icon className="w-5 h-5" animate /> : <Volume2 className="w-5 h-5" />}
        </button>
    </div>
  )
}

export default PokemonName