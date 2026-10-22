import { money, totalsByCategory } from "../utils.js";

export default function CategoryChart({ expenses, categories }) {
  const totals = totalsByCategory(expenses, categories);
  const max = Math.max(...Object.values(totals), 1);

  return (
    <section className="panel" id="analytics">
      <h2>Spending by Category</h2>
      <div id="chart">
        {categories.map((c) => (
          <div className="bar-row" key={c}>
            <span>{c}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(totals[c] / max) * 100}%` }}></div>
            </div>
            <strong>{money(totals[c])}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
