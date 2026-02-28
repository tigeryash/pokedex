import { SectionLabel } from '@/components/section-label'

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
  const items = [
    { label: 'Generation', value: generation },
    { label: 'Color', value: color },
    { label: 'Habitat', value: habitat },
    { label: 'Classification', value: classification },
    { label: 'Shape', value: shape },
  ];

  return (
    <div>
      <SectionLabel>Additional Information</SectionLabel>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <span className="text-xs text-(--text-secondary) font-medium">{item.label}</span>
            <span className="text-2xl font-semibold text-(--text-primary)">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonAdditionalInfo