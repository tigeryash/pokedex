"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PokemonCard from "./pokemon-card";
import type { NamedAPIResource } from "pokenode-ts";
import { fetchPokemon } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import { usePokemonStore } from "@/stores/pokemonstore";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RegionIdRanges } from "@/lib/constants";

const PAGE_SIZE = 50;

const parseCsvParam = (value: string | null) =>
  value?.split(",").filter(Boolean) ?? [];

type PokemonItem = NamedAPIResource & { id: number };

const PokemonList = () => {
  const [pokemonNames, setPokemonNames] = useState<PokemonItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView();
  const setIsSticky = usePokemonStore((state) => state.setIsSticky);
  const viewMode = usePokemonStore((state) => state.viewMode);

  const lastStickyRef = useRef<boolean | null>(null);
  const requestIdRef = useRef(0);
  const searchParams = useSearchParams();

  const query = useMemo(() => {
    const types = parseCsvParam(searchParams.get("types"));
    const regions = parseCsvParam(searchParams.get("regions"));
    const options = parseCsvParam(searchParams.get("options"));
    const search = searchParams.get("q") ?? "";
    const sort = options[0] ?? "numerical-asc";
    return { regions, search, sort, types };
  }, [searchParams]);

  const queryKey = useMemo(
    () => `${query.types.join(",")}|${query.regions.join(",")}|${query.sort}|${query.search}`,
    [query]
  );

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

  // Reset pagination when query changes.
  useEffect(() => {
    setPokemonNames([]);
    setPage(1);
    setHasMore(true);
  }, [queryKey]);

  useEffect(() => {
    if (loading || !hasMore) {
      return;
    }

    if (page > 1 && !inView) {
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    const loadPokemon = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemon({
          page,
          limit: PAGE_SIZE,
          regions: query.regions,
          search: query.search,
          sort: query.sort,
          types: query.types,
        });

        if (requestIdRef.current !== currentRequestId) {
          return;
        }

        const nextResults = data?.results as PokemonItem[] ?? [];

        setPokemonNames((previous) =>
          page === 1 ? nextResults : [...previous, ...nextResults]
        );

        setHasMore(Boolean(data?.next));
        setPage((current) => current + 1);
      } finally {
        if (requestIdRef.current === currentRequestId) {
          setLoading(false);
        }
      }
    };

    void loadPokemon();
  }, [hasMore, inView, loading, page, query]);

  // Determine if we should show region headers
  const showRegionHeaders = query.sort === "numerical-asc" && query.types.length === 0 && query.search === "";

  // Helper to determine the region for an ID
  const getRegionForId = (id: number) => {
    for (const [regionName, range] of Object.entries(RegionIdRanges)) {
      if (id >= range.start && id <= range.end) {
        return regionName;
      }
    }
    return null;
  };

  // Build the render list
  const gridClasses = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6";
  const listClasses = "flex flex-col gap-4";

  let renderContent;

  if (showRegionHeaders) {
    // Group Pokémon by internal region
    const groups: Record<string, PokemonItem[]> = {};
    const unknownRegion: PokemonItem[] = [];

    pokemonNames.forEach((pokemon) => {
      const region = getRegionForId(pokemon.id);
      if (region) {
        if (!groups[region]) groups[region] = [];
        groups[region].push(pokemon);
      } else {
        unknownRegion.push(pokemon);
      }
    });

    renderContent = (
      <>
        {Object.entries(groups).map(([region, pokemons], regIndex) => (
          <div key={`region-group-${region}`} className="relative mb-12 w-full">
            <div className="sticky top-[5.9rem] md:top-[5.9rem] z-2 flex mb-4 justify-start pl-2 bg-transparent shadow-sm  -ml-2 -top-1">
              <div className="font-bold text-3xl md:text-5xl bg-black/20 text-zinc-800 dark:text-zinc-200 uppercase tracking-widest backdrop-blur-[2px] rounded-lg p-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] px-2">
                {region}
              </div>
            </div>
            
            <div className={viewMode === "grid" ? gridClasses : listClasses}>
              {pokemons.map((pokemon, index) => (
                <motion.div
                  key={pokemon.name}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: (index % PAGE_SIZE) * 0.02, duration: 0.3, ease: "easeOut" }}
                >
                  <PokemonCard name={pokemon.name} viewMode={viewMode} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        
        {unknownRegion.length > 0 && (
          <div className="relative mb-12 w-full">
            <div className={`mt-8 ${viewMode === "grid" ? gridClasses : listClasses}`}>
              {unknownRegion.map((pokemon, index) => (
                <motion.div
                  key={pokemon.name}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: (index % PAGE_SIZE) * 0.02, duration: 0.3, ease: "easeOut" }}
                >
                  <PokemonCard name={pokemon.name} viewMode={viewMode} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  } else {
    // Standard rendering without groups
    renderContent = (
      <div className={`relative flex-1 w-full mt-4 ${viewMode === "grid" ? gridClasses : listClasses}`}>
        {pokemonNames.map((pokemon, index) => (
          <motion.div
            key={pokemon.name}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: (index % PAGE_SIZE) * 0.02, duration: 0.3, ease: "easeOut" }}
          >
            <PokemonCard name={pokemon.name} viewMode={viewMode} />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col flex-1">
        {renderContent}
      </div>
      {!loading && hasMore && <div ref={ref} className="h-10 w-full" />}
      {loading && (
        <div className="flex justify-center p-8 w-full">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
        </div>
      )}
    </>
  );
};

export default PokemonList;
