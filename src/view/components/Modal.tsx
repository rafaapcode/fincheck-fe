import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";

function Modal() {
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20" />
        <Transition
          show={true}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Content className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-30">
            <h1>Modal esta ativo</h1>
          </Dialog.Content>
        </Transition>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
