import { create } from "zustand";

type ShutDownStore = {
  isShutDown: boolean;
  shutDown: () => void;
};

export const useShutDownStore = create<ShutDownStore>((set) => ({
  isShutDown: false,
  shutDown: () => {
    set(() => ({ isShutDown: true }));
  },
}));
