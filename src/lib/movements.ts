import seedMovements from "@/data/seed";
import type { Movement } from "@/types/movement";
import type { Mensual } from "@/types/movement";

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

export function getSavingsRate(data: Movement[]) {
  let tasa =
    ((getTotalIncome(data) - getTotalExpense(data)) /
      getTotalIncome(seedMovements)) *
    100;

  tasa = Math.floor(tasa * 100) / 100;
  return tasa;
}

export function filterByMonth(data: Movement[], year: string, month?: string) {
  if (month) {
    const data_filtrada = data.filter((p) => {
      const anio = p.date.slice(0, 4);
      const mes = p.date.slice(5, 7);

      return year === anio && mes === month;
    });

    return data_filtrada;
  } else {
    return data;
  }
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

export function getMonthName(month: string | number): string {
  const meses = [
    "En",
    "Feb",
    "Mzo",
    "Abr",
    "My",
    "Jun",
    "Jul",
    "Agt",
    "Sept",
    "Oct",
    "Nov",
    "Dic",
  ];

  const index = Number(month) - 1;

  if (index < 0 || index > 11 || isNaN(index)) return "Mes inválido";

  return meses[index];
}

export function getMonthlyTotals(
  data: Movement[],
  year: string,
  month?: string
): Mensual[] {
  if (month) {
    const dataMensual = filterByMonth(data, year, month);

    let incomeTotal: number = 0;
    let expenseTotal: number = 0;

    dataMensual.forEach((p) => {
      if (p.type === "income") incomeTotal += p.amount;
      else if (p.type === "expense") expenseTotal += p.amount;
    });

    let balanceTotal = incomeTotal - expenseTotal;

    const data_mensual: Mensual = {
      name: getMonthName(month),
      income: incomeTotal,
      expense: expenseTotal,
      balance: balanceTotal,
    };

    return [data_mensual];
  }

  const resultados: Mensual[] = [];

  const meses = Array.from(
    new Set(
      data
        .filter((p) => p.date.slice(0, 4) === year)
        .map((p) => p.date.slice(5, 7))
    )
  );

  meses.forEach((m) => {
    const dataMensual = filterByMonth(data, year, m);
    let incomeTotal = 0;
    let expenseTotal = 0;

    dataMensual.forEach((p) => {
      if (p.type === "income") incomeTotal += p.amount;
      else if (p.type === "expense") expenseTotal += p.amount;
    });

    const balanceTotal = incomeTotal - expenseTotal;

    resultados.push({
      name: getMonthName(m),
      income: incomeTotal,
      expense: expenseTotal,
      balance: balanceTotal,
    });
  });

  return resultados;
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

import { type Payment } from "@/app/dashboard/payments/columns";
export function getDataTable(data: Movement[]) {
  let datos: Payment[] = [];

  data.forEach((p) => {
    datos.push({
      id: p.id,
      date: p.date,
      category: p.category,
      tipo: p.type,
      amount: p.amount,
      metodo: p.account,
      description: p.description,
      status: "processing",
    });
  });

  return datos;
}
