"use client";

import { useEffect, useState } from "react";
import PokemonCard from "./pokemon-card";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import { fetchPokemon } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import { usePokemonStore } from "@/stores/pokemonstore";

// type PageProps = {
//   params: {
//     category: string;
//   };
// };

const PokemonList = () => {
  const [pokemonNames, setPokemonNames] = useState<NamedAPIResource[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView, entry } = useInView();
  const isSticky = usePokemonStore((state) => state.isSticky);

  useEffect(() => {
    if (loading) return;

    const loadMorePokemon = async () => {
      setLoading(true);
      const next = page;
      const data = await fetchPokemon({ page: next });
      if (data?.results?.length) {
        setPage(next + 1);
        setPokemonNames((prev) => [...prev, ...data.results]);
      }
      setLoading(false);
    };

    if (!loading && inView) {
      loadMorePokemon();
    }
  }, [inView, page, loading]);

  return (
    <>
      <div
        className={`relative flex-1 space-y-4 p-2 md:grid md:gap-4 xl:gap-6 
    md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] md:mx-auto md:grid-cols-4 md:space-y-0 ${
      isSticky ? " pt-[76px]" : ""
    }`}
      >
        {pokemonNames?.map((pokemon) => {
          return <PokemonCard name={pokemon.name} key={pokemon.name} />;
        })}
      </div>
      {!loading && <div ref={ref}></div>}
    </>
  );
};

export default PokemonList;
