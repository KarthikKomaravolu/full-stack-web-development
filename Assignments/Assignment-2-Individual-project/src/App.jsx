import { useEffect, useState } from "react";
import data from "./data.json";
import Sidebar from "./components/Sidebar.jsx";
import StatsCards from "./components/StatsCards.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";
import CategoryChart from "./components/CategoryChart.jsx";

const STORAGE_KEY = "expenseTracker.expenses";

const sampleExpenses = () => data.expenses.map((e) => ({ ...e }));

function loadExpenses() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (err) {
    /* ignore and fall back to sample data */
  }
  return sampleExpenses();
}

export default function App() {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [editing, setEditing] = useState(null); // the expense being edited, or null
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");

  // Save to localStorage whenever the list changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (err) {
      /* storage unavailable */
    }
  }, [expenses]);

  const saveExpense = (values) => {
    if (editing) {
      setExpenses((list) =>
        list.map((e) => (e.id === editing.id ? { ...e, ...values } : e))
      );
      setEditing(null);
    } else {
      setExpenses((list) => {
        const id = list.reduce((m, e) => Math.max(m, e.id), 0) + 1;
        return [...list, { id, ...values }];
      });
    }
  };

  const startEdit = (expense) => {
    setEditing(expense);
    document.getElementById("add")?.scrollIntoView();
  };

  const deleteExpense = (id) => {
    if (!window.confirm("Delete this expense?")) return;
    setExpenses((list) => list.filter((e) => e.id !== id));
    if (editing && editing.id === id) setEditing(null);
  };

  const resetData = () => {
    if (!window.confirm("Reset to the sample data? Your changes will be lost.")) return;
    setExpenses(sampleExpenses());
    setEditing(null);
  };

  const navigate = (id) => {
    setActiveLink(id);
    setMenuOpen(false);
  };

  return (
    <>
      <Sidebar
        open={menuOpen}
        active={activeLink}
        onNavigate={navigate}
        onClose={() => setMenuOpen(false)}
      />

      <div className="main">
        <header className="topbar">
          <button
            type="button"
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
          <h1 className="topbar-title">Expense Tracker Dashboard</h1>
          <button className="btn btn-ghost" type="button" onClick={resetData}>
            Reset data
          </button>
        </header>

        <main className="content">
          <StatsCards expenses={expenses} categories={data.categories} />

          <ExpenseForm
            categories={data.categories}
            editing={editing}
            onSave={saveExpense}
            onCancel={() => setEditing(null)}
          />

          <ExpenseTable
            expenses={expenses}
            categories={data.categories}
            highAmount={data.highAmount}
            onEdit={startEdit}
            onDelete={deleteExpense}
          />

          <CategoryChart expenses={expenses} categories={data.categories} />
        </main>
      </div>
    </>
  );
}
