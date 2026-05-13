import { parseCSV } from "@/lib/csvParser"
import { useState } from "react";

const handleUpload = async (e) => {
  const file = e.target.files[0]
  const transacoes = await parseCSV(file)
  console.log(transacoes)
}

const Transactions = () => {
  return (
    <div className="p-6">
      <h1 className="text-foreground text-xl font-semibold">Transações</h1>
      <p className="text-zinc-500 mt-2">Arraste ou importe arquivos CSV aqui.</p>
    </div>
  )
};
export default Transactions;
