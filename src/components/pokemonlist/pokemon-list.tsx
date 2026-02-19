"use client";

import React, { useEffect, useState, Fragment, useRef } from "react";
import PokemonCard from "./pokemon-card";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import { fetchPokemon } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import { usePokemonStore } from "@/stores/pokemonstore";
import { useSearchParams } from "next/navigation";

const PokemonList = () => {
  const [pokemonNames, setPokemonNames] = useState<NamedAPIResource[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const isSticky = usePokemonStore((state) => state.isSticky);
  const setIsSticky = usePokemonStore((state) => state.setIsSticky);
  const lastStickyRef = useRef<boolean | null>(null);
  const searchParams = useSearchParams();
  
  // Get filter params from URL
  const types = searchParams.get("types")?.split(",").filter(Boolean) || [];
  const regions = searchParams.get("regions")?.split(",").filter(Boolean) || [];
  const options = searchParams.get("options")?.split(",").filter(Boolean) || ["numerical"];
  const search = searchParams.get("q") || "";
  const sort = options.find(o => o === "numerical" || o === "alphabetical") || "numerical";

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 120;
      if (lastStickyRef.current !== next) {
        lastStickyRef.current = next;
        setIsSticky(next);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setIsSticky]);

  // Reset when filters change
  useEffect(() => {
    setPokemonNames([]);
    setPage(1);
    setHasMore(true);
  }, [types.join(","), regions.join(","), options.join(","), search]);

  useEffect(() => {
    if (loading) return;

    const loadMorePokemon = async () => {
      setLoading(true);
      const next = page;
      const data = await fetchPokemon({ 
        page: next, 
        limit: 50,
        types,
        regions,
        sort,
        search
      });
      
      if (data?.results?.length) {
        setPage(next + 1);
        // For filtered results, we replace instead of append
        if (page === 1 && (types.length > 0 || regions.length > 0 || regions.length === 0 || search)) {
          setPokemonNames(data.results);
        } else {
          setPokemonNames((prev) => [...prev, ...data.results]);
        }
        
        // Check if there are more results
        const totalShown = page * 50;
        setHasMore(data.count ? totalShown < data.count : data.results.length > 0);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    };

    if (!loading && inView && hasMore) {
      loadMorePokemon();
    }
  }, [inView, page, loading, hasMore, types, regions, options, search]);

  // Initial load
  useEffect(() => {
    if (pokemonNames.length === 0 && !loading) {
      const loadInitial = async () => {
        setLoading(true);
        const data = await fetchPokemon({ 
          page: 1, 
          limit: 50,
          types,
          regions,
          sort,
          search
        });
        
        if (data?.results?.length) {
          setPokemonNames(data.results);
          setPage(2);
          setHasMore(data.count ? 50 < data.count : data.results.length >= 50);
        }
        setLoading(false);
      };
      loadInitial();
    }
  }, []);

  return (
    <>
      <div
        className={`relative flex-1 space-y-4 p-2 md:grid md:gap-4 xl:gap-6 bg-[#DBE1EA] dark:bg-gray-900 
    md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1500px] md:mx-auto md:grid-cols-4 md:space-y-0 ${
      isSticky ? " pt-[76px]" : ""
    }`}
      >
        {pokemonNames?.map((pokemon) => {
          return <React.Fragment key={pokemon.name}><PokemonCard name={pokemon.name} /></React.Fragment>;
        })}
      </div>
      {!loading && hasMore && <div ref={ref} className="h-10" />}
      {loading && (
        <div className="flex justify-center p-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default PokemonList;
