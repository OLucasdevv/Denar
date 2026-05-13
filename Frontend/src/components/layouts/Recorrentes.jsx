import { useFinancialHealth } from "@/hooks/useFinancialHealth"

const Recorrentes = () => {
  const dados = useFinancialHealth()

  if (!dados) return null

  const fixos = dados.fixosDetectados
  const circulantes = dados.circulantesDetectados
  

  const totalItens = [...fixos, ...circulantes]

  if (totalItens.length === 0) return null

  return (
    <div className="shadow-neu-badge bg-background rounded-xl p-4 flex flex-col gap-3">
      <div>
        <p className="text-sm text-foreground font-medium">Recorrentes detectados</p>
        <p className="text-xs text-zinc-600 mt-0.5">baseado no histórico disponível</p>
      </div>

      <div className="flex flex-col gap-3">
        {fixos.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-foreground capitalize">{item.nome}</p>
              <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded w-fit">fixo</span>
            </div>
            <p className="text-sm text-primary font-space">
              R$ {item.valor.toFixed(2).replace(".", ",")}/mês
            </p>
          </div>
        ))}

        {circulantes.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-foreground capitalize">{item.nome}</p>
              <span className="text-[10px] text-zinc-400 bg-zinc-400/10 px-1.5 py-0.5 rounded w-fit">circulante</span>
            </div>
            <p className="text-sm text-zinc-400 font-space">
              R$ {Math.abs(item.liquido).toFixed(2).replace(".", ",")} liq.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recorrentes;