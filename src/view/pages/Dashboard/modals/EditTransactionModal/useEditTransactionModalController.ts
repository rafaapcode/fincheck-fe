import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import type { Transaction } from "../../../../../app/entities/Transaction";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionService } from "../../../../../app/services/transactionService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  value: z.union([
    z
      .string({ required_error: "Valor é obrigatório" })
      .nonempty("Informe o valor"),
    z.number(),
  ]),
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .nonempty("Informe o nome"),
  bankAccountId: z
    .string({ required_error: "A conta é obrigatória" })
    .nonempty("Informe a categoria"),
  categoryId: z
    .string({ required_error: "A categoria é obrigatória" })
    .nonempty("Informe a categoria"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

function useEditTransactionModalController(transaction: Transaction | null, onClose: () => void) {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(prev => !prev);
  }

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter((cat) => cat.type === transaction?.type);
  }, [categoriesList, transaction]);

  const {mutateAsync, isPending} = useMutation({
    mutationFn: transactionService.update
  });

  const {mutateAsync: removeTransaction, isPending: isLoadingDelete} = useMutation({
    mutationFn: transactionService.remove
  });

  const handleSubmit = hookFormSubmit(async (data) => {
     try {
      if(!transaction) return;
      
      await mutateAsync({
        ...data,
        category: data.categoryId,
        id: transaction.id,
        value: currencyStringToNumber(data.value),
        type: transaction.type,
        date: data.date.toISOString()
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(transaction!.type === "EXPENSE" ? "Despesa cadastrada com sucesso !" : "Receita cadastrada com sucesso !");
      onClose();
    } catch {
      toast.error(transaction!.type === "EXPENSE" ? "Erro ao cadastrar a despesa" : "Erro ao cadastrar a receita");
    }
  });

  const handleDeleteTransaction = async () => {
    try {
      if (!transaction) return;
      await removeTransaction(transaction.id);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(transaction!.type === "EXPENSE" ? "Despesa deletada com sucesso !" : "Receita deletada com sucesso !");
      toggleDeleteModal();
      onClose();
    } catch {
      toast.error(transaction!.type === "EXPENSE" ? "Erro ao deletar a despesa" : "Erro ao deletar a receita");
    }
  };

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isDeleteModalOpen,
    toggleDeleteModal,
    isLoadingDelete,
    handleDeleteTransaction
  };
}

export default useEditTransactionModalController;
