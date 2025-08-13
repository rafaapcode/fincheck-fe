import { useEffect, useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { TransactionsFilters } from "../../../../../app/services/transactionService/getAll";
import useDashboard from "../DashboardContext/useDashboard";

export function useTransactionsController() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const { areValuesVisible } = useDashboard();

  const { transactions, isFetching, isLoading, refetch } =
    useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if(value === filters[filter]) return;
      setFilters(prev => ({
        ...prev, 
        [filter]: value
      }))
    }
  };

  const toggleFiltersModal = () => {
    setIsFiltersModalOpen((prev) => !prev);
  };

  const handleApplyFilters = ({bankAccId, year}: {bankAccId: string | undefined; year: number}) => {
    handleChangeFilters('bankAccountId')(bankAccId);
    handleChangeFilters('year')(year);
    toggleFiltersModal();
  };

  return {
    areValuesVisible,
    transactions,
    isInitialLoading: isLoading,
    isLoading: isFetching,
    toggleFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters
  };
}
