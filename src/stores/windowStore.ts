import { create } from "zustand";
import type { AppleMenuDropdownItem } from "../types";

type WindowActions = {
  openWindow: (id: AppleMenuDropdownItem) => void;
  closeWindow: (id: AppleMenuDropdownItem) => void;
  isWindowOpen: (id: AppleMenuDropdownItem) => boolean;
};

type WindowStore = {
  openedWindowsIds: AppleMenuDropdownItem[];
  actions: WindowActions;
};

const useWindowStore = create<WindowStore>((set, get) => ({
  openedWindowsIds: [],

  actions: {
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
  },
}));

export const useOpenedWindows = () =>
  useWindowStore((state) => state.openedWindowsIds);

export const useOpenedWindow = (id: AppleMenuDropdownItem) =>
  useWindowStore((state) => state.openedWindowsIds.includes(id));

export const useWindowActions = () => useWindowStore((state) => state.actions);
