import { categorizarTransacao } from "./categorizer"
import { formatDateShort } from "./formatters"

export function detectBank(linhas) {
  const header = linhas.find(linha =>
    linha.includes("Data Lan") ||
    linha.includes("date,title") ||
    linha.toLowerCase().includes("data,valor") 
  )

  if (header?.includes("Data Lan")) return "inter"
  if (header?.includes("date,title") || header?.toLowerCase().includes("data,valor")) return "nubank"
  return "unknown"
}
export function readCSV(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target.result
      const linhas = text.split("\n").map(linha => linha.trim())

      // Detecta se o resultado parece corrompido (sinal de encoding errado)
      const temLixo = linhas.some(l => l.includes("â€") || l.includes("Ã"))
      if (temLixo) {
        // Relê como ISO-8859-1
        const reader2 = new FileReader()
        reader2.onload = (e2) => {
          const text2 = e2.target.result
          resolve(text2.split("\n").map(l => l.trim()))
        }
        reader2.readAsText(file, "ISO-8859-1")
        return
      }

      resolve(linhas)
    }

    reader.readAsText(file, "UTF-8")
  })
}
   export function parseInter(linhas) {
  const headerIndex = linhas.findIndex(linha => linha.includes("Data Lançamento"))
  const transacoes = linhas.slice(headerIndex + 1)

  return transacoes
    .filter(linha => linha.length > 0)
    .map(linha => {
      const campos = linha.split(";")
      const isoDate = campos[0].split("/").reverse().join("-");
      const transacao = {
    type: campos[1]?.trim(),
    description: campos[2]?.trim()
  }
      return {
        date: isoDate,
        dateFormatted: formatDateShort(isoDate),
        type: campos[1]?.trim(),
        description: campos[2]?.trim(),
        amount: parseFloat(
  campos[3]?.replace(/\./g, "").replace(",", ".")
),
        balance: parseFloat(campos[4]?.replace(",", ".")),
        categoria: categorizarTransacao({ 
    type: campos[1]?.trim(), 
    description: campos[2]?.trim() 
  })
      }
    })
}
export function parseNubank(linhas) {
  const headerIndex = linhas.findIndex(linha => {
    const lower = linha.toLowerCase()

    return (
      lower.includes("date,title") ||
      lower.includes("data,valor") ||
      lower.includes("date,amount") ||
      lower.includes("data;valor")
    )
  })

  const transacoes = linhas.slice(headerIndex + 1)

  return transacoes
    .filter(linha => linha.length > 0)
    .map(linha => {
      const delimiter = linha.includes(";") ? ";" : ","

      const campos = linha.split(delimiter)

      let date = ""
      let description = ""
      let amount = 0

      if (delimiter === "," && campos.length >= 4) {
  date = campos[0]?.trim()
  amount = parseFloat(campos[1]?.trim())  
  description = campos.slice(3).join(",").trim()
}
else if (delimiter === "," && campos.length >= 3) {
  date = campos[0]?.trim()
  description = campos[1]?.trim()
  amount = parseFloat(campos[2]?.trim())  
}
else if (delimiter === ";" && campos.length >= 3) {
  date = campos[0]?.trim()
  description = campos[1]?.trim()
  amount = parseFloat(campos[2]?.trim())  
}

      const isoDate = date.includes("/")
        ? date.split("/").reverse().join("-")
        : date

      const transacao = {
        type: amount > 0 ? "Entrada" : "Saída",
        description
      }

      return {
        date: isoDate,

        dateFormatted: formatDateShort(isoDate),

        type: transacao.type,

        description,

        amount,

        balance: null,

        categoria: categorizarTransacao({
          type: transacao.type,
          description
        })
      }
    })
}

 export async function parseCSV(file) {
  const linhas = await readCSV(file)
  const banco = detectBank(linhas)
  
  if (banco === "inter") return parseInter(linhas)
  if (banco === "nubank") return parseNubank(linhas)
  
  throw new Error("Banco não reconhecido")
}
    