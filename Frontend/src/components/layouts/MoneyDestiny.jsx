import { useFinancialHealth } from "@/hooks/useFinancialHealth"

const CORES = ["#3b82f6", "#ef4444", "#f97316", "#71717a", "#22c55e", "#a855f7"]

const LinhaDestino = ({ nome, valor, pct, cor }) => (
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cor }} />
    <p className="text-xs text-zinc-400 w-40 shrink-0 capitalize truncate">{nome}</p>
    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: cor }}
      />
    </div>
    <p className="text-xs font-medium w-24 text-right text-zinc-300">
      R$ {valor.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    </p>
    <p className="text-xs text-zinc-600 w-8 text-right">{pct}%</p>
  </div>
)

const MoneyDestiny = () => {
  const dados = useFinancialHealth()
  if (!dados) return null

  const destino = dados.destinoDoDinheiro.slice(0, 6)
  const totalGasto = destino.reduce((acc, item) => acc + item.valor, 0)

  return (
    <div className="shadow-neu-badge rounded-xl p-5 flex flex-col gap-4 min-h-[280px]">
      <div>
        <h2 className="text-sm text-foreground">Destino do dinheiro</h2>
        <p className="text-xs text-zinc-600 mt-0.5">
          de R$ {dados.rendaReal.toFixed(2).replace(".", ",")} de renda real
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {destino.map((item, index) => (
          <LinhaDestino
            key={item.nome}
            nome={item.nome}
            valor={item.valor}
            pct={item.pct}
            cor={CORES[index % CORES.length]}
          />
        ))}
      </div>

      {totalGasto > dados.rendaReal && (
        <div className="border-t border-zinc-800 pt-3 flex justify-between items-center">
          <p className="text-xs text-zinc-500">já ultrapassou a renda em</p>
          <p className="text-xs font-medium text-red-500">
            R$ {(totalGasto - dados.rendaReal).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </p>
        </div>
      )}
    </div>
  )
}

export default MoneyDestiny