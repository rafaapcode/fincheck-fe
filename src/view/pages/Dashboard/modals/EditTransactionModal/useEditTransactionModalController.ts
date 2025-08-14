import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
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

function useEditTransactionModalController(transaction: Transaction | null) {
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

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter((cat) => cat.type === transaction?.type);
  }, [categoriesList, transaction]);

  const {mutateAsync, isPending} = useMutation({
    mutationFn: transactionService.update
  });

  const handleSubmit = hookFormSubmit(async (data) => {
     try {
      if(!transaction) return;
      
      await mutateAsync({
        ...data,
        id: transaction.id,
        value: currencyStringToNumber(data.value),
        type: transaction.type,
        date: data.date.toISOString()
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
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,

  };
}

export default useEditTransactionModalController;
