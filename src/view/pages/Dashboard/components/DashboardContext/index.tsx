import { createContext, useCallback, useState, type ReactNode } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  isNewAccountModalOpen: boolean;
  toggleAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(false);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prev) => !prev);
  }, []);

  const toggleAccountModal = useCallback(() => {
    setIsNewAccountModalOpen((prev) => !prev);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility, isNewAccountModalOpen, toggleAccountModal}}
    >
      {children}
    </DashboardContext.Provider>
  );
}
