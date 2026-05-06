import React from "react";
import { Debt } from "../types";
import { DebtCalculator } from "../services/debtCalculator";
import { formatCurrency } from "../utils/formatters";

interface Props {
  debts: Debt[];
}

export const Analytics: React.FC<Props> = ({ debts }) => {
  const avalanche = DebtCalculator.calculateAvalancheMethod(debts);
  const burnRate = DebtCalculator.calculateBurnRate(debts);

  return (
    <div>
      <h2>Аналітика</h2>

      <h3>Метод Avalanche</h3>
      <ul className="debt-list">
        {avalanche.map(d => (
          <li key={d.id} className="debt-item priority">
            {d.name} — {d.interestRate}%  
          </li>
        ))}
      </ul>

      <h3>Burn rate (обов’язкові платежі цього місяця)</h3>
      <p>UAH: {formatCurrency(burnRate.uah, "UAH")}</p>
      <p>USDT: {formatCurrency(burnRate.usdt, "USDT")}</p>
    </div>
  );
};
