import type { Movement } from "@/types/movement";

export function getTotalIncome(data: Movement[]) {
  let totalIncome: number = 0;
  data.forEach((p) => {
    if (p.type === "income") {
      totalIncome += p.amount;
    }
  });

  return totalIncome;
}
export function getTotalExpense(data: Movement[]) {
  let totalExpense: number = 0;

  data.forEach((p) => {
    if (p.type === "expense") {
      totalExpense += p.amount;
    }
  });

  totalExpense = Math.floor(totalExpense * 100) / 100;
  return totalExpense;
}

export function getBalance(data: Movement[]) {
  return getTotalIncome(data) - getTotalExpense(data);
}

export function filterByMonth(data: Movement[], year: string, month: string) {
  const data_filtrada = data.filter((p) => {
    const anio = p.date.slice(0, 4);
    const mes = p.date.slice(5, 7);

    return year === anio && mes === month;
  });

  return data_filtrada;
}

export function filterByCategory(data: Movement[], category: string) {
  const data_filtrada = data.filter((p) => {
    return p.category === category;
  });

  return data_filtrada;
}

export function searchMovements(data: Movement[], keyword: string) {
  const data_filtrada = data.filter((p) => {
    return (p.description ?? "")
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase());
  });

  return data_filtrada;
}

// FILTROS O MOVIMIENTOS POR MES

export function getMonthlyTotals(
  data: Movement[],
  year: string,
  month: string
) {
  const dataMensual = filterByMonth(data, year, month);

  type mensual = { income: number; expense: number; balance: number };
  let incomeTotal: number = 0;
  let expenseTotal: number = 0;

  dataMensual.forEach((p) => {
    if (p.type === "income") incomeTotal += p.amount;
    else if (p.type === "expense") expenseTotal += p.amount;
  });

  let balanceTotal = incomeTotal - expenseTotal;

  const data_mensual: mensual = {
    income: incomeTotal,
    expense: expenseTotal,
    balance: balanceTotal,
  };

  return data_mensual;
}

export function getMonthlySavings(
  data: Movement[],
  year: string,
  month: string
) {
  const dataMensual = filterByMonth(data, year, month);

  let incomeTotal: number = 0;
  let expenseTotal: number = 0;

  dataMensual.forEach((p) => {
    if (p.type === "income") incomeTotal += p.amount;
    else if (p.type === "expense") expenseTotal += p.amount;
  });

  let balanceTotal = incomeTotal - expenseTotal;

  return balanceTotal;
}

//Analisis por categorias

export function getCategoryTotals(
  data: Movement[],
  params?: { tipo?: string; year?: string; month?: string }
): Record<string, number> {
  const datos: any = {};
  data.forEach((p) => {
    if (p.type === params?.tipo) {
      if (!datos[p.category]) datos[p.category] = 0;
      datos[p.category] += p.amount;
    }
  });

  return datos;
}

export function getTopSpendingCategories(data: Movement[]) {
  const datosTotales = getCategoryTotals(data, { tipo: "expense" });

  let array = Object.entries(datosTotales);

  array = array.sort((a, b) => b[1] - a[1]);

  return array;
}

export function groupByMonth(data: Movement[]) {
  let diccionario: any = {};
  data.forEach((p) => {
    const fecha = p.date.slice(0, 7);
    const fechaPartida = fecha.split("-");
    diccionario[fecha] = filterByMonth(data, fechaPartida[0], fechaPartida[1]);
  });

  return diccionario;
}
