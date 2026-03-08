"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { usePokemonStore } from "@/stores/pokemonstore";
import { LayoutGrid, List, Filter } from "lucide-react";
import { PokemonTypesColors, Regions } from "@/lib/constants";

const PokemonFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const viewMode = usePokemonStore((state) => state.viewMode);
  const setViewMode = usePokemonStore((state) => state.setViewMode);
  
  // Mobile filter menu state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const handleSelect = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, value), { scroll: false });
  };

  const currentType = searchParams.get("types") ?? "";
  const currentRegion = searchParams.get("regions") ?? "";
  const currentSort = searchParams.get("options") ?? "numerical-asc";

  return (
    <div className="w-full flex mb-6 z-3 pt-4 sticky top-20 pointer-events-none gap-2">
      
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden pointer-events-auto ml-auto">
        <button 
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 bg-[#f4f7fa]/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-300 dark:border-zinc-700 
          rounded-xl px-4 py-4 text-zinc-900 dark:text-zinc-100 shadow-sm"
        >
          <Filter size={18} />
        </button>
      </div>
      
      {/* Top Right Floating Container */}
      <div className="flex justify-end pointer-events-auto md:ml-auto">
        <div className={`
          flex flex-col md:flex-row gap-3 items-end md:items-center
          ${mobileFiltersOpen ? "flex" : "hidden md:flex"}
          absolute md:static top-16 left-4 md:auto mt-2 md:mt-0 p-4 md:p-0 
          bg-[#f4f7fa]/95 dark:bg-zinc-900/95 md:bg-transparent md:dark:bg-transparent
          border md:border-none border-zinc-300 dark:border-zinc-700
          rounded-xl shadow-lg md:shadow-none backdrop-blur-md md:backdrop-blur-none z-50
        `}>
          {/* Type Filter */}
          <select
            className="w-full md:w-auto pr-10 bg-[#f4f7fa]/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-300 dark:border-zinc-700 shadow-sm rounded-xl px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer capitalize appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px_24px] bg-[position:right_8px_center] bg-no-repeat"
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
            className="w-full md:w-auto pr-10 bg-[#f4f7fa]/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-300 dark:border-zinc-700 shadow-sm rounded-xl px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer capitalize appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px_24px] bg-[position:right_8px_center] bg-no-repeat"
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
            className="w-full md:w-auto pr-10 bg-[#f4f7fa]/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-300 dark:border-zinc-700 shadow-sm rounded-xl px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px_24px] bg-[position:right_8px_center] bg-no-repeat"
            value={currentSort}
            onChange={(e) => handleSelect("options", e.target.value)}
          >
            <option value="numerical-asc">Lowest Number (First)</option>
            <option value="numerical-desc">Highest Number (First)</option>
            <option value="alphabetical-asc">A-Z</option>
            <option value="alphabetical-desc">Z-A</option>
          </select>

          {/* View Toggle */}
          <div className="hidden md:flex items-center bg-[#f4f7fa]/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm border border-zinc-300 dark:border-zinc-700 rounded-xl p-1 ml-2">
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
        
        {/* Mobile View Toggle (Always Visible Top Right) */}
        <div className="md:hidden flex items-center bg-[#f4f7fa]/90 dark:bg-zinc-900/90 shadow-sm border border-zinc-300 dark:border-zinc-700 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
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
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonFilters;
