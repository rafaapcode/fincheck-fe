import { useState } from "react";
import useDashboard from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(true);
  const {areValuesVisible} = useDashboard();

  const toggleFiltersModal = () => {
    setIsFiltersModalOpen(prev => !prev);
  };

  return {areValuesVisible,  transactions: [], isInitialLoading: false, isLoading: false, toggleFiltersModal, isFiltersModalOpen};
} 