import { create } from "zustand";

type TurnOnStore = {
  isTurnedOn: boolean;
  turnOn: () => void;
};

export const useTurnOnStore = create<TurnOnStore>((set) => ({
  isTurnedOn: false,
  turnOn: () => {
    set(() => ({ isTurnedOn: true }));
  },
}));
