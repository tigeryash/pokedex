import { SectionLabel } from '@/components/section-label'
import { TypeBadge } from '@/components/type-badge';

type PokemonTypeEffectivenessProps = {
  defendingTypes: string[];
};

const defendingChart: Record<string, { weakTo: string[]; resistTo: string[]; immuneTo: string[] }> = {
  normal: { weakTo: ['fighting'], resistTo: [], immuneTo: ['ghost'] },
  fire: { weakTo: ['water', 'ground', 'rock'], resistTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immuneTo: [] },
  water: { weakTo: ['electric', 'grass'], resistTo: ['fire', 'water', 'ice', 'steel'], immuneTo: [] },
  electric: { weakTo: ['ground'], resistTo: ['electric', 'flying', 'steel'], immuneTo: [] },
  grass: { weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'], resistTo: ['water', 'electric', 'grass', 'ground'], immuneTo: [] },
  ice: { weakTo: ['fire', 'fighting', 'rock', 'steel'], resistTo: ['ice'], immuneTo: [] },
  fighting: { weakTo: ['flying', 'psychic', 'fairy'], resistTo: ['bug', 'rock', 'dark'], immuneTo: [] },
  poison: { weakTo: ['ground', 'psychic'], resistTo: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immuneTo: [] },
  ground: { weakTo: ['water', 'grass', 'ice'], resistTo: ['poison', 'rock'], immuneTo: ['electric'] },
  flying: { weakTo: ['electric', 'ice', 'rock'], resistTo: ['grass', 'fighting', 'bug'], immuneTo: ['ground'] },
  psychic: { weakTo: ['bug', 'ghost', 'dark'], resistTo: ['fighting', 'psychic'], immuneTo: [] },
  bug: { weakTo: ['fire', 'flying', 'rock'], resistTo: ['grass', 'fighting', 'ground'], immuneTo: [] },
  rock: { weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'], resistTo: ['normal', 'fire', 'poison', 'flying'], immuneTo: [] },
  ghost: { weakTo: ['ghost', 'dark'], resistTo: ['poison', 'bug'], immuneTo: ['normal', 'fighting'] },
  dragon: { weakTo: ['ice', 'dragon', 'fairy'], resistTo: ['fire', 'water', 'electric', 'grass'], immuneTo: [] },
  dark: { weakTo: ['fighting', 'bug', 'fairy'], resistTo: ['ghost', 'dark'], immuneTo: ['psychic'] },
  steel: { weakTo: ['fire', 'fighting', 'ground'], resistTo: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immuneTo: ['poison'] },
  fairy: { weakTo: ['poison', 'steel'], resistTo: ['fighting', 'bug', 'dark'], immuneTo: ['dragon'] },
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const PokemonTypeEffectiveness = ({ defendingTypes }: PokemonTypeEffectivenessProps) => {
  const multipliers = Object.keys(defendingChart).reduce<Record<string, number>>((acc, attackType) => {
    acc[attackType] = 1;
    return acc;
  }, {});

  defendingTypes.forEach((type) => {
    const chart = defendingChart[type];
    if (!chart) {
      return;
    }

    chart.weakTo.forEach((attackType) => {
      multipliers[attackType] *= 2;
    });
    chart.resistTo.forEach((attackType) => {
      multipliers[attackType] *= 0.5;
    });
    chart.immuneTo.forEach((attackType) => {
      multipliers[attackType] *= 0;
    });
  });

  const weakTo = Object.entries(multipliers)
    .filter(([, value]) => value > 1)
    .sort((left, right) => right[1] - left[1])
    .map(([name]) => capitalize(name));
  const resistantTo = Object.entries(multipliers)
    .filter(([, value]) => value > 0 && value < 1)
    .sort((left, right) => left[1] - right[1])
    .map(([name]) => capitalize(name));
  const immuneTo = Object.entries(multipliers)
    .filter(([, value]) => value === 0)
    .map(([name]) => capitalize(name));

    console.log(weakTo)

  return (
    <div id="effectiveness">
      <SectionLabel>Type Effectiveness</SectionLabel>
      <div className="flex flex-col gap-5">
        <div className="p-5 bg-white/2 border border-white/5 rounded-lg">
          <div className="text-sm font-semibold text-(--text-secondary) mb-3 uppercase tracking-wider">Weak to (2x)</div>
          <div className="flex flex-wrap gap-2">
            {weakTo.map(type => (
              <TypeBadge
                key={type}
                type={type}
              />
            ))}
          </div>
        </div>
        <div className="p-5 bg-white/2 border border-white/5 rounded-lg">
          <div className="text-sm font-semibold text-(--text-secondary) mb-3 uppercase tracking-wider">Resistant to (0.5x)</div>
          <div className="flex flex-wrap gap-2">
            {resistantTo.map(type => (
              <TypeBadge
                key={type}
                type={type}
              />
            ))}
          </div>
        </div>
        <div className="p-5 bg-white/2 border border-white/5 rounded-lg">
          <div className="text-sm font-semibold text-(--text-secondary) mb-3 uppercase tracking-wider">Immune to (0x)</div>
          <div className="flex flex-wrap gap-2">
            {immuneTo.map(type => (
              <TypeBadge
                key={type}
                type={type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonTypeEffectiveness