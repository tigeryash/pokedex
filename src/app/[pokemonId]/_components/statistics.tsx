import { SectionLabel } from '@/components/section-label'
import { PokemonStat } from 'pokenode-ts'

type PokemonStatisticsProps = {
  stats: PokemonStat[];
};

const statLabelMap: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const getMinStat = (name: string, base: number) => {
  if (name === 'hp') {
    return base * 2 + 110;
  }
  return base * 2 + 5;
};

const getMaxStat = (name: string, base: number) => {
  if (name === 'hp') {
    return base * 2 + 204;
  }
  return base * 2 + 99;
};

const PokemonStatistics = ({ stats }: PokemonStatisticsProps) => {
  const sortedStats = [...stats].sort((left, right) => left.stat.name.localeCompare(right.stat.name));
  const orderedStats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']
    .map((name) => sortedStats.find((stat) => stat.stat.name === name))
    .filter((stat): stat is PokemonStat => Boolean(stat));
  const total = orderedStats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div id="stats">
      <SectionLabel>Base Statistics</SectionLabel>
      <div className="p-6 bg-white/80 dark:bg-white/2 rounded-xl border border-zinc-300/80 dark:border-white/10">
        <div className="overflow-x-auto">
          <div className="flex min-w-140 flex-col gap-4">
            <div className="grid grid-cols-[100px_1fr_60px_60px_60px] items-center gap-4 pb-3 border-b border-zinc-300/80 dark:border-white/10">
              <span className="text-[0.7rem] font-semibold text-(--text-tertiary) uppercase tracking-wider text-left">Stat</span>
              <span className="text-[0.7rem] font-semibold text-(--text-tertiary) uppercase tracking-wider text-center"></span>
              <span className="text-[0.7rem] font-semibold text-(--text-tertiary) uppercase tracking-wider text-right">Base</span>
              <span className="text-[0.7rem] font-semibold text-(--text-tertiary) uppercase tracking-wider text-right">Min</span>
              <span className="text-[0.7rem] font-semibold text-(--text-tertiary) uppercase tracking-wider text-right">Max</span>
            </div>

            {orderedStats.map((stat) => {
              const base = stat.base_stat;
              const min = getMinStat(stat.stat.name, base);
              const max = getMaxStat(stat.stat.name, base);
              const width = `${Math.min((base / 150) * 100, 100)}%`;
              const high = base >= 100;

              return (
              <div key={stat.stat.name} className="grid grid-cols-[100px_1fr_60px_60px_60px] items-center gap-4">
                <span className="text-sm font-medium text-(--text-secondary) uppercase tracking-wider">{statLabelMap[stat.stat.name] ?? stat.stat.name}</span>
                <div className="h-1 bg-zinc-300/70 dark:bg-white/5 rounded overflow-hidden relative">
                  <div 
                    className={`h-full rounded ${high ? 'bg-green-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-yellow-500/60'}`}
                    style={{ width }}
                  />
                </div>
                <span className="text-base font-semibold text-(--text-primary) text-right">{base}</span>
                <span className="text-xs text-(--text-tertiary) text-right">{min}</span>
                <span className="text-xs text-(--text-tertiary) text-right">{max}</span>
              </div>
            )})}

            <div className="grid grid-cols-[100px_1fr_60px_60px_60px] items-center gap-4 pt-4 mt-2 border-t border-zinc-300/80 dark:border-white/10">
              <span className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider">Total</span>
              <div></div>
              <span className="text-xl font-bold text-(--text-primary) text-right">{total}</span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonStatistics