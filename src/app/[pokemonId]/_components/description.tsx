
const PokemonDescription = ({ description }: { description: string }) => {
  return (
     <div className="text-lg leading-relaxed text-[var(--text-secondary)] max-w-[600px] border-l-2 border-[var(--accent)] pl-5">
          {description.replace(/\f/g, " ").replace(/POKéMON/g, "Pokémon").replace(/POKéMON/g, "Pokémon")}
    </div>
  )
}

export default PokemonDescription