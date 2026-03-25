import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppleMenuDropdownItem } from "../types";
import finderIcon from "/icons/finder.png";
import calculatorIcon from "/icons/calculator.png";
import infoIcon from "/icons/info.svg";
import settingsIcon from "/icons/settings.svg";
import weatherIcon from "/icons/weather.png";
import textEditorIcon from "/icons/text-editor.png";

export type DockIcon = {
  id: AppleMenuDropdownItem;
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
      icons: [
        { id: "finder", icon: finderIcon },
        { id: "about", icon: infoIcon },
        { id: "calculator", icon: calculatorIcon },
        { id: "settings", icon: settingsIcon },
        { id: "weather", icon: weatherIcon },
        { id: "text-editor", icon: textEditorIcon },
      ],
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
