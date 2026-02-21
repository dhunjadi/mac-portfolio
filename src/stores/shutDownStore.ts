import { create } from "zustand";

type ShutDownActions = {
  shutDown: () => void;
  turnOn: () => void;
};

type ShutDownStore = {
  isShutDown: boolean;
  actions: ShutDownActions;
};

const useShutDownStore = create<ShutDownStore>((set) => ({
  isShutDown: false,
  actions: {
    shutDown: () => {
      set(() => ({ isShutDown: true }));
    },
    turnOn: () => {
      set(() => ({ isShutDown: false }));
    },
  },
}));

export const useShutDown = () => useShutDownStore((state) => state.isShutDown);

export const useShutDownActions = () =>
  useShutDownStore((state) => state.actions);
