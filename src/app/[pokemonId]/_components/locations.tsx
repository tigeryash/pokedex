
import { SectionLabel } from '@/components/section-label'

type PokemonLocation = {
  game: string;
  location: string;
};

type PokemonLocationsProps = {
  locations: PokemonLocation[];
};

const PokemonLocations = ({ locations }: PokemonLocationsProps) => {
  return (
    <div id="locations">
      <SectionLabel>Locations</SectionLabel>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {locations.map((loc, index) => (
          <div key={index} className="p-4 bg-zinc-50 dark:bg-[#100e0e] border border-zinc-200 dark:border-white/5 rounded-lg">
            <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">{loc.game}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">{loc.location}</div>
          </div>
        ))}
      </div>
      {locations.length === 0 && (
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">No location encounters found for this Pokémon.</p>
      )}
    </div>
  )
}

export default PokemonLocations