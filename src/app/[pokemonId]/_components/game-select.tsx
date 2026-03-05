import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const GameSelect = ({gen}: {gen: number}) => {
  const gamesinGen = [
    ['Red', 'Blue', 'Green', 'Yellow'],
    ['Gold', 'Silver', 'Crystal'],
    ['Ruby', 'Sapphire', 'Emerald', 'FireRed', 'LeafGreen'],
    ['Diamond', 'Pearl', 'Platinum', 'HeartGold', 'SoulSilver'],
    ['Black', 'White', 'Black 2', 'White 2'],
    ['X', 'Y', 'Omega Ruby', 'Alpha Sapphire'],
    ['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon', 'Let&apos;s Go, Pikachu!', 'Let&apos;s Go, Eevee!'],
    ['Sword', 'Shield', "Brilliant Diamond", "Shining Pearl", "Legends: Arceus"],
    ['Scarlet', 'Violet', "Legends: Z-A"]
  ]

  return (
    <div className="  absolute -left-2 -bottom-4 md:left-[8%] md:-bottom-9 
    z-1 w-21 lg:bottom-26 lg:left-[4%] xl:left-[8%] xl:bottom-10">
      <Select defaultValue="Game" >
        <SelectTrigger className="bg-background">
          <SelectValue /> 
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={'Game'} value={'Game'} className="hidden">
              Game
            </SelectItem>
          {gamesinGen[gen].map(game => (
            <SelectItem key={game} value={game}>
              {game}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};