import Image from "next/image";
import { Badge } from "./ui/badge";
import { PokemonTypes } from "@/lib/constants";

export const TypeBadge = ({ type }: { type: string }) => {
  const typeText = type.charAt(0).toLowerCase() + type.slice(1);
  return (
    <Badge className="gap-3 flex items-center dark:bg-[#080808] border border-white/20 py-1 px-3 text-lg">
      <Image 
        src={PokemonTypes[typeText as keyof typeof PokemonTypes]} 
        alt={typeText}
        width={16}
        height={16}
        className="w-4 h-4 xl:w-6 xl:h-6"
      />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
};