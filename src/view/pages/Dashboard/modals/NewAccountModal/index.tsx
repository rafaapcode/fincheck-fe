import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import useNewAccountModalController from "./useAccountModalController";

function NewAccountModal() {
  const { isNewAccountModalOpen, toggleAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={toggleAccountModal}
    >
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[0.5px]">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input 
            type="text"
            name="initialBalance"
            placeholder="Nome da Conta"
          />
          
          <Select error="Nada selecionado" placeholder="Selecione uma fruta"/>
        </div>
      </form>
    </Modal>
  );
}

export default NewAccountModal;
