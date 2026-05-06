import React, { useState } from "react";

export const CurrencySwitcher: React.FC = () => {
  const [currency, setCurrency] = useState<"UAH" | "USDT">("UAH");

  return (
    <div style={{ marginBottom: "15px" }}>
      <select
        className="form-group"
        style={{ padding: "10px", width: "100%" }}
        value={currency}
        onChange={e => setCurrency(e.target.value as any)}
      >
        <option value="UAH">UAH</option>
        <option value="USDT">USDT</option>
      </select>
    </div>
  );
};
