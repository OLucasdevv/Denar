import { useFinancialHealth } from "@/hooks/useFinancialHealth";

const getScoreConfig = (score) => {
  if (score >= 75) return { color: "#22c55e", label: "Ótimo" };
  if (score >= 50) return { color: "#f97316", label: "Atenção" };
  return { color: "#ef4444", label: "Crítico" };
};

const FinancialScore = () => {
  const data = useFinancialHealth();
  if (!data) return null;

  const score = data.score;
  const slaporra = data.gastoVariavel
  console.log(slaporra)
  const { color, label } = getScoreConfig(score);

  // SVG circle math
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~251
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="shadow-neu-badge bg-background rounded-xl p-4 flex flex-col gap-3 items-center h-full">
      <p className="text-sm text-foreground font-medium">Score financeiro</p>

      {/* Roda */}
      <div className="relative w-28 h-28 flex items-center justify-center mt-10">
        <svg className="absolute inset-0 -rotate-90 " width="112" height="112" viewBox="0 0 112 112">
          {/* Trilha cinza */}
          <circle
            cx="56" cy="56" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-muted-foreground/20"
          />
          {/* Arco colorido */}
          <circle
            cx="56" cy="56" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease"}}
          />
        </svg>

        {/* Número no centro */}
        <div className="flex flex-col items-center leading-none">
          <span className="text-2xl font-space" style={{ color }}>{score}</span>
          <span className="text-xs text-muted-foreground font-space">/100</span>
        </div>
      </div>

      {/* Label e histórico */}
      <p className="text-sm font-semibold" style={{ color }}>{label}</p>
      {data.insight && (
        <p className="text-xs text-muted-foreground text-center">{data.insight}</p>
      )}
      {data.mesesDisponiveis && (
  data.mesesDisponiveis < 2 ? (
    
    <p className="text-xs text-zinc-600 mt-0.5">
       Histórico insuficiente para previsões precisas (mínimo 2 meses)
    </p>
  ) : (
   
    <p className="text-xs text-muted-foreground/60">
      Histórico: {data.mesesDisponiveis} meses
    </p>
  )
)}
    </div>
  );
};

export default FinancialScore;