import { useMemo, useState } from "react";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import useDashboard from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const {areValuesVisible, toggleValuesVisibility, isNewAccountModalOpen, toggleAccountModal} = useDashboard();
  const windowWidth = useWindowWidth();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    if(!accounts) return 0;

    return accounts.reduce((acc, curr) =>  acc += curr.currentBalance,0);
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    isNewAccountModalOpen,
    toggleAccountModal,
    currentBalance
  }
}