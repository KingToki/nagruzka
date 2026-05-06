import React from "react";
import { Debt } from "../types";

interface Props {
  debts: Debt[];
}

export const CalendarView: React.FC<Props> = ({ debts }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const days = new Date(year, month + 1, 0).getDate();

  const events = debts
    .filter(d => d.dueDate)
    .map(d => ({
      day: d.dueDate!,
      color: d.isAutoDebit ? "green" : "red",
      name: d.name
    }));

  return (
    <div>
      <h2>Календар платежів</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
        marginTop: "10px"
      }}>
        {[...Array(days)].map((_, i) => {
          const day = i + 1;
          const event = events.find(e => e.day === day);

          return (
            <div key={i}
              style={{
                padding: "10px",
                background: "#f2f3f5",
                borderRadius: "6px",
                textAlign: "center",
                position: "relative"
              }}>
              {day}
              {event && (
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: event.color,
                  position: "absolute",
                  bottom: "5px",
                  left: "50%",
                  transform: "translateX(-50%)"
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
