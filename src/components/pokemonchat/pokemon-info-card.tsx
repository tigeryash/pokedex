"use client";
import Image from "next/image";
import { PokemonTypes, PokemonTypesColors } from "../../lib/constants";
import { useState } from "react";
import Link from "next/link";

type PokemonTypeKey = keyof typeof PokemonTypesColors;

const PokemonInfoCard = ({ pokemon }: { pokemon: any }) => {
  const [current, setCurrent] = useState(0);
  const englishDescription = pokemon[1].flavor_text_entries.filter(
    (description: any) => description.language.name === "en"
  );
  return (
    <div className="relative flex flex-col items-center justify-center w-full  p-4 bg-zinc-200 rounded-lg">
      <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col  text-left">
        <h2 className="text-lg md:text-4xl text-zinc-500">#{pokemon[0].id}</h2>
      </div>
      <Image
        src={pokemon[0].sprites.other["official-artwork"].front_default}
        alt={pokemon[0].name}
        width={200}
        height={200}
        className="w-full "
      />

      <div className="w-full flex justify-between items-center border-b border-zinc-300 pb-2 ">
        <h1 className="capitalize font-semibold text-lg md:text-4xl text-black">
          {pokemon[0].name}
        </h1>
        <div className="gap-2 flex ">
          {pokemon[0].types.map((type: any) => (
            <Image
              key={type.type.name}
              src={PokemonTypes[type.type.name as PokemonTypeKey]}
              alt={type.type.name}
              width={600}
              height={600}
              className="w-6 h-6 lg:w-12 lg:h-12"
            />
          ))}
        </div>
      </div>
      <div className="py-2 sm:p-2">
        {englishDescription.length > 0 ? (
          <div className="">
            <p className=" text-sm md:text-lg capitalize text-black">
              Pokedex Entry from: {englishDescription[current].version.name}
            </p>
            <p className="text-xs md:text-base text-black">
              {englishDescription[current].flavor_text}
            </p>
          </div>
        ) : (
          <p>No description available</p>
        )}
        <div className="flex text-xs md:text-base justify-between font-bold py-4 md:pt-8">
          <button
            className="bg-blue-500 text-zinc-300 p-2 rounded-lg"
            onClick={() => {
              if (current === 0) {
                setCurrent(englishDescription.length - 1);
              } else {
                setCurrent((prev) => prev - 1);
              }
            }}
          >
            Previous
          </button>
          <button
            className="bg-green-500 text-zinc-300 p-2 rounded-lg"
            onClick={() => {
              if (current < englishDescription.length - 1) {
                setCurrent((prev) => prev + 1);
              } else {
                setCurrent(0);
              }
            }}
          >
            Next
          </button>
        </div>
        <Link href={`/${pokemon[0].id}`}>
          <button className="underline text-blue-500 text-center w-full">
            View Pokemon
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonInfoCard;
