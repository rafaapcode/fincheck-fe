import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import FieldError from "./FieldError";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, id, placeholder, error, className, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          placeholder=""
          ref={ref}
          id={inputId}
          {...props}
          name={name}
          className={cn(
            "w-full placeholder-shown:pt-0 pt-4 bg-white rounded-lg border border-gray-400 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all duration-100 outline-none peer",
            error && "!border-red-800",
            className
          )}
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-3.5 top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all duration-100"
        >
          {placeholder}
        </label>

        {error &&  <FieldError error={error}/>}
      </div>
    );
  }
);

export default Input;
