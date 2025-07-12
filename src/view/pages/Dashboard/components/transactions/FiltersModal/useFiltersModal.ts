import { useState } from "react";

function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    null | string
  >(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());


  const handleSelectBankAccount = (bankAccountId: string) => {
    setSelectedBankAccountId(prev => prev === bankAccountId ? null : bankAccountId);
  };

  const handleChangeYear = (step: number) => {
    setSelectedYear(prev => prev + step);
  };

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear
  };
}

export default useFiltersModal;
