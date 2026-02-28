
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
          <div key={index} className="p-4 bg-white/2 border border-white/5 rounded-lg">
            <div className="text-xs font-semibold text-(--accent) uppercase tracking-wider mb-1">{loc.game}</div>
            <div className="text-sm text-(--text-secondary)">{loc.location}</div>
          </div>
        ))}
      </div>
      {locations.length === 0 && (
        <p className="mt-4 text-sm text-(--text-secondary)">No location encounters found for this Pokémon.</p>
      )}
    </div>
  )
}

export default PokemonLocations