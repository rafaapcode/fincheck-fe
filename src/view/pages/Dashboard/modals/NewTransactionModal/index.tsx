import { Controller } from "react-hook-form";
import Button from "../../../../components/Button";
import DaterPickerInput from "../../../../components/DaterPickerInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import useNewTransactionModalController from "./useNewTransactionModalController";

function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    toggleTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isPending
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={() => toggleTransactionModal(null)}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[0.5px]">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[0.5px]">R$</span>
            <Controller
              name="value"
              defaultValue="0"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  value={value}
                  error={errors.value?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            placeholder={isExpense ? "Nome da despesa" : "Nome de receita"}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                placeholder="Categoria"
                options={categories.map(cat => ({
                  value: cat.id,
                  label: cat.name
                }))}
                error={errors.categoryId?.message}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.bankAccountId?.message}
                value={value}
                onChange={onChange}
                placeholder={isExpense ? "Pagar com" : "Receber na conta"}
                options={accounts.map(acc => ({ 
                  value: acc.id,
                  label: acc.name
                 }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({field: { value, onChange }}) => <DaterPickerInput error={errors.date?.message} value={value} onChange={onChange}/>}
          />
        </div>
        <Button type="submit" className="w-full mt-6" isLoading={isPending}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}

export default NewTransactionModal;
