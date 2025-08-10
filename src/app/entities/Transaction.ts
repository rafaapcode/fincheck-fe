export interface BankAccount {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: "INCOME" | "EXPENSE";
  userId: string;
  bankAccountId: string;
  categoryId:string;
}