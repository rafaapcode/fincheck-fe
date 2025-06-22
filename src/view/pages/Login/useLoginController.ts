import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { authService } from "../../../app/services/authservice";
import type { SignInParams } from "../../../app/services/authservice/signIn";


const schema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve ter ao mínimo 8 caracteres')
})

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const { handleSubmit: hookFormHandleSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

   
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SignInParams) => {
      return authService.signIn(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch  {
      toast.error('Credenciais inválidas');
    }
  });

  return { handleSubmit, register, errors, isLoading: isPending};
}
