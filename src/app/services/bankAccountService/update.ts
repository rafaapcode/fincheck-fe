import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: "CHECKING" | "INVESTMENTS" | "CASH"
}

export async function update({id, ...body}: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, body);

  return data;
}

