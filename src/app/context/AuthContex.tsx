import { createContext, useCallback, useState, type ReactNode } from "react";

interface AuthContextValue {
  signedIn: boolean;
  signIn: (acess_token: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = useCallback((acess_token: string) => setSignedIn(true), []);

  return <AuthContext.Provider value={{signedIn, signIn}}>{children}</AuthContext.Provider>;
}


export default AuthProvider;
