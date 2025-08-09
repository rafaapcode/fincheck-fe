import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
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
  const { accounts } = useBankAccounts();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormSubmit((data) => console.log(data));

  return {
    isNewTransactionModalOpen,
    toggleTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts
  };
}

export default useNewTransactionModalController;
