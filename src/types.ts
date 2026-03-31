import type { ComponentType, SVGProps } from "react";

export type WindowId =
  | "finder"
  | "about"
  | "calculator"
  | "pdf"
  | "weather"
  | "settings"
  | "text-editor"
  | "restart"
  | "shut-down";

export type AppleMenuActionId = "sleep";

export type AppleMenuDropdownItem = WindowId | AppleMenuActionId;

export type CurrentWeather = {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number };
  clouds: { all: number };
};

export type ForecastItem = {
  dt: number;
  main: { temp: number; temp_min: number; temp_max: number };
  weather: { id: number; description: string; icon: string }[];
  dt_txt: string;
  sys: { pod: string };
};

export type ForecastResponse = {
  list: ForecastItem[];
};

export type FinderCategoryId = "desktop" | "applications";

export type SettingsCategoryId =
  | "appearance"
  | "wallpaper"
  | "dock"
  | "language";

type Category = {
  labelKey: string;
  icon: ComponentType<SVGProps<SVGSVGElement>> | string;
};

export type FinderCategory = Category & {
  id: FinderCategoryId;
};

export type SettingsCategory = Category & {
  id: SettingsCategoryId;
};

export type SidebarIconSize = "small" | "medium" | "large";
