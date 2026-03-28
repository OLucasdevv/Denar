import React, { useState, useRef, useEffect } from 'react'
import {CircleX} from 'lucide-react'
import ThemeToggle from './ThemeToggle';
import CsvUploadButton from './CsvUploadButton';

export default function ConfigModal({ isOpen, setIsOpen }) {
    const [activeTab, setActiveTab] = useState('geral');

    const modalRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    // Se a ref existe E o que foi clicado (event.target) NÃO está dentro da ref
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Ativa o ouvinte quando o modal abre
  document.addEventListener("mousedown", handleClickOutside);
  
  // Limpa o ouvinte quando o modal fecha (importante para performance!)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [setIsOpen]);


    
  return (

<div className = "flex flex-col fixed inset-0 bg-black/50 backdrop-blur-sm z-[999999] items-center ">
        <div className = "w-full flex ">
            <button onClick={() => setIsOpen(!isOpen)} className = " py-2 px-2 flex items-center w-full justify-end ">
                <CircleX size={27} />
            </button>
        </div>
        <div className = "flex gap-4 bg-background h-[600px] w-[600px] rounded-lg mt-20 p-4"ref={modalRef}>
        <div className = "flex flex-col w-40">
           
            <h1 className = "font-semibold mb-10">
                Configurações
            </h1>
            <div className = "flex flex-col gap-5">
                <button 
                    className={`w-full py-2 rounded-lg transition-colors text-foreground ${
                        activeTab === 'geral' ? 'bg-sidebar-hover ' : 'hover:bg-sidebar-hover text-foreground'
                    }`}
                    onClick={() => setActiveTab('geral')}
                    
                    disabled={activeTab === 'geral'}
                    >
                    Geral
                </button>
                <button
                    className={`w-full py-2 rounded-lg transition-colors text-foreground ${
                        activeTab === 'conta' ? 'bg-sidebar-hover ' : 'hover:bg-sidebar-hover text-foreground'
                    }`}
                    onClick={() => setActiveTab('conta')}
                    
                    disabled={activeTab === 'conta'}
                    >
                    Conta
                 </button>
            </div>
            

        </div>
        <div className="h-full w-px bg-zinc-700" />
        <div className="w-full">
  {activeTab === 'geral' && (
    <div className = "flex flex-col items-center justify-center gap-5">
        <h1 className = "font-semibold self-start">Geral</h1>

        <div className = "w-full bg-sidebar h-32 rounded-lg border-zinc-500 p-4  gap-5 flex flex-col">
            <h1 className = "text-sm font-semibold tracking-wide">
                Aparência
            </h1>
            <ThemeToggle />
        </div>
        <div className = "w-full bg-sidebar h-32 rounded-lg border-zinc-500 p-4  gap-5 flex flex-col">
          <div className = "group relative flex gap-3 items-center">
            <h1 className = "text-sm font-semibold tracking-wide">
                Importar novo CSV 
            </h1>
            <button  className={`w-[34px] h-[34px] flex items-center justify-center rounded-lg text-[#9090a8] hover:bg-sidebar-hover hover:text-[#e0e0ef] transition-colors  ${
                    isOpen ? 'bg-sidebar-hover' : ''
                  }`}>
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="absolute bottom-full mb-2 scale-0 transition-all rounded bg-zinc-900 p-2 text-xs text-white group-hover:scale-100">
    Caso tenha um arquivo CSV atualizado, você pode subir ele aqui.
  </span>
        </button>
          </div>
            <CsvUploadButton />
            
        </div>

        
    </div>
    
  )}
  {activeTab === 'conta' && (
    <h1>Configurações da Conta</h1>


  )}
</div>
        </div>
        
    </div>
  )
}
