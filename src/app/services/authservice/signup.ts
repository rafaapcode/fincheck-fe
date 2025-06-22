import { httpClient } from "../httpClient";

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  access_token: string
}

export async function signUp(body: SignUpParams) {
  const { data } = await httpClient.post<SignUpResponse>('/auth/signup', body);

  return data;
}

