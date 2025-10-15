import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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

import Graphic from "@/components/ui/common/kpi/AreaChart";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4 min-w-0">
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
                      />
                    </CarouselItem>
                    <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <KpiCard
                        title="EXPENSE"
                        PValue={getTotalExpense(seedMovements)}
                      />
                    </CarouselItem>
                    <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <KpiCard
                        title="BALANCE"
                        PValue={getBalance(seedMovements)}
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

              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                <Graphic />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
