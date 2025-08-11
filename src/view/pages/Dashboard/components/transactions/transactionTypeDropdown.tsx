import { ChevronDownIcon } from "@radix-ui/react-icons";
import DropdownMenu from "../../../../components/DropdownMenu";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

interface TransactionTypeDropdownProps {
  onSelect: (type: 'INCOME' | 'EXPENSE' | undefined) => void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined
}

function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2 cursor-pointer">
          {selectedType === "EXPENSE" && <ExpensesIcon /> }
          {selectedType === "INCOME" && <IncomeIcon /> }
          {!selectedType && <TransactionsIcon /> }
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === "EXPENSE" && "Despesas" }
            {selectedType === "INCOME" && "Receitas" }
            {!selectedType && "Transações" }
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-50 w-[279px]">
        <DropdownMenu.Item onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default TransactionTypeDropdown;
