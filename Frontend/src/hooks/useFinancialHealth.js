
import { useMemo } from "react"
import { useFinance } from "@/contexts/FinanceContext"
import { classificarFluxo } from "@/lib/financialHealth"

export function useFinancialHealth() {
  const { transacoes } = useFinance()

  const dados = useMemo(() => {
    if (!transacoes || transacoes.length === 0) return null
    return classificarFluxo(transacoes)
  }, [transacoes])
  console.log(dados)
  return dados
}