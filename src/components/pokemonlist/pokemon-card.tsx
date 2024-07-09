"use client";

import { PokemonTypes, PokemonTypesColors } from "@/lib/constants";
import { PokemonTypeKey } from "@/types/pokemon-type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";
import { motion } from "framer-motion";

const PokemonCard = ({ name }: { name: string }) => {
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
    return (
      <div className="skeleton w-full h-24 shadow-lg rounded-xl bg-gray-700"></div>
    );
  }

  if (error || !pokemonData) {
    return <div>Error loading Pokémon data. Please try again later.</div>;
  }
  if (pokemonData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FBF7EE] dark:bg-indigo-950 shadow-xl  py-3 sm:px-2 md:px-0 rounded-md flex md:flex-col justify-between relative border-t-4  border-b-4"
        style={{
          borderTopColor:
            PokemonTypesColors[
              pokemonData.types?.[0]?.type.name as PokemonTypeKey
            ],
          borderBottomColor:
            pokemonData.types.length > 1
              ? PokemonTypesColors[
                  pokemonData.types[1]?.type.name as PokemonTypeKey
                ]
              : PokemonTypesColors[
                  pokemonData.types[0].type.name as PokemonTypeKey
                ],
        }}
      >
        <Image
          src={
            pokemonData?.sprites?.other?.["official-artwork"]?.front_default ||
            "/default-image.png"
          }
          alt={pokemonData?.name}
          width={250}
          height={250}
          onClick={() => {
            router.push(`/${pokemonData.id}`);
          }}
          className="h-auto w-[100px] sm:w-[150px] md:w-[150px] lg:w-[200px] xl:w-[250px] 2xl:w-[300px] md:px-2"
        />
        <div className="flex flex-col lg:flex-row justify-between md:border-t border-gray-600 px-2">
          <div className="flex flex-col ">
            <h3
              onClick={() => {
                router.push(`/${pokemonData.id}`);
              }}
              className="text-2xl sm:text-4xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold capitalize text-zinc-700"
              style={{
                color:
                  PokemonTypesColors[
                    pokemonData.types[0].type.name as PokemonTypeKey
                  ],
              }}
            >
              {pokemonData.name}
            </h3>

            <p className="text-right md:text-left text-lg sm:text-3xl md:text-lg lg:text-xl xl:text-2xl  text-slate-300">
              #{pokemonData.id}
            </p>
          </div>

          <div className="gap-2 flex justify-end md:absolute md:bottom-4 md:right-2 lg:flex  lg:items-center">
            {pokemonData.types.map((type: any) => (
              <Image
                key={type.type.name}
                src={PokemonTypes[type.type.name as PokemonTypeKey]}
                alt={type.type.name}
                width={96}
                height={96}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-5 md:h-5 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
};

export default PokemonCard;
