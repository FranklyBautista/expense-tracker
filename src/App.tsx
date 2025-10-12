import Page from "./app/dashboard/page";

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
} from "./lib/movements";

console.log(seedMovements);

const totalIncome = getTotalIncome(seedMovements);
const totalExpense = getTotalExpense(seedMovements);
const balance = getBalance(seedMovements);
const filtroMes = filterByMonth(seedMovements, "2025", "01");
const filtroCategoria = filterByCategory(seedMovements, "Rent");
const buscarMovimiento = searchMovements(seedMovements, "Medicina");
const totalesMensuales = getMonthlyTotals(seedMovements, "2025", "01");
const ahorrosMensuales = getMonthlySavings(seedMovements, "2025", "01");
const totalesCategorias = getCategoryTotals(seedMovements, {
  tipo: "expense",
  year: "2025",
  month: "01",
});
const topCategorias = getTopSpendingCategories(seedMovements);
const diccionarioMeses = groupByMonth(seedMovements);
function App() {
  localStorage.setItem("movements", JSON.stringify(seedMovements));

  return (
    <>
      <Page />
    </>
  );
}

export default App;
