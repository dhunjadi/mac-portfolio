import { create } from "zustand";
import { wallpaperOptions, wallpaperPreviews } from "../data/wallpapers";

type SettingsActions = {
  setGlassAlpha: (glassAlpha: number) => void;
  setWallpaper: (wallpaper: string) => void;
};

type SettingsStore = {
  glassAlpha: number;
  wallpaper: string;
  wallpaperOptions: readonly string[];
  wallpaperPreviews: readonly string[];
  actions: SettingsActions;
};

const clampGlassAlpha = (value: number) => Math.max(0.1, Math.min(0.6, value));

const useSettingsStore = create<SettingsStore>((set) => ({
  glassAlpha: 0.25,
  wallpaper: wallpaperOptions[0],
  wallpaperOptions,
  wallpaperPreviews,
  actions: {
    setGlassAlpha: (glassAlpha) =>
      set(() => ({ glassAlpha: clampGlassAlpha(glassAlpha) })),
    setWallpaper: (wallpaper) => set(() => ({ wallpaper })),
  },
}));

export const useGlassAlpha = () =>
  useSettingsStore((state) => state.glassAlpha);

export const useWallpaper = () => useSettingsStore((state) => state.wallpaper);

export const useWallpaperOptions = () =>
  useSettingsStore((state) => state.wallpaperOptions);
export const useWallpaperPreviews = () =>
  useSettingsStore((state) => state.wallpaperPreviews);

export const useSettingsActions = () =>
  useSettingsStore((state) => state.actions);
