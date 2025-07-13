import { NumericFormat } from "react-number-format";

function InputCurrency() {
  return (
    <NumericFormat
      value={0}
      thousandSeparator="."
      decimalSeparator=","
      className="text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full"
    />
  );
}

export default InputCurrency;
