import useDashboard from "../../components/DashboardContext/useDashboard";

function useTransactionModalController() {
  const { isNewTransactionModalOpen, toggleTransactionModal, newTransactionType } = useDashboard();

  return {
    isNewTransactionModalOpen,
    toggleTransactionModal,
    newTransactionType
  };
}

export default useTransactionModalController;
