import { useFinancialHealth } from "@/hooks/useFinancialHealth"

const HealthMetrics = () => {
  const dados = useFinancialHealth()

  if (!dados) return null

  return (
    <>
      <div className=" shadow-neu-badge bg-background rounded-xl min-h-[120px] p-4   ">
        <p className="text-sm text-foreground mb-2 ">Renda real</p>
        <p className="text-2xl font-space  text-green">
          R$ {dados.rendaReal.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-xs text-zinc-600 mt-1">entrada − circulante</p>
      </div>

      <div className="shadow-neu-badge bg-background rounded-xl p-4 ">
        <p className="text-sm text-foreground mb-2">Comprometido fixo</p>
        <p className="text-2xl font-space text-primary">
          R$ {dados.comprometidoFixo.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-xs text-zinc-600 mt-1">recorrentes detectados</p>
      </div>

      <div className="shadow-neu-badge bg-background rounded-xl p-4 ">
        <p className="text-sm text-foreground mb-2">Gasto variável</p>
        <p className="text-2xl font-space text-red">
          R$ {dados.gastoVariavel.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-xs text-zinc-600 mt-1">excluindo fixos</p>
      </div>

      <div className="shadow-neu-badge bg-background rounded-xl p-4 ">
  <p className="text-sm text-foreground mb-2">Saldo real </p>
  <p className={`text-2xl font-space ${dados.saldoReal >= 0 ? "text-green" : "text-red"}`}>
    {dados.saldoReal < 0 ? "-" : ""}R$ {Math.abs(dados.saldoReal).toFixed(2).replace(".", ",")}
  </p>
  <p className="text-xs text-zinc-600 mt-1">renda − fixo − variável</p>
</div>
    </>
  )
}

export default HealthMetrics