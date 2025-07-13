import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as RDXSelect from "@radix-ui/react-select";
import { cn } from "../../app/utils/cn";
import FieldError from "./FieldError";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
}

export function Select({ className, error, placeholder }: SelectProps) {
  return (
    <div>
      <div className="relative">

        <label className="absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none">
          {placeholder}
        </label>

        <RDXSelect.Root>
          <RDXSelect.Trigger
            className={cn(
              "relative w-full bg-white rounded-lg border border-gray-400 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all duration-100 outline-none text-left pt-4",
              error && "!border-red-800",
              className
            )}
          >
            <RDXSelect.Value />
            <RDXSelect.Icon className="absolute right-3 bottom-3">
              <ChevronDownIcon className="size-6 text-gray-800" />
            </RDXSelect.Icon>
          </RDXSelect.Trigger>

          <RDXSelect.Portal>
            <RDXSelect.Content className="z-40 overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-xl">
              <RDXSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon />
              </RDXSelect.ScrollUpButton>

              <RDXSelect.Viewport className="p-2">
                <RDXSelect.Item
                  value="Teste"
                  className="p-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-lg transition-colors duration-150 data-[state=checked]:font-bold outline-none"
                >
                  <RDXSelect.ItemText>Teste</RDXSelect.ItemText>
                </RDXSelect.Item>
                <RDXSelect.Item
                  value="Teste2"
                  className="p-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-lg transition-colors duration-150 data-[state=checked]:font-bold outline-none"
                >
                  <RDXSelect.ItemText>Teste2</RDXSelect.ItemText>
                </RDXSelect.Item>
                <RDXSelect.Item
                  value="Teste3"
                  className="p-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-lg transition-colors duration-150 data-[state=checked]:font-bold outline-none"
                >
                  <RDXSelect.ItemText>Teste3</RDXSelect.ItemText>
                </RDXSelect.Item>
                <RDXSelect.Item
                  value="Teste22"
                  className="p-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-lg transition-colors duration-150 data-[state=checked]:font-bold outline-none"
                >
                  <RDXSelect.ItemText>Teste22</RDXSelect.ItemText>
                </RDXSelect.Item>
              </RDXSelect.Viewport>

              <RDXSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white  text-gray-800">
                <ChevronDownIcon />
              </RDXSelect.ScrollDownButton>
            </RDXSelect.Content>
          </RDXSelect.Portal>
        </RDXSelect.Root>
      </div>

      {error && <FieldError error={error} />}
    </div>
  );
}
