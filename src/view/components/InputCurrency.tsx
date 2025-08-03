import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";
import FieldError from "./FieldError";

interface InputCurrencyProps {
  error?: string;
  onChange?: (value: string) => void;
  value?: string;
}

function InputCurrency({ error, onChange, value}: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        thousandSeparator="."
        decimalSeparator=","
        className={cn("text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full", error && 'text-red-900')}
      />
       {error &&  <FieldError error={error}/>}
    </div>
  );
}

export default InputCurrency;
