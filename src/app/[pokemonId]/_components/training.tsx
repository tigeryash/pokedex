import { SectionLabel } from '@/components/section-label'
import { InfoRow } from './info-row';

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
  const maleRatio = Number.parseFloat(genderRatio);
  const safeMale = Number.isFinite(maleRatio) ? maleRatio : 0;
  const femaleRatio = Number.isFinite(maleRatio) ? 100 - maleRatio : 0;
  console.log(maleRatio)
  return (
    <div id="training">
      <SectionLabel>Training & Breeding</SectionLabel>
      <div className="flex flex-col gap-4">
        {/* Training Card */}
        <div className="p-5 bg-zinc-50 dark:bg-[#100e0e] rounded-xl border border-zinc-200 dark:border-white/5">
          <div className="text-[0.7rem] font-bold text-zinc-500 dark:text-[#404040] uppercase tracking-[0.08em] mb-1">
            Training
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                }
                label="Base Exp"
                value={baseExperience.toString()}
                bar
                barColor="#a855f7"
                barWidth="68%"
              />
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                }
                label="EV Yield"
                value={evYield}
              />
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7 16l4-4 4 4 4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                label="Growth Rate"
                value={growthRate}
              />
            </div>
            <div>
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                }
                label="Catch Rate"
                value={catchRate.toString()}
                extra={<span className="text-[0.75rem] text-zinc-500 dark:text-[#404040] font-normal"> / 255</span>}
                bar
                barWidth="17.6%"
              />
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" stroke="currentColor" strokeWidth="1.8" fill="none" />
                  </svg>
                }
                label="Base Happiness"
                value={baseHappiness.toString()}
                extra={<span className="text-[0.75rem] text-zinc-500 dark:text-[#404040] font-normal"> / 255</span>}
                bar
                barWidth="27.5%"
              />
            </div>
          </div>
        </div>

        {/* Breeding Card */}
        <div id="breeding" className="p-5 bg-zinc-50 dark:bg-[#100e0e] rounded-xl border border-zinc-200 dark:border-white/5">
          <div className="text-[0.7rem] font-bold text-zinc-500 dark:text-[#404040] uppercase tracking-[0.08em] mb-1">
            Breeding
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <ellipse cx="12" cy="13" rx="7" ry="9" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                }
                label="Egg Cycles"
                value={`${eggCycles} cycles`}
                bar
                barWidth="30%"
              />
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 4v7h5l-8 9v-7H5l8-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
                  </svg>
                }
                label="Steps to Hatch"
                value={stepsToHatch.toLocaleString()}
              />
            </div>
            <div>
              <InfoRow
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C9 2 6 5 6 9c0 4 3 7 6 7s6-3 6-7c0-4-3-7-6-7z" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M6 18c0 2 2.7 4 6 4s6-2 6-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                }
                label="Egg Group"
                value={eggGroups.join(' / ') || 'Unknown'}
              />
              <div className="flex items-center gap-3.5 py-3.5 border-b border-zinc-200 dark:border-white/10">
                <div className="w-8 h-8 bg-zinc-100 dark:bg-[#100e0e] rounded-lg border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="10" r="4" stroke="#6495ed" strokeWidth="1.8" />
                    <circle cx="15" cy="10" r="4" stroke="#ff69b4" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.72rem] text-zinc-500 dark:text-[#404040] uppercase tracking-[0.06em] font-semibold mb-1 flex items-center gap-1.5">
                    Gender Ratio
                  </div>
                  <div className="text-[0.95rem] font-semibold text-orange-600 dark:text-foreground">
                    {genderRatio}
                  </div>
                  <div className="h-1.5 rounded-[3px] overflow-hidden flex mt-1.5">

                    <div className="bg-[#6495ed] flex-1" style={{width:`${maleRatio}%`}} />
                    <div className="bg-[#ff69b4] " style={{width: `${femaleRatio}%`}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonTraining

