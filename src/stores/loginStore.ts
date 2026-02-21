import { create } from "zustand";

type LoginActions = {
  login: () => void;
  logout: () => void;
};

type LoginStore = {
  isLogegdIn: boolean;
  actions: LoginActions;
};

const useLoginStore = create<LoginStore>((set) => ({
  isLogegdIn: false,
  actions: {
    login: () => {
      set(() => ({ isLogegdIn: true }));
    },
    logout: () => {
      set(() => ({ isLogegdIn: false }));
    },
  },
}));

export const useLogin = () => useLoginStore((state) => state.isLogegdIn);

export const useLoginActions = () => useLoginStore((state) => state.actions);
