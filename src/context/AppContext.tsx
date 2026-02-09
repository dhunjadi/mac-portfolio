import React, { createContext, useState, useEffect, useMemo } from "react";
import { LS_KEY } from "../data/constants";

export interface AppContextType {
  isTurnedOn: boolean;
  setIsTurnedOn: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTurnedOn, setIsTurnedOn] = useState<boolean>(() => {
    return localStorage.getItem(LS_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, String(isTurnedOn));
  }, [isTurnedOn]);

  const contextValue = useMemo(
    () => ({
      isTurnedOn,
      setIsTurnedOn,
    }),
    [isTurnedOn],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
