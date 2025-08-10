import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionService } from "../../../../../app/services/transactionService";
import type { CreateTransactionParams } from "../../../../../app/services/transactionService/create";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import useDashboard from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  value: z
    .string({ required_error: "Valor é obrigatório" })
    .nonempty("Informe o valor"),
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

function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    toggleTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      return await transactionService.create(data);
    },
  });

  const categories = useMemo(() => {
    return categoriesList.filter((cat) => cat.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log(data.categoryId);
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
        category: data.categoryId
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(newTransactionType === "EXPENSE" ? "Despesa cadastrada com sucesso !" : "Receita cadastrada com sucesso !");
      toggleTransactionModal(null);
      reset();
    } catch {
      toast.error(newTransactionType === "EXPENSE" ? "Erro ao cadastrar a despesa" : "Erro ao cadastrar a receita");
    }
  });

  return {
    isNewTransactionModalOpen,
    toggleTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    mutateAsync,
    isPending,
  };
}

export default useNewTransactionModalController;
