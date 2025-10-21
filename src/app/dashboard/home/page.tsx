import seedMovements from "@/data/seed";
import KpiCard from "@/components/ui/common/kpi/KpiCard";
import {
  getTotalIncome,
  getTotalExpense,
  getBalance,
  getSavingsRate,
} from "@/lib/movements";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import DemoPage from "../payments/page";

type Props = {};

function DashboardHome({}: Props) {
  return (
    <>
      <div className="relative overflow-hidden rounded-xl border-0 bg-background">
        <Carousel
          className="relative w-full max-w-full"
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <KpiCard
                title="INCOME"
                PValue={getTotalIncome(seedMovements)}
                valorGrafico="income"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <KpiCard
                title="EXPENSE"
                PValue={getTotalExpense(seedMovements)}
                valorGrafico="expense"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <KpiCard
                title="BALANCE"
                PValue={getBalance(seedMovements)}
                valorGrafico="balance"
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <KpiCard
                title="TASA DE AHORRO"
                PValue={getSavingsRate(seedMovements)}
                porcentaje={true}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min w-full">
        <DemoPage />
      </div>
    </>
  );
}

export default DashboardHome;
