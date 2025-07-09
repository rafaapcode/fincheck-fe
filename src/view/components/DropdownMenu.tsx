import * as RDXDropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { cn } from "../../app/utils/cn";

function DropdownMenuRoot({ children }: { children: ReactNode }) {
  return <RDXDropdownMenu.Root>{children}</RDXDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  return (
    <RDXDropdownMenu.Trigger className="outline-none">
      {children}
    </RDXDropdownMenu.Trigger>
  );
}

interface DropdownMenuContent {
  children: ReactNode;
  className?: string;
}

function DropdownMenuContent({ children, className }: DropdownMenuContent) {
  return (
    <RDXDropdownMenu.Portal>
      <RDXDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-lg mt-1",
          className
        )}
      >
        {children}
      </RDXDropdownMenu.Content>
    </RDXDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  onSelect?: () => void;
}

function DropdownMenuItem({ children, className,  onSelect }: DropdownMenuItemProps) {
  return (
    <RDXDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "cursor-pointer outline-none min-h-10 flex items-center py-2 px-4 gap-2 justify-start  text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors duration-150",
        className
      )}
    >
      {children}
    </RDXDropdownMenu.Item>
  );
}

const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
export default DropdownMenu;
