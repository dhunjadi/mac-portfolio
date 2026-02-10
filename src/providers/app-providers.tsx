import { AppContextProvider } from "../context/AppContext";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: AppProviderProps) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};
