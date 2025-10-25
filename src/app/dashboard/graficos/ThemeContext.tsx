import { createContext, useContext, useState, type ReactNode } from "react";

export const categorias = ["income", "expense", "balance"] as const;
export type Categoria = (typeof categorias)[number]; // type Categoria = "income"|"expense"|"balance"

type CategoryContextType = {
  selectedCategoria: Categoria[];
  setSelectedCategoria: (c: Categoria[]) => void;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria[]>([]);

  return (
    <CategoryContext.Provider
      value={{ selectedCategoria, setSelectedCategoria }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoria() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("Mamaste");
  return ctx;
}
