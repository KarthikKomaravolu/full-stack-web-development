# Assignment 2 – Individual Project: Expense Tracker Dashboard

A responsive expense tracker built with **React** (Vite). It started as a plain HTML/CSS/JS app and was rebuilt as reusable React components.

## Features
- Add, edit and delete expenses with form validation
- Search by title and filter by category
- Live summary cards (total, count, average, top category)
- Spending-by-category bar chart
- Data saved in the browser with `localStorage`
- Responsive sidebar layout with a mobile hamburger menu

## How to Run
```bash
cd Assignments/Assignment-2-Individual-Project
npm install
npm run dev        # start the dev server
npm run build      # production build into dist/
```

## Project Structure
```
Assignment-2-Individual-Project/
├── README.md
├── package.json
├── vite.config.js
├── screenshots/              # add your screenshots here
└── src/
    ├── index.html
    ├── main.jsx              # React entry point
    ├── App.jsx               # state, localStorage, layout
    ├── style.css
    ├── data.json             # categories, threshold, sample expenses
    ├── utils.js              # money format, totals, validation
    └── components/
        ├── Sidebar.jsx
        ├── StatsCards.jsx
        ├── ExpenseForm.jsx
        ├── ExpenseTable.jsx
        └── CategoryChart.jsx
```

## What Changed from the Original Version
- `script.js` logic was split into React components; state lives in `App.jsx`.
- Sample data and categories moved out of code into `data.json`.
- The CSS-only checkbox menu toggle was replaced with React state.
- Added `main.jsx`, `utils.js`, `package.json` and `vite.config.js` to support the React setup.

## Screenshots
Add images to the `screenshots/` folder and link them here, e.g. `![Dashboard](screenshots/dashboard.png)`.
