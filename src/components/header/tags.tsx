"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokemonTypes, Regions, SortOption, SortOptions } from "@/lib/constants";
import Image from "next/image";
import { usePokemonStore } from "@/stores/pokemonstore";
import { useRouter, useSearchParams } from "next/navigation";

const Tags = () => {
  const { tagsClicked, setTagsClicked } = usePokemonStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const types = searchParams.get("types")?.split(",").filter(Boolean) || [];
  const regions = searchParams.get("regions")?.split(",").filter(Boolean) || [];
  const options = searchParams.get("options")?.split(",").filter(Boolean) || ["numerical"];

  const variants = {
    open: { opacity: 1, maxHeight: 500 },
    collapsed: { opacity: 0, maxHeight: 0 },
  };

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(",").filter(Boolean) || [];

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter((v) => v !== value);
      if (newValues.length > 0) {
        params.set(key, newValues.join(","));
      } else {
        params.delete(key);
      }
    } else {
      currentValues.push(value);
      params.set(key, currentValues.join(","));
    }

    // Reset to page 1 when filters change
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let currentRegions = params.get("regions")?.split(",").filter(Boolean) || [];

    if (region === "all") {
      if (currentRegions.length === Regions.length || currentRegions.length === 0) {
        params.delete("regions");
      } else {
        params.set("regions", Regions.join(","));
      }
    } else {
      if (currentRegions.includes(region)) {
        currentRegions = currentRegions.filter((r) => r !== region);
      } else {
        currentRegions.push(region);
      }

      if (currentRegions.length === 0) {
        params.delete("regions");
      } else if (currentRegions.length === Regions.length) {
        params.delete("regions"); // All regions selected = no filter
      } else {
        params.set("regions", currentRegions.join(","));
      }
    }

    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleOptionChange = (option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let currentOptions = params.get("options")?.split(",").filter(Boolean) || ["numerical"];

    // For sort options, we only allow one at a time
    if (option === "numerical" || option === "alphabetical") {
      // Remove other sort options
      currentOptions = currentOptions.filter(o => o !== "numerical" && o !== "alphabetical");
      if (currentOptions.includes(option)) {
        currentOptions = currentOptions.filter(o => o !== option);
      } else {
        currentOptions.push(option);
      }
    } else {
      // Toggle for non-sort options
      if (currentOptions.includes(option)) {
        currentOptions = currentOptions.filter(o => o !== option);
      } else {
        currentOptions.push(option);
      }
    }

    // Ensure we always have a sort option
    if (!currentOptions.some(o => o === "numerical" || o === "alphabetical")) {
      currentOptions.push("numerical");
    }

    if (currentOptions.length === 0) {
      params.delete("options");
    } else {
      params.set("options", currentOptions.join(","));
    }

    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const isTypeSelected = (type: string) => types.includes(type);
  const isRegionSelected = (region: string) => 
    regions.includes(region) || regions.length === 0 || regions.includes("all");
  const isOptionSelected = (option: string) => options.includes(option);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has("regions") && !searchParams.toString()) {
      // Only set default regions on first load, not on filter changes
    }
  }, [searchParams]);

  return (
    <div className={`${tagsClicked ? "backdrop-blur-sm" : ""} w-full`}>
      <AnimatePresence>
        <motion.div
          initial="collapsed"
          animate={tagsClicked ? "open" : "collapsed"}
          exit="collapsed"
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex flex-col space-y-4 items-center justify-center overflow-hidden absolute left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg"
          style={{ top: "100%" }}
        >
          <div className="p-4 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-center">Filters</h3>
            
            <h4 className="text-sm font-medium mb-2">Types</h4>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {Object.keys(PokemonTypes).map((type) => (
                <div
                  onClick={() => updateQueryParams("types", type)}
                  className={`cursor-pointer transition-opacity hover:opacity-100 ${
                    isTypeSelected(type) ? "opacity-100 scale-110" : "opacity-40"
                  }`}
                  key={type}
                >
                  <Image
                    src={PokemonTypes[type as keyof typeof PokemonTypes]}
                    alt={type}
                    width={96}
                    height={96}
                    className="w-8 h-8"
                  />
                </div>
              ))}
            </div>

            <h4 className="text-sm font-medium mb-2">Region</h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4 px-4">
              {Regions.map((region) => (
                <div className="form-control" key={region}>
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={isRegionSelected(region)}
                      onChange={() => handleRegionChange(region)}
                    />
                    <span className="label-text text-sm">{region}</span>
                  </label>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-medium mb-2">Sort By</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    checked={isOptionSelected("numerical")}
                    onChange={() => handleOptionChange("numerical")}
                    className="checkbox checkbox-sm"
                  />
                  <span className="label-text text-sm">Numerical</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    checked={isOptionSelected("alphabetical")}
                    onChange={() => handleOptionChange("alphabetical")}
                    className="checkbox checkbox-sm"
                  />
                  <span className="label-text text-sm">Alphabetical</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    checked={isOptionSelected("legendary")}
                    onChange={() => handleOptionChange("legendary")}
                    className="checkbox checkbox-sm"
                  />
                  <span className="label-text text-sm">Legendary</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    checked={isOptionSelected("favorites")}
                    onChange={() => handleOptionChange("favorites")}
                    className="checkbox checkbox-sm"
                  />
                  <span className="label-text text-sm">Favorites</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <ChevronDownIcon
        style={{
          transform: tagsClicked ? "rotate(180deg)" : "rotate(0deg)",
        }}
        onClick={() => {
          setTagsClicked(!tagsClicked);
        }}
        className="w-6 h-6 cursor-pointer transition-transform duration-300 mx-auto"
      />
    </div>
  );
};

export default Tags;
