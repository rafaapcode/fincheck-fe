import { useForm } from "react-hook-form";

export function useLoginController() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = hookFormHandleSubmit((data: any) => {
    console.log("Form data", data);
  });

  return { handleSubmit, register };
}
