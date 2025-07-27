import { createContext, useCallback, useState, type ReactNode } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  toggleAccountModal: () => void;
  toggleTransactionModal: (type: 'INCOME' |'EXPENSE' | null) => void;
  newTransactionType: 'INCOME' |'EXPENSE' | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' |'EXPENSE' | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prev) => !prev);
  }, []);

  const toggleAccountModal = useCallback(() => {
    setIsNewAccountModalOpen((prev) => !prev);
  }, []);


  const toggleTransactionModal = useCallback((type: 'INCOME' |'EXPENSE' | null) => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen((prev) => !prev);
  }, []);


  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility, isNewAccountModalOpen, toggleAccountModal, isNewTransactionModalOpen, toggleTransactionModal, newTransactionType}}
    >
      {children}
    </DashboardContext.Provider>
  );
}
