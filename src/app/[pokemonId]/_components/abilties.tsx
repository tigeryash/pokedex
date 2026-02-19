import { PokemonAbility } from "pokenode-ts";

type AbilitiesProps = {
  abilities: PokemonAbility[];
};

const Abilities = ({ abilities }: AbilitiesProps) => {
  if (!abilities || abilities.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-2xl font-bold text-center mb-4">Abilities</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {abilities.map((ability, index) => (
          <div
            key={ability.ability.name}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <h4 className="font-semibold capitalize mb-1">
              {ability.ability.name.replace(/-/g, " ")}
            </h4>
            {ability.is_hidden && (
              <span className="text-xs text-gray-500">(Hidden Ability)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Abilities;
