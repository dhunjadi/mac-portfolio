import { create } from "zustand";
import { wallpaperOptions, wallpaperPreviews } from "../data/wallpapers";
import { persist } from "zustand/middleware";

type DockPosition = "left" | "bottom" | "right";

type SettingsActions = {
  setGlassAlpha: (glassAlpha: number) => void;
  setWallpaper: (wallpaper: string) => void;
  setBlur: (value: number) => void;
  setGlassColor: (value: string) => void;
  setAccentColor: (value: string) => void;
  setHighlightColor: (value: string) => void;
  setDockPosition: (value: DockPosition) => void;
  setDockIconMaxSize: (value: number) => void;
  setDockIconScale: (value: number) => void;
  setBrightness: (value: number) => void;
};

type SettingsStore = {
  glassAlpha: number;
  blur: number;
  glassColor: string;
  accentColor: string;
  highlightColor: string;
  wallpaper: string;
  dockPosition: DockPosition;
  dockIconMaxSize: number | null;
  dockIconScale: number;
  brightness: number;
  wallpaperOptions: readonly string[];
  wallpaperPreviews: readonly string[];
  actions: SettingsActions;
};

const clampValue = (value: number) => Math.max(0.1, Math.min(1, value));
const clampBrightness = (value: number) => Math.max(0, Math.min(100, value));
const isHexColor = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value);

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      glassAlpha: 0.25,
      blur: 16,
      glassColor: "#000000",
      accentColor: "#0A84FF",
      highlightColor: "#0A84FF",
      wallpaper: wallpaperOptions[0],
      dockPosition: "bottom",
      dockIconMaxSize: null,
      dockIconScale: 1.5,
      brightness: 100,
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
      },
    }),
    {
      name: "settings-store",
      partialize: (state) => ({
        glassAlpha: state.glassAlpha,
        blur: state.blur,
        glassColor: state.glassColor,
        accentColor: state.accentColor,
        highlightColor: state.highlightColor,
        wallpaper: state.wallpaper,
        dockPosition: state.dockPosition,
        dockIconMaxSize: state.dockIconMaxSize,
        dockIconScale: state.dockIconScale,
        brightness: state.brightness,
      }),
    },
  ),
);

export const useGlassAlpha = () =>
  useSettingsStore((state) => state.glassAlpha);

export const useBlur = () => useSettingsStore((state) => state.blur);

export const useGlassColor = () =>
  useSettingsStore((state) => state.glassColor);

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

export const useWallpaperOptions = () =>
  useSettingsStore((state) => state.wallpaperOptions);
export const useWallpaperPreviews = () =>
  useSettingsStore((state) => state.wallpaperPreviews);

export const useSettingsActions = () =>
  useSettingsStore((state) => state.actions);
