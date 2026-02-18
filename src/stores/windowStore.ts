import { create } from "zustand";
import type { AppleMenuDropdownItem } from "../types";

type WindowStore = {
  isAboutWindowOpen: boolean;
  isCalculatorWindowOpen: boolean;

  openWindow: (id: AppleMenuDropdownItem) => void;
  closeWindow: (id: AppleMenuDropdownItem) => void;
};

export const useWindowStore = create<WindowStore>((set) => ({
  isAboutWindowOpen: false,
  isCalculatorWindowOpen: false,
  openWindow: (id) =>
    set((state) => {
      switch (id) {
        case "about":
          return { isAboutWindowOpen: true };
        case "calculator":
          return { isCalculatorWindowOpen: true };
        default:
          return state;
      }
    }),
  closeWindow: (id) =>
    set((state) => {
      switch (id) {
        case "about":
          return { isAboutWindowOpen: false };
        case "calculator":
          return { isCalculatorWindowOpen: false };
        default:
          return state;
      }
    }),
}));
