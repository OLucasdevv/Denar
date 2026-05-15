import React from 'react'
import { useState } from 'react';
import { parseCSV } from '@/lib/csvParser';
import { Upload } from 'lucide-react';
import { useFinance } from '@/contexts/FinanceContext';


export default function CsvUploadButton({
  disableWhenHasData = false
}) {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { transacoes, setTransacoes } = useFinance()

  const [dadosTemporarios, setDadosTemporarios] = useState([])

  const hasData = transacoes && transacoes.length > 0

  const isDisabled =
    loading || (disableWhenHasData && hasData)

  const handleUpload = async (e) => {
    const file = e.target.files[0]

    if (!file) return

    setLoading(true)

    try {
      const data = await parseCSV(file)

      setDadosTemporarios(data)

      setShowModal(true)
    } catch (err) {
      console.error("Erro ao ler CSV", err)
    } finally {
      setLoading(false)
      e.target.value = ""
    }
  }

  const handleConfirmar = () => {
    setTransacoes(dadosTemporarios)

    setShowModal(false)

    setDadosTemporarios([])
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        id="file-upload"
        className="hidden"
        disabled={isDisabled}
      />

      <label
        htmlFor="file-upload"
        className={`
          flex items-center gap-2 px-6 py-3 text-white rounded-xl border transition-all shadow-lg
          ${
            isDisabled
              ? "bg-zinc-800 border-zinc-700 opacity-50 cursor-not-allowed shadow-none"
              : "bg-zinc-900 border-zinc-700 cursor-pointer hover:bg-zinc-800 active:scale-95"
          }
        `}
      >
        {loading ? (
          <p className="animate-pulse">
            Processando dados...
          </p>
        ) : (
          <>
            <Upload
              size={20}
              className="text-primary"
            />

            <span className="font-medium">
              {hasData && disableWhenHasData
                ? "CSV Já Importado"
                : "Importar CSV"}
            </span>
          </>
        )}
      </label>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Dados Importados!
            </h2>

            <p className="text-zinc-400 mb-6">
              Encontramos{" "}
              {dadosTemporarios.length} transações
              no seu arquivo.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  setDadosTemporarios([])
                }}
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-primary/90 hover:bg-primary/80 text-black rounded-lg font-medium transition-all"
                onClick={() => {
                  setShowModal(false)

                  handleConfirmar()
                }}
              >
                Confirmar Importação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
