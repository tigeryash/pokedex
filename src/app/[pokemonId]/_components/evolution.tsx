import { SectionLabel } from '@/components/section-label'
import { ArrowRight } from 'lucide-react'

type EvolutionStep = {
  id: number;
  name: string;
  trigger: string;
};

type PokemonEvolutionProps = {
  chain: EvolutionStep[];
  currentPokemonId: number;
};

const formatName = (value: string) =>
  value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const PokemonEvolution = ({ chain, currentPokemonId }: PokemonEvolutionProps) => {
  return (
<div id="evolution">
        <SectionLabel>Evolution Chain</SectionLabel>
        <div className="flex items-center justify-center gap-5 p-6 bg-zinc-50 dark:bg-[#100e0e] rounded-xl border border-zinc-200 dark:border-white/5 overflow-x-auto">
          {chain.map((pokemon, index) => (
            <div key={pokemon.id} className="flex items-center gap-5">
              <div className="flex flex-col items-center gap-2 min-w-24">
                <div className={`w-20 h-20 border-2 rounded-xl flex items-center justify-center ${
                  pokemon.id === currentPokemonId ? 'bg-purple-500/10 border-orange-500 dark:border-yellow-500' : 'bg-zinc-100 dark:bg-[#100e0e] border-zinc-200 dark:border-white/10'
                }`}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="w-16 h-16"
                  />
                </div>
                <span className="text-sm font-medium text-orange-600 dark:text-foreground">{formatName(pokemon.name)}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">#{pokemon.id.toString().padStart(3, '0')}</span>
              </div>
              {index < chain.length - 1 && (
                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">{chain[index + 1].trigger}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>  )
}

export default PokemonEvolution