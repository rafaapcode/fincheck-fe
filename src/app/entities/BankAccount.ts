export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: "CHECKING" | "INVESTMENTS" | "CASH"
  color: string;
  currentBalance: number;
}