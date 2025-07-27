import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import DatePicker from "./DatePicker";
import FieldError from "./FieldError";
import Popover from "./Popover";

interface DaterPickerInputProps {
  error?: string;
  className?: string;
}

function DaterPickerInput({ className, error }: DaterPickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "relative w-full bg-white rounded-lg border border-gray-400 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all duration-100 outline-none text-left pt-4",
              error && "!border-red-800",
              className
            )}
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content className="z-50">
          <DatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)}/>
        </Popover.Content>
      </Popover.Root>
      {error && <FieldError error={error} />}
    </div>
  );
}

export default DaterPickerInput;
