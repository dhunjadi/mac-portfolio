import { create } from "zustand";
import { wallpaperOptions, wallpaperPreviews } from "../data/wallpapers";
import { persist } from "zustand/middleware";
import type {
  SettingsPanel,
  SettingsSidebarCategoryId,
  SettingsSidebarPanel,
  SidebarIconSize,
} from "../types";
import { colorOptions } from "../data/colorOptions";

type DockPosition = "left" | "bottom" | "right";
type ThemePreference = "light" | "dark" | "auto";

type SettingsActions = {
  setActivePanel: (activePanel: SettingsPanel) => void;
  setActiveSidebarPanel: (activePanel: SettingsSidebarPanel) => void;
  setWallpaper: (wallpaper: string) => void;
  setThemePreference: (value: ThemePreference) => void;
  setAccentColor: (value: string) => void;
  setHighlightColor: (value: string) => void;
  setDockPosition: (value: DockPosition) => void;
  setDockIconMaxSize: (value: number) => void;
  setDockIconScale: (value: number) => void;
  setBrightness: (value: number) => void;
  setSidebarIconSize: (value: SidebarIconSize) => void;
};

type SettingsStore = {
  activePanel: SettingsPanel;
  activeSidebarPanel: SettingsSidebarCategoryId;
  themePreference: ThemePreference;
  accentColor: string;
  highlightColor: string;
  wallpaper: string;
  dockPosition: DockPosition;
  dockIconMaxSize: number | null;
  dockIconScale: number;
  brightness: number;
  wallpaperOptions: readonly string[];
  wallpaperPreviews: readonly string[];
  sidebarIconSize: SidebarIconSize;
  actions: SettingsActions;
};

const clampBrightness = (value: number) => Math.max(0, Math.min(100, value));
const isHexColor = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value);

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      activePanel: {
        labelKey: "windows.settings.categories.appearance.title",
        value: "appearance",
      },
      activeSidebarPanel: "appearance",
      themePreference: "auto",
      accentColor: colorOptions[0].value,
      highlightColor: colorOptions[0].value,
      wallpaper: wallpaperOptions[0],
      dockPosition: "bottom",
      dockIconMaxSize: null,
      dockIconScale: 1.5,
      brightness: 100,
      wallpaperOptions,
      wallpaperPreviews,
      sidebarIconSize: "medium",
      actions: {
        setActivePanel: (activePanel) => set(() => ({ activePanel })),
        setActiveSidebarPanel: (activePanel) =>
          set(() => ({
            activePanel,
            activeSidebarPanel: activePanel.value,
          })),

        setThemePreference: (value) =>
          set(() => ({
            themePreference: value,
          })),

        setAccentColor: (value) =>
          set(() => ({
            accentColor: isHexColor(value) ? value : colorOptions[0].value,
          })),

        setHighlightColor: (value) =>
          set(() => ({
            highlightColor: isHexColor(value) ? value : colorOptions[0].value,
          })),

        setWallpaper: (wallpaper) => set(() => ({ wallpaper })),

        setDockPosition: (value) => set(() => ({ dockPosition: value })),

        setDockIconMaxSize: (value) => set(() => ({ dockIconMaxSize: value })),

        setDockIconScale: (value) =>
          set(() => ({ dockIconScale: Math.max(1, Math.min(2, value)) })),

        setBrightness: (value) =>
          set(() => ({ brightness: clampBrightness(value) })),

        setSidebarIconSize: (iconSize) =>
          set(() => ({ sidebarIconSize: iconSize })),
      },
    }),
    {
      name: "settings-store",
      partialize: (state) => ({
        themePreference: state.themePreference,
        accentColor: state.accentColor,
        highlightColor: state.highlightColor,
        wallpaper: state.wallpaper,
        dockPosition: state.dockPosition,
        dockIconMaxSize: state.dockIconMaxSize,
        dockIconScale: state.dockIconScale,
        brightness: state.brightness,
        sidebarIconSize: state.sidebarIconSize,
      }),
    },
  ),
);

export const useActiveSettingsPanel = () =>
  useSettingsStore((state) => state.activePanel);

export const useActiveSettingsSidebarPanel = () =>
  useSettingsStore((state) => state.activeSidebarPanel);

export const useThemePreference = () =>
  useSettingsStore((state) => state.themePreference);

export const useAccentColor = () =>
  useSettingsStore((state) => state.accentColor);

export const useHighlightColor = () =>
  useSettingsStore((state) => state.highlightColor);

export const useWallpaper = () => useSettingsStore((state) => state.wallpaper);

export const useDockPosition = () =>
  useSettingsStore((state) => state.dockPosition);

export const useDockIconMaxSize = () =>
  useSettingsStore((state) => state.dockIconMaxSize);

export const useDockIconScale = () =>
  useSettingsStore((state) => state.dockIconScale);

export const useBrightness = () =>
  useSettingsStore((state) => state.brightness);

export const useSidebarIconSize = () =>
  useSettingsStore((state) => state.sidebarIconSize);

export const useWallpaperOptions = () =>
  useSettingsStore((state) => state.wallpaperOptions);

export const useWallpaperPreviews = () =>
  useSettingsStore((state) => state.wallpaperPreviews);

export const useSettingsActions = () =>
  useSettingsStore((state) => state.actions);
