"use server";

import { PokemonClient } from "pokenode-ts";

const P = new PokemonClient();

export async function fetchPokemon({ 
  page = 1, 
  limit = 50,
  types = [],
  regions = [],
  sort = "numerical",
  search = ""
}: { 
  page?: number; 
  limit?: number;
  types?: string[];
  regions?: string[];
  sort?: string;
  search?: string;
}) {
  const pokemon = await P.listPokemons((page - 1) * limit, limit);
  let results = pokemon.results;

  // Filter by search term first
  if (search) {
    results = results.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // If regions are specified, filter by region ID ranges
  if (regions && regions.length > 0 && regions.length < 9) {
    const { RegionIdRanges } = await import("@/lib/constants");
    const regionRanges = regions.map(r => RegionIdRanges[r]).filter(Boolean);
    
    if (regionRanges.length > 0) {
      const allowedIds: number[] = [];
      regionRanges.forEach(range => {
        for (let i = range.start; i <= range.end; i++) {
          allowedIds.push(i);
        }
      });
      
      // Get pokemon with their IDs and filter
      const pokemonWithDetails = await Promise.all(
        results.slice(0, 100).map(async (p, idx) => {
          const id = (page - 1) * limit + idx + 1;
          return { ...p, id };
        })
      );
      
      results = pokemonWithDetails.filter(p => allowedIds.includes(p.id));
    }
  }

  // If types are specified, filter by type
  if (types && types.length > 0) {
    // Get all pokemon and filter by type
    const typePromises = types.map(type => P.getTypeByName(type));
    const typeData = await Promise.all(typePromises);
    
    const allowedPokemonNames = new Set<string>();
    typeData.forEach(type => {
      type.pokemon?.forEach(p => {
        allowedPokemonNames.add(p.pokemon.name);
      });
    });
    
    results = results.filter(p => allowedPokemonNames.has(p.name));
  }

  // Sort results
  switch (sort) {
    case "alphabetical":
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "numerical":
    default:
      // Already in numerical order from API
      break;
  }

  return {
    ...pokemon,
    results,
    count: results.length,
  };
}

export async function fetchPokemonByType(type: string) {
  try {
    const typeData = await P.getTypeByName(type.toLowerCase());
    return typeData.pokemon?.map(p => p.pokemon) || [];
  } catch {
    return [];
  }
}
