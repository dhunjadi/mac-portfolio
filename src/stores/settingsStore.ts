import { create } from "zustand";

const wallpaperOptions: readonly string[] = [
  `${import.meta.env.BASE_URL}26-Tahoe-Beach-Dusk.jpg`,
  `${import.meta.env.BASE_URL}macos-monterey-stock-black-dark-mode-layers-5k-6016x6016-5889.jpg`,
];

type SettingsActions = {
  setGlassAlpha: (glassAlpha: number) => void;
  setWallpaper: (wallpaper: string) => void;
};

type SettingsStore = {
  glassAlpha: number;
  wallpaper: string;
  wallpaperOptions: readonly string[];
  actions: SettingsActions;
};

const clampGlassAlpha = (value: number) => Math.max(0.1, Math.min(0.6, value));

const useSettingsStore = create<SettingsStore>((set) => ({
  glassAlpha: 0.25,
  wallpaper: wallpaperOptions[0],
  wallpaperOptions,
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

export const useSettingsActions = () =>
  useSettingsStore((state) => state.actions);
