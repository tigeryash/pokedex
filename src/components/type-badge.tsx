import Image from "next/image";
import { Badge } from "./ui/badge";
import { PokemonTypes } from "@/lib/constants";

export const TypeBadge = ({ type }: { type: string }) => {
  return (
    <Badge className="gap-3 flex items-center">
      <Image 
        src={PokemonTypes[type as keyof typeof PokemonTypes]} 
        alt={type}
        width={16}
        height={16}
        className="w-4 h-4"
      />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
};