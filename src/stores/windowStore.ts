import { create } from "zustand";
import type { AppleMenuDropdownItem } from "../types";

type WindowStore = {
  openedWindowsIds: AppleMenuDropdownItem[];

  openWindow: (id: AppleMenuDropdownItem) => void;
  closeWindow: (id: AppleMenuDropdownItem) => void;
  isWindowOpen: (id: AppleMenuDropdownItem) => boolean;
};

export const useWindowStore = create<WindowStore>((set, get) => ({
  openedWindowsIds: [],

  openWindow: (id) =>
    set((state) => ({
      openedWindowsIds: state.openedWindowsIds.includes(id)
        ? state.openedWindowsIds
        : [...state.openedWindowsIds, id],
    })),

  closeWindow: (id) =>
    set((state) => ({
      openedWindowsIds: state.openedWindowsIds.filter(
        (windowId) => windowId !== id,
      ),
    })),

  isWindowOpen: (id) => {
    return get().openedWindowsIds.includes(id);
  },
}));
