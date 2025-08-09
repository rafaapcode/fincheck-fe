import { httpClient } from "../httpClient";


export async function remove(bankAccId: string) {
  const { data } = await httpClient.delete(`/bank-accounts/${bankAccId}`);

  return data;
}

