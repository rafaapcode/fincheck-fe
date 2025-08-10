import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bankAccountId: string;
  category: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE"
}

export async function create(body: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', body);

  return data;
}

