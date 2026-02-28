import { Volume2 } from 'lucide-react'

type PokemonNameProps = {
  name: string;
};

const PokemonName = ({ name }: PokemonNameProps) => {
  return (
    <div className="flex items-center gap-4 mb-3">
        <h1 className="m-0 text-6xl font-bold tracking-tight bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent">
        {name}
        </h1>
        <button className="bg-white/5 border border-white/10 rounded-full w-10 h-10 flex items-center justify-center text-(--text-secondary) cursor-pointer hover:bg-white/10 transition-colors">
            <Volume2 className="w-5 h-5" />
        </button>
    </div>
  )
}

export default PokemonName