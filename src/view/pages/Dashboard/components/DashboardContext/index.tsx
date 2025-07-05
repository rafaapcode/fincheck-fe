import { createContext, useCallback, useState, type ReactNode } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(true);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prev) => !prev);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
