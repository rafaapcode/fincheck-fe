import Button from "../../../../components/Button";
import ColorsDropdownInput from "../../../../components/ColorsDropdownInput";
import DaterPickerInput from "../../../../components/DaterPickerInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import useNewTransactionModalController from "./useTransactionModalController";

function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    toggleTransactionModal,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={() => toggleTransactionModal(null)}
    >
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[0.5px]">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="initialBalance"
            placeholder={isExpense ? "Nome da despesa" : "Nome de receita"}
          />

          <Select
            placeholder="Categoria"
            options={[
              { label: "Conta Corrente", value: "checking" },
              { label: "Investimentos", value: "investment" },
              { label: "Dinheiro Fisico", value: "cash" },
            ]}
          />

          <Select
            placeholder={isExpense ? "Pagar com" : "Receber na conta"}
            options={[
              { label: "Conta Corrente", value: "checking" },
              { label: "Investimentos", value: "investment" },
              { label: "Dinheiro Fisico", value: "cash" },
            ]}
          />

          <ColorsDropdownInput />
          <DaterPickerInput />
        </div>
        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}

export default NewTransactionModal;
