import { create } from "zustand";
import { wallpaperOptions, wallpaperPreviews } from "../data/wallpapers";

type SettingsActions = {
  setGlassAlpha: (glassAlpha: number) => void;
  setWallpaper: (wallpaper: string) => void;
  setBlur: (value: number) => void;
  setGlassColor: (value: string) => void;
};

type SettingsStore = {
  glassAlpha: number;
  blur: number;
  glassColor: string;
  wallpaper: string;
  wallpaperOptions: readonly string[];
  wallpaperPreviews: readonly string[];
  actions: SettingsActions;
};

const clampValue = (value: number) => Math.max(0.1, Math.min(1, value));
const isHexColor = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value);

const useSettingsStore = create<SettingsStore>((set) => ({
  glassAlpha: 0.25,
  blur: 16,
  glassColor: "#000000",
  wallpaper: wallpaperOptions[0],
  wallpaperOptions,
  wallpaperPreviews,
  actions: {
    setGlassAlpha: (glassAlpha) =>
      set(() => ({ glassAlpha: clampValue(glassAlpha) })),
    setBlur: (value) => set(() => ({ blur: value })),
    setGlassColor: (value) =>
      set(() => ({ glassColor: isHexColor(value) ? value : "#000000" })),
    setWallpaper: (wallpaper) => set(() => ({ wallpaper })),
  },
}));

export const useGlassAlpha = () =>
  useSettingsStore((state) => state.glassAlpha);

export const useBlur = () => useSettingsStore((state) => state.blur);

export const useGlassColor = () => useSettingsStore((state) => state.glassColor);

export const useWallpaper = () => useSettingsStore((state) => state.wallpaper);

export const useWallpaperOptions = () =>
  useSettingsStore((state) => state.wallpaperOptions);
export const useWallpaperPreviews = () =>
  useSettingsStore((state) => state.wallpaperPreviews);

export const useSettingsActions = () =>
  useSettingsStore((state) => state.actions);
