import { create } from "zustand";

type PowerActions = {
  turnOn: () => void;
  shutDown: () => void;
  setIsRestarting: (isRestarting: boolean) => void;
};

type PowerStore = {
  isTurnedOn: boolean;
  isShutDown: boolean;
  isRestarting: boolean;
  actions: PowerActions;
};

const usePowerStore = create<PowerStore>((set) => ({
  isTurnedOn: false,
  isShutDown: false,
  isRestarting: false,
  actions: {
    shutDown: () => {
      set(() => ({ isShutDown: true }));
    },
    turnOn: () => {
      set(() => ({ isShutDown: false, isTurnedOn: true }));
    },
    setIsRestarting: (isRestarting: boolean) => {
      set(() => ({ isRestarting }));
    },
  },
}));

export const useTurnOn = () => usePowerStore((state) => state.isTurnedOn);

export const useShutDown = () => usePowerStore((state) => state.isShutDown);

export const useRestart = () => usePowerStore((state) => state.isRestarting);

export const usePowerActions = () => usePowerStore((state) => state.actions);
