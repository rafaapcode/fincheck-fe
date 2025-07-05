import { use } from "react";
import { DashboardContext } from ".";

export default function useDashboard() {
  const ctx = use(DashboardContext);
  if(!ctx) {
    throw new Error('DashboardContext must be inside a provider');
  }

  return ctx;
}