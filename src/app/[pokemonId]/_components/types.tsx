import { TypeBadge } from "@/components/type-badge"
import { PokemonTypesColors, PokemonTypesColorsRGBA } from "@/lib/constants"

const PokemonTypes = ({types}: {types: string[]}) => {
  return (
    <div className="flex gap-2 mb-6">
        <div 
            className="px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            style={{
                background: PokemonTypesColorsRGBA.ghost,
                border: `1px solid ${PokemonTypesColors.ghost}`,
                color: '#c4b5fd'
            }}
        >
            <TypeBadge type={types[0]} />
            {types[0].charAt(0).toUpperCase() + types[0].slice(1)}
        </div>

        {types[1] && (
            <div 
                className="px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                style={{
                    background: PokemonTypesColorsRGBA.poison,
                    border: `1px solid ${PokemonTypesColors.poison}`,
                    color: '#e9d5ff'
                }}
            >
                <TypeBadge type={types[1]} />
                {types[1].charAt(0).toUpperCase() + types[1].slice(1)}
            </div>
        )}
    </div>
  )
}

export default PokemonTypes