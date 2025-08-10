import type { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

type TransactionsFiltes = {month: number; year: number; bankAccountId?: string; type?: Transaction['type']}

export async function getAll(filters: TransactionsFiltes) {
  const { data } = await httpClient.get<Transaction[]>('/transactions', {
    params: filters
  });

  return data;
}

