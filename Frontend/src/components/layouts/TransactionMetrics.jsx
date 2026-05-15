
import { useFinance } from "@/contexts/FinanceContext";
import usePace from "@/hooks/UsePace";


const TransactionMetrics = () => {
    const {transacoes} = useFinance();
    const dadosGanhos = usePace("ganho")  
  const ultimo = dadosGanhos.at(-1) || { atual: 0, passado: 0 }
    // tem que substituir boa parte disso inclusive criar um hook pra isso

    return (
        <>
        <div className = "shadow-neu-badge bg-background rounded-xl min-h-[120px] p-4">
            <p className = "text-foreground text-sm mb-2">Total de entradas</p> 
            <p className="text-2xl font-space  text-green">
          R$ {ultimo.atual.toFixed(2).replace('.', ',')}
          <p className = "text-xs text-zinc-600 mt-0.5">{transacoes.length} transações</p>
        </p>
        </div>
        </>
    )
};
export default TransactionMetrics;
