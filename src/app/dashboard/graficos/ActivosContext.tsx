import React, { createContext, useContext, useState } from "react";

export type opciones = "income" | "expense" | "balance";

const ActivosContext = createContext<opciones[] | null>(null);
const SetActivosContext = createContext<React.Dispatch<
  React.SetStateAction<opciones[]>
> | null>(null);

export const ActivosProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activos, setActivos] = useState<opciones[]>([]);
  return (
    <ActivosContext.Provider value={activos}>
      <SetActivosContext.Provider value={setActivos}>
        {children}
      </SetActivosContext.Provider>
    </ActivosContext.Provider>
  );
};

export const useActivos = () => {
  const context = useContext(ActivosContext);
  if (context === null)
    throw new Error("useActivos must be used within ActivosProvider");
  return context;
};

export const useSetActivos = () => {
  const context = useContext(SetActivosContext);
  if (context === null)
    throw new Error("useSetActivos must be used within ActivosProvider");
  return context;
};
