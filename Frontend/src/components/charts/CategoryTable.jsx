import React from "react";


const CategoryTable = () => {

const categoryStats = [
  {
    id: 1,
    name: "Uber",
    icon: "🚖",
    currentValue: 3066.00,
    previousValue: 65.00,
    color: "text-teal-500",
    bgBar: "bg-red-500", 
  },
  {
    id: 2,
    name: "Alimentação",
    icon: "🍔",
    currentValue: 746.00,
    previousValue: 560.00,
    color: "text-purple-500",
    bgBar: "bg-red-500",
  },
  {
    id: 3,
    name: "Hospital",
    icon: "🏥",
    currentValue: 573.00,
    previousValue: 9326.00,
    color: "text-amber-700",
    bgBar: "bg-green-500", 
  }
];


    
    return (
        <div className = "grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-y-4 gap-4">
            <span className = "text-sm">Categoria</span>
            <span className = "text-sm">Atual</span>
            <span className = "text-sm">Vs Mês Anterior</span>
            <span className = "text-sm">Variação</span>
            <span className = "text-sm">Anterior</span>

            {categoryStats.map((items) => {

                return(
                <React.Fragment key={items.id}>
                    <div className = "flex gap-1 items-center">
                        <span>{items.icon}</span>
                        <span className = "font-medium text-foreground"> {items.name} </span>
                    </div>

                    <span className="font-space">R$ {items.currentValue}</span>

                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-[65%]" /> 
                    </div>

                    <span className="text-green-500">+12%</span>

                    <span className="text-zinc-500 font-space">R$ {items.previousValue}</span>

                </React.Fragment>
                )
            })}
        </div>
    )
};
export default CategoryTable;