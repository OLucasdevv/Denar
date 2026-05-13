import { getSpendingPace, getIncomePace } from "@/lib/analytics";
import { useFinance } from "@/contexts/FinanceContext";

const usePace = (tipo) => {
  const { transacoes } = useFinance();

  if (tipo === "gasto") {
    return getSpendingPace(transacoes);
  }

  if (tipo === "ganho") {
    return getIncomePace(transacoes);
  }

  return [];
};

export default usePace;