import Button from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import Modal from "./Modal";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading: boolean;
}

function ConfirmDeleteModal({
  onConfirm,
  isLoading,
  onClose,
  title,
  description,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open onClose={onClose} title="Excluir">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="size-[52px] rounded-full bg-red-100 flex items-center justify-center text-red-800">
          <TrashIcon className="size-6" />
        </div>
        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
          {title}
        </p>
        {description && (
          <p className="text-gray-800 tracking-[-0.5px]">{description}</p>
        )}
      </div>
      <div className="mt-10 space-y-4">
        <Button
          onClick={onConfirm}
          variant="danger"
          className="w-full"
          isLoading={isLoading}
        >
          Sim , desejo excluir
        </Button>
        <Button
          onClick={onClose}
          variant="ghost"
          className="w-full"
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
