import { parseDate, getDateContext, isSameMonth } from "./dateUtils"

const getPace = (transacoes, filtro) => {
  if (!transacoes || transacoes.length === 0) return []

  const ctx = getDateContext(transacoes)
  if (!ctx) return []

  const { mesBase, anoBase, mesAnterior, anoAnterior, diaLimite } = ctx

  const mesAtual = {}
  const mesPassado = {}

  transacoes.forEach(t => {
    const { ano, mes, dia } = parseDate(t.date)

    if (dia > diaLimite) return
    if (!filtro(t)) return

    if (isSameMonth(ano, mes, mesBase, anoBase)) {
      mesAtual[dia] = (mesAtual[dia] || 0) + Math.abs(t.amount)
    } else if (isSameMonth(ano, mes, mesAnterior, anoAnterior)) {
      mesPassado[dia] = (mesPassado[dia] || 0) + Math.abs(t.amount)
    }
  })

  let somaAtual = 0
  let somaPassado = 0
  const resultado = []

  for (let i = 1; i <= diaLimite; i++) {
    somaAtual += mesAtual[i] || 0
    somaPassado += mesPassado[i] || 0

    resultado.push({
      dia: i,
      atual: Number(somaAtual.toFixed(2)),
      passado: Number(somaPassado.toFixed(2)),
    })
  }

  return resultado
}
const isResgate = (t) => {
  const hist = (t.historico || t.type || "").toLowerCase()
  const desc = (t.description || "").toLowerCase()
  return hist === "resgate" || desc.includes("cdb")
}

export const getSpendingPace = (transacoes) =>
  getPace(transacoes, t => t.amount < 0)

export const getIncomePace = (transacoes) =>
  getPace(transacoes, t => t.amount > 0 && !isResgate(t))

export const getMaxExpanse = (transacoes) => {
  if (!transacoes || transacoes.length === 0) return null

  const ctx = getDateContext(transacoes)
  if (!ctx) return null

  const { mesBase, anoBase } = ctx

  let maior = null

  transacoes.forEach(t => {
    const { ano, mes } = parseDate(t.date)

    if (!isSameMonth(ano, mes, mesBase, anoBase)) return
    if (t.amount >= 0) return

    if (!maior || Math.abs(t.amount) > Math.abs(maior.amount)) {
      maior = t
    }
  })

  return maior
}

export const getMostExpensiveDay = (transacoes) => {
  if (!transacoes || transacoes.length === 0) return null

  const ctx = getDateContext(transacoes)
  if (!ctx) return null

  const { mesBase, anoBase, diaLimite } = ctx

  const gastosPorDia = {}
  const datasFormatadas = {}

  transacoes.forEach(t => {
    const { ano, mes, dia } = parseDate(t.date)

    if (dia > diaLimite) return
    if (t.amount >= 0) return
    if (!isSameMonth(ano, mes, mesBase, anoBase)) return

    gastosPorDia[dia] = (gastosPorDia[dia] || 0) + Math.abs(t.amount)

    if (!datasFormatadas[dia]) {
      datasFormatadas[dia] = t.dateFormatted
    }
  })

  let diaMaisCaro = null
  let maiorValor = 0

  for (let dia in gastosPorDia) {
    if (gastosPorDia[dia] > maiorValor) {
      maiorValor = gastosPorDia[dia]
      diaMaisCaro = Number(dia)
    }
  }

  if (diaMaisCaro === null) return null

  return {
    dia: diaMaisCaro,
    valor: maiorValor,
    dataFormatada: datasFormatadas[diaMaisCaro]
  }
}