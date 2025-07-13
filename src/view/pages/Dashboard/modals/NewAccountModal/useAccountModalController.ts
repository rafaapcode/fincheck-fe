import useDashboard from "../../components/DashboardContext/useDashboard";

function useAccountModalController() {
  const { isNewAccountModalOpen, toggleAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    toggleAccountModal,
  };
}

export default useAccountModalController;
