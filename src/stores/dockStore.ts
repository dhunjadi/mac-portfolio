import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WindowId } from "../types";
import { DEFAULT_DOCK_ICONS } from "../data/windowData";

export type DockIcon = {
  id: WindowId;
  icon: string;
};

type DockActions = {
  moveIcon: (newItems: DockIcon[]) => void;
};

type DockStore = {
  icons: DockIcon[];
  actions: DockActions;
};

const useDockStore = create<DockStore>()(
  persist(
    (set) => ({
      icons: [...DEFAULT_DOCK_ICONS],
      actions: {
        moveIcon: (newItems) => set({ icons: newItems }),
      },
    }),
    {
      name: "dock-store",
      partialize: (state) => ({
        icons: state.icons,
      }),
    },
  ),
);

export const useDockIcons = () => useDockStore((state) => state.icons);
export const useDockActions = () => useDockStore((state) => state.actions);
