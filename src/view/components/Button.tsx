/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-teal-700 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 font-medium text-white rounded-2xl transition-all active:bg-teal-800"
    />
  );
}

export default Button;
