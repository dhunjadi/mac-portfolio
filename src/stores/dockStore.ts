import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DockIconId } from "../types";
import { DEFAULT_DOCK_ICONS } from "../data/windowData";

export type DockIcon = {
  id: DockIconId;
  icon: string;
};

type DockActions = {
  moveIcon: (newItems: DockIcon[]) => void;
};

type DockStore = {
  icons: DockIcon[];
  actions: DockActions;
};

// Ensures Launchpad dock icon is always present
// since dock is the only place where user can open Launchpad
const ensureLaunchpadIcon = (icons: DockIcon[]) => {
  const hasLaunchpad = icons.some((icon) => icon.id === "launchpad");
  if (hasLaunchpad) return icons;
  return [DEFAULT_DOCK_ICONS[0], ...icons];
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
      merge: (persisted, current) => {
        const persistedIcons =
          (persisted as DockStore | undefined)?.icons ?? current.icons;
        return {
          ...current,
          ...(persisted as DockStore | undefined),
          icons: ensureLaunchpadIcon(persistedIcons),
        };
      },
    },
  ),
);

export const useDockIcons = () => useDockStore((state) => state.icons);
export const useDockActions = () => useDockStore((state) => state.actions);
