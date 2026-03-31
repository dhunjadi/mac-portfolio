import type { FinderCategory } from "../types";
import DesktopIcon from "../assets/icons/desktop.svg?react";
import ApplicationsIcon from "../assets/icons/app-store.svg?react";

export const finderCategories: FinderCategory[] = [
  {
    id: "desktop",
    labelKey: "windows.finder.desktop",
    icon: DesktopIcon,
  },
  {
    id: "applications",
    labelKey: "windows.finder.applications",
    icon: ApplicationsIcon,
  },
];
