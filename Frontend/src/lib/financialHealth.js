import { parseDate, getDateContext, isSameMonth } from "./dateUtils"

// ---------------- UTIL ----------------

function extrairEntidade(desc = "") {
  return desc
    .toLowerCase()
    .replace(/pix|transferencia|transferência|enviado|recebido|para|de/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function getMesAno(dateStr) {
  const { ano, mes } = parseDate(dateStr)
  return `${ano}-${mes}`
}

// ---------------- AGRUPAMENTO ----------------

function agruparPorEntidade(transacoes) {
  const mapa = {}

  transacoes.forEach(t => {
    const nome = extrairEntidade(t.description)

    if (!mapa[nome]) mapa[nome] = []
    mapa[nome].push(t)
  })

  return mapa
}

// ---------------- CIRCULANTES ----------------

function detectarCirculantes(mapa) {
  const resultado = []

  for (let nome in mapa) {
    let entrou = 0
    let saiu = 0

    mapa[nome].forEach(t => {
      if (t.amount > 0) entrou += t.amount
      else saiu += Math.abs(t.amount)
    })

    if (entrou <= 10 || saiu <= 10) continue

    const menor = Math.min(entrou, saiu)
    const maior = Math.max(entrou, saiu)
    const proporcao = menor / maior

    if (proporcao < 0.2) continue

    resultado.push({ nome, entrou, saiu, liquido: entrou - saiu })
  }

  return resultado
}

// ---------------- FIXOS ----------------

function detectarFixos(mapa) {
  const fixos = []

  for (let nome in mapa) {
    const porMes = {}

    mapa[nome].forEach(t => {
      if (t.amount >= 0) return

      const key = getMesAno(t.date)

      if (!porMes[key]) porMes[key] = []
      porMes[key].push(Math.abs(t.amount))
    })

    const valores = Object.values(porMes).map(v =>
      v.reduce((a, b) => a + b, 0)
    )

    if (valores.length < 2) continue

    const media = valores.reduce((a, b) => a + b, 0) / valores.length

    const consistente = valores.every(v =>
      Math.abs(v - media) / media <= 0.1
    )

    if (nome.includes("votorantim") || nome.includes("seguro")) {
      console.log(`FIXO CHECK [${nome}]`, { valores, media, consistente })
    }

    if (consistente) {
      fixos.push({
        nome,
        valor: Math.round(media),
        frequencia: valores.length
      })
    }
  }

  return fixos
}

// ---------------- CLASSIFICAÇÃO ----------------

function isResgate(t) {
  const hist = `${t.historico || ""} ${t.type || ""}`.toLowerCase()
  const desc = (t.description || "").toLowerCase()

  return (
    hist.includes("resgate") ||
    hist.includes("aplicacao") ||
    hist.includes("aplicação") ||
    desc.includes("cdb") ||
    desc.includes("invest") ||
    desc.includes("renda fixa")
  )
}

function classificar(transacoes, fixos, circulantes) {
  const nomesFixos = new Set(fixos.map(f => f.nome))
  const nomesCirc = new Set(circulantes.map(c => c.nome))

  return transacoes.map(t => {
    const nome = extrairEntidade(t.description)

    if (nomesCirc.has(nome)) return { ...t, fluxo: "circulante" }
    if (t.amount > 0 && isResgate(t)) return { ...t, fluxo: "resgate" }
    if (nomesFixos.has(nome) && t.amount < 0) return { ...t, fluxo: "fixo" }
    if (t.amount < 0) return { ...t, fluxo: "variavel" }

    return { ...t, fluxo: "renda" }
  })
}

// ---------------- MÉTRICAS ----------------

function calcularMetricas(transacoes, ctx) {
  const { mesBase, anoBase } = ctx

  let renda = 0
  let fixo = 0
  let variavel = 0
  let circulante = 0
  let resgate = 0

  transacoes.forEach(t => {
    const { ano, mes } = parseDate(t.date)
    if (!isSameMonth(ano, mes, mesBase, anoBase)) return

    if (t.fluxo === "renda") renda += t.amount
    if (t.fluxo === "fixo") fixo += Math.abs(t.amount)
    if (t.fluxo === "variavel") variavel += Math.abs(t.amount)
    if (t.fluxo === "circulante" && t.amount < 0) circulante += Math.abs(t.amount)
    if (t.fluxo === "resgate") resgate += t.amount
  })

  const saldoDoMes = renda - fixo - variavel

  return {
    rendaReal: renda,
    comprometidoFixo: fixo,
    gastoVariavel: variavel,
    circulante,
    resgate,
    saldoDoMes,
    saldoReal: saldoDoMes
  }
}

// ---------------- DESTINO ----------------

function calcularDestino(transacoes, ctx) {
  const { mesBase, anoBase } = ctx
  const mapa = {}

  transacoes.forEach(t => {
    const { ano, mes } = parseDate(t.date)

    if (!isSameMonth(ano, mes, mesBase, anoBase)) return
    if (t.amount >= 0) return
    if (t.fluxo === "circulante") return

    const nome = extrairEntidade(t.description)
    if (!mapa[nome]) mapa[nome] = 0
    mapa[nome] += Math.abs(t.amount)
  })

  const total = Object.values(mapa).reduce((a, b) => a + b, 0)

  return Object.entries(mapa)
    .map(([nome, valor]) => ({
      nome,
      valor: Number(valor.toFixed(2)),
      pct: total ? Math.round((valor / total) * 100) : 0
    }))
    .sort((a, b) => b.valor - a.valor)
}

// ---------------- SCORE ----------------

function calcularScore(metricas, meses) {
  let score = 100

  const pctFixo = metricas.comprometidoFixo / (metricas.rendaReal || 1)

  if (pctFixo > 0.8) score -= 30
  else if (pctFixo > 0.5) score -= 15

  if (metricas.saldoReal < 0) score -= 25

  if (meses < 3) score = Math.min(score, 60)

  return Math.max(score, 0)
}

// ---------------- MAIN ----------------

export function classificarFluxo(transacoes) {
  const mapa = agruparPorEntidade(transacoes)

  const ctx = getDateContext(transacoes)
  if (!ctx) return null

  const circulantes = detectarCirculantes(mapa)
  const fixos = detectarFixos(mapa)

  const classificadas = classificar(transacoes, fixos, circulantes)

  const metricas = calcularMetricas(classificadas, ctx)
  // soma média mensal dos fixos detectados
const somaFixosDetectados = fixos.reduce((s, f) => s + (f.valor || 0), 0)
// evitar mostrar 0 se já conhecemos fixos históricos
metricas.comprometidoFixo = Math.max(metricas.comprometidoFixo, somaFixosDetectados)
  const destino = calcularDestino(classificadas, ctx)
  const meses = new Set(transacoes.map(t => getMesAno(t.date))).size
  const score = calcularScore(metricas, meses)

  return {
    ...metricas,
    fixosDetectados: fixos,
    circulantesDetectados: circulantes,
    destinoDoDinheiro: destino,
    score,
    mesesDisponiveis: meses,
    historicoInsuficiente: meses < 3
  }
}