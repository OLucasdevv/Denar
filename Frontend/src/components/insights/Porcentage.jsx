
export function Variacao({ atual, passado, tipo, showSuffix = true }) {
  
  if (!passado || passado < 10) {
    return <p className="text-zinc-500">Sem dados anteriores</p>
  }

  const variacao = ((atual - passado) / passado) * 100

  const positiva = tipo === "gasto"
    ? variacao < 0
    : variacao > 0

  return (
    <p className={positiva ? "text-green" : "text-red"}>
      {variacao > 0 ? '+' : ''}{variacao.toFixed(1)}%
      {showSuffix && " vs mês passado"}
    </p>
  )
}