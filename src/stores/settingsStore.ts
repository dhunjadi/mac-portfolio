import { create } from "zustand";
import { wallpaperOptions, wallpaperPreviews } from "../data/wallpapers";
import { persist } from "zustand/middleware";

type DockPosition = "left" | "bottom" | "right";

type SettingsActions = {
  setGlassAlpha: (glassAlpha: number) => void;
  setWallpaper: (wallpaper: string) => void;
  setBlur: (value: number) => void;
  setGlassColor: (value: string) => void;
  setDockPosition: (value: DockPosition) => void;
};

type SettingsStore = {
  glassAlpha: number;
  blur: number;
  glassColor: string;
  wallpaper: string;
  dockPosition: DockPosition;
  wallpaperOptions: readonly string[];
  wallpaperPreviews: readonly string[];
  actions: SettingsActions;
};

const clampValue = (value: number) => Math.max(0.1, Math.min(1, value));
const isHexColor = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value);

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      glassAlpha: 0.25,
      blur: 16,
      glassColor: "#000000",
      wallpaper: wallpaperOptions[0],
      dockPosition: "bottom",
      wallpaperOptions,
      wallpaperPreviews,
      actions: {
        setGlassAlpha: (glassAlpha) =>
          set(() => ({ glassAlpha: clampValue(glassAlpha) })),

        setBlur: (value) => set(() => ({ blur: value })),

        setGlassColor: (value) =>
          set(() => ({
            glassColor: isHexColor(value) ? value : "#000000",
          })),

        setWallpaper: (wallpaper) => set(() => ({ wallpaper })),

        setDockPosition: (value) => set(() => ({ dockPosition: value })),
      },
    }),
    {
      name: "settings-storage",
      partialize: (state) => ({
        glassAlpha: state.glassAlpha,
        blur: state.blur,
        glassColor: state.glassColor,
        wallpaper: state.wallpaper,
        dockPosition: state.dockPosition,
      }),
    },
  ),
);

export const useGlassAlpha = () =>
  useSettingsStore((state) => state.glassAlpha);

export const useBlur = () => useSettingsStore((state) => state.blur);

export const useGlassColor = () =>
  useSettingsStore((state) => state.glassColor);

export const useWallpaper = () => useSettingsStore((state) => state.wallpaper);

export const useDockPosition = () =>
  useSettingsStore((state) => state.dockPosition);

export const useWallpaperOptions = () =>
  useSettingsStore((state) => state.wallpaperOptions);
export const useWallpaperPreviews = () =>
  useSettingsStore((state) => state.wallpaperPreviews);

export const useSettingsActions = () =>
  useSettingsStore((state) => state.actions);
