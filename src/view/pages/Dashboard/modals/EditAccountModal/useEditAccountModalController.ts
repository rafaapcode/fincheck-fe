import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import type { UpdateBankAccountParams } from "../../../../../app/services/bankAccountService/update";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import useDashboard from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatória"),
  type: z.enum(["CHECKING", "INVESTMENTS", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

function useEditAccountModalController() {
  const { isEditAccountModalOpen, toggleEditAccountModal, accountBeinEdited } =
    useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeinEdited?.color,
      initialBalance: accountBeinEdited?.initialBalance,
      name: accountBeinEdited?.name,
      type: accountBeinEdited?.type,
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { mutateAsync: updateAccount, isPending } = useMutation({
    mutationFn: async (data: UpdateBankAccountParams) => {
      return bankAccountService.update(data);
    },
  });
  const { mutateAsync: removeAcc, isPending: isPendingDelete } = useMutation({
    mutationFn: async (bankAccId: string) => {
      return bankAccountService.remove(bankAccId);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      if (!accountBeinEdited) return;
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeinEdited.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta foi editada com sucesso !");
      toggleEditAccountModal(null);
    } catch {
      toast.error("Erro ao salvar as alterações.");
    }
  });

  const toggleDeleteModalOpen = () => setIsDeleteModalOpen((prev) => !prev);

  const handleDeleteAccount = async () => {
    try {
      if (!accountBeinEdited) return;
      await removeAcc(accountBeinEdited.id);
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta foi deletada com sucesso !");
      toggleDeleteModalOpen();
      toggleEditAccountModal(null);
    } catch {
      toast.error("Erro ao deletar a conta");
    }
  };

  return {
    isEditAccountModalOpen,
    toggleEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    toggleDeleteModalOpen,
    isDeleteModalOpen,
    handleDeleteAccount,
    isPendingDelete,
  };
}

export default useEditAccountModalController;
