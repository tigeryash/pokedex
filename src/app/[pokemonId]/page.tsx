import Abilities from "@/components/pokemoninfo/abilties";
import MainInfo from "@/components/pokemoninfo/main-info";
import StatChart from "@/components/pokemoninfo/stat-chart";
import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";
import Moves from "../moves/page";

type PokemonDetailsProps = {
  params: {
    pokemonId: string;
  };
};

const PokemonDetails = async ({
  params: { pokemonId },
}: PokemonDetailsProps) => {
  const pokedex = new PokemonClient();
  const pspecies = await pokedex.getPokemonSpeciesById(parseInt(pokemonId));
  const pname = await pokedex.getPokemonById(parseInt(pokemonId));
  const pokemon: [Pokemon, PokemonSpecies] = [pname, pspecies];

  console.log(pokemon[0].stats);

  return (
    <div className="flex flex-col justify-center items-center">
      {pokemonId}
      <MainInfo />

      <Abilities />

      <StatChart stats={pokemon[0].stats} />

      <Moves />
    </div>
  );
};
export default PokemonDetails;
