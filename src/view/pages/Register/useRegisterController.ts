import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authservice";

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z.string().nonempty('Senha é obrigatória').min(8, 'Senha deve ter ao mínimo 8 caracteres')
})

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const { handleSubmit: hookFormHandleSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

   
  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const {access_token} = await authService.signUp(data);
    console.log(access_token);
  });

  return { handleSubmit, register, errors };
}
