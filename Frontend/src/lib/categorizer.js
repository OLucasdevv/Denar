
import Fuse from "fuse.js"


export function normalizar(texto = "") {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ*]/g, "")

}

export const categorias = [
  {
    nome: "Alimentação",
    icone: "🍔",
    palavras: [
      "ifood", "uber eats", "rappi",
      "burg", "burger", "burger king", "mcdonalds", "bobs", "subway", "habibs", "ragazzo",
      "pizza", "pizza hut", "dominos",
      "dog", "hot dog", "lanche", "restaurante", "lanchonete", "hamburgueria",
      "padaria", "cafeteria", "cafe", "confeitaria",
      "coxinha", "salgado", "pastel", "tapioca", "bolo",
      "comper", "supervendas", "emporiomix", "fbsalgados",
      "mercear", "mercearia",
      "mercado", "supermercado", "atacado", "atacadao", "assai", "carrefour", "extra",
      "pao de acucar", "dia", "big",
      "hortifruti", "varejao", "oxxo", "ampm", "99 Food"
    ]
  },

  {
    nome: "Transporte",
    icone: "🚖",
    palavras: [
      "uber", "99", "taxi", "cabify",
      "onibus", "ônibus", "bus",
      "metrô", "metro",
      "bilhete unico", "vale transporte",
      "gasolina", "etanol", "diesel",
      "posto", "posto ipiranga", "ipiranga", "shell", "petrobras",
      "brb mobil", "cascol",
      "combustivel",
      "estacionamento", "parking",
      "pedagio", "sem parar",
      "oficina", "mecanica", "borracharia", "pneu",
      "passagem", "voo", "locadora"
    ]
  },

  {
    nome: "Moradia",
    icone: "🏡",
    palavras: [
      "aluguel", "condominio",
      "energia", "luz",
      "agua", "saneamento",
      "internet", "wifi",
      "telefone",
      "gas",
      "iptu",
      "reforma", "manutencao",
      "enel", "cpfl", "cemig",
      "sabesp", "caesb",
      "vivo", "claro", "tim", "oi"
    ]
  },

  {
    nome: "Entretenimento",
    icone: "🎮",
    palavras: [
      "netflix", "spotify", "youtube", "youtube premium",
      "prime video", "disney", "hbo", "max",
      "game", "games", "steam", "epic games",
      "playstation", "xbox", "nintendo",
      "cine", "cinema", "cinemark", "ingresso",
      "snooker", "bar", "show", "evento",
      "play games", "twitch"
    ]
  },

  {
    nome: "Saúde",
    icone: "💊",
    palavras: [
      "farmacia", "drogasil", "drogaraia", "pacheco",
      "hospital", "clinica", "consultorio",
      "laboratorio", "exame",
      "medico", "dentista",
      "psicologo", "terapia",
      "fisioterapia",
      "unimed", "bradesco saude"
    ]
  },

  {
    nome: "Educação",
    icone: "🎓",
    palavras: [
      "faculdade", "curso", "escola",
      "uniao educacional", "faciplac",
      "livro", "livraria", "apostila",
      "alura", "udemy", "senai", "senac",
      "mensalidade", "matricula",
      "curso online", "idioma", "ingles"
    ]
  },

  {
    nome: "Compras",
    icone: "🛍️",
    palavras: [
      "americanas", "jacky", "designcelular",
      "papelaria",
      "magalu", "casas bahia", "ponto frio",
      "amazon", "mercado livre", "shopee", "shein",
      "aliexpress",
      "renner", "riachuelo", "c&a",
      "perfumaria", "cosmeticos",
      "roupa", "calcado",
      "eletronicos", "acessorio",
      "loja", "marketplace"
    ]
  },

  {
    nome: "Pet",
    icone: "🐾",
    palavras: [
      "zoo pet", "petshop", "pet shop",
      "petz", "cobasi",
      "veterinario", "vet",
      "racao",
      "banho e tosa",
      "pet", "animal"
    ]
  },

  {
    nome: "Serviços",
    icone: "🛠️",
    palavras: [
      "barbearia", "cabeleireiro", "salao",
      "manicure",
      "lavanderia",
      "assistencia tecnica", "conserto",
      "chaveiro",
      "correios", "sedex",
      "cartorio",
      "frete", "entrega"
    ]
  },

  {
    nome: "Assinaturas e Digital",
    icone: "☁️",
    palavras: [
      "assinatura", "mensalidade",
      "recorrente",
      "chatgpt", "openai",
      "google", "google drive",
      "icloud", "onedrive",
      "office", "adobe",
      "canva", "notion",
      "hosting", "dominio"
    ]
  },

  {
    nome: "Viagem",
    icone: "✈️",
    palavras: [
      "hotel", "hostel", "airbnb",
      "booking", "decolar",
      "latam", "gol", "azul",
      "123 milhas",
      "passagem aerea",
      "aeroporto",
      "aluguel de carro",
      "pousada", "resort"
    ]
  },

  {
    nome: "Financeiro",
    icone: "🏦",
    palavras: [
      "tarifa", "juros", "multa",
      "pix", "boleto",
      "banco", "nubank", "itau", "bradesco", "santander",
      "inter", "c6",
      "mercado pago", "picpay",
      "pagseguro",
      "transferencia", "deposito",
      "fatura", "cartao"
    ]
  }
]

function transformarFuse(categorias) {
const transformador = categorias.flatMap(categoria => {
  return categoria.palavras.map(palavra => {
    return {palavra: palavra, categoria: categoria.nome, icone: categoria.icone}
  })

})
return transformador;
}
const listaFuse = transformarFuse(categorias)

const fuse = new Fuse(listaFuse, {
  keys: ["palavra"],
  threshold: 0.4
})

function matchFuzzy (descNormalizada) {
  const result = fuse.search(descNormalizada)

  if (result.length === 0) return null;

  return { nome: result[0].item.categoria, icone: result[0].item.icone }
}

function matchCategories(descNormalizada, categorias) {
  for (const categoria of categorias) {
    for (const palavra of categoria.palavras) {
      if (descNormalizada.includes(palavra)) {
        return {nome: categoria.nome, icone: categoria.icone}
      }
    }
  }
  return "Outro"
}

export function categorizarTransacao(t) {
  const desc = normalizar(t.description || "")
  
  const exato = matchCategories(desc, categorias)
  if (exato !== "Outro") return exato
  
  const fuzzy = matchFuzzy(desc)
  if (fuzzy) return fuzzy

  if (t.type === "Pix enviado" || t.type === "Pix recebido") return { nome: "Pessoas", icone: "👤" }
if (t.type === "Compra no débito") return { nome: "Estabelecimento", icone: "🏪" }

return { nome: "Outro", icone: "❓" }
}