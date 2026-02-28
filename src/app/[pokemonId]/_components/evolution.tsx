import { SectionLabel } from '@/components/section-label'
import { ArrowRight } from 'lucide-react'

const PokemonEvolution = () => {
  return (
<div data-section="evolution">
        <SectionLabel>Evolution Chain</SectionLabel>
        <div className="flex items-center justify-center gap-5 p-6 bg-white/[0.02] rounded-xl border border-white/5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-white/[0.03] border-2 border-white/10 rounded-xl flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" alt="Gastly" className="w-16 h-16" />
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">Gastly</span>
            <span className="text-xs text-[var(--text-secondary)]">#092</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-6 h-6 text-[var(--text-secondary)]" />
            <span className="text-xs text-[var(--text-tertiary)]">Lvl 25</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-white/[0.03] border-2 border-white/10 rounded-xl flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" alt="Haunter" className="w-16 h-16" />
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">Haunter</span>
            <span className="text-xs text-[var(--text-secondary)]">#093</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-6 h-6 text-[var(--text-secondary)]" />
            <span className="text-xs text-[var(--text-tertiary)]">Trade</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-purple-500/10 border-2 border-[var(--accent)] rounded-xl flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" className="w-16 h-16" />
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">Gengar</span>
            <span className="text-xs text-[var(--text-secondary)]">#094</span>
          </div>
        </div>
      </div>  )
}

export default PokemonEvolution