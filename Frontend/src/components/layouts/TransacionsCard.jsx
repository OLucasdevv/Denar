import {ChevronUp, ChevronDown} from 'lucide-react';
import { useState } from 'react';

const TransactionsCard = () => {
    const [isPositive, setIsPositive] = useState()

    const transactions = [
        {date:"15 fev.", value: "-R$3,50", type:"Compra no débito", author:"Padaria Sabor Nordeste Brasilia", category: "Alimentação", balance:"R$47,55" },
        {
  date: "16 fev.", 
  value: "-R$5,00", 
  type: "Compra no débito", 
  author: "Play Games Brasilia", 
  category: "Entretenimento", 
  balance: "R$42,55"
},
{date:"02 mar", value: "R$200,00", type:"Pix recebido", author:"Terezinha de Jesus da Silva", category: "Pix", balance:"R$211,86" }

        
    ]
    return (
       <div className="flex flex-col gap-5">
    {transactions.map((trans, index) => {
        const isNegative = trans.value.startsWith('-');
        return (
            <div key={index} className="flex items-center justify-between w-full h-20 shadow-neu-card rounded-xl border border-zinc-800 bg-background p-2 gap-3">
            
            {/* 1. Bloco da Data/Ícone (Largura Fixa) */}
            <div className="flex flex-col items-center gap-1 text-foreground min-w-[60px]">
                
                <div className="rounded-full bg-black w-12 h-12 border border-zinc-800" />
            </div>

           

            {/* 2. Bloco do Texto (Ocupa o resto do espaço) */}
            <div className="flex flex-col flex-1 min-w-0">
                <h1 className="text-foreground font-medium text-sm ">
                    {trans.author}
                </h1>
                <h1 className="text-zinc-500 text-sm flex gap-1">
                    {trans.category}
                    <span>
                        <p>• {trans.date}</p>
                    </span>
                </h1>
                {/* O truncate impede que o nome do autor quebre o layout */}
                <p className="text-zinc-500 text-xs truncate">
                    
                </p>
            </div>

            {/* 3. Bloco do Valor (Alinhado à direita) */}
            <div className="flex flex-col items-end justify-center min-w-[100px]">
                <div className="flex items-center gap-1">
                    {isNegative ? <ChevronDown color='#dc2626' /> : <ChevronUp color='#15803d'/>}
                    <p className={`text-foreground ${isNegative ? 'text-red-600': 'text-green-700'}`}>
                        {trans.value}
                    </p>
                </div>
                <p className="text-zinc-400 text-sm flex gap-1">
                    saldo <span className="font-space text-foreground">{trans.balance}</span>
                </p>
            </div>
            
        </div>
        )
    })}
</div> 
    )
};
export default TransactionsCard;