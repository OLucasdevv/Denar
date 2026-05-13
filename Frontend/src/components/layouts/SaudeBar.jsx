import { useFinancialHealth } from "@/hooks/useFinancialHealth"

const Barra = ({ label, valor, pct, cor }) => (
  <div className="flex items-center gap-3">
    <p className="text-xs text-zinc-500 w-36 shrink-0">{label}</p>
    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: cor }}
      />
    </div>
    <p className="text-xs font-medium w-24 text-right text-zinc-300">
      R$ {valor.toFixed(2).replace(".", ",")}
    </p>
    <p className="text-xs text-zinc-600 w-8 text-right">{pct}%</p>
  </div>
)

const SaudeBar = () => {
  const dados = useFinancialHealth()
  if (!dados) return null

  const { rendaReal, comprometidoFixo, gastoVariavel, circulante, saldoReal } = dados

  const pct = (valor) =>
    rendaReal > 0 ? Math.round((valor / rendaReal) * 100) : 0

  return (
    <div className="shadow-neu-badge rounded-xl p-5  flex flex-col gap-4 min-h-[280px]">
      <div>
        <h2 className="text-sm text-foreground ">Saúde financeira</h2>
        <p className="text-xs text-zinc-600 mt-0.5">proporção da renda real</p>
      </div>

      <div className="flex flex-col gap-3">
        <Barra label="Renda real" valor={rendaReal} pct={100} cor="#22c55e" />
        <Barra label="Comprometido fixo" valor={comprometidoFixo} pct={pct(comprometidoFixo)} cor="#f97316" />
        <Barra label="Gasto variável" valor={gastoVariavel} pct={pct(gastoVariavel)} cor="#ef4444" />
        {circulante > 0 && (
          <Barra label="Circulante" valor={circulante} pct={pct(circulante)} cor="#71717a" />
        )}
      </div>

      <div className="border-t border-zinc-800 pt-3 flex justify-between items-center">
        <p className="text-xs text-zinc-500">Saldo real</p>
        <p className={`text-sm font-space ${saldoReal >= 0 ? "text-green-500" : "text-red-500"}`}>
          {saldoReal < 0 ? "-" : ""}R$ {Math.abs(saldoReal).toFixed(2).replace(".", ",")}
        </p>
      </div>
    </div>
  )
}

export default SaudeBar