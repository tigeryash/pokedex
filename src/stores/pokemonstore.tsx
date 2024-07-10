import { create } from "zustand";

type PokemonStore = {
  tagsClicked: boolean;
  setTagsClicked: (tagsClicked: boolean) => void;
  isSticky: boolean;
  setIsSticky: (isSticky: boolean) => void;
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  tagsClicked: false,
  setTagsClicked: (tagsClicked) => set({ tagsClicked }),
  isSticky: false,
  setIsSticky: (isSticky) => set({ isSticky }),
}));
