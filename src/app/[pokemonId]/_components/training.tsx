import { SectionLabel } from '@/components/section-label'

type PokemonTrainingProps = {
  baseExperience: number;
  evYield: string;
  growthRate: string;
  catchRate: number;
  baseHappiness: number;
  eggCycles: number;
  stepsToHatch: number;
  eggGroups: string[];
  genderRatio: string;
};

const PokemonTraining = ({
  baseExperience,
  evYield,
  growthRate,
  catchRate,
  baseHappiness,
  eggCycles,
  stepsToHatch,
  eggGroups,
  genderRatio,
}: PokemonTrainingProps) => {
  return (
    <div id="training">
      <SectionLabel>Training & Breeding</SectionLabel>
      <div className="flex flex-col gap-8">
        <div>
          <div className="text-xs font-semibold text-(--text-tertiary) mb-4 uppercase tracking-wider">Gameplay</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Base Experience</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{baseExperience}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">EV Yield</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{evYield}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Growth Rate</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{growthRate}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Catch Rate</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{catchRate}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Base Happiness</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{baseHappiness}</span>
            </div>
          </div>
        </div>
        <div id="breeding">
          <div className="text-xs font-semibold text-(--text-tertiary) mb-4 uppercase tracking-wider">Breeding</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Egg Cycles</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{eggCycles}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Steps to Hatch</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{stepsToHatch.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Egg Group</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{eggGroups.join(' / ') || 'Unknown'}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-(--text-secondary) font-medium">Gender Ratio</span>
              <span className="text-2xl font-semibold text-(--text-primary)">{genderRatio}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonTraining