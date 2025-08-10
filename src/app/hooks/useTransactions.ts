import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";

export function useTransactions() {
  const {data = [], isFetching} = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => transactionService.getAll({
      month: 7,
      year: 2025
    })
  });

  return {
    transactions: data, isFetching
  }
}