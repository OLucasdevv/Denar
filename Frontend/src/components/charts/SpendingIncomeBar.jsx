// components/SpendingIncomeBar.jsx
const SpendingIncomeBar = ({ spent = 2540.80, income = 3240.20 }) => {
  const spentPct = Math.min((spent / income) * 100, 100);
  const remaining = income - spent;
  const isOver = spent > income;

  return (
    <div className="flex flex-col gap-2 w-30 items-center ">
  
  <div className="flex items-end gap-2 h-10">
    
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-zinc-500">Ganho</span>
      <div className="w-2 bg-green/20 rounded-full relative" style={{ height: '36px' }}>
        <div className="absolute bottom-0 w-full bg-green-700 rounded-full" style={{ height: '100%' }} />
      </div>
    </div>

    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-zinc-500">Gasto</span>
      <div className="w-2 bg-zinc-800 rounded-full relative" style={{ height: '36px' }}>
        <div 
          className={`absolute bottom-0 w-full rounded-full transition-all duration-700 ${isOver ? 'bg-red-600' : 'bg-primary'}`} 
          style={{ height: `${spentPct}%` }} 
        />
      </div>
    </div>

  </div>

  <p className={`text-[10px] ${isOver ? 'text-red-600' : 'text-zinc-500'}`}>
    {isOver 
      ? `Gastou R$ ${Math.abs(remaining).toFixed(2)} a mais` 
      : `Sobra R$ ${remaining.toFixed(2)}`}
  </p>

</div>
  );
};

export default SpendingIncomeBar;