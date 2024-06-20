import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  setTheme: (theme: "light" | "dark") => {
    set({ theme });
    localStorage.setItem("theme", theme);
  },
}));

export default useThemeStore;
