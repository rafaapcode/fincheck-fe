import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "../../../../../../app/utils/cn";
import Button from "../../../../../components/Button";
import Modal from "../../../../../components/Modal";
import useFiltersModal from "./useFiltersModal";

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
}

const mockedAcc = [
  {
    id: "123",
    name: "BTG",
  },
  {
    id: "1234",
    name: "Carteira",
  },
  {
    id: "123456",
    name: "Nubank",
  },
];

function FiltersModal({ onClose, open }: FiltersModalProps) {
  const { handleSelectBankAccount, selectedBankAccountId, selectedYear, handleChangeYear } = useFiltersModal();

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {mockedAcc.map((acc) => (
            <button
              onClick={() => handleSelectBankAccount(acc.id)}
              key={acc.id}
              className={cn("p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors duration-100 text-gray-800 cursor-pointer", 
                acc.id === selectedBankAccountId && '!bg-gray-200'
              )}
            >
              {acc.name}
            </button>
          ))}
        </div>

      </div>


      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">Ano</span>
        <div className="mt-2 w-52 flex justify-between items-center">
          <button 
            onClick={() => handleChangeYear(-1)} 
            className="size-12 flex items-center justify-center cursor-pointer"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          <div className="flex-1 text-center text-sm font-medium tracking-[-0.5px]">
            <span>{selectedYear}</span>
          </div>
          <button  
            onClick={() => handleChangeYear(1)} 
            className="size-12 flex items-center justify-center cursor-pointer"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar filtros</Button>
    </Modal>
  );
}

export default FiltersModal;
