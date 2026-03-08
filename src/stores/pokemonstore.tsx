import { create } from "zustand";

type PokemonStore = {
  tagsClicked: boolean;
  setTagsClicked: (tagsClicked: boolean) => void;
  isSticky: boolean;
  setIsSticky: (isSticky: boolean) => void;
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  tagsClicked: false,
  setTagsClicked: (tagsClicked) => set({ tagsClicked }),
  isSticky: false,
  setIsSticky: (isSticky) => set((state) => (state.isSticky === isSticky ? state : { isSticky })),
  viewMode: "grid",
  setViewMode: (viewMode) => set((state) => (state.viewMode === viewMode ? state : { viewMode })),
}));
