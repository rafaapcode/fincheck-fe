import { forwardRef, type ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, id, placeholder, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          placeholder=""
          ref={ref}
          id={inputId}
          {...props}
          name={name}
          className="w-full placeholder-shown:pt-0 pt-4 bg-white rounded-lg border border-gray-400 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all duration-100 outline-none peer"
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-3.5 top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all duration-100"
        >
          {placeholder}
        </label>
      </div>
    );
  }
);

export default Input;
