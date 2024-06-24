import StatChart from "@/components/pokemoninfo/stat-chart";
import Pokedex from "pokedex-promise-v2";

type PokemonDetailsProps = {
  params: {
    pokemonId: string;
  };
};

const PokemonDetails = async ({
  params: { pokemonId },
}: PokemonDetailsProps) => {
  const pokedex = new Pokedex();
  const pokemon = await pokedex.getResource(
    [`/api/v2/pokemon/${pokemonId}`, `/api/v2/pokemon-species/${pokemonId}`],
    (response, error) => {
      // with callback
      if (!error) {
        return response;
      } else {
        console.log(error);
      }
    }
  );

  console.log(pokemon[0]);

  return (
    <div>
      {pokemonId}

      <StatChart stats={pokemon[0].stats} />
    </div>
  );
};
export default PokemonDetails;
