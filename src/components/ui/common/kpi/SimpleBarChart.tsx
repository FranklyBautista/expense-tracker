import React from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

import seedMovements from "@/data/seed";
import { getMonthlyTotals } from "@/lib/movements";
const datos = getMonthlyTotals(seedMovements, "2025");

const Example = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={datos}>
        <Bar dataKey="income" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
