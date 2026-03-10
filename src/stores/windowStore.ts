import { create } from "zustand";
import type { AppleMenuDropdownItem } from "../types";

type WindowActions = {
  openWindow: (id: AppleMenuDropdownItem) => void;
  closeWindow: (id: AppleMenuDropdownItem) => void;
  closeAllWindows: () => void;
  focusWindow: (id: AppleMenuDropdownItem) => void;
  isWindowOpen: (id: AppleMenuDropdownItem) => boolean;
};

type WindowStore = {
  openedWindowsIds: AppleMenuDropdownItem[];
  windowOrder: AppleMenuDropdownItem[];
  activeWindowId: AppleMenuDropdownItem | null;
  actions: WindowActions;
};

const moveToFront = (
  order: AppleMenuDropdownItem[],
  id: AppleMenuDropdownItem,
) => {
  const filtered = order.filter((windowId) => windowId !== id);
  return [...filtered, id];
};

const useWindowStore = create<WindowStore>((set, get) => ({
  openedWindowsIds: [],
  windowOrder: [],
  activeWindowId: null,

  actions: {
    openWindow: (id) =>
      set((state) => ({
        openedWindowsIds: state.openedWindowsIds.includes(id)
          ? state.openedWindowsIds
          : [...state.openedWindowsIds, id],
        windowOrder: state.windowOrder.includes(id)
          ? moveToFront(state.windowOrder, id)
          : [...state.windowOrder, id],
        activeWindowId: id,
      })),

    closeWindow: (id) =>
      set((state) => {
        const nextOrder = state.windowOrder.filter(
          (windowId) => windowId !== id,
        );
        const nextActive =
          state.activeWindowId === id
            ? nextOrder[nextOrder.length - 1] ?? null
            : state.activeWindowId;

        return {
          openedWindowsIds: state.openedWindowsIds.filter(
            (windowId) => windowId !== id,
          ),
          windowOrder: nextOrder,
          activeWindowId: nextActive,
        };
      }),

    closeAllWindows: () =>
      set(() => ({
        openedWindowsIds: [],
        windowOrder: [],
        activeWindowId: null,
      })),

    focusWindow: (id) =>
      set((state) => {
        if (!state.openedWindowsIds.includes(id)) return state;

        return {
          windowOrder: moveToFront(state.windowOrder, id),
          activeWindowId: id,
        };
      }),

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

const WINDOW_Z_INDEX_BASE = 20;

export const useWindowZIndex = (id: AppleMenuDropdownItem) =>
  useWindowStore((state) => {
    const index = state.windowOrder.indexOf(id);
    return WINDOW_Z_INDEX_BASE + (index < 0 ? 0 : index);
  });
