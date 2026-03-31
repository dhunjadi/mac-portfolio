import { create } from "zustand";
import { wallpaperOptions, wallpaperPreviews } from "../data/wallpapers";
import { persist } from "zustand/middleware";
import type { SidebarIconSize } from "../types";

type DockPosition = "left" | "bottom" | "right";
type ThemePreference = "light" | "dark" | "auto";

type SettingsActions = {
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
      themePreference: "auto",
      accentColor: "#0A84FF",
      highlightColor: "#0A84FF",
      wallpaper: wallpaperOptions[0],
      dockPosition: "bottom",
      dockIconMaxSize: null,
      dockIconScale: 1.5,
      brightness: 100,
      wallpaperOptions,
      wallpaperPreviews,
      sidebarIconSize: "medium",
      actions: {
        setThemePreference: (value) =>
          set(() => ({
            themePreference: value,
          })),

        setAccentColor: (value) =>
          set(() => ({
            accentColor: isHexColor(value) ? value : "#0A84FF",
          })),

        setHighlightColor: (value) =>
          set(() => ({
            highlightColor: isHexColor(value) ? value : "#0A84FF",
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
