import type { SidebarIconSize } from "./types";

export const getSidebarIconSizeClass = (sidebarIconSize: SidebarIconSize) => {
  if (sidebarIconSize === "small") return "is-small";
  if (sidebarIconSize === "medium") return "is-medium";
  return "is-large";
};
