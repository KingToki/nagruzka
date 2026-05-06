export function formatCurrency(value: number, currency: "UAH" | "USDT") {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency
  }).format(value);
}
