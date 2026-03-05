"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PokemonCard from "./pokemon-card";
import type { NamedAPIResource } from "pokenode-ts";
import { fetchPokemon } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import { usePokemonStore } from "@/stores/pokemonstore";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const PAGE_SIZE = 50;

const parseCsvParam = (value: string | null) =>
  value?.split(",").filter(Boolean) ?? [];

const PokemonList = () => {
  const [pokemonNames, setPokemonNames] = useState<NamedAPIResource[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView();
  const isSticky = usePokemonStore((state) => state.isSticky);
  const setIsSticky = usePokemonStore((state) => state.setIsSticky);

  const lastStickyRef = useRef<boolean | null>(null);
  const requestIdRef = useRef(0);
  const searchParams = useSearchParams();

  const query = useMemo(() => {
    const types = parseCsvParam(searchParams.get("types"));
    const regions = parseCsvParam(searchParams.get("regions"));
    const options = parseCsvParam(searchParams.get("options"));
    const search = searchParams.get("q") ?? "";
    const sort =
      options.find((option) => option === "numerical" || option === "alphabetical") ??
      "numerical";

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

    // Always fetch page 1, then fetch subsequent pages only when sentinel is visible.
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

        const nextResults = data?.results ?? [];

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

  return (
    <>
      <div
        className={`relative flex-1 space-y-4 p-2 md:grid md:gap-4 xl:gap-6 bg-[#DBE1EA] dark:bg-gray-900 
    md:max-w-200 lg:max-w-250 xl:max-w-300 2xl:max-w-375 md:mx-auto md:grid-cols-4 md:space-y-0 ${
      isSticky ? " pt-19" : ""
    }`}
      >
        {pokemonNames.map((pokemon, index) => (
          <motion.div
            key={pokemon.name}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              delay: (index % PAGE_SIZE) * 0.02,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <PokemonCard name={pokemon.name} />
          </motion.div>
        ))}
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
