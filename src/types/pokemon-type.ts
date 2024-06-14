import { PokemonTypesColors } from "@/lib/constants";
import { NamedAPIResource } from "pokedex-promise-v2";

export type PokemonTypeKey = keyof typeof PokemonTypesColors;

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Form = {
  name: string;
  url: string;
};

export type GameIndex = {
  game_index: number;
  version: { name: string; url: string };
};

export type HeldItem = {
  item: { name: string; url: string };
  version_details: any[];
};

export type Moves = {
  move: Move | NamedAPIResource;
  version_group_details: VersionGroupDetails[];
};

export type Move = {
  move: { name: string; url: string };
};

export type VersionGroupDetails = {
  level_learned_at: number;
  move_learn_method: { name: string; url: string };
  version_group: { name: string; url: string };
};

export type PastAbilities = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

export type Types = {
  type: Type;
  slot: number;
};

export type Type = {
  name: string;
  url: string;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

export type Sprite = {
  animated?: Sprite;
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
};

export type Sprites = {
  other: OtherSprites;
  versions: Versions;
} & Sprite;

export type OtherSprites = {
  dream_world: Sprite;
  home: Sprite;
  "official-artwork": Sprite;
  showdown: Sprite;
};

export type Versions = {
  "generation-i": GenerationI;
  "generation-ii": GenerationII;
  "generation-iii": GenerationIII;
  "generation-iv": GenerationIV;
  "generation-v": GenerationV;
  "generation-vi": GenerationVI;
  "generation-vii": GenerationVII;
  "generation-viii": GenerationVIII;
};

export type GenerationI = {
  "red-blue": Sprite;
  yellow: Sprite;
};

export type GenerationII = {
  crystal: Sprite;
  gold: Sprite;
  silver: Sprite;
};

export type GenerationIII = {
  emerald: Sprite;
  "firered-leafgreen": Sprite;
  "ruby-sapphire": Sprite;
};

export type GenerationIV = {
  "diamond-pearl": Sprite;
  "heartgold-soulsilver": Sprite;
  platinum: Sprite;
};

export type GenerationV = {
  "black-white": Sprite;
};

export type GenerationVI = {
  "omegaruby-alphasapphire": Sprite;
  "x-y": Sprite;
};

export type GenerationVII = {
  icons?: Sprite;
  "ultra-sun-ultra-moon": Sprite;
};

export type GenerationVIII = {
  icons: Sprite;
};

export type PastType = {
  generation: number;
  types: Type[];
};

export type Cry = {
  latest: string;
  legacy: string;
};

export type PokemonType = {
  abilities: Ability[];
  base_experience: number | null;
  height: number;
  id: number;
  name: string;
  weight: number;
  cries?: Cry | Cry[] | string | null[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[] | [Moves[]] | Moves;
  order: number;
  species: { name: string; url: string };
  past_abilities?: PastAbilities[];
  types: Types[];
  stats: Stat[];
  sprites: Sprites;
  past_types?: PastType[];
};
