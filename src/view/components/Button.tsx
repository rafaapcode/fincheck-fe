 
import { type ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

function Button({ className, isLoading, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={cn(
        "cursor-pointer bg-teal-700 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 font-medium text-white rounded-2xl transition-all active:bg-teal-800",
        className
      )}
    />
  );
}

export default Button;
