"use client";

import * as React from "react";
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type Categoria, categorias, useCategoria } from "./ThemeContext";

export function DropdownCategory() {
  const { selectedCategoria, setSelectedCategoria } = useCategoria();

  function toggleCategoria(c: Categoria) {
    if (selectedCategoria.includes(c)) {
      setSelectedCategoria(selectedCategoria.filter((cat) => cat !== c));
    } else {
      setSelectedCategoria([...selectedCategoria, c]);
    }
  }

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
        {categorias.map((c) => (
          <DropdownMenuCheckboxItem
            checked={selectedCategoria.includes(c)}
            onCheckedChange={() => toggleCategoria(c)}
          >
            {c}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
