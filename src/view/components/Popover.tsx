import * as RDXPopover from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { cn } from "../../app/utils/cn";


function PopoverRoot({ children }: { children: ReactNode }) {
  return <RDXPopover.Root>{children}</RDXPopover.Root>;
}

function PopoverTrigger({ children }: { children: ReactNode }) {
  return (
    <RDXPopover.Trigger asChild>
      {children}
    </RDXPopover.Trigger>
  );
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RDXPopover.Portal>
      <RDXPopover.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-lg mt-1",
          className
        )}
      >
        {children}
      </RDXPopover.Content>
    </RDXPopover.Portal>
  );
}



const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
};
export default Popover;
