// Small helpers shared by the components.

export const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function totalsByCategory(expenses, categories) {
  const totals = {};
  categories.forEach((c) => (totals[c] = 0));
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });
  return totals;
}

export function validateExpense({ title, amount, date }) {
  if (!title.trim()) return "Please enter a title.";
  if (!amount || Number(amount) <= 0) return "Amount must be greater than 0.";
  if (!date) return "Please pick a date.";
  return "";
}
