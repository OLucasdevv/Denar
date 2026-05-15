import { getSpendingPace, getIncomePace, getVariavelPace } from "@/lib/analytics";
import { useFinance } from "@/contexts/FinanceContext";

const usePace = (tipo) => {
  const { transacoes } = useFinance();

  if (tipo === "gasto") return getSpendingPace(transacoes);
  if (tipo === "ganho") return getIncomePace(transacoes);
  if (tipo === "variavel") return getVariavelPace(transacoes); 

  return [];
};

export default usePace;