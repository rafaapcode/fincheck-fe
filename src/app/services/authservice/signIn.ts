import { httpClient } from "../httpClient";

interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  access_token: string
}

export async function signIn(body: SignInParams) {
  const { data } = await httpClient.post<SignInResponse>('/auth/signin', body);

  return data;
}

