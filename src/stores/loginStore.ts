import { create } from "zustand";

type LoginStore = {
  isLogegdIn: boolean;
  login: () => void;
  logout: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  isLogegdIn: false,
  login: () => {
    set(() => ({ isLogegdIn: true }));
  },
  logout: () => {
    set(() => ({ isLogegdIn: false }));
  },
}));
