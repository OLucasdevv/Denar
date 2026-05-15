import Fuse from "fuse.js"

// ---------------- NORMALIZAÇÃO ----------------

export function normalizar(texto = "") {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// ---------------- DETECÇÃO DE PESSOA ----------------

const SOBRENOMES_BR = new Set([
  "silva", "santos", "oliveira", "souza", "sousa", "rodrigues", "ferreira",
  "alves", "pereira", "lima", "gomes", "ribeiro", "carvalho", "freitas",
  "araujo", "melo", "barbosa", "costa", "vieira", "cardoso", "nascimento",
  "campos", "martins", "castro", "monteiro", "rezende", "mendes", "moreira",
  "nunes", "borges", "machado", "correia", "medeiros", "moraes", "cavalcante",
  "dias", "fonseca", "teixeira", "azevedo", "cunha", "pinto", "rocha",
  "chaves", "lacerda", "lopes", "ramos", "pires", "andrade", "peixoto"
])

const SUFIXOS_NOME = new Set(["neto", "filho", "filha", "junior", "jr", "sobrinho"])
const PREPOSICOES = new Set(["da", "de", "do", "das", "dos", "e"])

function parecePessoa(descOriginal, tipo) {
  // tipo de transação já indica pessoa
  if (tipo === "Pix enviado" || tipo === "Pix recebido") {
    // confirma que não é uma empresa conhecida
    const desc = normalizar(descOriginal)
    const palavras = desc.split(" ").filter(p => p.length > 1)

    
    if (/\d/.test(desc)) return false

    // verifica se tem sobrenome brasileiro ou sufixo de nome
    const temSobrenome = palavras.some(p => SOBRENOMES_BR.has(p))
    const temSufixo = palavras.some(p => SUFIXOS_NOME.has(p))

    if (temSobrenome || temSufixo) return true

    // 3+ palavras sem números e sem indicadores de empresa
    const indicadoresEmpresa = ["ltda", "sa", "me", "eireli", "comercio", "servicos", "loja", "mercado", "posto"]
    const temEmpresa = palavras.some(p => indicadoresEmpresa.includes(p))
    if (!temEmpresa && palavras.length >= 3) return true
  }

  return false
}

// ---------------- CATEGORIAS ----------------

export const categorias = [
  {
    nome: "Alimentação",
    icone: "🍔",
    palavras: [
      "ifood", "ubereats", "rappi", "99food",
      "burger king", "mcdonalds", "bobs", "subway", "habibs", "ragazzo",
      "pizza hut", "dominos",
      "padaria", "cafeteria", "confeitaria", "lanchonete", "hamburgueria",
      "restaurante", "bistrô", "bistro",
      "supermercado", "atacadao", "assai", "carrefour", "extra",
      "pao de acucar", "hortifruti", "emporiomix",
      "comper", "supervendas", "mercearia", "varejao",
      "oxxo", "ampm", "coxinha", "lanches", "lanche", "alimentacao", "alimentacao", "alimento", "comida", 
    ]
  },
  {
    nome: "Transporte",
    icone: "🚖",
    palavras: [
      "uber", "99taxi", "cabify", "taxi",
      "metro", "bilhete unico", "vale transporte",
      "sem parar", "pedagio",
      "posto shell", "posto ipiranga", "cascol", "brb mobil",
      "gasolina", "combustivel", "etanol",
      "estacionamento", "parking",
      "oficina", "mecanica", "borracharia",
      "locadora", "passagem aerea"
    ]
  },
  {
    nome: "Moradia",
    icone: "🏡",
    palavras: [
      "aluguel", "condominio", "iptu",
      
      "neoenergia", "enel", "cpfl", "cemig", "copel",
      "energisa", "celg", "light", "coelba", "celpe",
      "cosern", "celesc", "elektro", "eletropaulo",
      "energia eletrica", "conta de luz",
      "caesb", "sabesp", "saneamento", "embasa", "cagece",
      "copasa", "cedae", "agua",
      "comgas", "gas natural", "gas encanado",
      "manutencao", "reforma"
    ]
  },
  {
    nome: "Telefonia",
    icone: "📱",
    palavras: [
      "tim", "vivo", "claro", "oi", "nextel",
      "plano celular", "recarga", "tim sa", "vivo sa",
      "claro movel", "tim fibra"
    ]
  },
  {
    nome: "Entretenimento",
    icone: "🎮",
    palavras: [
      "netflix", "spotify", "youtube premium",
      "prime video", "disney plus", "hbo max", "paramount",
      "steam", "epic games", "playstation", "xbox", "nintendo",
      "cinemark", "kinoplex", "ingresso",
      "twitch", "crunchyroll", "games", "flix", "sony", "play", "start", "streaming"
    ]
  },
  {
    nome: "Saúde",
    icone: "💊",
    palavras: [
      "farmacia", "drogasil", "drogaraia", "pacheco", "ultrafarma",
      "hospital", "clinica", "laboratorio",
      "medico", "dentista", "psicologo", "fisioterapeuta",
      "unimed", "bradesco saude", "amil", "sulamerica saude",
      "plano de saude", "convenio"
    ]
  },
  {
    nome: "Educação",
    icone: "🎓",
    palavras: [
      "faculdade", "universidade", "escola", "colegio",
      "uniao educacional", "faciplac", "udf", "iesb", "upis",
      "curso", "alura", "udemy", "coursera",
      "livraria", "saraiva", "cultura",
      "senai", "senac", "sebrae"
    ]
  },
  {
    nome: "Compras",
    icone: "🛍️",
    palavras: [
      "amazon", "mercado livre", "shopee", "shein", "aliexpress",
      "americanas", "magalu", "casas bahia", "ponto frio",
      "renner", "riachuelo", "cea", "zara",
      "kabum", "terabyte", "pichau",
      "papelaria", "perfumaria"
    ]
  },
  {
    nome: "Academia / Esporte",
    icone: "🏋️",
    palavras: [
      "academia", "smart fit", "bluefit", "bodytech",
      "acamia", "fit", "crossfit", "pilates", "yoga",
      "natacao", "futebol", "quadra",
      "decathlon", "netshoes", "centauro"
    ]
  },
  {
    nome: "Pet",
    icone: "🐾",
    palavras: [
      "petshop", "petz", "cobasi", "pet",
      "veterinario", "racao", "banho e tosa"
    ]
  },
  {
    nome: "Serviços",
    icone: "🛠️",
    palavras: [
      "barbearia", "cabeleireiro", "salao", "manicure",
      "lavanderia", "assistencia tecnica",
      "correios", "sedex", "jadlog",
      "cartorio", "despachante",
      "seguro", "seguros"
    ]
  },
  {
    nome: "Assinaturas",
    icone: "☁️",
    palavras: [
      "chatgpt", "openai", "google one", "icloud",
      "office 365", "adobe", "canva", "notion",
      "hosting", "registro br", "godaddy",
      "onedrive", "dropbox"
    ]
  },
  {
    nome: "Financeiro",
    icone: "🏦",
    palavras: [
      "tarifa bancaria", "tarifa servico",
      "juros", "iof", "multa",
      "nubank", "inter", "c6 bank", "itau", "bradesco", "santander",
      "mercado pago", "picpay", "pagseguro",
      "seguro vida", "previdencia"
    ]
  },
  {
    nome: "Viagem",
    icone: "✈️",
    palavras: [
      "hotel", "hostel", "airbnb", "booking",
      "decolar", "latam", "gol", "azul",
      "aeroporto", "pousada", "resort",
      "aluguel de carro", "localiza", "movida"
    ]
  }
]

// ---------------- MATCHING ----------------

// Match com word boundary — 
function matchExato(descNorm) {
  for (const categoria of categorias) {
    for (const palavra of categoria.palavras) {
      const palavraNorm = normalizar(palavra)

      let regex
      if (palavraNorm.includes(" ")) {
        
        regex = new RegExp(palavraNorm.replace(/\s+/g, "\\s+"))
      } else if (palavraNorm.length <= 4) {
        
        regex = new RegExp(`\\b${palavraNorm}\\b`)
      } else {
        
        regex = new RegExp(palavraNorm)
      }

      if (regex.test(descNorm)) {
        return { nome: categoria.nome, icone: categoria.icone }
      }
    }
  }
  return null
}


const listaFuse = categorias.flatMap(cat =>
  cat.palavras.map(palavra => ({
    palavra: normalizar(palavra),
    categoria: cat.nome,
    icone: cat.icone
  }))
)

const fuse = new Fuse(listaFuse, {
  keys: ["palavra"],
  threshold: 0.2,       
  minMatchCharLength: 4 
})

function matchFuzzy(descNorm) {

  const palavras = descNorm.split(" ").filter(p => p.length >= 4)

  for (const palavra of palavras) {
    const result = fuse.search(palavra)
    if (result.length > 0 && result[0].score < 0.15) {
      return { nome: result[0].item.categoria, icone: result[0].item.icone }
    }
  }
  return null
}

// ---------------- PRINCIPAL ----------------

export function categorizarTransacao(t) {
  const descOriginal = t.description || ""
  const descNorm = normalizar(descOriginal)
  const tipo = t.type || ""


  const exato = matchExato(descNorm)
  if (exato) return exato

  // 2. Fuzzy
  const fuzzy = matchFuzzy(descNorm)
  if (fuzzy) return fuzzy

 
  if (parecePessoa(descOriginal, tipo)) {
    return { nome: "Pessoas", icone: "👤" }
  }

  // 4. Fallbacks por tipo — Pix sem categoria e sem nome de pessoa
  //    NÃO assume Pessoas automaticamente
  if (tipo === "Compra no débito" || tipo === "Compra no crédito") {
    return { nome: "Estabelecimento", icone: "🏪" }
  }

  if (tipo === "Pix enviado") return { nome: "Outro", icone: "❓" }
  if (tipo === "Pix recebido") return { nome: "Outro", icone: "❓" }

  return { nome: "Outro", icone: "❓" }
}