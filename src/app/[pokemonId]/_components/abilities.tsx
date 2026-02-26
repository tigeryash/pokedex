import { SectionLabel } from "@/components/section-label";
import { PokemonAbility } from "pokenode-ts";

type AbilitiesProps = {
  abilities: PokemonAbility[];
};

const PokemonAbilities = ({ abilities }: AbilitiesProps) => {
  if (!abilities || abilities.length === 0) {
    return null;
  }

  return (
   <div data-section="abilities">
        <SectionLabel>Abilities</SectionLabel>
        <div className="flex flex-col gap-4">
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-semibold text-[var(--text-primary)]">Cursed Body</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] m-0">
              When a move hits this Pokémon, that move has a 30% chance of becoming disabled. A disabled move cannot be used until it is re-enabled by switching out.
            </p>
          </div>
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-semibold text-[var(--text-primary)]">Levitate</span>
              <span className="px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider bg-purple-500/20 text-[var(--accent)] rounded">
                Hidden
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] m-0">
              This Pokémon is immune to Ground-type moves, Spikes, Toxic Spikes, and Arena Trap.
            </p>
          </div>
        </div>
      </div>
  );
};

export default PokemonAbilities;
