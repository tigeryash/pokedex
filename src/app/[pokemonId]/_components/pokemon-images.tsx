'use client'

import { Pokemon, PokemonSpecies } from "pokenode-ts";
import { PokemonTypesColorsRGBA } from "@/lib/constants";
import {GameSelect} from "./game-select";
import GenSelect from "./gen-select";

const PokemonImages = ({pokemon}: {pokemon: [Pokemon, PokemonSpecies]}) => {
  
  // Get the first type of the Pokemon for dynamic glow colors
  const firstType = pokemon[0].types[0]?.type.name as keyof typeof PokemonTypesColorsRGBA;
  const glowColor = PokemonTypesColorsRGBA[firstType] || PokemonTypesColorsRGBA.normal;
  
  // Extract the RGB values from rgba(r, g, b, a) for the gradient
  const rgbaMatch = glowColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  const rgbValues = rgbaMatch ? `${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}` : '168, 167, 122';

  return (
    <div 
      className="relative flex flex-col items-center justify-center p-0 lg:p-8 lg:flex-1 h-full w-full"
      style={{
        background: `radial-gradient(circle at center, rgba(${rgbValues}, 0.15) 0%, rgba(5,5,5,0) 70%)`
      }}
    >
      {/* Pokemon Number */}
      <div className="absolute top-0 left-0 md:left-[10%] lg:top-[10%] font-mono text-[3rem] md:text-[4.2rem] font-bold text-black/60 dark:text-white/30
       pointer-events-none text-shadow-drop dark:text-shadow-white">
        #{pokemon[0].id.toString().padStart(3, '0')}
      </div>

      {/* Gen Select and Game Select */}  
      <GameSelect gen={0} />
      <GenSelect />

      {/* Main Pokemon Image Container */}
      <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center perspective-1000">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon[0].id}.png`}
          alt={pokemon[0].name}
          className="w-[70%] md:w-[90%] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]  z-10"
        />
        {/* Glow effect under Pokemon - dynamically colored based on type */}
        <div 
          className="absolute bottom-[80px] z-1 lg:-bottom-10 w-4/5 h-5 opacity-60 blur-lg scale-y-50"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${rgbValues}, 0.4), transparent 70%)`
          }}
        ></div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute -bottom-[20px] md:-bottom-10 lg:bottom-[30px] left-1/2 -translate-x-1/2 flex gap-5 bg-white dark:bg-black backdrop-blur-xl px-1 lg:px-5 lg:py-2.5 rounded-full border border-white/10 z-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer">
          ←
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-white/5 transition-colors cursor-pointer">
          ●
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer">
          →
        </button>
      </div>
    </div>
  );
};

export default PokemonImages;
