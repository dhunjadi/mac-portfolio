import { create } from "zustand";

type SpotlightActions = {
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;
};

type SpotlightStore = {
  isOpen: boolean;
  actions: SpotlightActions;
};

const useSpotlightStore = create<SpotlightStore>((set) => ({
  isOpen: false,
  actions: {
    openSpotlight: () => set({ isOpen: true }),
    closeSpotlight: () => set({ isOpen: false }),
    toggleSpotlight: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}));

export const useSpotlightOpen = () =>
  useSpotlightStore((state) => state.isOpen);

export const useSpotlightActions = () =>
  useSpotlightStore((state) => state.actions);
