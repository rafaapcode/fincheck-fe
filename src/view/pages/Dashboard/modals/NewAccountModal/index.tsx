import { Controller } from "react-hook-form";
import Button from "../../../../components/Button";
import ColorsDropdownInput from "../../../../components/ColorsDropdownInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import useNewAccountModalController from "./useAccountModalController";

function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    toggleAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isPending
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={toggleAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[0.5px]">
            Saldo Inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[0.5px]">R$</span>
            <Controller
              name="initialBalance"
              defaultValue="0"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  value={value}
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            error={errors.name?.message}
            type="text"
            placeholder="Nome da Conta"
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.type?.message}
                placeholder="Tipo"
                options={[
                  { label: "Conta Corrente", value: "CHECKING" },
                  { label: "Investimentos", value: "INVESTMENTS" },
                  { label: "Dinheiro Fisico", value: "CASH" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                value={value}
                onChange={onChange}
                error={errors.color?.message}
              />
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6" isLoading={isPending}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}

export default NewAccountModal;
