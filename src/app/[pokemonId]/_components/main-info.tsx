import { Pokemon, PokemonSpecies } from "pokenode-ts";
import Image from "next/image";
import { PokemonTypesColors } from "@/lib/constants";

type MainInfoProps = {
  pokemon: [Pokemon, PokemonSpecies];
};

const MainInfo = ({ pokemon }: MainInfoProps) => {
  const [pokemonData, speciesData] = pokemon;
  
  // Get the Pokemon name
  const name = pokemonData.name;
  const id = pokemonData.id;
  
  // Get types
  const types = pokemonData.types.map(t => t.type.name);
  
  // Get height and weight
  const height = pokemonData.height / 10; // Convert to meters
  const weight = pokemonData.weight / 10; // Convert to kg
  
  // Get abilities
  const abilities = pokemonData.abilities.map(a => 
    a.ability.name.replace(/-/g, " ")
  );
  
  // Get genus (e.g., "Flame Pokémon")
  const genus = speciesData.genera.find(g => g.language.name === "en")?.genus || "";

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <h1 className="text-4xl font-bold capitalize">{name}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">#{id.toString().padStart(3, "0")}</p>
      
      <div className="relative w-64 h-64">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <div className="flex gap-2">
        {types.map(type => (
          <span
            key={type}
            className="px-4 py-2 rounded-full text-white font-medium capitalize"
            style={{ backgroundColor: PokemonTypesColors[type as keyof typeof PokemonTypesColors] || "#777" }}
          >
            {type}
          </span>
        ))}
      </div>
      
      <p className="text-xl font-medium">{genus}</p>
      
      <div className="flex gap-8 text-lg">
        <div className="text-center">
          <p className="font-semibold">Height</p>
          <p>{height} m</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">Weight</p>
          <p>{weight} kg</p>
        </div>
      </div>
      
      {abilities.length > 0 && (
        <div className="text-center">
          <p className="font-semibold mb-2">Abilities</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {abilities.map(ability => (
              <span 
                key={ability}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full capitalize"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainInfo;
