import { create } from "zustand";

type LaunchpadActions = {
  openLaunchpad: () => void;
  closeLaunchpad: () => void;
  toggleLaunchpad: () => void;
};

type LaunchpadStore = {
  isOpen: boolean;
  actions: LaunchpadActions;
};

const useLaunchpadStore = create<LaunchpadStore>((set) => ({
  isOpen: false,
  actions: {
    openLaunchpad: () => set({ isOpen: true }),
    closeLaunchpad: () => set({ isOpen: false }),
    toggleLaunchpad: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}));

export const useLaunchpadOpen = () =>
  useLaunchpadStore((state) => state.isOpen);

export const useLaunchpadActions = () =>
  useLaunchpadStore((state) => state.actions);
