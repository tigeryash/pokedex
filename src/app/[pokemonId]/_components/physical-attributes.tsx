import { SectionLabel } from '@/components/section-label'

const PokemonPhysicalAttributes = () => {
  return (
     <div>
        <SectionLabel>Physical Specs</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Height</span>
            <span className="text-2xl font-semibold text-[var(--text-primary)]">
              1.5m <span className="text-sm text-[var(--text-secondary)] font-normal">(4'11")</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Weight</span>
            <span className="text-2xl font-semibold text-[var(--text-primary)]">
              40.5kg <span className="text-sm text-[var(--text-secondary)] font-normal">(89.3 lbs)</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Category</span>
            <span className="text-2xl font-semibold text-[var(--text-primary)]">Shadow</span>
          </div>
        </div>
      </div>
  )
}

export default PokemonPhysicalAttributes