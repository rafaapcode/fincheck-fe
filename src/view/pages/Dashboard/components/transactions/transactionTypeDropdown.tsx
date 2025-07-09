import { ChevronDownIcon } from "@radix-ui/react-icons";
import DropdownMenu from "../../../../components/DropdownMenu";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2 cursor-pointer">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            Transações
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-50 w-[279px]">
        <DropdownMenu.Item>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default TransactionTypeDropdown;
