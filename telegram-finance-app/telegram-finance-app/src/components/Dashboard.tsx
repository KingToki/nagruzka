import React from 'react';
import { UserData } from '../types';
import { DebtCalculator } from '../services/debtCalculator';
import { formatCurrency } from '../utils/formatters';

interface DashboardProps {
  userData: UserData;
}

export const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const totalDebt = DebtCalculator.calculateTotalDebt(userData.debts);
  const monthlyPayments = DebtCalculator.calculateMonthlyPayments(userData.debts);
  const paidThisMonth = calculatePaidThisMonth(userData);

  const totalPaid = userData.transactions
    .filter(t => t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);

  const progress = totalDebt.uah + totalDebt.usdt > 0 
    ? (totalPaid / (totalPaid + totalDebt.uah + totalDebt.usdt)) * 100 
    : 100;

  return (
    <div className="dashboard">
      <h2>Фінансова панель</h2>
      
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-stats">
          <span>Сплачено: {formatCurrency(totalPaid, 'UAH')}</span>
          <span>Залишилось: {formatCurrency(totalDebt.uah + totalDebt.usdt, 'UAH')}</span>
        </div>
      </div>

      <div className="currency-totals">
        <div className="currency-card">
          <h3>UAH</h3>
          <p className="total-amount">{formatCurrency(totalDebt.uah, 'UAH')}</p>
          <p className="monthly-payment">{formatCurrency(monthlyPayments.uah, 'UAH')}/міс</p>
        </div>
        
        <div className="currency-card">
          <h3>USDT</h3>
          <p className="total-amount">{formatCurrency(totalDebt.usdt, 'USDT')}</p>
          <p className="monthly-payment">{formatCurrency(monthlyPayments.usdt, 'USDT')}/міс</p>
        </div>
      </div>

      <div className="this-month">
        <h3>Цього місяця</h3>
        <p>Сплачено: {formatCurrency(paidThisMonth, 'UAH')}</p>
        <p>Залишилось: {formatCurrency(monthlyPayments.uah - paidThisMonth, 'UAH')}</p>
      </div>
    </div>
  );
};

function calculatePaidThisMonth(userData: UserData): number {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return userData.transactions
    .filter(t => t.type === 'payment' && t.date >= firstDayOfMonth)
    .reduce((sum, t) => sum + t.amount, 0);
}
