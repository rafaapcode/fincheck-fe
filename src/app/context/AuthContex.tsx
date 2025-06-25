import { createContext, useCallback, useState, type ReactNode } from "react";
import { localStorageKeys } from "../config/localstorageKeys";

interface AuthContextValue {
  signedIn: boolean;
  signIn: (acess_token: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
    return !!storedAccessToken;
  });

  const signIn = useCallback((acess_token: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, acess_token)
    setSignedIn(true);
  }, []);

   const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    setSignedIn(false);
  }, []);

  return <AuthContext.Provider value={{signedIn, signIn, signOut}}>{children}</AuthContext.Provider>;
}


export default AuthProvider;
