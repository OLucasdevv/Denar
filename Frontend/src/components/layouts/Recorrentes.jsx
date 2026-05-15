import { useFinancialHealth } from "@/hooks/useFinancialHealth"
import DataNotFoundIcon from "../ui/NotFoundIcon"

const Recorrentes = () => {
  const dados = useFinancialHealth()
  const fixos = dados.fixosDetectados || []
  const circulantes = dados.circulantesDetectados || []
  const temSuficiente = dados.historicoInsuficiente

  return (
    <div className="shadow-neu-badge bg-background rounded-xl p-4 flex flex-col gap-3 h-full">
      {fixos.length > 0 || circulantes.length > 0 ? (
        <>
          {/* TÍTULO — fixo, não scrolla */}
          <div className="shrink-0">
            <p className="text-sm text-foreground font-medium">Recorrentes detectados</p>
            <p className="text-xs text-zinc-600 mt-0.5">baseado no histórico disponível</p>
          </div>

          {/* LISTA — scrolla */}
          <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
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
        </>
      ) : (
        <div className="flex flex-col gap-3 h-full">
          <div>
            <h1 className="text-sm text-foreground font-medium">Não recebemos nenhum dado</h1>
            {temSuficiente && (
              <p className="text-xs text-zinc-600 mt-0.5">
                é possível que isso tenha acontecido pois não temos meses o suficiente para detectar gastos fixos.
              </p>
            )}
          </div>
          <div className="flex items-center justify-center flex-1">
            <DataNotFoundIcon className="w-24 h-24 text-zinc-600 opacity-40" />
          </div>
        </div>
      )}
    </div>
  )
}
export default Recorrentes;