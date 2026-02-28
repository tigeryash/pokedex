import { TypeBadge } from "@/components/type-badge"
import { PokemonTypesColors, PokemonTypesColorsRGBA } from "@/lib/constants"

const textColorByType: Record<string, string> = {
    ghost: '#c4b5fd',
    poison: '#e9d5ff',
};

const PokemonTypes = ({types}: {types: string[]}) => {
  return (
    <div className="flex gap-2 mb-6">
                {types.map((type) => {
                    const key = type as keyof typeof PokemonTypesColors;

                    return (
                        <div 
                            key={type}
                            className="px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                            style={{
                                background: PokemonTypesColorsRGBA[key],
                                border: `1px solid ${PokemonTypesColors[key]}`,
                                color: textColorByType[type] ?? '#ffffff'
                            }}
                        >
                            <TypeBadge type={type} />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                    )
                })}
    </div>
  )
}

export default PokemonTypes