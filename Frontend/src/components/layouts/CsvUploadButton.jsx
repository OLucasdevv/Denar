import React from 'react'
import { useState } from 'react';
import { parseCSV } from '@/lib/csvParser';
import { Upload } from 'lucide-react';

export default function CsvUploadButton() {
    const [loading, setLoading] = useState (false);
    const [showModal, setShowModal] = useState (false);
    const [transacoes, setTransacoes] = useState ([]);



    const handleUpload = async (e) => {
      const file = e.target.files[0]
      setLoading(true);
    
      try {
        const data = await parseCSV(file);
        setTransacoes(data);
        setShowModal(true);
      } catch (err) {
          console.error("Erro ao ler CSV", err);
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className = "flex flex-col items-center gap-4 ">
                    <input
                   type="file"
                   accept=".csv"
                   onChange={handleUpload}
                   id="file-upload"
                   className="hidden"
                   disabled = {
                    loading
                   }
                    />
                    <label 
        htmlFor="file-upload" 
        className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl border border-zinc-700 cursor-pointer hover:bg-zinc-800 transition-all active:scale-95 shadow-lg"
      >
        {loading && <p className="animate-pulse">Processando dados...</p>}
        {!loading && (
          <>
        <Upload size={20} className="text-primary" />
        <span className="font-medium">Importar CSV</span>
        </>
        )}
        
      </label>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Dados Importados!</h2>
            <p className="text-zinc-400 mb-6">
              Encontramos {transacoes.length} transações no seu arquivo.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-primary/90 hover:bg-primary/80 text-black rounded-lg font-medium transition-all"
                onClick={() => setShowModal(!showModal)
                }
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
