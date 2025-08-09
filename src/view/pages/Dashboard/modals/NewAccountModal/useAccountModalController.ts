import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import type { CreateBankAccountParams } from "../../../../../app/services/bankAccountService/create";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import useDashboard from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome da conta é obrigatória"),
  type: z.enum(["CHECKING", "INVESTMENTS", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

function useAccountModalController() {
  const { isNewAccountModalOpen, toggleAccountModal } = useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: '#7950F2'
    }
  });

  const queryClient = useQueryClient();
  const {mutateAsync, isPending} = useMutation({
    mutationFn: async (data: CreateBankAccountParams) => {
      return bankAccountService.create(data);
    }
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
   try {
    await mutateAsync({
      ...data,
      initialBalance: currencyStringToNumber(data.initialBalance)
    });

    queryClient.invalidateQueries({queryKey: ['bankAccounts']})
    toast.success('Conta foi cadastrada com sucesso !');
    toggleAccountModal();
    reset();
   } catch {
       toast.error('Erro ao cadastrar a conta.')
   }
  });

  return {
    isNewAccountModalOpen,
    toggleAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending
  };
}

export default useAccountModalController;
