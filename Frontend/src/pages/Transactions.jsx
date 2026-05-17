import TransactionMetrics from "@/components/layouts/TransactionMetrics";
import TableToolBar from "@/components/layouts/TableToolbar";
import TransactionsTable from "@/components/layouts/TransactionsTable";
import useTransactions from "@/hooks/useTransactions";

const Transactions = () => {
  const transactions = useTransactions();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      <div className="flex flex-col w-full overflow-y-auto min-h-0">
        <div className="flex-1 flex flex-col p-3 gap-5">

          {/* Cabeçalho */}
          <div className="flex flex-col gap-1">
            <h1 className="text-lg">Transações</h1>
            <p className="text-sm text-zinc-600 mt-0.5">
              Confira e gerencie todas as suas movimentações financeiras
            </p>
          </div>

          {/* Cards de métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <TransactionMetrics />
          </div>

          {/* Toolbar de filtros */}
          <TableToolBar
            filters={transactions.filters}
            categorias={transactions.categorias}
            setSearch={transactions.setSearch}
            setTipo={transactions.setTipo}
            setCategoria={transactions.setCategoria}
            setPeriodo={transactions.setPeriodo}
            transacoesFiltradas={transactions.transacoesFiltradas}
          />

          {/* Tabela — recebe a fatia já paginada e filtrada pelo hook */}
          <TransactionsTable
            transacoes={transactions.transacoes}
            pagination={transactions.pagination}
            setPage={transactions.setPage}
            setPerPage={transactions.setPerPage}
          />

        </div>
      </div>
    </div>
  );
};

export default Transactions;