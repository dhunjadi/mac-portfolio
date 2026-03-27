import { create } from "zustand";
import type { WindowId } from "../types";

type WindowActions = {
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  closeAllWindows: () => void;
  focusWindow: (id: WindowId) => void;
  isWindowOpen: (id: WindowId) => boolean;
};

type WindowStore = {
  openedWindowsIds: WindowId[];
  minimizedWindowsIds: WindowId[];
  windowOrder: WindowId[];
  activeWindowId: WindowId | null;
  actions: WindowActions;
};

const moveToFront = (
  order: WindowId[],
  id: WindowId,
) => {
  const filtered = order.filter((windowId) => windowId !== id);
  return [...filtered, id];
};

const useWindowStore = create<WindowStore>((set, get) => ({
  openedWindowsIds: [],
  minimizedWindowsIds: [],
  windowOrder: [],
  activeWindowId: null,

  actions: {
    openWindow: (id) =>
      set((state) => ({
        openedWindowsIds: state.openedWindowsIds.includes(id)
          ? state.openedWindowsIds
          : [...state.openedWindowsIds, id],
        minimizedWindowsIds: state.minimizedWindowsIds.filter(
          (windowId) => windowId !== id,
        ),
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
          minimizedWindowsIds: state.minimizedWindowsIds.filter(
            (windowId) => windowId !== id,
          ),
          windowOrder: nextOrder,
          activeWindowId: nextActive,
        };
      }),

    minimizeWindow: (id) =>
      set((state) => {
        if (!state.openedWindowsIds.includes(id)) return state;
        if (state.minimizedWindowsIds.includes(id)) return state;
        const nextOrder = state.windowOrder.filter((windowId) => windowId !== id);
        return {
          minimizedWindowsIds: [...state.minimizedWindowsIds, id],
          windowOrder: nextOrder,
          activeWindowId: nextOrder[nextOrder.length - 1] ?? null,
        };
      }),

    closeAllWindows: () =>
      set(() => ({
        openedWindowsIds: [],
        minimizedWindowsIds: [],
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

export const useOpenedWindow = (id: WindowId) =>
  useWindowStore((state) => state.openedWindowsIds.includes(id));

export const useIsWindowMinimized = (id: WindowId) =>
  useWindowStore((state) => state.minimizedWindowsIds.includes(id));

export const useWindowActions = () => useWindowStore((state) => state.actions);

const WINDOW_Z_INDEX_BASE = 20;

export const useWindowZIndex = (id: WindowId) =>
  useWindowStore((state) => {
    const index = state.windowOrder.indexOf(id);
    return WINDOW_Z_INDEX_BASE + (index < 0 ? 0 : index);
  });

export const useActiveWindowId = () =>
  useWindowStore((state) => state.activeWindowId);
