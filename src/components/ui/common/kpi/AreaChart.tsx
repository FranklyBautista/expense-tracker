import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getMonthlyTotals } from "@/lib/movements";
import seedMovements from "@/data/seed";
import {
  type Categoria,
  useCategoria,
  categorias,
} from "@/app/dashboard/graficos/ThemeContext";

const GraphicBar = () => {
  const { selectedCategoria, setSelectedCategoria } = useCategoria();
  const datos = getMonthlyTotals(seedMovements, "2025");

  function getRandomColor(): string {
    const randomChannel = () => Math.floor(Math.random() * 200) + 30; // rango 30–230
    const r = randomChannel();
    const g = randomChannel();
    const b = randomChannel();
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  return (
    <div className="w-full max-w-[700px] h-[70vh] min-w-0  ">
      <ResponsiveContainer>
        <BarChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          data={datos}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={50} />
          <Tooltip />
          <Legend />

          {selectedCategoria.map((c) => (
            <Bar
              dataKey={c}
              fill={getRandomColor()}
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphicBar;
