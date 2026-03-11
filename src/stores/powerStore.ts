import { create } from "zustand";

type PowerActions = {
  turnOn: () => void;
  shutDown: () => void;
  setIsSleeping: (isSleeping: boolean) => void;
  setIsRestarting: (isRestarting: boolean) => void;
};

type PowerStore = {
  isTurnedOn: boolean;
  isShutDown: boolean;
  isRestarting: boolean;
  isSleeping: boolean;
  actions: PowerActions;
};

const usePowerStore = create<PowerStore>((set) => ({
  isTurnedOn: false,
  isShutDown: false,
  isRestarting: false,
  isSleeping: false,
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
    setIsSleeping: (isSleeping: boolean) => {
      set(() => ({ isSleeping }));
    },
  },
}));

export const useTurnOn = () => usePowerStore((state) => state.isTurnedOn);

export const useShutDown = () => usePowerStore((state) => state.isShutDown);

export const useRestart = () => usePowerStore((state) => state.isRestarting);

export const useSleep = () => usePowerStore((state) => state.isSleeping);

export const usePowerActions = () => usePowerStore((state) => state.actions);
