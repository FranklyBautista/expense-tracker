import GraphicBar from "@/components/ui/common/kpi/AreaChart";
import { DropdownGraphic } from "./checkboxGraphic";
import { ActivosProvider } from "./ActivosContext";

type Props = {};

function GraphicsPage({}: Props) {
  return (
    <>
      <ActivosProvider>
        <div className="w-full max-w-[180px] flex flex-row justify-between items-center">
          <DropdownGraphic />
          <DropdownGraphic />
        </div>

        <GraphicBar />
      </ActivosProvider>
    </>
  );
}

export default GraphicsPage;
