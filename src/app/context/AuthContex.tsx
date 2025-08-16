import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import LaunchScreen from "../../view/components/LaunchScreen";
import { localStorageKeys } from "../config/localstorageKeys";
import type { User } from "../entities/USer";
import { usersService } from "../services/usersService";

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signIn: (acess_token: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken;
  });


  const {isError, isFetching, isSuccess, data } = useQuery({
    enabled: signedIn,
    queryKey: ['users', 'me'],
    queryFn: () => usersService.getMe(),
    staleTime: Infinity,
  })

  const signIn = useCallback((acess_token: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, acess_token)
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  useEffect(() => {
    if(isError) {
      toast.error('Sua sessão expirou.');
      signOut();
    }
  }, [isError, signOut]);

  return <AuthContext.Provider value={{signedIn: isSuccess && signedIn, signIn, signOut, user: data}}>
    <LaunchScreen isLoading={isFetching}/>
    {!isFetching && children}
  </AuthContext.Provider>;
}


export default AuthProvider;
