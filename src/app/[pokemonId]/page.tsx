import Abilities from "@/app/[pokemonId]/_components/abilties";
import StatChart from "@/app/[pokemonId]/_components/stat-chart";
import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";
import MovesList from "@/app/[pokemonId]/_components/moves";
import TableOfContents from "../../components/tableofcontents/table-of-contents";
import PokemonImages from "./_components/pokemon-images";

type PokemonDetailsProps = {
  params: {
    pokemonId: string;
  };
};

const PokemonDetails = async ({
  params,
}: PokemonDetailsProps) => {
  const {pokemonId} = await params;
  const pokedex = new PokemonClient();
  const pspecies = await pokedex.getPokemonSpeciesById(parseInt(pokemonId));
  const pname = await pokedex.getPokemonById(parseInt(pokemonId));
  const pokemon: [Pokemon, PokemonSpecies] = [pname, pspecies];

  return (
    <>
    <TableOfContents id={pokemonId} />
    <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto pt-12 p-4 space-y-8">
      <PokemonImages pokemon={pokemon} />
      <StatChart stats={pokemon[0].stats} />
      <Abilities abilities={pokemon[0].abilities} />
      <MovesList moves={pokemon[0].moves} />
    </div>
    
    </>
  );
};
export default PokemonDetails;
