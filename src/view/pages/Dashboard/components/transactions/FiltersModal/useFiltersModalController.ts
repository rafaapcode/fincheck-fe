import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

function useFiltersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    undefined | string
  >(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { accounts } = useBankAccounts();

  const handleSelectBankAccount = (bankAccountId: string) => {
    setSelectedBankAccountId(prev => prev === bankAccountId ? undefined : bankAccountId);
  };

  const handleChangeYear = (step: number) => {
    setSelectedYear(prev => prev + step);
  };

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts
  };
}

export default useFiltersModalController;
