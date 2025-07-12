import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  title: string;
  rightAction?: ReactNode;
  onClose?: () => void;
}

function Modal({ open, children, title, rightAction, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20" />
        <Transition
          show={open}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Content
            aria-describedby=""
            aria-description=""
            className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-30 shadow-lg w-full max-w-[400px] outline-none"
          >
            {/* Using only to aviod RADIX DIALOG ERROR */}
            <Dialog.Title className="hidden"></Dialog.Title>
            {/* Using only to aviod RADIX DIALOG ERROR */}

            <header className="h-12 flex items-center justify-between text-gray-800">
              <button
                className="size-12 cursor-pointer flex items-center justify-center outline-none"
                onClick={onClose}
              >
                <Cross2Icon className="size-6" />
              </button>
              <span className="text-lg tracking-[-1px] font-bold">{title}</span>
              <div className="size-12 flex items-center justify-center">
                {rightAction}
              </div>
            </header>
            <div>{children}</div>
          </Dialog.Content>
        </Transition>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
