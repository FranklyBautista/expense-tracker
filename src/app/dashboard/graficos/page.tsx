import React from "react";

import { DropdownCategory } from "./DropdownCategory";
import GraphicBar from "@/components/ui/common/kpi/AreaChart";
import { CategoryProvider } from "./ThemeContext";

type Props = {};

function GraphicsPage({}: Props) {
  return (
    <>
      <CategoryProvider>
        <DropdownCategory />
        <GraphicBar />
      </CategoryProvider>
    </>
  );
}

export default GraphicsPage;
