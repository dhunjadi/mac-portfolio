import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginActions = {
  login: () => void;
  logout: () => void;
};

type LoginStore = {
  isLogegdIn: boolean;
  actions: LoginActions;
};

const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      isLogegdIn: false,
      actions: {
        login: () => {
          set(() => ({ isLogegdIn: true }));
        },
        logout: () => {
          set(() => ({ isLogegdIn: false }));
        },
      },
    }),
    {
      name: "login-store",
      partialize: (state) => ({
        isLogegdIn: state.isLogegdIn,
      }),
    },
  ),
);

export const useLogin = () => useLoginStore((state) => state.isLogegdIn);
export const useLoginActions = () => useLoginStore((state) => state.actions);
