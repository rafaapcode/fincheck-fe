import { createContext, type ReactNode } from "react";

interface AuthContextValue {
  signedIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider value={{signedIn: true}}>{children}</AuthContext.Provider>;
}


export default AuthProvider;
