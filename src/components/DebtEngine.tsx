import React, { useState } from "react";
import { UserData, Debt } from "../types";
import { storageService } from "../services/storage";

interface Props {
  userData: UserData;
  setUserData: (d: UserData) => void;
}

export const DebtEngine: React.FC<Props> = ({ userData, setUserData }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const addDebt = async () => {
    const newDebt: Debt = {
      id: crypto.randomUUID(),
      name,
      amount,
      type: "installment",
      currency: "UAH",
      isAutoDebit: false,
      currentBalance: amount
    };

    const updated = {
      ...userData,
      debts: [...userData.debts, newDebt]
    };

    await storageService.saveUserData(updated);
    setUserData(updated);

    setName("");
    setAmount(0);
  };

  return (
    <div>
      <h2>Борги</h2>

      <div className="form-group">
        <label>Назва</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Сума</label>
        <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
      </div>

      <button className="btn" onClick={addDebt}>Додати</button>

      <ul className="debt-list" style={{ marginTop: "20px" }}>
        {userData.debts.map(d => (
          <li key={d.id} className="debt-item">
            {d.name} — {d.amount} {d.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};
