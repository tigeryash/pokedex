
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

type EvolutionChainNode = {
  species: {
    name: string;
    url: string;
  };
  evolution_details: {
    min_level: number | null;
    trigger: {
      name: string;
    };
    item: { name: string } | null;
  }[];
  evolves_to: EvolutionChainNode[];
};

type EvolutionChainResponse = {
  chain: EvolutionChainNode;
};

type LocationEncounter = {
  location_area: {
    name: string;
  };
  version_details: {
    version: {
      name: string;
    };
  }[];
};

const titleCase = (value: string) =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getIdFromResourceUrl = (url: string) => {
  const split = url.split("/").filter(Boolean);
  return Number(split[split.length - 1]);
};

const getEvolutionTrigger = (node: EvolutionChainNode) => {
  const detail = node.evolution_details?.[0];
  if (!detail) {
    return "Base";
  }

  if (detail.min_level) {
    return `Lvl ${detail.min_level}`;
  }

  if (detail.item?.name) {
    return titleCase(detail.item.name);
  }

  return titleCase(detail.trigger.name);
};

const flattenEvolutionChain = (
  node: EvolutionChainNode,
  output: { id: number; name: string; trigger: string }[] = [],
) => {
  output.push({
    id: getIdFromResourceUrl(node.species.url),
    name: node.species.name,
    trigger: getEvolutionTrigger(node),
  });

  node.evolves_to.forEach((nextNode) => flattenEvolutionChain(nextNode, output));
  return output;
};

const getGenderRatio = (genderRate: number) => {
  if (genderRate < 0) {
    return "Genderless";
  }

  const female = (genderRate / 8) * 100;
  const male = 100 - female;
  return `${male.toFixed(1)}% ♂ / ${female.toFixed(1)}% ♀`;
};

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
  const pokemonNumericId = parseInt(pokemonId);
  const [pspecies, pname] = await Promise.all([
    pokedex.getPokemonSpeciesById(pokemonNumericId),
    pokedex.getPokemonById(pokemonNumericId),
  ]);
  const pokemon: [Pokemon, PokemonSpecies] = [pname, pspecies];

  const [evolutionResponse, locationsResponse] = await Promise.all([
    fetch(pspecies.evolution_chain.url, { cache: "force-cache" }).then((res) => res.json() as Promise<EvolutionChainResponse>),
    fetch(pname.location_area_encounters, { cache: "force-cache" }).then((res) => res.json() as Promise<LocationEncounter[]>),
  ]);

  const evolutionChain = flattenEvolutionChain(evolutionResponse.chain);
  const uniqueLocations = locationsResponse
    .slice(0, 8)
    .map((encounter) => ({
      game: titleCase(encounter.version_details[0]?.version.name ?? "Unknown"),
      location: titleCase(encounter.location_area.name),
    }));
  const englishFlavorText = pspecies.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  )?.flavor_text;
  const englishGenus = pspecies.genera.find((entry) => entry.language.name === "en")?.genus;
  const evYield = pname.stats
    .filter((stat) => stat.effort > 0)
    .map((stat) => `${stat.effort} ${titleCase(stat.stat.name)}`)
    .join(", ");

  return (
    <main className="h-[calc(100dvh-5rem)] overflow-hidden w-full">
      <TableOfContents id={pokemonId} />
      <div className=" grid h-full w-full max-w-screen-2xl grid-cols-1 lg:grid-cols-[minmax(360px,42%)_1fr]">
        <div className="min-h-0 h-full flex items-center justify-center">
          <PokemonImages pokemon={pokemon} />
        </div>
        <div className="min-h-0 h-full overflow-y-auto pt-24 pb-10 px-4 lg:pt-28 lg:px-8">
          <div className="flex flex-col gap-8">
          <PokemonName name={titleCase(pokemon[0].name)} />
          <PokemonTypes types={pokemon[0].types.map(t => t.type.name)} />
          <PokemonDescription description={(englishFlavorText ?? "No Pokédex entry found.").replace(/\f/g, " ")} />
          <PokemonAbilities abilities={pokemon[0].abilities} />
          <PokemonPhysicalAttributes
            height={pokemon[0].height}
            weight={pokemon[0].weight}
            category={(englishGenus ?? "Unknown").replace(/ Pokémon$/i, "")}
          />
          <PokemonStatistics stats={pokemon[0].stats} />
          <PokemonMoves moves={pokemon[0].moves} />
          <PokemonEvolution chain={evolutionChain} currentPokemonId={pokemonNumericId} />
          <PokemonTypeEffectiveness defendingTypes={pokemon[0].types.map((type) => type.type.name)} />
          <PokemonTraining
            baseExperience={pokemon[0].base_experience}
            evYield={evYield || "None"}
            growthRate={titleCase(pspecies.growth_rate.name)}
            catchRate={pspecies.capture_rate}
            baseHappiness={pspecies.base_happiness}
            eggCycles={pspecies.hatch_counter}
            stepsToHatch={pspecies.hatch_counter * 255}
            eggGroups={pspecies.egg_groups.map((group) => titleCase(group.name))}
            genderRatio={getGenderRatio(pspecies.gender_rate)}
          />
          <PokemonAdditionalInfo
            generation={titleCase(pspecies.generation.name)}
            color={titleCase(pspecies.color.name)}
            habitat={titleCase(pspecies.habitat?.name ?? "Unknown")}
            classification={pspecies.is_legendary ? "Legendary" : pspecies.is_mythical ? "Mythical" : "Standard"}
            shape={titleCase(pspecies.shape?.name ?? "Unknown")}
          />
          <PokemonLocations locations={uniqueLocations} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default PokemonDetails;
