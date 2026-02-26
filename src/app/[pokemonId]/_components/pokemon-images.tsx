'use client'

import { Pokemon, PokemonSpecies } from "pokenode-ts";
import { useState } from "react";
import { PokemonTypesColorsRGBA } from "@/lib/constants";

const PokemonImages = ({pokemon}: {pokemon: [Pokemon, PokemonSpecies]}) => {
  const [activeGen, setActiveGen] = useState('Gen 1');
  const [activeGame, setActiveGame] = useState('Red');
  
  // Get the first type of the Pokemon for dynamic glow colors
  const firstType = pokemon[0].types[0]?.type.name as keyof typeof PokemonTypesColorsRGBA;
  const glowColor = PokemonTypesColorsRGBA[firstType] || PokemonTypesColorsRGBA.normal;
  
  // Extract the RGB values from rgba(r, g, b, a) for the gradient
  const rgbaMatch = glowColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  const rgbValues = rgbaMatch ? `${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}` : '168, 167, 122';

  return (
    <div 
      className="relative flex flex-col items-center justify-center p-8"
      style={{
        background: `radial-gradient(circle at center, rgba(${rgbValues}, 0.15) 0%, rgba(5,5,5,0) 70%)`
      }}
    >
      {/* Pokemon Number */}
      <div className="absolute top-6 left-6  font-mono text-[3rem] font-bold text-black/60 dark:text-white/30
       pointer-events-none text-shadow-drop dark:text-shadow-white">
        #{pokemon[0].id.toString().padStart(3, '0')}
      </div>

      {/* Gen Select and Game Select */}
      <div className="absolute flex  bottom-6 left-0 -translate-x-1/2 z-2">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col gap-1 p-1 bg-black/10 rounded-lg border border-white/5">
            {['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5', 'Gen 6', 'Gen 7', 'Gen 8', 'Gen 9'].map(gen => (
              <button
                key={gen}
                onClick={() => setActiveGen(gen)}
                className={`px-6 py-1 text-xs font-medium rounded transition-all duration-200 ${
                  activeGen === gen 
                    ? 'bg-white/10 text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {gen}
              </button>
            ))}
          </div>
          <select
            value={activeGame}
            onChange={(e) => setActiveGame(e.target.value)}
            className="bg-black/10 border border-white/10 rounded-md px-3 py-1.5 text-sm font-medium text-foreground cursor-pointer outline-none hover:bg-black/20 transition-colors"
          >
            <div className="rounded-md overflow-hidden">
              <option>Red</option>
              <option>Blue</option>
              <option>Yellow</option>
            </div>
      
          </select>
        </div>
      </div>

      {/* Main Pokemon Image Container */}
      <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center perspective-1000">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon[0].id}.png`}
          alt={pokemon[0].name}
          className="w-[90%] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] animate-[float_6s_ease-in-out_infinite] z-10"
        />
        {/* Glow effect under Pokemon - dynamically colored based on type */}
        <div 
          className="absolute -bottom-10 w-4/5 h-5 opacity-60 blur-lg scale-y-50"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${rgbValues}, 0.4), transparent 70%)`
          }}
        ></div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex gap-5 bg-[rgba(10,10,10,0.8)] backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 z-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
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
