import PokemonCard from "./pokemon-card";
import { Suspense } from "react";
import CardSkeleton from "./card-skeleton";
import { PokemonClient } from "pokenode-ts";

type PageProps = {
  params: {
    category: string;
  };
};

const PokemonList = async ({ params }: PageProps) => {
  const P = new PokemonClient();

  const getPokemonList = async () => {
    const response = await P.listPokemons(0, 10);
    return response.results;
    //     const response = await fetch(query ? searchResult : categoryResult);
  };

  const data: any[] = await getPokemonList();

  return (
    <div
      className="flex-1 space-y-4 p-2 md:grid md:gap-4 xl:gap-6 
    md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] md:mx-auto md:grid-cols-4 md:space-y-0"
    >
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
