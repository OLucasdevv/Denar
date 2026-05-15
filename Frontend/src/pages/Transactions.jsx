import TransactionMetrics from "@/components/layouts/TransactionMetrics";
import { parseCSV } from "@/lib/csvParser"
import { useState } from "react";

const handleUpload = async (e) => {
  const file = e.target.files[0]
  const transacoes = await parseCSV(file)
  console.log(transacoes)
}

const Transactions = () => {
  return (
<div className="flex-1 flex flex-col min-h-0 bg-background">
  {/* CONTAINER PRINCIPAL */}
    <div className="flex flex-col w-full overflow-y-auto min-h-0 ">
      <div className="flex-1 flex flex-col p-3 gap-5">
        <div className = "flex flex-col gap-1">
<h1 className="text-lg">Transações</h1>
<p className = "text-sm text-zinc-600 mt-0.5">Confira e gerencie todas as suas movimentações financeiras</p>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <TransactionMetrics />
      </div>

      </div>
    </div>
</div>
  )
};
export default Transactions;
