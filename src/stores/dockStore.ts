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
  tooltipLabel: string;
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
        { id: "finder", icon: finderIcon, tooltipLabel: "Finder" },
        { id: "about", icon: infoIcon, tooltipLabel: "About" },
        { id: "calculator", icon: calculatorIcon, tooltipLabel: "Calculator" },
        { id: "settings", icon: settingsIcon, tooltipLabel: "Settings" },
        { id: "weather", icon: weatherIcon, tooltipLabel: "Weather" },
        {
          id: "text-editor",
          icon: textEditorIcon,
          tooltipLabel: "Text Editor",
        },
      ],
      actions: {
        moveIcon: (newItems) => set({ icons: newItems }),
      },
    }),
    {
      name: "dock-storage",
      partialize: (state) => ({
        icons: state.icons,
      }),
    },
  ),
);

export const useDockIcons = () => useDockStore((state) => state.icons);
export const useDockActions = () => useDockStore((state) => state.actions);
