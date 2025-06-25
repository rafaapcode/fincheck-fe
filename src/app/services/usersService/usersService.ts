import { httpClient } from "../httpClient";

interface MeResponse {
  name: string;
  email: string;
}

export async function getMe() {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
}

