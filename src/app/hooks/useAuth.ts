import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";

export function useAuth() {
  const data = useContext(AuthContext);
  
  if(!data) {
    throw new Error('The AUTH context must be used inside of a Auth provider');
  }

  return data;
}