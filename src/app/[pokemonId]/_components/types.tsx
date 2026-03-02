import { TypeBadge } from "@/components/type-badge"

const textColorByType: Record<string, string> = {
    ghost: '#c4b5fd',
    poison: '#e9d5ff',
};

const PokemonTypes = ({types}: {types: string[]}) => {
  return (
    <div className="flex gap-2 mb-6">
                {types.map((type) => {
                    return (
                        <TypeBadge key={type} type={type} />
                    )
                })}
    </div>
  )
}

export default PokemonTypes