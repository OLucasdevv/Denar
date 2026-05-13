import { createContext, useContext, useState } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transacoes, setTransacoes] = useState([]);

  return (
    <FinanceContext.Provider value={{ transacoes, setTransacoes }}>
      {children}
    </FinanceContext.Provider>
  );
};


export const useFinance = () => {
  return useContext(FinanceContext);
};