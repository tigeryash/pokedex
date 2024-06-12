import Image from "next/image";
import { Badge } from "../ui/badge";
import { PokemonTypesColors } from "../../lib/constants";

type PokemonTypeKey = keyof typeof PokemonTypesColors;

const PokemonInfoCard = ({ pokemon }: { pokemon: any }) => {
  console.log(pokemon.sprites.other["official-artwork"].front_default);
  return (
    <div className="flex flex-col items-center justify-center w-full  p-4 bg-zinc-200 rounded-lg">
      <h1 className="capitalize">{pokemon.name}</h1>
      <h2>{pokemon.id}</h2>
      <Image
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width={200}
        height={200}
      />

      {pokemon.types.map((type: any) => (
        <Badge
          key={type.type.name}
          className={`bg-[${
            PokemonTypesColors[type.type.name as PokemonTypeKey]
          }]`}
        >
          {type.type.name}
        </Badge>
      ))}
      <p>stats</p>
    </div>
  );
};

export default PokemonInfoCard;
