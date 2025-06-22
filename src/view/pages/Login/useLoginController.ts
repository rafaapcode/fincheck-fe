import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authservice";


const schema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve ter ao mínimo 8 caracteres')
})

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const { handleSubmit: hookFormHandleSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

   
  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await authService.signIn(data);
  });

  return { handleSubmit, register, errors };
}
