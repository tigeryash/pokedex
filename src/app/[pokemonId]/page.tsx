import StatChart from "@/components/pokemoninfo/stat-chart";
import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";

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
    <div>
      {pokemonId}

      <StatChart stats={pokemon[0].stats} />
    </div>
  );
};
export default PokemonDetails;
