import { PlusIcon } from "@radix-ui/react-icons";
import DropdownMenu from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import useDashboard from "../DashboardContext/useDashboard";

function Fab() {
  const {toggleAccountModal} = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="bg-teal-800 text-white size-12 flex justify-center items-center rounded-full cursor-pointer">
            <PlusIcon className="size-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mb-2 mr-2">
          <DropdownMenu.Item>
            <CategoryIcon type="expense"/>
            Nova Despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CategoryIcon type="income"/>
            Nova Receita
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={toggleAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default Fab;
