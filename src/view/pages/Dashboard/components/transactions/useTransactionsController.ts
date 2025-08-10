import { useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import useDashboard from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const {areValuesVisible} = useDashboard();

  const toggleFiltersModal = () => {
    setIsFiltersModalOpen(prev => !prev);
  };

  const { transactions } = useTransactions();
  
  return {areValuesVisible,  transactions, isInitialLoading: false, isLoading: false, toggleFiltersModal, isFiltersModalOpen};
} 