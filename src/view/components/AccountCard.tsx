import { cn } from "../../app/utils/cn";
import { formatCurrency } from "../../app/utils/formatCurrency";
import useDashboard from "../pages/Dashboard/components/DashboardContext/useDashboard";
import { BankAccountTypeIcon } from "./icons/BankAccountTypeIcon";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'INVESTMENT' | 'CHECKING';
}

function AccountCard({balance, color, name, type}: AccountCardProps) {
  const {areValuesVisible} = useDashboard();

  return (
    <div className="flex flex-col justify-between p-4 bg-white rounded-2xl h-[200px] border-b-4 border-teal-900"
      style={{borderColor: color}}
    >
      <header>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </header>

      <footer>
        <span className={cn("text-gray-800 font-medium tracking-[-0.5px] block", !areValuesVisible && 'blur-sm')}>{formatCurrency(balance)}</span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </footer>
    </div>
  );
}

export default AccountCard;
