import { create } from "zustand";

type TurnOnActions = {
  turnOn: () => void;
};

type TurnOnStore = {
  isTurnedOn: boolean;
  actions: TurnOnActions;
};

const useTurnOnStore = create<TurnOnStore>((set) => ({
  isTurnedOn: false,
  actions: {
    turnOn: () => {
      set(() => ({ isTurnedOn: true }));
    },
  },
}));

export const useTurnOn = () => useTurnOnStore((state) => state.isTurnedOn);

export const useTurnOnActions = () => useTurnOnStore((state) => state.actions);
