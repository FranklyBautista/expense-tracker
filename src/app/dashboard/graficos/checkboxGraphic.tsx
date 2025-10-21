"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = boolean | "indeterminate";
const toBool = (c: Checked) => c === true;

import { type opciones } from "./ActivosContext";

import { useActivos, useSetActivos } from "./ActivosContext";

export function DropdownGraphic() {
  const activos = useActivos();
  const setActivos = useSetActivos();

  const toggle = (nombre: opciones, checked: Checked) => {
    setActivos(
      (prev) =>
        toBool(checked)
          ? prev.includes(nombre)
            ? prev // si ya está, no lo repite
            : [...prev, nombre] // lo agrega
          : prev.filter((x) => x !== nombre) // si se desmarca, lo quita
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="material-symbols-outlined">bar_chart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categorias</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={activos.includes("balance")}
          onCheckedChange={(c) => toggle("balance", c)}
        >
          Balance
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activos.includes("expense")}
          onCheckedChange={(c) => toggle("expense", c)}
        >
          Expense
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activos.includes("income")}
          onCheckedChange={(c) => toggle("income", c)}
        >
          Income
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
