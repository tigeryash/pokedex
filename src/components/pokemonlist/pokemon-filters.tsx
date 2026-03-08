"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePokemonStore } from "@/stores/pokemonstore";
import { LayoutGrid, List } from "lucide-react";
import { PokemonTypesColors, Regions, SortOptions, SortOption } from "@/lib/constants";

const PokemonFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const viewMode = usePokemonStore((state) => state.viewMode);
  const setViewMode = usePokemonStore((state) => state.setViewMode);

  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    router.push(pathname + "?" + createQueryString("q", term), { scroll: false });
  }, 300);

  const handleSelect = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, value), { scroll: false });
  };

  const currentType = searchParams.get("types") ?? "";
  const currentRegion = searchParams.get("regions") ?? "";
  const currentSort = searchParams.get("options") ?? "numerical-asc";

  return (
    <div className="w-full bg-[#f4f7fa]/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-6 shadow-sm flex flex-col gap-4 sticky top-24 z-30">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Filters */}
        <div className="flex flex-wrap md:flex-nowrap w-full md:w-auto gap-3 items-center ml-auto">
          {/* Type Filter */}
          <select
            className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer capitalize"
            value={currentType}
            onChange={(e) => handleSelect("types", e.target.value)}
          >
            <option value="">All Types</option>
            {Object.keys(PokemonTypesColors).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Region Filter */}
          <select
            className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer capitalize"
            value={currentRegion}
            onChange={(e) => handleSelect("regions", e.target.value)}
          >
            <option value="">All Regions</option>
            {Regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          {/* Sort Menu */}
          <select
            className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            value={currentSort}
            onChange={(e) => handleSelect("options", e.target.value)}
          >
            <option value="numerical-asc">Lowest Number (First)</option>
            <option value="numerical-desc">Highest Number (First)</option>
            <option value="alphabetical-asc">A-Z</option>
            <option value="alphabetical-desc">Z-A</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl p-1 ml-auto md:ml-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
              aria-label="List View"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonFilters;
