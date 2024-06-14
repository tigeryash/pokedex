"use client";

import {
  PokemonTypes,
  PokemonTypesColors,
  PokemonTypesColorsRGBA,
} from "@/lib/constants";
import { PokemonType, PokemonTypeKey } from "@/types/pokemon-type";
import Image from "next/image";
import Pokedex from "pokedex-promise-v2";
import { useEffect, useState } from "react";
const P = new Pokedex();

const PokemonCard = ({ name }: { name: string }) => {
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await P.getPokemonByName(name);
        const pokemonTypeData: PokemonType = {
          ...response,
          past_abilities: response.past_abilities.map((pa) => ({
            ability: pa.ability,
            is_hidden: pa.is_hidden,
            slot: pa.slot,
          })),
          past_types: response.past_types.map((pt) => ({
            generation: parseInt(pt.generation.url.split("/").slice(-2, -1)[0]), // Extracting ID from URL and converting to number
            types: pt.types.map((type) => ({
              slot: type.slot,
              name: type.type.name, // Adjusted to directly include name
              url: type.type.url, // Adjusted to directly include url
            })),
          })),
        };

        setPokemonData(pokemonTypeData);
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
    console.log(pokemonData);

    return (
      <div
        className="bg-white  shadow-xl  py-3 px-2 rounded-md flex justify-between  border-t-4  border-b-4"
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
            pokemonData.sprites.other["official-artwork"].front_default ||
            "/default-image.png"
          }
          alt={pokemonData.name}
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <h3
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

            <p className="text-right text-lg text-zinc-400">
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
