"use client";

import {
  PokemonTypes,
  PokemonTypesColors,
  PokemonTypesColorsRGBA,
} from "@/lib/constants";
import { PokemonTypeKey } from "@/types/pokemon-type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon, PokemonClient } from "pokenode-ts";

const PokemonCard = ({ name }: { name: string }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const router = useRouter();

  useEffect(() => {
    const P = new PokemonClient();
    const getPokemon = async () => {
      try {
        const response = await P.getPokemonByName(name);

        setPokemonData(response);
      } catch (error) {
        console.error("Failed to fetch pokemon data:", error);
        setPokemonData(null);
      }
    };

    getPokemon();
  }, [name]);

  if (!pokemonData) return null;

  if (pokemonData === undefined || pokemonData === null) {
    return null;
  } else {
    return (
      <div
        className="bg-[#FBF7EE] dark:bg-indigo-950 shadow-xl  py-3 px-2 rounded-md flex justify-between  border-t-4  border-b-4"
        style={{
          // backgroundColor:
          //   PokemonTypesColorsRGBA[
          //     pokemonData.types[0].type.name as PokemonTypeKey
          //   ],
          borderTopColor:
            PokemonTypesColors[
              pokemonData.types[0].type.name as PokemonTypeKey
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
          width={100}
          height={100}
          onClick={() => {
            router.push(`/${pokemonData.id}`);
          }}
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <h3
              onClick={() => {
                router.push(`/${pokemonData.id}`);
              }}
              className="text-2xl font-bold capitalize text-zinc-700"
              style={{
                color:
                  PokemonTypesColors[
                    pokemonData.types[0].type.name as PokemonTypeKey
                  ],
              }}
            >
              {pokemonData.name}
            </h3>

            <p className="text-right text-lg text-[#626262]">
              #{pokemonData.id}
            </p>
          </div>

          <div className="gap-2 flex justify-end">
            {pokemonData.types.map((type: any) => (
              <Image
                key={type.type.name}
                src={PokemonTypes[type.type.name as PokemonTypeKey]}
                alt={type.type.name}
                width={30}
                height={30}
                className="w-8 h-8 lg:w-12 lg:h-12"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonCard;
