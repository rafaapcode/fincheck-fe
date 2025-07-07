import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/hooks/useAuth";
import DropdownMenu from "./DropdownMenu";

function UserMenu() {
  const {signOut} = useAuth();
  
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-100 cursor-pointer rounded-full w-12 h-12 flex items-center justify-center border border-teal-200">
          <span className="text-sm tracking-[-0.5px] font-medium text-teal-800">
            RA
          </span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-32">
          <DropdownMenu.Item className="justify-between" onSelect={signOut}>
            Sair
            <ExitIcon className="size-4"/>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default UserMenu;
