import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { capitalizeFirstLetter } from "../../app/utils/capitalizeFirstLetter";

interface DatePickerProps {
  value: Date;
  onChange?: (date: Date) => void;
}

function DatePicker({onChange, value}: DatePickerProps) {
  return (
    <DayPicker 
      animate
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        chevron: 'text-teal-800 !bg-transparent',
        today: 'bg-gray-100 font-bold text-gray-900 rounded-full',
        selected: 'bg-teal-900 text-white font-medium rounded-full',
        day: 'text-gray-700 cursor-pointer rounded-full hover:bg-teal-100 hover:text-teal-500',
      }}
      formatters={{
        formatCaption: (date, options) => capitalizeFirstLetter(format(date, 'LLLL yyyy', options))
      }}
    />
  )
}

export default DatePicker