export interface UserData {
  telegramId: string;
  income: Income;
  debts: Debt[];
  transactions: Transaction[];
  settings: UserSettings;
}

export interface Income {
  salary: {
    amount: number;
    currency: 'UAH' | 'USDT';
  };
  additional: Array<{
    amount: number;
    currency: 'UAH' | 'USDT';
    description: string;
    date: Date;
  }>;
}

export interface Debt {
  id: string;
  type: 'installment' | 'credit_card' | 'private_loan';
  name: string;
  amount: number;
  currency: 'UAH' | 'USDT';
  interestRate?: number;
  monthlyPayment?: number;
  dueDate?: number;
  remainingMonths?: number;
  isAutoDebit: boolean;
  hasGracePeriod?: boolean;
  currentBalance?: number;
  creditLimit?: number;
}

export interface Transaction {
  id: string;
  debtId: string;
  amount: number;
  currency: 'UAH' | 'USDT';
  date: Date;
  type: 'payment' | 'income';
  description: string;
}

export interface UserSettings {
  language: 'uk';
  theme: 'light';
  defaultCurrency: 'UAH' | 'USDT';
}
