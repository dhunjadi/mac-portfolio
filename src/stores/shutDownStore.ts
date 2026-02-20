import { create } from "zustand";

type ShutDownStore = {
  isShutDown: boolean;
  shutDown: () => void;
  turnOn: () => void;
};

export const useShutDownStore = create<ShutDownStore>((set) => ({
  isShutDown: false,
  shutDown: () => {
    set(() => ({ isShutDown: true }));
  },
  turnOn: () => {
    set(() => ({ isShutDown: false }));
  },
}));
