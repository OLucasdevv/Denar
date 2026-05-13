import SpendingPaceChart from '@/components/charts/SpendingPaceChart';
import SpendingIncomeBar from '@/components/charts/SpendingIncomeBar';
import SpendingIncomeChart from '@/components/charts/SpendingIncomeChart';
import TransactionsCard from '@/components/layouts/TransacionsCard';
import {ArrowUpRight} from 'lucide-react';
import CategoryTable from '@/components/charts/CategoryTable';
import usePace from '@/hooks/UsePace';
import { Variacao } from '@/components/insights/Porcentage';
import { useFinance } from '@/contexts/FinanceContext';
import { getMaxExpanse } from '@/lib/analytics';
import { useUser } from '@/contexts/UserContext';
import TextType from '@/components/effects/TextType';
import { useEffect, useState } from 'react';
import { getMostExpensiveDay } from '@/lib/analytics';



const Tendencies = () => {
  const { user } = useUser();
const [mostrarAnimacao, setMostrarAnimacao] = useState(false);
  const [mostrarCursor, setMostrarCursor] = useState(true);

  const nome = user?.user_metadata?.full_name || "";
  const texto = `bem vindo de volta, ${nome}`;

 

  if (!user) return null;

  const {transacoes, setTransacoes} = useFinance()
  console.log(transacoes)
  const maior = getMaxExpanse(transacoes) || { amount: 0, date: '0000-00-00', categoria : {nome: 'sem categoria', icone: ''} }
  const dadosGastos = usePace("gasto")    
  const ultimoGasto = dadosGastos.at(-1) || { atual: 0, passado: 0 }
  const dadosGanhos = usePace("ganho")  
  const ultimoGanho = dadosGanhos.at(-1) || { atual: 0, passado: 0 }
  const mostExpansive = getMostExpensiveDay(transacoes)  
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">

      <div className="flex flex-col w-full overflow-y-auto min-h-0">
        <div className="flex-1 flex flex-col p-3 gap-5">

          {/* Card principal de stats */}
          <h1 className = "text-lg">Veja suas Tendências e Ritmos</h1>
          <div className="shadow-neu-card border-zinc-800 rounded-lg flex w-full h-28 items-center p-5 gap-1 justify-between">

            <div className = "flex gap-5">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-foreground">Gasto no mês</p>
                  <p className="text-xl font-space text-red">R$ {ultimoGasto.atual.toFixed(2).replace('.', ',')}</p>
                  <span className="shadow-neu-badge rounded-lg text-xs bg-background text-zinc-400 px-1.5 py-0.5 w-fit">
                    <Variacao 
  atual={ultimoGasto.atual} 
  passado={ultimoGasto.passado} 
  tipo = "gasto"
/>
                  </span>
                  
                    
                </div>
                <div className="h-16 w-px bg-zinc-700" />

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-foreground">Ganho no mês</p>
                  <p className="text-xl font-space text-green">R$ {ultimoGanho.atual.toFixed(2).replace('.', ',')}</p>
                  <span className="shadow-neu-badge rounded-lg text-xs bg-background text-zinc-400 px-1.5 py-0.5 w-fit">
                    <Variacao 
  atual={ultimoGanho.atual} 
  passado={ultimoGanho.passado} 
  tipo = "ganho"
/>
                  </span>
                  
                    
                </div>
                <div className = "flex items-center mt-4 ">
<SpendingIncomeBar />
                </div>
                
            </div>
           
            

            {/* Cards menores */}
            <div className="flex gap-8">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-zinc-500">Maior gasto</p>
                <p className="text-xl font-space text-red">R$ {Math.abs(maior.amount).toFixed(2).replace('.', ',')}</p>
                <p className="text-xs text-zinc-500 flex">Dia {maior.date.split("-")[2]} • {maior.categoria.nome}</p>
              </div>

              <div className="h-16 w-px bg-zinc-700" />

              <div className="flex flex-col gap-1">
                <p className="text-sm text-zinc-500">Dia mais caro</p>
                {mostExpansive ? (
                  <>
                  <p className="text-xl font-space self-center">{mostExpansive.dataFormatada}</p>
                <p className="text-xs text-zinc-500 self-center">R$ {mostExpansive.valor.toFixed(2).replace('.', ',')}</p>
                </>
                ) : (
                  <p className = "flex items-center justify-center">Sem Dados</p>
                )}
                
              </div>

              <div className="h-16 w-px bg-zinc-700" />

              <div className="flex flex-col gap-1">
                <p className="text-sm text-zinc-500">Total de transações </p>
                <p className="text-xl font-space self-center">{transacoes.length}</p>
                <span className="shadow-neu-badge rounded-lg text-xs text-zinc-400 px-1.5 py-0.5 self-center">
                  +8 vs mês passado
                </span>
              </div>
            </div>
          </div>
          <div className = "grid grid-cols-2 gap-4">
            <SpendingPaceChart />
            <SpendingIncomeChart />
          </div>
          

          {/* Grid inferior */}
          <div className="grid grid-cols-3 gap-4 w-full h-[400px]">

            <div className="shadow-neu-card rounded-lg bg-background p-3 text-foreground flex-col ">
              <div className = "flex gap-2 mb-3 justify-between items-center">
                <h2 className="text-foreground ">Últimas transações</h2>
                <button className = "flex gap-1 shadow-neu-badge  rounded-lg border-zinc-800 p-1">
                    Ver todas
                    <span >
                        <ArrowUpRight />
                    </span>
                </button>
              </div>
              < TransactionsCard  />
            </div>

            <div className="shadow-neu-card rounded-lg bg-background p-3 text-foreground">
              <h2 className="text-foreground">Insights do mês</h2>
            </div>

            <div className="shadow-neu-card rounded-lg bg-background p-3 text-foreground ">
              <div className = "flex gap-2 mb-3 justify-between items-center">
                <h2 className="text-foreground ">Principais Categorias</h2>
                <button className = "flex gap-1 shadow-neu-badge  rounded-lg border-zinc-800 p-1">
                    Ver todas
                    <span >
                        <ArrowUpRight />
                    </span>
                </button>
              </div>
              <CategoryTable />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Tendencies;