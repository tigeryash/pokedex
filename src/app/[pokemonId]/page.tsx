
import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";
import TableOfContents from "../../components/tableofcontents/table-of-contents";
import PokemonImages from "./_components/pokemon-images";
import PokemonName from "./_components/name";
import PokemonTypes from "./_components/types";
import PokemonDescription from "./_components/description";
import PokemonAbilities from "./_components/abilities";
import PokemonPhysicalAttributes from "./_components/physical-attributes";
import PokemonStatistics from "./_components/statistics";
import PokemonMoves from "./_components/moves";
import PokemonEvolution from "./_components/evolution";
import PokemonTypeEffectiveness from "./_components/type-effectiveness";
import PokemonTraining from "./_components/training";
import PokemonAdditionalInfo from "./_components/additional-info";
import PokemonLocations from "./_components/locations";

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
    <main className="flex items-center justify-center h-full ">
      <TableOfContents id={pokemonId} />
      <div className="flex flex-col lg:flex-row justify-center  items-center w-full max-w-4xl lg:max-w-full 
      mx-auto lg:mx-0  space-y-8 ">
        <PokemonImages pokemon={pokemon} />
        <div className="lg:flex-1 lg:overflow-y-scroll flex flex-col gap-8 h-full ">
          <PokemonName />
          <PokemonTypes types={pokemon[0].types.map(t => t.type.name)} />
          <PokemonDescription description={pokemon[1].flavor_text_entries[0].flavor_text} />
          <PokemonAbilities abilities={pokemon[0].abilities} />
          <PokemonPhysicalAttributes />
          <PokemonStatistics />
          <PokemonMoves moves={pokemon[0].moves} />
          <PokemonEvolution />
          <PokemonTypeEffectiveness />
          <PokemonTraining />
          <PokemonAdditionalInfo />
          <PokemonLocations />
        </div>
      </div>
    </main>
  );
};
export default PokemonDetails;
