import { create } from "zustand";

type WindowStore = {
  isAboutWindowOpen: boolean;
  openAboutWindow: () => void;
  closeAboutWindow: () => void;
};

export const useWindowStore = create<WindowStore>((set) => ({
  isAboutWindowOpen: false,
  openAboutWindow: () => set(() => ({ isAboutWindowOpen: true })),
  closeAboutWindow: () => set(() => ({ isAboutWindowOpen: false })),
}));
