import { create } from "zustand";
import finderIcon from "/icons/finder.png";
import calculatorIcon from "/icons/calculator.png";
import infoIcon from "/icons/info.svg";
import settingsIcon from "/icons/settings.svg";
import weatherIcon from "/icons/weather.png";

export type DockIcon = {
  id: string;
  icon: string;
  action?: string;
};

type DockActions = {
  moveIcon: (newItems: DockIcon[]) => void;
};

type DockStore = {
  icons: DockIcon[];
  actions: DockActions;
};

const useDockStore = create<DockStore>((set) => ({
  icons: [
    { id: "finder", icon: finderIcon },
    { id: "about", icon: infoIcon, action: "about" },
    { id: "calculator", icon: calculatorIcon, action: "calculator" },
    { id: "settings", icon: settingsIcon, action: "settings" },
    { id: "weather", icon: weatherIcon, action: "weather" },
  ],
  actions: {
    moveIcon: (newItems) => set({ icons: newItems }),
  },
}));

export const useDockIcons = () => useDockStore((state) => state.icons);
export const useDockActions = () => useDockStore((state) => state.actions);
