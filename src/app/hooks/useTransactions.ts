import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";
import type { TransactionsFilters } from "../services/transactionService/getAll";

export function useTransactions(filters: TransactionsFilters) {
  const {
    data = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => transactionService.getAll(filters),
  });

  return {
    transactions: data,
    isFetching,
    isLoading,
    refetch,
  };
}
