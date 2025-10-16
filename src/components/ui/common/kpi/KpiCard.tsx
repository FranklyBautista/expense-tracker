import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import GraficoSencillo from "./SimpleBarChart";

type Props = {
  title: string;
  PValue: number;
  porcentaje?: boolean;
  valorGrafico?: string;
};

function KpiCard({ title, PValue, porcentaje, valorGrafico }: Props) {
  return (
    <Card className="p-4 bg-white shadow-lg rounded-xl hover:shadow-xl transition w-full h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-3xl font-bold text-black">
        {porcentaje ? "%" : "$"} {PValue} <br />
        <span className="material-symbols-outlined text-green-600 p-1 ">
          change_history
        </span>
        <span className="text-green-600 text-lg">12% MoM</span> <br />
        <div className="w-full h-56 md:h-64 lg:h-20 min-w-0">
          <GraficoSencillo valor={valorGrafico ?? ""} />
        </div>
      </CardContent>
    </Card>
  );
}

export default KpiCard;
