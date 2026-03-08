"use client";

import { PokemonTypes, PokemonTypesColors } from "@/lib/constants";
import { PokemonTypeKey } from "@/types/pokemon-type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";

const PokemonCardSkeleton = () => (
  <div className="skeleton h-24 w-full rounded-xl bg-gray-700 shadow-lg md:h-76" />
);

const PokemonCard = ({ name, viewMode = "grid" }: { name: string; viewMode?: "grid" | "list" }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(`/api/pokemon/name?name=${name}`, {
          method: "GET",
        });
        const data = await response.json();

        setPokemonData(data.response);
      } catch (error) {
        console.error("Failed to fetch pokemon data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPokemon();
  }, [name]);

  if (loading) {
    return <PokemonCardSkeleton />;
  }

  if (error || !pokemonData) {
    return <div>Error loading Pokémon data. Please try again later.</div>;
  }

  if (pokemonData) {
    const primaryType = pokemonData.types[0].type.name as PokemonTypeKey;
    const secondaryType = pokemonData.types.length > 1 
      ? pokemonData.types[1].type.name as PokemonTypeKey 
      : primaryType;

    const topColor = PokemonTypesColors[primaryType];
    const bottomColor = PokemonTypesColors[secondaryType];
    const imageSource = pokemonData?.sprites?.other?.["official-artwork"]?.front_default || "/default-image.png";

    if (viewMode === "list") {
      return (
        <div
          className="bg-[#FBF7EE] dark:bg-zinc-900/60 shadow-md hover:shadow-xl transition-all p-3 sm:px-4 rounded-xl flex items-center justify-between relative border-l-4 border-r-4 cursor-pointer group"
          style={{
            borderLeftColor: topColor,
            borderRightColor: bottomColor,
          }}
          onClick={() => router.push(`/${pokemonData.id}`)}
        >
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            <Image
              src={imageSource}
              alt={pokemonData.name}
              width={100}
              height={100}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-lg text-zinc-400 dark:text-zinc-500 font-bold">
                #{String(pokemonData.id).padStart(3, '0')}
              </span>
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-extrabold capitalize transition-colors"
                style={{ color: topColor }}
              >
                {pokemonData.name}
              </h3>
            </div>
          </div>

          <div className="gap-2 flex justify-end items-center">
            {pokemonData.types.map((type: any) => (
              <Image
                key={type.type.name}
                src={PokemonTypes[type.type.name as PokemonTypeKey]}
                alt={type.type.name}
                width={96}
                height={96}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
            ))}
          </div>
        </div>
      );
    }

    // Grid View
    return (
      <div
        className="bg-[#FBF7EE] dark:bg-indigo-950/40 shadow-xl py-3 px-2 rounded-xl flex flex-col justify-between relative border-t-4 border-b-4 cursor-pointer group hover:scale-[1.02] transition-transform"
        style={{
          borderTopColor: topColor,
          borderBottomColor: bottomColor,
        }}
        onClick={() => router.push(`/${pokemonData.id}`)}
      >
        <Image
          src={imageSource}
          alt={pokemonData.name}
          width={250}
          height={250}
          className="h-auto w-25 sm:w-37.5 md:w-full max-w-[200px] mx-auto group-hover:drop-shadow-2xl transition-all"
        />
        <div className="flex flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700/50 pt-2 px-2 mt-2 gap-1 sm:gap-2">
          <div className="flex flex-col">
            <h3
              className="text-lg sm:text-lg lg:text-xl font-bold capitalize truncate"
              style={{ color: topColor, maxWidth: "100px" }}
            >
              {pokemonData.name}
            </h3>
            <p className="text-left text-xs sm:text-sm md:text-base text-zinc-500 dark:text-slate-400 font-medium tracking-wide">
              #{String(pokemonData.id).padStart(3, '0')}
            </p>
          </div>

          <div className="gap-1 flex justify-end items-center flex-shrink-0">
            {pokemonData.types.map((type: any) => (
              <Image
                key={type.type.name}
                src={PokemonTypes[type.type.name as PokemonTypeKey]}
                alt={type.type.name}
                width={96}
                height={96}
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonCard;
