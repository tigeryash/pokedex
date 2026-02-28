import { SectionLabel } from "@/components/section-label";
import { PokemonAbility } from "pokenode-ts";

type AbilitiesProps = {
  abilities: PokemonAbility[];
};

const PokemonAbilities = ({ abilities }: AbilitiesProps) => {
  if (!abilities || abilities.length === 0) {
    return null;
  }

  const formatName = (value: string) =>
    value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
   <div data-section="abilities">
        <SectionLabel>Abilities</SectionLabel>
        <div className="flex flex-col gap-4">
          {abilities.map((ability) => (
            <div key={ability.ability.name} className="p-5 bg-white/2 border border-white/5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-semibold text-(--text-primary)">{formatName(ability.ability.name)}</span>
                {ability.is_hidden && (
                  <span className="px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider bg-purple-500/20 text-(--accent) rounded">
                    Hidden
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-(--text-secondary) m-0">
                {ability.is_hidden
                  ? "This hidden ability can only be obtained through special encounters, transfers, or breeding combinations."
                  : "This is one of this Pokémon's standard battle abilities."}
              </p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default PokemonAbilities;
