export function formatDateShort (date) {
    const month = ["", "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    const array = date.split("-")
    const dia = array[2]
    const mes = month[parseInt(array[1])]
    const resultado = [dia, mes].join(" ")
    return resultado;
}

export function formatCurrency (amount) {
    const format = (amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return format;
}