import { useEffect } from "react";
import Page from "./app/dashboard/page";
import HistoryPage from "./app/dashboard/historia/page";
import DashboardHome from "./app/dashboard/home/page";
import GraphicsPage from "./app/dashboard/graficos/page";
import DemoPage from "./app/dashboard/payments/page";
import { ThemeProvider } from "./components/theme-provider";

import seedMovements from "./data/seed";

import {
  getTotalIncome,
  getTotalExpense,
  getBalance,
  filterByMonth,
  filterByCategory,
  searchMovements,
  getMonthlyTotals,
  getMonthlySavings,
  getCategoryTotals,
  getTopSpendingCategories,
  groupByMonth,
  getDataTable,
} from "./lib/movements";
import { Routes, Route, Navigate } from "react-router-dom";

/* const totalIncome = getTotalIncome(seedMovements);
const totalExpense = getTotalExpense(seedMovements);
const balance = getBalance(seedMovements);
const filtroMes = filterByMonth(seedMovements, "2025", "01");
const filtroCategoria = filterByCategory(seedMovements, "Rent");
const buscarMovimiento = searchMovements(seedMovements, "Medicina");
const totalesMensuales = getMonthlyTotals(seedMovements, "2025", "07");
const ahorrosMensuales = getMonthlySavings(seedMovements, "2025", "01");
const totalesCategorias = getCategoryTotals(seedMovements, {
  tipo: "expense",
  year: "2025",
  month: "01",
});
const topCategorias = getTopSpendingCategories(seedMovements);
const diccionarioMeses = groupByMonth(seedMovements); */

const tabla = getDataTable(seedMovements);

function App() {
  useEffect(() => {
    localStorage.setItem("movements", JSON.stringify(seedMovements));
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />

        <Route path="/app/dashboard" element={<Page />}>
          <Route index element={<DashboardHome />} />
          <Route path="historia" element={<HistoryPage />} />
          <Route path="graficos" element={<GraphicsPage />} />
          <Route path="payments" element={<DemoPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
