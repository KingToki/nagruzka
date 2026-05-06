import { Debt, Transaction } from '../types';

export class DebtCalculator {
  static calculateAvalancheMethod(debts: Debt[]): Debt[] {
    return debts
      .filter(debt => debt.currentBalance && debt.currentBalance > 0)
      .sort((a, b) => (b.interestRate || 0) - (a.interestRate || 0));
  }

  static calculateBurnRate(debts: Debt[]): { uah: number; usdt: number } {
    const burnRate = { uah: 0, usdt: 0 };
    
    debts.forEach(debt => {
      if (debt.monthlyPayment) {
        if (debt.currency === 'UAH') {
          burnRate.uah += debt.monthlyPayment;
        } else {
          burnRate.usdt += debt.monthlyPayment;
        }
      }
    });
    
    return burnRate;
  }

  static calculateMonthlyPayments(debts: Debt[]): { uah: number; usdt: number } {
    return this.calculateBurnRate(debts);
  }

  static calculateTotalDebt(debts: Debt[]): { uah: number; usdt: number } {
    const total = { uah: 0, usdt: 0 };
    
    debts.forEach(debt => {
      if (debt.currentBalance) {
        if (debt.currency === 'UAH') {
          total.uah += debt.currentBalance;
        } else {
          total.usdt += debt.currentBalance;
        }
      }
    });
    
    return total;
  }
}
