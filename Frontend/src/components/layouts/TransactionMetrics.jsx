import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Variacao } from "../insights/Porcentage";
import useTransactions from "@/hooks/useTransactions";

// ─── Sub-componente de card ───────────────────────────────────────────────────

const MetricCard = ({
  label,
  metric,
  colorClass,
  tipoVariacao,
  invertArrow = false,
}) => {
  const subiu = metric.valor > metric.passado;
  const ArrowIcon = subiu ? ArrowUpIcon : ArrowDownIcon;
  
  // Lógica de cores da seta (mantida exatamente como a sua)
  const arrowColor = invertArrow
  
    ? subiu ? "text-green" : "text-red"
    : tipoVariacao === "ganho"
      ? subiu ? "text-green" : "text-red"
      : subiu ? "text-red"   : "text-green"; // gasto: subir é ruim

  return (
    <div className="shadow-neu-badge bg-background rounded-xl min-h-[120px] p-4">
      <p className="text-foreground text-sm mb-2">{label}</p>

      <p className={`text-2xl font-space ${colorClass}`}>
        R$ {metric.valor.toFixed(2).replace(".", ",")}
      </p>

      <div className="flex justify-between mt-1">
        <p className="text-xs text-zinc-600">{metric.count} transações</p>

        <span className="flex items-center gap-1 text-sm">
          <ArrowIcon className={arrowColor} size={16} />
          <Variacao
            atual={metric.valor}
            passado={metric.passado}
            tipo={tipoVariacao === "neutro" ? "ganho" : tipoVariacao}
            showSuffix={false}
          />
        </span>
      </div>
    </div>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────

const TransactionMetrics = () => {
  const { metrics } = useTransactions();

  return (
    <>
      <MetricCard
        label="Total de entradas"
        metric={metrics.entradas}
        colorClass="text-green"
        tipoVariacao="ganho"
      />

      <MetricCard
        label="Total de saídas"
        metric={metrics.saidas}
        colorClass="text-red"
        tipoVariacao="gasto"
      />

      <MetricCard
        label="Saldo do período"
        metric={metrics.saldo}
        colorClass="text-foreground"
        tipoVariacao="neutro"
        invertArrow
      />

      <MetricCard
        label="Ticket médio"
        metric={metrics.ticketMedio}
        colorClass="text-foreground"
        tipoVariacao="neutro"
        invertArrow
      />
    </>
  );
};

export default TransactionMetrics;