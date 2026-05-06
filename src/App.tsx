import React, { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { storageService } from "./services/storage";
import { UserData } from "./types";

import { Dashboard } from "./components/Dashboard";
import { CalendarView } from "./components/CalendarView";
import { Analytics } from "./components/Analytics";
import { DebtEngine } from "./components/DebtEngine";
import { CurrencySwitcher } from "./components/CurrencySwitcher";

export default function App() {
  const telegram = useTelegram();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [view, setView] = useState<"dashboard" | "calendar" | "analytics" | "debts">("dashboard");

  useEffect(() => {
    async function load() {
      if (!telegram) return;

      const telegramId = telegram.initDataUnsafe?.user?.id?.toString() || "local-debug";
      const existing = await storageService.getUserData(telegramId);

      if (existing) {
        setUserData(existing);
      } else {
        const newUser: UserData = {
          telegramId,
          income: {
            salary: {
              amount: 0,
              currency: "UAH"
            },
            additional: []
          },
          debts: [],
          transactions: [],
          settings: {
            language: "uk",
            theme: "light",
            defaultCurrency: "UAH"
          }
        };

        await storageService.saveUserData(newUser);
        setUserData(newUser);
      }
    }

    load();
  }, [telegram]);

  if (!userData) return <p>Завантаження...</p>;

  return (
    <div className="container">

      <CurrencySwitcher />

      {view === "dashboard" && <Dashboard userData={userData} />}
      {view === "calendar" && <CalendarView debts={userData.debts} />}
      {view === "analytics" && <Analytics debts={userData.debts} />}
      {view === "debts" && <DebtEngine userData={userData} setUserData={setUserData} />}

      <nav style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button className="btn" onClick={() => setView("dashboard")}>Дашборд</button>
        <button className="btn" onClick={() => setView("calendar")}>Календар</button>
        <button className="btn" onClick={() => setView("analytics")}>Аналітика</button>
        <button className="btn" onClick={() => setView("debts")}>Борги</button>
      </nav>
    </div>
  );
}
