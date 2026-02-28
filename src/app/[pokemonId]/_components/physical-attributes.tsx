import { SectionLabel } from '@/components/section-label'

type PokemonPhysicalAttributesProps = {
  height: number;
  weight: number;
  category: string;
};

const PokemonPhysicalAttributes = ({
  height,
  weight,
  category,
}: PokemonPhysicalAttributesProps) => {
  const heightInMeters = height / 10;
  const weightInKg = weight / 10;
  const feetTotal = (heightInMeters * 3.28084);
  const feet = Math.floor(feetTotal);
  const inches = Math.round((feetTotal - feet) * 12);
  const weightInLbs = weightInKg * 2.20462;

  return (
     <div>
        <SectionLabel>Physical Specs</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-(--text-secondary) font-medium">Height</span>
            <span className="text-2xl font-semibold text-(--text-primary)">
              {heightInMeters.toFixed(1)}m <span className="text-sm text-(--text-secondary) font-normal">({feet}'{inches}")</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-(--text-secondary) font-medium">Weight</span>
            <span className="text-2xl font-semibold text-(--text-primary)">
              {weightInKg.toFixed(1)}kg <span className="text-sm text-(--text-secondary) font-normal">({weightInLbs.toFixed(1)} lbs)</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-(--text-secondary) font-medium">Category</span>
            <span className="text-2xl font-semibold text-(--text-primary)">{category}</span>
          </div>
        </div>
      </div>
  )
}

export default PokemonPhysicalAttributes