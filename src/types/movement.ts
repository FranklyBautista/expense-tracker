// src/types/movement.ts
export type MovementType = "income" | "expense";
export type Account = "Bank" | "Card" | "Cash";

export interface Movement {
  id: string;
  date: string; // YYYY-MM-DD
  type: MovementType;
  category: string;
  amount: number;
  description?: string;
  account: Account;
  recurring?: boolean;
}
