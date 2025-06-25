import axios from "axios";
import { localStorageKeys } from "../config/localstorageKeys";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    if(token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    };

    return config;
  },
);