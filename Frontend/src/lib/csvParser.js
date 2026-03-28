export function detectBank(linhas) {
  const header = linhas.find(linha => 
    linha.includes("Data Lan") || 
    linha.includes("date,title")
  )
  
  if (header?.includes("Data Lan")) return "inter"
  if (header?.includes("date,title")) return "nubank"
  return "unknown"
}

export function readCSV(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target.result
      const linhas = text.split("\n").map(linha => linha.trim()).map(linha => decodeURIComponent(escape(linha)))
      resolve(linhas)
    }

    reader.readAsText(file, "ISO-8859-1")
  })
}
   export function parseInter(linhas) {
  const headerIndex = linhas.findIndex(linha => linha.includes("Data Lançamento"))
  const transacoes = linhas.slice(headerIndex + 1)

  return transacoes
    .filter(linha => linha.length > 0)
    .map(linha => {
      const campos = linha.split(";")
      return {
        date: campos[0].split("/").reverse().join("-"),
        type: campos[1]?.trim(),
        description: campos[2]?.trim(),
        amount: parseFloat(campos[3]?.replace(",", ".")),
        balance: parseFloat(campos[4]?.replace(",", "."))
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
    