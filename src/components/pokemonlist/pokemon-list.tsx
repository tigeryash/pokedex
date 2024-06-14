import Pokedex from "pokedex-promise-v2";
import PokemonCard from "./pokemon-card";
import { Suspense } from "react";
import CardSkeleton from "./card-skeleton";

type PageProps = {
  params: {
    category: string;
  };
};

const PokemonList = async ({ params }: PageProps) => {
  const P = new Pokedex();

  const interval = {
    limit: 10,
    offset: 0,
  };

  const getPokemonList = async () => {
    const response = await P.getPokemonsList(interval);
    return response.results;
    //     const response = await fetch(query ? searchResult : categoryResult);
  };

  const data: any[] = await getPokemonList();

  return (
    <div className="flex-1 space-y-4 p-2">
      {data.map((pokemon) => {
        return (
          <Suspense fallback={<CardSkeleton />} key={pokemon.name}>
            <PokemonCard name={pokemon.name} />
          </Suspense>
        );
      })}
    </div>
  );
};

export default PokemonList;
