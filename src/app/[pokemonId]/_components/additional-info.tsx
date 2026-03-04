import { SectionLabel } from '@/components/section-label'
import { InfoRow } from './info-row'

type PokemonAdditionalInfoProps = {
  generation: string;
  color: string;
  habitat: string;
  classification: string;
  shape: string;
};

const PokemonAdditionalInfo = ({
  generation,
  color,
  habitat,
  classification,
  shape,
}: PokemonAdditionalInfoProps) => {
  return (
    <div id="additional">
      <SectionLabel>Additional Information</SectionLabel>
      <div className="p-5 bg-zinc-50 dark:bg-[#100e0e] rounded-xl border border-zinc-200 dark:border-white/5">
        <div className="grid grid-cols-2 gap-x-8">
          <div>
            <InfoRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              }
              label="Generation"
              value={generation}
            />
            <InfoRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="6" fill="#a855f7" opacity="0.4" />
                  <circle cx="12" cy="12" r="3" fill="#a855f7" />
                </svg>
              }
              label="Color"
              value={color}
            />
            <InfoRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              }
              label="Habitat"
              value={habitat}
            />
          </div>
          <div>
            <InfoRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              }
              label="Classification"
              value={classification}
            />
            <InfoRow
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
              label="Shape"
              value={shape}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonAdditionalInfo
