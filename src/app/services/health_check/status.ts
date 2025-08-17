import { httpClient } from "../httpClient";

export async function status() {
  const { data } = await httpClient.get('/health');

  return data;
}

