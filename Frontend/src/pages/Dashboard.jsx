import Sidebar from '@/components/navigationbars/Sidebar';
import Navbar from '@/components/navigationbars/Navbar';
import CategoryChart from '@/components/charts/CategoryChart';
import SpendingPaceChart from '@/components/charts/SpendingPaceChart';
import SpendingIncomeBar from '@/components/charts/SpendingIncomeBar';
import SpendingIncomeChart from '@/components/charts/SpendingIncomeChart';
import TransactionsCard from '@/components/layouts/TransacionsCard';
import {ArrowUpRight} from 'lucide-react';
import CategoryTable from '@/components/charts/CategoryTable';

const Dashboard = () => {
  return (
    <main className="flex bg-background">
    
      <Sidebar />

      <div className="flex flex-col w-full">
        <Navbar />
        <div className="flex-1 flex flex-col p-5 gap-5">

          {/* Card principal de stats */}
          <div className="shadow-neu-card border-zinc-800 rounded-lg flex w-full h-28 items-center p-5 gap-1 justify-between">

            <div className = "flex gap-5">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-foreground">Gasto no mês</p>
                  <p className="text-xl font-space text-red-600">R$ 2.540,80</p>
                  <span className="shadow-neu-badge rounded-lg text-xs bg-background text-zinc-400 px-1.5 py-0.5 w-fit">
                    26% vs mês passado
                  </span>
                  
                    
                </div>
                <div className="h-16 w-px bg-zinc-700" />

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-foreground">Ganho no mês</p>
                  <p className="text-xl font-space text-green-700">R$ 3.240,20</p>
                  <span className="shadow-neu-badge rounded-lg text-xs bg-background text-zinc-400 px-1.5 py-0.5 w-fit">
                    26% vs mês passado
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
                <p className="text-xl font-space text-red-600">R$ 340,20</p>
                <p className="text-xs text-zinc-500">Alimentação. Dia 5</p>
              </div>

              <div className="h-16 w-px bg-zinc-700" />

              <div className="flex flex-col gap-1">
                <p className="text-sm text-zinc-500">Dia mais caro</p>
                <p className="text-xl font-space self-center">Dia 17</p>
                <p className="text-xs text-zinc-500 self-center">R$ 420,00 gastos.</p>
              </div>

              <div className="h-16 w-px bg-zinc-700" />

              <div className="flex flex-col gap-1">
                <p className="text-sm text-zinc-500">Total de transações</p>
                <p className="text-xl font-space self-center">43</p>
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
    </main>
  );
};

export default Dashboard;