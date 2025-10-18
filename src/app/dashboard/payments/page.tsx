import * as React from "react";
import { columns, type Payment } from "./columns";
import { DataTable } from "./data-table";

import { getDataTable } from "@/lib/movements";
import seedMovements from "@/data/seed";

async function getData(): Promise<Payment[]> {
  const data = getDataTable(seedMovements);

  return data;
}

export default function DemoPage() {
  const [data, setData] = React.useState<Payment[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getData();
        if (mounted) setData(res);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container mx-auto">
      {loading ? (
        <div className="text-sm text-muted-foreground">Cargando datos…</div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
