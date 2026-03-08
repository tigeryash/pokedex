"use server";

import { PokemonClient } from "pokenode-ts";

const P = new PokemonClient();

const getIdFromUrl = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

export async function fetchPokemon({ 
  page = 1, 
  limit = 50,
  types = [],
  regions = [],
  sort = "numerical-asc",
  search = ""
}: { 
  page?: number; 
  limit?: number;
  types?: string[];
  regions?: string[];
  sort?: string;
  search?: string;
}) {
  // Fetch up to the latest known gen to enable global sorting/filtering
  const allPokemonData = await P.listPokemons(0, 1025);
  
  // Map it to include IDs
  let results = allPokemonData.results.map((p) => ({
    ...p,
    id: getIdFromUrl(p.url),
  }));

  // Filter by search term first
  if (search) {
    results = results.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // If regions are specified, filter by region ID ranges
  if (regions && regions.length > 0) {
    const { RegionIdRanges } = await import("@/lib/constants");
    const regionRanges = regions.map((r: string) => RegionIdRanges[r]).filter(Boolean);
    
    if (regionRanges.length > 0) {
      results = results.filter(p => {
        return regionRanges.some(range => p.id >= range.start && p.id <= range.end);
      });
    }
  }

  // If types are specified, filter by type
  if (types && types.length > 0) {
    const typePromises = types.map(type => P.getTypeByName(type));
    const typeData = await Promise.all(typePromises);
    
    // Create an intersection of types or union depending on desired behavior.
    // Let's do union: if pokemon has ANY of the specified types.
    const allowedPokemonNames = new Set<string>();
    typeData.forEach(type => {
      type.pokemon?.forEach(p => {
        allowedPokemonNames.add(p.pokemon.name);
      });
    });
    
    results = results.filter(p => allowedPokemonNames.has(p.name));
  }

  // Sort results globally
  switch (sort) {
    case "alphabetical-asc":
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphabetical-desc":
      results.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "numerical-desc":
      results.sort((a, b) => b.id - a.id);
      break;
    case "numerical-asc":
    default:
      results.sort((a, b) => a.id - b.id);
      break;
  }

  // Finally paginate
  const startIndex = (page - 1) * limit;
  const paginatedResults = results.slice(startIndex, startIndex + limit);

  return {
    count: results.length, // total matching
    next: startIndex + limit < results.length ? true : null,
    previous: startIndex > 0 ? true : null,
    results: paginatedResults,
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
