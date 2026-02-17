"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokemonTypes, Regions } from "@/lib/constants";
import Image from "next/image";
import { usePokemonStore } from "@/stores/pokemonstore";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Tags = () => {
  const { tagsClicked, setTagsClicked } = usePokemonStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const types = searchParams.get("types");
  const regions = searchParams.get("regions");
  const options = searchParams.get("options");

  const variants = {
    open: { opacity: 1, maxHeight: 800 }, // Adjust maxHeight to fit content
    collapsed: { opacity: 0, maxHeight: 0 },
  };

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(",") || [];

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

    router.push(`?${params.toString()}`);
  };

  const handleRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let currentRegions = params.get("regions")?.split(",") || [];

    if (region === "all") {
      if (currentRegions.length === Regions.length) {
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

      if (currentRegions.length === Regions.length) {
        params.set("regions", "all");
      } else {
        params.set("regions", currentRegions.join(","));
      }
    }

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has("regions")) {
      params.set("regions", Regions.join(","));
      router.replace(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  return (
    <div className={`${tagsClicked ? "backdrop-blur-sm" : ""}`}>
      <AnimatePresence>
        <motion.div
          initial="collapsed"
          animate={tagsClicked ? "open" : "collapsed"}
          exit="collapsed"
          variants={variants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full flex flex-col space-y-4 items-center justify-center overflow-hidden "
        >
          <h3 className="text-2xl font-semibold">Tags</h3>
          <h4 className="text-sm font-medium">Types</h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.keys(PokemonTypes).map((type) => (
              <div
                onClick={() => updateQueryParams("types", type)}
                className={`cursor-pointer ${
                  types?.includes(type) ? "opacity-100" : "opacity-50"
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

          <h4>Region</h4>
          <div className="grid grid-cols-3 gap-2  px-4">
            {Regions.map((region) => (
              <div className="form-control" key={region}>
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      regions?.includes(region) ||
                      regions?.includes("all") ||
                      false
                    }
                    onChange={() => handleRegionChange(region)}
                  />
                  <span className="label-text">{region}</span>
                </label>
              </div>
            ))}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  checked={regions?.includes("all") || false}
                  onChange={() => handleRegionChange("all")}
                  className="checkbox"
                />
                <span className="label-text">All</span>
              </label>
            </div>
          </div>

          <h4>Options</h4>
          <div className="grid grid-cols-2 items-center justify-center gap-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Numerical</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Alphabetical</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Legendary</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span className="label-text">Favorites</span>
              </label>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <ChevronDownIcon
        style={{
          transform: tagsClicked ? "rotate(180deg)" : "rotate(0deg)",
        }}
        onClick={() => {
          const temp = tagsClicked;
          setTagsClicked(!temp);
        }}
        className="w-6 h-6  cursor-pointer transition-transform duration-300 mx-auto"
      />
    </div>
  );
};

export default Tags;
