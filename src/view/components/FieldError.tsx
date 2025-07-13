import { CrossCircledIcon } from "@radix-ui/react-icons";

interface FieldErrorProps {
  error: string;
}

function FieldError({error}: FieldErrorProps) {
  return (
    <div className="flex items-center gap-2 mt-2 text-red-800">
      <CrossCircledIcon />
      <span className="text-xs">{error}</span>
    </div>
  );
}

export default FieldError;
