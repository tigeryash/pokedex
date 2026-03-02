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
                        <TypeBadge type={type} />
                    )
                })}
    </div>
  )
}

export default PokemonTypes