export const parseDate = (dateString) => {
  const [ano, mes, dia] = dateString.split("-").map(Number)
  return { ano, mes, dia, date: new Date(ano, mes - 1, dia) }
}

export const getDateContext = (transacoes) => {
  if (!transacoes || transacoes.length === 0) return null

  let dataMaisRecente = parseDate(transacoes[0].date).date

  transacoes.forEach(t => {
    const { date } = parseDate(t.date)
    if (date > dataMaisRecente) {
      dataMaisRecente = date
    }
  })

  const mesBase = dataMaisRecente.getMonth()
  const anoBase = dataMaisRecente.getFullYear()
  const diaLimite = dataMaisRecente.getDate()

  let mesAnterior, anoAnterior

  if (mesBase !== 0) {
    mesAnterior = mesBase - 1
    anoAnterior = anoBase
  } else {
    mesAnterior = 11
    anoAnterior = anoBase - 1
  }

  return {
    mesBase,
    anoBase,
    diaLimite,
    mesAnterior,
    anoAnterior
  }
}

export const isSameMonth = (ano, mes, mesBase, anoBase) => {
  return mes - 1 === mesBase && ano === anoBase
}